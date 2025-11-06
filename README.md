# Site de Casamento - Gabrielle & João

Site de casamento de Gabrielle & João, desenvolvido com Next.js e Lenis.

## Setup

1. Instalar dependências:

   `$ pnpm i`

2. Configurar variáveis de ambiente (se necessário):

   `$ vc link`

   `$ vc env pull`

3. Configurar autenticação GSAP (se necessário):
   
   Copiar `.npmrc.config` para `.npmrc` e substituir `GSAP_AUTH_TOKEN` com seu token

4. Executar ambiente de desenvolvimento:

   `$ pnpm dev`

## Stack Técnico

- [Lenis](https://github.com/darkroomengineering/lenis) - Biblioteca de scroll suave
- [Tempus](https://github.com/darkroomengineering/tempus) - Controle de timing de animações
- [Hamo](https://github.com/darkroomengineering/hamo) - Hooks e utilitários React
- [PNPM](https://pnpm.io/) - Gerenciador de pacotes
- [Next.js](https://nextjs.org/) - Framework React
- [Three.js](https://threejs.org/) - Gráficos 3D
- [@react-three/drei](https://github.com/pmndrs/drei) - Utilitários Three.js React
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) - Renderer Three.js React
- [GSAP Business](https://greensock.com/gsap/) - Biblioteca de animações
- [Sass Modules](https://sass-lang.com/) - Pré-processamento CSS
- [Zustand](https://github.com/pmndrs/zustand) - Gerenciamento de estado
- [Next PWA](https://www.npmjs.com/package/next-pwa) - Suporte a Progressive Web App
- [Next SEO](https://github.com/garmeeh/next-seo) - Otimização SEO
- [Next Sitemap](https://github.com/iamvishnusankar/next-sitemap) - Geração de sitemap
- [@svgr/webpack](https://github.com/gregberge/svgr/tree/main) - Importação de SVGs

## Code Style & Linting

- Eslint ([Next](https://nextjs.org/docs/basic-features/eslint#eslint-config) and [Prettier](https://github.com/prettier/eslint-config-prettier) plugins)
- [Prettier](https://prettier.io/) with the following settings:
  ```json
  {
    "endOfLine": "auto",
    "semi": false,
    "singleQuote": true
  }
  ```
- [Husky + lint-staged precommit hooks](https://github.com/okonet/lint-staged)

## Development Tools

- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) - Analyze bundle sizes
- [Duplicate Package Checker](https://www.npmjs.com/package/duplicate-package-checker-webpack-plugin) - Check for duplicate packages
- [Stats.js](https://github.com/mrdoob/stats.js/) - Performance monitoring
- [Leva](https://github.com/pmndrs/leva) - Debug UI controls

## Folder Structure

Alongside the usual Next.js folder structure (`/public`, `/pages`, etc.) We've added a few other folders:

- **/assets:** General Images/Videos and SVGs
- **/components:** Reusable components with their respective Sass files
- **/config:** General settings (mostly Leva for now)
- **/hooks:** Reusable Custom Hooks
- **/layouts:** High level layout components
- **/lib:** Reusable Scripts and State Store
- **/styles:** Global styles and Sass partials

## Deployment

- [Vercel](https://vercel.com/home) - Hosting & Continuous Deployment
- [GitHub](https://github.com/) - Version Control
