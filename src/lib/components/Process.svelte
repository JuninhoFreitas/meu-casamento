<script lang="ts">
	import { onMount } from 'svelte';

	let processElement = $state<HTMLElement>();
	let isVisible = $state(false);

	const processSteps = [
		{
			step: '01',
			title: 'Discovery',
			description: 'We dive deep into your business, understanding your goals, target audience, and unique value proposition.'
		},
		{
			step: '02',
			title: 'Strategy',
			description: 'Based on research, we craft a comprehensive design strategy that aligns with your business objectives.'
		},
		{
			step: '03',
			title: 'Design',
			description: 'We create beautiful, functional designs that capture your brand essence and resonate with users.'
		},
		{
			step: '04',
			title: 'Development',
			description: 'Our expert developers bring designs to life with clean, scalable code and seamless user experiences.'
		},
		{
			step: '05',
			title: 'Launch',
			description: 'We ensure a smooth launch and provide ongoing support to help your product succeed in the market.'
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
			<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 transform transition-all duration-1000 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				What my perfect collab looks like
			</h2>
			<p class="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto transform transition-all duration-1000 delay-300 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
				Tap this 'tiny' button to highlight your product =)
			</p>
		</div>

		<!-- Process Steps -->
		<div class="grid gap-8 md:gap-12">
			{#each processSteps as step, index}
				<div class="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8 transform transition-all duration-1000 delay-{500 + index * 200} {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}">
					<!-- Step Number -->
					<div class="flex-shrink-0">
						<div class="w-16 h-16 bg-yellow-400 text-black rounded-full flex items-center justify-center text-xl font-bold">
							{step.step}
						</div>
					</div>

					<!-- Step Content -->
					<div class="flex-1">
						<h3 class="text-2xl md:text-3xl font-semibold text-white mb-4">
							{step.title}
						</h3>
						<p class="text-lg text-gray-300 leading-relaxed">
							{step.description}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- CTA Section -->
		<div class="mt-16 text-center transform transition-all duration-1000 delay-1500 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
			<div class="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 rounded-2xl p-8 border border-yellow-400/20">
				<h3 class="text-2xl md:text-3xl font-semibold text-white mb-4">
					Ready to start your project?
				</h3>
				<p class="text-lg text-gray-300 mb-6">
					Let's create something amazing together. Every great product starts with a conversation.
				</p>
				<a
					href="mailto:hello@danielsun.space"
					class="inline-flex items-center px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
				>
					Get in touch
					<svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>
