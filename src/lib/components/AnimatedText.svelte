<script lang="ts">
	interface Props {
		content: string;
		delay?: number;
		duration?: number;
		class?: string;
		tag?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		isVisible: boolean;
	}

	let {
		content,
		delay = 0,
		duration = 1000,
		class: className = '',
		tag = 'span',
		isVisible
	}: Props = $props();
</script>

<svelte:element this={tag} class="inline-block {className}" class:animate-fade-in={isVisible} style="animation-delay: {delay}ms; animation-duration: {duration}ms; animation-fill-mode: both;">
	{content}
</svelte:element>
