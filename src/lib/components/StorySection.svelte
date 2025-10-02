<script lang="ts">
	import QuoteCard from './QuoteCard.svelte';

	interface Props {
		title: string;
		joaoContent: string;
		gabrielleContent: string;
		delay: number;
		isVisible: boolean;
	}

	let { title, joaoContent, gabrielleContent, delay, isVisible }: Props = $props();
</script>

<div>
	<p class="transform transition-all duration-1000 delay-300 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} mb-6">
		<strong>{title}</strong>
	</p>

	<div class="flex flex-row justify-between gap-5">
		<QuoteCard
			content={joaoContent}
			author="João"
			delay={delay}
			{isVisible}
		/>
		<QuoteCard
			content={gabrielleContent}
			author="Gabrielle"
			delay={delay}
			{isVisible}
		/>
	</div>
</div>
