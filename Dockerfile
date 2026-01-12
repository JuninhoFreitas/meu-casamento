# Stage 1: Dependencies
FROM node:20-alpine AS deps
# Install pnpm and build dependencies for native modules
RUN corepack enable && corepack prepare pnpm@latest --activate && \
    apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY .npmrc* ./

# Install dependencies
RUN pnpm install --frozen-lockfile --prod=false

# Stage 2: Builder
FROM node:20-alpine AS builder
# Install pnpm and build dependencies for native modules (sharp, etc.)
RUN corepack enable && corepack prepare pnpm@latest --activate && \
    apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy source code
COPY . .

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# ARG for build-time variables (NEXT_PUBLIC_* variables need to be available at build time)
# These should be passed via --build-arg when building the image
ARG NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY
ENV NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=$NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY

# Build the application
RUN pnpm build

# Stage 3: Runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Runtime environment variables (these should be passed via -e or docker-compose)
# MERCADOPAGO_ACCESS_TOKEN is used at runtime in API routes, so it doesn't need to be in the image
# NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY is already embedded in the build from the builder stage

# Install runtime dependencies
RUN apk add --no-cache libc6-compat ca-certificates

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy public assets
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy standalone build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
