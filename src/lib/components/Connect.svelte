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
				Entre em contato conosco
			</h2>
			<p class="text-xl md:text-2xl text-gray-600 transform transition-all duration-1000 delay-300 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				Tem dúvidas sobre o casamento? Precisa confirmar presença? Entre em contato conosco!
			</p>
		</div>

		<!-- Contact Methods -->
		<div class="space-y-8 mb-12">
			<!-- Primary CTA -->
			<div class="transform transition-all duration-1000 delay-500 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				<a
					href="mailto:brizollajr@gmail.com"
					class="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-hover text-black font-semibold text-xl rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
				>
					<svg class="mr-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
					brizollajr@gmail.com
				</a>
			</div>

			<!-- Alternative Contact -->
			<div class="transform transition-all duration-1000 delay-700 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				<p class="text-lg text-gray-600 mb-4">Ou confirme sua presença através dos nossos canais:</p>
				<div class="flex flex-wrap justify-center gap-4">
					<a
						href="#"
						class="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-full transition-all duration-300 hover:scale-105"
					>
						Confirmar Presença
					</a>
					<a
						href="#"
						class="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-accent rounded-full transition-all duration-300 hover:scale-105"
					>
						Lista de Presentes
					</a>
					<a
						href="#"
						class="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-accent rounded-full transition-all duration-300 hover:scale-105"
					>
						Mural de Recados
					</a>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<div class="pt-12 border-t border-gray-200 transform transition-all duration-1000 delay-900 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
			<p class="text-gray-600">
				© 2025 Gabrielle e João. Celebrando nosso amor com muito carinho e gratidão.
			</p>
		</div>
	</div>
</section>
