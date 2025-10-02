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

<svelte:element this={tag} class="inline-block transform transition-all duration-{duration} delay-{delay} {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} {className}">
	{content}
</svelte:element>
