<script lang="ts">
	interface Props {
		message: string;
		highlight?: string;
		emoji?: string;
		delay?: number;
		isVisible: boolean;
	}

	let { message, highlight, emoji, delay = 0, isVisible }: Props = $props();
</script>

<div class="text-center mt-16 transform transition-all duration-1000 delay-{delay} {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
	<p class="text-xl text-gray-600">
		{message}
		{#if highlight}
			<strong class="text-accent">{highlight}</strong>
		{/if}
		{#if emoji}
			<span class="ml-2">{emoji}</span>
		{/if}
	</p>
</div>
