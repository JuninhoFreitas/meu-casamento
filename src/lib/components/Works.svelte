<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'animejs';

	let worksElement = $state<HTMLElement>();
	let isVisible = $state(false);

	const weddingInfo = [
		{
			name: 'Local da Cerimônia',
			description: 'Palavra da Vida - Morungava, Gravataí - RS, Brasil',
			year: '18/10/2025',
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
		<div class="text-center mb-20">
			<h2 class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				Informações do casamento
			</h2>
			<p class="text-2xl md:text-3xl text-gray-600 transform transition-all duration-1000 delay-300 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				Tudo que você precisa saber sobre o nosso grande dia
			</p>
		</div>

		<!-- Projects Grid - Matching original layout -->
		<div class="relative">
			<!-- Remaining projects in a grid below -->
			<div class=" relative mt-96 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
				{#each weddingInfo as project, index}
					<div class="group hvr-grow-rotate cursor-pointer">
						<div class=" relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:shadow-2xl hover:border-accent/30  duration-500 group-hover:scale-[1.02]">
							<!-- Project Image -->
							<div class="relative h-64 overflow-hidden">
								<img
									src={project.image}
									alt={project.name}
									class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
									loading="lazy"
								/>
								<!-- Overlay on hover -->
								<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

								<!-- Project Info Overlay -->
								<div class="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
									<h3 class="text-xl font-bold mb-1">{project.name}</h3>
									<p class="text-sm opacity-90 mb-2">{project.description}</p>
								</div>
							</div>

							<!-- Bottom Info -->
							<div class="p-4 border-t border-gray-100">
								<div class="flex justify-between items-center">
									<div>
										<h3 class="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
										<p class="text-gray-600 text-sm">{project.description}</p>
									</div>
									<span class="text-gray-500 text-sm font-medium">{project.year}</span>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Coming Soon Note -->
		<div class="text-center mt-16 transform transition-all duration-1000 delay-1000 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
			<p class="text-xl text-gray-600">
				Novas informações estão chegando,
				<strong class="text-accent">lentamente mas certamente</strong>
				<span class="ml-2">😅</span>
			</p>
		</div>
	</div>
</section>
