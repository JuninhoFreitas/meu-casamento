<script lang="ts">
	import { onMount } from 'svelte';

	let connectElement = $state<HTMLElement>();
	let isVisible = $state(false);

	onMount(() => {
		isVisible = true;
	});
</script>

<section id="connect" bind:this={connectElement} class="py-20 lg:py-32 px-6 lg:px-8 bg-gray-50">
	<div class="max-w-4xl mx-auto text-center">
		<!-- Section Header -->
		<div class="mb-12">
			<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 transform transition-all duration-1000 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				Let's work together
			</h2>
			<p class="text-xl md:text-2xl text-gray-600 transform transition-all duration-1000 delay-300 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				Ready to bring your vision to life? I'd love to hear about your project.
			</p>
		</div>

		<!-- Contact Methods -->
		<div class="space-y-8 mb-12">
			<!-- Primary CTA -->
			<div class="transform transition-all duration-1000 delay-500 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				<a
					href="mailto:hello@danielsun.space"
					class="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-hover text-black font-semibold text-xl rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
				>
					<svg class="mr-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
					hello@danielsun.space
				</a>
			</div>

			<!-- Alternative Contact -->
			<div class="transform transition-all duration-1000 delay-700 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				<p class="text-lg text-gray-400 mb-4">Or connect with me directly:</p>
				<div class="flex flex-wrap justify-center gap-4">
					<a
						href="https://x.com/danielsun_ui"
						target="_blank"
						rel="noopener noreferrer"
						class="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white hover:text-accent transition-all duration-300 hover:scale-105"
					>
						Twitter / X
					</a>
					<a
						href="https://www.linkedin.com/in/daniel-sun-47838b209/"
						target="_blank"
						rel="noopener noreferrer"
						class="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white hover:text-accent transition-all duration-300 hover:scale-105"
					>
						LinkedIn
					</a>
					<a
						href="https://dribbble.com/daniel_sun"
						target="_blank"
						rel="noopener noreferrer"
						class="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white hover:text-accent transition-all duration-300 hover:scale-105"
					>
						Dribbble
					</a>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<div class="pt-12 border-t border-gray-200 transform transition-all duration-1000 delay-900 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
			<p class="text-gray-600">
				© 2024 Daniel Sun. Crafting digital experiences with passion and precision.
			</p>
		</div>
	</div>
</section>
