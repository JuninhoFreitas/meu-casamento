<script lang="ts">
	interface Props {
		text: string;
		reference: string;
		delay?: number;
		isVisible: boolean;
		class?: string;
	}

	let { text, reference, delay = 0, isVisible, class: className = '' }: Props = $props();
</script>

<div class="mt-16 p-8 bg-gray-100 rounded-2xl border border-gray-200 text-center">
	<blockquote class="text-xl md:text-2xl text-gray-900 italic leading-relaxed transform transition-all duration-1000 delay-{delay} {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} {className}">
		{text}<br>
		<span class="text-lg">{reference}</span>
	</blockquote>
</div>
