<script lang="ts">
	import { onMount } from 'svelte';

	let processElement = $state<HTMLElement>();
	let isVisible = $state(false);

	const processSteps = [
		{
			step: '01',
			title: 'A Convocação',
			description: 'Mergulhamos fundo na sua agenda para garantir sua presença! Nesta primeira fase, pedimos que você confirme sua vinda, nos informe se precisará de ajuda com hospedagem e se utilizará o suporte dos Padrinhos para a entrega de presentes. Suas respostas são a base do nosso planejamento!'
		},
		{
			step: '02',
			title: 'Contagem Regressiva',
			description: 'Com as informações iniciais, entramos em modo de preparação. Conforme o grande dia se aproxima, enviaremos lembretes e pediremos as confirmações finais para que tudo esteja perfeito. Fique de olho nas nossas comunicações!'
		},
		{
			step: '03',
			title: 'O Grande Dia',
			description: 'O desenvolvimento do nosso sonho se torna realidade! Aqui, sua única tarefa é vir para o casamento com o coração aberto, o melhor sorriso no rosto e muita energia para celebrar o nosso amor.'
		},
		{
			step: '04',
			title: 'A Comemoração',
			description: 'Lançamento oficial da nossa nova vida! Após a cerimônia, queremos todos juntos para um almoço delicioso, onde poderemos conversar, rir e criar as primeiras memórias de um dia inesquecível. A sua presença é o nosso maior presente.'
		},
		{
			step: '05',
			title: 'Boas Lembranças',
			description: 'O evento termina, mas a celebração continua em nossos corações. Esta fase é eterna, onde guardaremos com carinho cada abraço, cada foto e a alegria de ter tido você ao nosso lado. Muito obrigado por fazer parte da nossa história!'
		}
	];

	onMount(() => {
		isVisible = true;
	});
</script>

<section id="process" bind:this={processElement} class="py-20 lg:py-32 px-6 lg:px-8">
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 transform transition-all duration-1000 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				Roadmap da Nossa Celebração
			</h2>
			<p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto transform transition-all duration-1000 delay-300 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				Sua missão, caso decida aceitar, é celebrar com a gente! =)
			</p>
		</div>

		<!-- Process Steps -->
		<div class="grid gap-8 md:gap-12">
			{#each processSteps as step, index}
				<div class="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8 transform transition-all duration-1000 delay-{500 + index * 200} {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}">
					<!-- Step Number -->
					<div class="flex-shrink-0">
						<div class="w-16 h-16 bg-accent text-black rounded-full flex items-center justify-center text-xl font-bold">
							{step.step}
						</div>
					</div>

					<!-- Step Content -->
					<div class="flex-1">
						<h3 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
							{step.title}
						</h3>
						<p class="text-lg text-gray-700 leading-relaxed">
							{step.description}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- CTA Section -->
		<div class="mt-16 text-center transform transition-all duration-1000 delay-1500 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
			<div class="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 border border-accent/20">
				<h3 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
					Pronto para celebrar conosco?
				</h3>
				<p class="text-lg text-gray-700 mb-6">
					Estamos ansiosos para compartilhar este momento especial com você. Sua presença é o que tornará este dia inesquecível!
				</p>
				<a
					href="#connect"
					class="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
				>
					Confirmar presença
					<svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>
