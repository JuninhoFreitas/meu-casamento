<script lang="ts">
	import { onMount } from 'svelte';
	import SectionTitle from './SectionTitle.svelte';
	import AnimatedText from './AnimatedText.svelte';
	import ProcessStep from './ProcessStep.svelte';

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
			<SectionTitle
				title="Roadmap da Nossa Celebração"
				{isVisible}
			/>
			<AnimatedText
				content="Sua missão, caso decida aceitar, é celebrar com a gente! =)"
				delay={300}
				{isVisible}
				class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
				tag="p"
			/>
		</div>

		<!-- Process Steps -->
		<div class="grid gap-8 md:gap-12">
			{#each processSteps as step, index}
				<ProcessStep
					step={step.step}
					title={step.title}
					description={step.description}
					delay={500 + index * 200}
					{isVisible}
				/>
			{/each}
		</div>

		<!-- CTA Section -->
		<div class="mt-16 text-center transform transition-all duration-1000 delay-1500 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
			<div class="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 border border-accent/20">
				<h3 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
					Pronto para celebrar conosco?
				</h3>
				<p class="text-lg text-gray-700">
					Estamos ansiosos para compartilhar este momento especial com você. Sua presença é o que tornará este dia inesquecível!
				</p>
			</div>
		</div>
	</div>
</section>
