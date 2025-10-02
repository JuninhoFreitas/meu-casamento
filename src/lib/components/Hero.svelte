<script lang="ts">
	import { onMount } from 'svelte';

	let heroElement = $state<HTMLElement>();
	let isVisible = $state(false);

	onMount(() => {
		isVisible = true;
	});
</script>

<section id="hero" bind:this={heroElement} class="relative min-h-screen flex items-center justify-center px-6 lg:px-8 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
	<!-- Background gradient -->
	<div class="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent"></div>

	<div class="relative max-w-4xl mx-auto text-center">
		<!-- Main heading with staggered animation -->
		<div class="mb-12">
			<h1 class="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 mb-6 leading-tight">
				<span class="inline-block transform transition-all duration-1000 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
					Daniel Sun
				</span>
			</h1>
		</div>

		<!-- Subtitle -->
		<div class="mb-16">
			<p class="text-2xl md:text-3xl lg:text-4xl text-gray-700 font-light leading-relaxed max-w-3xl mx-auto">
				<span class="inline-block transform transition-all duration-1000 delay-300 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
					Howdy! Meet your trusted design partner,<br class="hidden md:block">
					crafting strong brands for SaaS and Web3.
				</span>
			</p>
		</div>

		<!-- CTA Button -->
		<div class="transform transition-all duration-1000 delay-500 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
			<a
				href="mailto:hello@danielsun.space"
				class="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
			>
				Start your project
				<svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>
	</div>

	<!-- Decorative elements -->
	<div class="absolute top-1/4 left-8 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
	<div class="absolute bottom-1/4 right-8 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
</section>

<style>
	.bg-gradient-radial {
		background: radial-gradient(600px 600px at 50% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 70%);
	}
</style>
