<script lang="ts">
	import { onMount } from 'svelte';

	let worksElement = $state<HTMLElement>();
	let isVisible = $state(false);

	const projects = [
		{
			name: 'Ruby',
			description: 'Branding, Web design, Development',
			year: '2024',
			tags: ['Brand Identity', 'Web Design', 'Development']
		},
		{
			name: 'Stimulate',
			description: 'Branding, Web design, Illustrations, Development',
			year: '2024',
			tags: ['Brand Identity', 'Web Design', 'Illustration', 'Development']
		},
		{
			name: 'Caldera',
			description: 'Web design, development',
			year: '2023',
			tags: ['Web Design', 'Development']
		},
		{
			name: 'Reward Point',
			description: 'Web design, Illustrations',
			year: '2023',
			tags: ['Web Design', 'Illustration']
		},
		{
			name: 'Memex',
			description: 'Brand & product refresh, Web design',
			year: '2023',
			tags: ['Brand Refresh', 'Product Design', 'Web Design']
		},
		{
			name: 'Pix AI',
			description: 'Branding, Illustrations',
			year: '2023',
			tags: ['Brand Identity', 'Illustration']
		},
		{
			name: 'Polpis Systems',
			description: 'Web design, Visual direction',
			year: '2022',
			tags: ['Web Design', 'Visual Direction']
		},
		{
			name: 'Quantia',
			description: 'Web design, Visual direction, Illustrations',
			year: '2022',
			tags: ['Web Design', 'Visual Direction', 'Illustration']
		},
		{
			name: 'Hily',
			description: 'Branding, visual direction',
			year: '2022',
			tags: ['Brand Identity', 'Visual Direction']
		},
		{
			name: 'Deepengine',
			description: 'Web design, Visual direction, Illustrations',
			year: '2021',
			tags: ['Web Design', 'Visual Direction', 'Illustration']
		}
	];

	onMount(() => {
		isVisible = true;
	});
</script>

<section id="works" bind:this={worksElement} class="py-20 lg:py-32 px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 transform transition-all duration-1000 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				My latest work
			</h2>
			<p class="text-xl md:text-2xl text-gray-400 transform transition-all duration-1000 delay-300 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				from 2020 'til today
			</p>
		</div>

		<!-- Projects Grid -->
		<div class="grid gap-8 md:gap-12">
			{#each projects as project, index}
				<div class="group cursor-pointer transform transition-all duration-1000 delay-{300 + index * 100} {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}">
					<div class="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-white/10 hover:border-yellow-400/50 transition-colors">
						<div class="flex-1">
							<h3 class="text-2xl md:text-3xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
								{project.name}
							</h3>
							<p class="text-gray-400 text-lg mb-2">
								{project.description}
							</p>
							<div class="flex flex-wrap gap-2">
								{#each project.tags as tag}
									<span class="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10">
										{tag}
									</span>
								{/each}
							</div>
						</div>
						<div class="mt-4 md:mt-0 md:ml-8">
							<span class="text-gray-500 text-lg">{project.year}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Coming Soon Note -->
		<div class="text-center mt-16 transform transition-all duration-1000 delay-1000 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
			<p class="text-xl text-gray-400">
				New cases are on the way,
				<strong class="text-yellow-400">slowly but surely</strong>
				<span class="ml-2">😅</span>
			</p>
		</div>
	</div>
</section>
