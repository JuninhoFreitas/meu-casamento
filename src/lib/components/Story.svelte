<script lang="ts">
	import { onMount } from 'svelte';

	let storyElement = $state<HTMLElement>();
	let isVisible = $state(false);


	onMount(() => {
		isVisible = true;
	});
</script>

<section id="story" bind:this={storyElement} class="py-20 lg:py-32 px-6 lg:px-8 bg-gray-50">
	<div class="max-w-4xl mx-auto">
		<!-- Section Header -->
		<div class="mb-16">
			<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 transform transition-all duration-1000 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				Nossa história de amor
			</h2>
		</div>

		<!-- Story Content -->
		<div class="space-y-16 text-lg md:text-xl text-gray-700 leading-relaxed">
			<!-- Dia que nos conhecemos -->
			<div>
				<p class="transform transition-all duration-1000 delay-300 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} mb-6">
					<strong>Dia que nos conhecemos - Setembro de 2024</strong>
				</p>

				<div class="flex flex-row justify-between gap-12">
					<blockquote class="w-1/2 transform transition-all duration-1000 delay-500 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} p-6 bg-white rounded-lg shadow-sm border-l-4 border-accent italic">
						<p class="text-gray-700">
							"Dia 17 de setembro de 2024, nos encontramos pela primeira vez. Naquele dia, eu retornava de uma missão no Amazonas onde fomos ensinar sobre aconselhamento bíblico para os Ribeirinhos."
						</p>
						<footer class="mt-4 text-sm text-gray-600 font-medium">— João</footer>
					</blockquote>
					<blockquote class="w-1/2 transform transition-all duration-1000 delay-500 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} p-6 bg-white rounded-lg shadow-sm border-l-4 border-accent italic">
						<p class="text-gray-700">
							"Eu estava vindo do Maranhão, onde morava após concluir a faculdade de medicina. Foi na Conferência de Aconselhamento Bíblico em Atibaia que nossos caminhos se cruzaram."
						</p>
						<footer class="mt-4 text-sm text-gray-600 font-medium">— Gabrielle</footer>
					</blockquote>
				</div>
			</div>

			<!-- Começo da Amizade -->
			<div>
				<p class="transform transition-all duration-1000 delay-300 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} mb-6">
					<strong>Começo da Amizade - Outubro de 2024</strong>
				</p>

				<div class="flex flex-row justify-between gap-12">
					<blockquote class="w-1/2 transform transition-all duration-1000 delay-600 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} p-6 bg-white rounded-lg shadow-sm border-l-4 border-accent italic">
						<p class="text-gray-700">
							"Começamos a conversar mais frequentemente sobre ministério e vida. Logo percebi que tínhamos muito em comum em nossa visão de vida e serviço."
						</p>
						<footer class="mt-4 text-sm text-gray-600 font-medium">— João</footer>
					</blockquote>
					<blockquote class="w-1/2 transform transition-all duration-1000 delay-600 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} p-6 bg-white rounded-lg shadow-sm border-l-4 border-accent italic">
						<p class="text-gray-700">
							"Nossa amizade cresceu naturalmente, compartilhando experiências de ministério e sonhos para o futuro."
						</p>
						<footer class="mt-4 text-sm text-gray-600 font-medium">— Gabrielle</footer>
					</blockquote>
				</div>
			</div>

			<!-- Começo do Namoro -->
			<div>
				<p class="transform transition-all duration-1000 delay-300 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} mb-6">
					<strong>Começo do Namoro - Janeiro de 2025</strong>
				</p>

				<div class="flex flex-row justify-between gap-12">
					<blockquote class="w-1/2 transform transition-all duration-1000 delay-700 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} p-6 bg-white rounded-lg shadow-sm border-l-4 border-accent italic">
						<p class="text-gray-700">
							"Após meses de oração e aconselhamento, decidimos iniciar um relacionamento com propósito de casamento."
						</p>
						<footer class="mt-4 text-sm text-gray-600 font-medium">— João</footer>
					</blockquote>
					<blockquote class="w-1/2 transform transition-all duration-1000 delay-700 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} p-6 bg-white rounded-lg shadow-sm border-l-4 border-accent italic">
						<p class="text-gray-700">
							"Foi um momento especial quando decidimos dar esse passo juntos, confiando na direção de Deus."
						</p>
						<footer class="mt-4 text-sm text-gray-600 font-medium">— Gabrielle</footer>
					</blockquote>
				</div>
			</div>

			<!-- Pedido de Casamento -->
			<div>
				<p class="transform transition-all duration-1000 delay-300 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} mb-6">
					<strong>Pedido de Casamento - Julho de 2025</strong>
				</p>

				<div class="flex flex-row justify-between gap-12">
					<blockquote class="w-1/2 transform transition-all duration-1000 delay-800 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} p-6 bg-white rounded-lg shadow-sm border-l-4 border-accent italic">
						<p class="text-gray-700">
							"Planejei cada detalhe do pedido, querendo tornar esse momento inesquecível para nós dois."
						</p>
						<footer class="mt-4 text-sm text-gray-600 font-medium">— João</footer>
					</blockquote>
					<blockquote class="w-1/2 transform transition-all duration-1000 delay-800 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} p-6 bg-white rounded-lg shadow-sm border-l-4 border-accent italic">
						<p class="text-gray-700">
							"Foi uma surpresa maravilhosa! Mal posso esperar para começar nossa vida juntos."
						</p>
						<footer class="mt-4 text-sm text-gray-600 font-medium">— Gabrielle</footer>
					</blockquote>
				</div>
			</div>

			<!-- Casamento -->
			<div>
				<p class="transform transition-all duration-1000 delay-300 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} mb-6">
					<strong>Casamento - Março de 2026</strong>
				</p>

				<div class="flex flex-row justify-between gap-12">
					<blockquote class="w-1/2 transform transition-all duration-1000 delay-900 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} p-6 bg-white rounded-lg shadow-sm border-l-4 border-accent italic">
						<p class="text-gray-700">
							"Chegou o grande dia! Mal posso esperar para celebrar nossa união com família e amigos."
						</p>
						<footer class="mt-4 text-sm text-gray-600 font-medium">— João</footer>
					</blockquote>
					<blockquote class="w-1/2 transform transition-all duration-1000 delay-900 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} p-6 bg-white rounded-lg shadow-sm border-l-4 border-accent italic">
						<p class="text-gray-700">
							"O início de uma nova jornada juntos, servindo a Deus e um ao outro."
						</p>
						<footer class="mt-4 text-sm text-gray-600 font-medium">— Gabrielle</footer>
					</blockquote>
				</div>
			</div>
		</div>

		<!-- Bible Quote -->
		<div class="mt-16 p-8 bg-gray-100 rounded-2xl border border-gray-200 text-center">
			<blockquote class="text-xl md:text-2xl text-gray-900 italic leading-relaxed transform transition-all duration-1000 delay-1500 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				"Dêem graças ao Senhor, porque Ele é bom"<br>
				<span class="text-lg">Salmos 136.1a</span>
			</blockquote>
		</div>
	</div>
</section>
