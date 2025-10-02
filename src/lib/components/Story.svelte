<script lang="ts">
	import { onMount } from 'svelte';

	let storyElement = $state<HTMLElement>();
	let isVisible = $state(false);

	const experiences = [
		{ company: 'Halo Lab', role: 'Design Partner' },
		{ company: 'Heartbeat', role: 'Creative Director' },
		{ company: 'Ooze', role: 'Brand Designer' },
		{ company: 'O0 design', role: 'Senior Designer' },
		{ company: 'Clerk', role: 'Product Designer' }
	];

	onMount(() => {
		isVisible = true;
	});
</script>

<section id="story" bind:this={storyElement} class="py-20 lg:py-32 px-6 lg:px-8 bg-gray-900/30">
	<div class="max-w-4xl mx-auto">
		<!-- Section Header -->
		<div class="mb-16">
			<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 transform transition-all duration-1000 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				Every experience in my life is important and has taught me a lot
			</h2>
		</div>

		<!-- Story Content -->
		<div class="space-y-8 text-lg md:text-xl text-gray-300 leading-relaxed">
			<p class="transform transition-all duration-1000 delay-300 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				Growing up in Ukraine, my journey into design started… on the streets =) As a teen, art and graffiti sparked my visual storytelling passion, architecture degree gave me foundation, and digital design showed new creative depths.
			</p>

			<p class="transform transition-all duration-1000 delay-500 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				Five years later, my wife and I moved to Porto. Here, with the ocean breeze, I craft web and brand solutions for tech companies to shine.
			</p>

			<p class="transform transition-all duration-1000 delay-700 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				I partner up with dynamic founders reinventing tomorrow, from YC startups to enterprises and bootstrapped guys.
			</p>
		</div>

		<!-- Mission Statement -->
		<div class="mt-16 p-8 bg-white/5 rounded-2xl border border-white/10">
			<blockquote class="text-xl md:text-2xl text-white italic leading-relaxed transform transition-all duration-1000 delay-900 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				"My mission: to craft unique, consistent, mature identities for SaaS and Web3 products, boosting user engagement, investor confidence, revenue, and industry respect — a design others will benchmark."
			</blockquote>
		</div>

		<!-- Experience Timeline -->
		<div class="mt-16">
			<h3 class="text-2xl md:text-3xl font-semibold text-white mb-8 transform transition-all duration-1000 delay-1100 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				What my perfect collab looks like
			</h3>

			<div class="grid gap-4 md:gap-6">
				{#each experiences as experience, index}
					<div class="flex items-center space-x-4 p-4 bg-black/30 rounded-lg border border-white/5 transform transition-all duration-1000 delay-{1300 + index * 100} {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
						<div class="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
						<div>
							<div class="font-semibold text-white">{experience.company}</div>
							<div class="text-gray-400">{experience.role}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Secret Message -->
		<div class="mt-16 text-center">
			<p class="text-2xl md:text-3xl font-light text-gray-400 transform transition-all duration-1000 delay-1500 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				I don't have dark secrets, only bright ones
			</p>
		</div>
	</div>
</section>
