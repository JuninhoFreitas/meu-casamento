<script lang="ts">
	import { onMount } from 'svelte';
	import SectionTitle from './SectionTitle.svelte';
	import AnimatedText from './AnimatedText.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import ComingSoonNote from './ComingSoonNote.svelte';

	let worksElement = $state<HTMLElement>();
	let isVisible = $state(false);

	const weddingInfo = [
		{
			name: 'Local da Cerimônia',
			description: 'Igreja Bíblica Unidos no Senhor, Novo Hamburgo - RS, Brasil',
			year: '07/03/2026',
			tags: ['Cerimônia', 'Recepção', '15:00'],
			image: 'https://lh3.googleusercontent.com/p/AF1QipOtsf-qlFgrL3FLYZ0YbB73htqZcc6H4F0dRjU'
		},
		{
			name: 'Hospedagem',
			description: 'Vamos disponibilizar um guia para hospedagens',
			year: 'R$?/noite',
			tags: ['Acomodação', 'Perto do local', 'Reservas até 10/09'],
			image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/61301210.jpg?k=f624f9e96da242bf0dd7e9f0a2fc258db0d9f40f316e904ec14e231959154a98&o=&hp=1'
		},
		{
			name: 'Lista de Presentes',
			description: 'Sugestões de presentes para compartilhar nossa felicidade',
			year: 'Monetário preferido',
			tags: ['Presentes', 'PIX disponível', 'Contato direto'],
			image: 'https://www.meupositivo.com.br/doseujeito/wp-content/uploads/2021/12/7-sites-para-fazer-lista-de-casamento-online-capa.jpg'
		},
		{
			name: 'Confirmação de Presença',
			description: 'Ajude-nos a organizar melhor o evento confirmando sua presença',
			year: 'RSVP',
			tags: ['Presença', 'Organização', 'Contato conosco'],
			image: 'https://i.imgur.com/YiK2AKy.png'
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
