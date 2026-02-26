<script lang="ts">
	import { onMount } from 'svelte';
	import SectionTitle from './SectionTitle.svelte';
	import AnimatedText from './AnimatedText.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import ComingSoonNote from './ComingSoonNote.svelte';

	let worksElement = $state<HTMLElement>();
	let isVisible = $state(false);
	import unidos from '$lib/assets/unidos.webp';
	import hotel from '$lib/assets/hotel.webp';
	import presentes from '$lib/assets/presentes.webp';

	const weddingInfo = [
		{
			name: 'Local da Cerimônia',
			description: 'Igreja Bíblica Unidos no Senhor, Novo Hamburgo - RS, Brasil',
			year: '07/03/2026',
			tags: ['Cerimônia', 'Recepção', '15:00'],
			image: unidos
		},
		{
			name: 'Hospedagem',
			description: 'Vamos disponibilizar um guia para hospedagens',
			year: 'R$?/noite',
			tags: ['Acomodação', 'Perto do local', 'Reservas até 10/09'],
			image: hotel
		},
		{
			name: 'Lista de Presentes',
			description: 'Sugestões de presentes para compartilhar nossa felicidade',
			year: 'Monetário preferido',
			tags: ['Presentes', 'PIX disponível', 'Contato direto'],
			image: presentes
		}
	];

	onMount(() => {
		isVisible = true;
	});
</script>

<section id="works" bind:this={worksElement} class="py-20 lg:py-32 px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-1">
			<SectionTitle
				title="Informações do casamento"
				class="text-5xl md:text-6xl lg:text-7xl"
				{isVisible}
			/>
			<AnimatedText
				content="Tudo que você precisa saber sobre o nosso grande dia"
				delay={300}
				{isVisible}
				class="text-2xl md:text-3xl text-gray-600"
				tag="p"
			/>
		</div>

		<!-- Projects Grid - Matching original layout -->
		<div class="relative">
			<!-- Remaining projects in a grid below -->
			<div class=" relative mt-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
				{#each weddingInfo as project}
					<ProjectCard
						name={project.name}
						description={project.description}
						year={project.year}
						image={project.image}
					/>
				{/each}
			</div>
		</div>

		<!-- Coming Soon Note -->
		<ComingSoonNote
			message="Novas informações estão chegando,"
			highlight="lentamente mas certamente"
			emoji="😅"
			delay={1000}
			{isVisible}
		/>
	</div>
</section>
