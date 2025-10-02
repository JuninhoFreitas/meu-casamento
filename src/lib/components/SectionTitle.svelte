<script lang="ts">
	interface Props {
		title: string;
		delay?: number;
		isVisible: boolean;
		class?: string;
	}

	let { title, delay = 0, isVisible, class: className = '' }: Props = $props();
</script>

<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 transform transition-all duration-1000 delay-{delay} {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} {className}">
	{title}
</h2>
