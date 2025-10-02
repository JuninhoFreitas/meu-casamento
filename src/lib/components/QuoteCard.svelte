<script lang="ts">
	interface Props {
		content: string;
		author: string;
		delay: number;
		isVisible: boolean;
	}

	let { content, author, delay, isVisible }: Props = $props();
</script>

<blockquote class="w-1/2 transform transition-all duration-1000 delay-{delay} {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} p-6 bg-white rounded-lg shadow-sm border-l-4 border-accent italic">
	<p class="text-gray-700 font-light">
		{content}
	</p>
	<footer class="mt-4 text-sm text-gray-600 font-medium">— {author}</footer>
</blockquote>
