<script lang="ts">
	import { onMount } from 'svelte';
	import AnimatedText from './AnimatedText.svelte';

	let heroElement = $state<HTMLElement>();
	let isVisible = $state(false);
	let daysLeft = $state(0);
	onMount(() => {
		isVisible = true;
		daysLeft = Math.floor((new Date('2026-03-07').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
	});
</script>

<section id="hero" bind:this={heroElement} class="relative min-h-screen flex items-center justify-center px-6 lg:px-8 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
	<!-- Optimized background using CSS patterns instead of large images -->
	<div class="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent"></div>
	<div class="absolute inset-0 bg-black opacity-50" style="background-image: url('/src/lib/assets/hero.webp'); background-size: cover; background-position: center; background-repeat: no-repeat; background-color: #FFFFFF; "></div>
	<!-- Background gradient -->
	

	<div class="relative max-w-4xl mx-auto text-center">
		<!-- Main heading with staggered animation -->
		<div class="mb-12">
			<h1 class="text-8xl md:text-8xl lg:text-9xl font-bold text-gray-900 mb-6 leading-tight text-left">
				<AnimatedText
					content="Gabrielle & João"
					{isVisible}
					tag="span"
				/>
			</h1>
		</div>

		<!-- Subtitle -->
		<div class="mb-8">
			<p class="text-2xl md:text-3xl lg:text-4xl text-gray-700 font-light leading-relaxed max-w-3xl mx-auto">
				<AnimatedText
					content="7 de Março  de 2026 — 9h00 Faltam {daysLeft} dias para o nosso grande dia!"
					delay={300}
					{isVisible}
					tag="span"
				/>
			</p>
		</div>

		<!-- Bible Quote -->
		<div class="mb-16">
			<AnimatedText
				content={`"Dêem graças ao Senhor, porque ele é bom!"
				Salmos 136.1a`}
				delay={500}
				{isVisible}
				class="text-xl md:text-2xl lg:text-3xl text-gray-900 font-light leading-relaxed max-w-3xl mx-auto italic"
				tag="p"
			/>
		</div>

		<!-- CTA Button -->
		<!-- <div class="transform transition-all duration-1000 delay-500 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
			<a
				href="mailto:hello@danielsun.space"
				class="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
			>
				Start your project
				<svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div> -->
	</div>

	<!-- Optimized decorative elements with reduced blur for better performance -->
	<div class="absolute top-1/4 left-8 w-64 h-64 bg-accent/15 rounded-full blur-2xl animate-pulse"></div>
	<div class="absolute bottom-1/4 right-8 w-48 h-48 bg-accent/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
</section>

<style>
	.bg-gradient-radial {
		background: radial-gradient(600px 600px at 50% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 70%);
	}
</style>
