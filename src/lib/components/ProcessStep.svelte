<script lang="ts">
	interface Props {
		step: string;
		title: string;
		description: string;
		delay: number;
		isVisible: boolean;
	}

	let { step, title, description, delay, isVisible }: Props = $props();
</script>

<div class="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8 transform transition-all duration-1000 delay-{delay} {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}">
	<!-- Step Number -->
	<div class="flex-shrink-0">
		<div class="w-16 h-16 bg-accent text-black rounded-full flex items-center justify-center text-xl font-bold">
			{step}
		</div>
	</div>

	<!-- Step Content -->
	<div class="flex-1">
		<h3 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
			{title}
		</h3>
		<p class="text-lg text-gray-700 leading-relaxed">
			{description}
		</p>
	</div>
</div>
