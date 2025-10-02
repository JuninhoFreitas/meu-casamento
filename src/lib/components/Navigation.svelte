<script lang="ts">
	import { onMount } from 'svelte';

	let isMenuOpen = $state(false);
	let activeSection = $state('hero');

	const sections = [
		{ id: 'works', label: 'Work' },
		{ id: 'story', label: 'Story' },
		{ id: 'process', label: 'Process' },
		{ id: 'connect', label: 'Connect' }
	];

	function scrollToSection(sectionId: string) {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
		isMenuOpen = false;
	}

	function handleScroll() {
		const scrollPosition = window.scrollY + 100;

		for (const section of sections) {
			const element = document.getElementById(section.id);
			if (element) {
				const { offsetTop, offsetHeight } = element;
				if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
					activeSection = section.id;
					break;
				}
			}
		}
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<!-- Desktop Navigation -->
<nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<button
					onclick={() => scrollToSection('hero')}
					class="text-gray-900 hover:text-accent transition-colors font-medium"
				>
					Daniel Sun
				</button>
			</div>

			<!-- Desktop Menu -->
			<div class="hidden md:block">
				<div class="ml-10 flex items-baseline space-x-8">
					{#each sections as section}
						<button
							onclick={() => scrollToSection(section.id)}
							class="px-3 py-2 text-sm font-medium transition-colors duration-200 {activeSection === section.id
								? 'text-accent'
								: 'text-gray-700 hover:text-accent'}"
						>
							{section.label}
						</button>
					{/each}
				</div>
			</div>

			<!-- CTA Button -->
			<div class="hidden md:block">
				<a
					href="mailto:hello@danielsun.space"
					class="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
				>
					Start project
				</a>
			</div>

			<!-- Mobile menu button -->
			<div class="md:hidden">
				<button
					onclick={() => isMenuOpen = !isMenuOpen}
					class="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
				>
					<span class="sr-only">Open main menu</span>
					{#if isMenuOpen}
						<svg class="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<svg class="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="md:hidden">
			<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
				{#each sections as section}
					<button
						onclick={() => scrollToSection(section.id)}
						class="block px-3 py-2 text-base font-medium w-full text-left transition-colors {activeSection === section.id
							? 'text-accent bg-accent/10'
							: 'text-gray-700 hover:text-accent hover:bg-gray-100'}"
					>
						{section.label}
					</button>
				{/each}
				<a
					href="mailto:hello@danielsun.space"
					class="block px-3 py-2 text-base font-medium text-yellow-400 hover:text-yellow-300"
				>
					Start project
				</a>
			</div>
		</div>
	{/if}
</nav>
