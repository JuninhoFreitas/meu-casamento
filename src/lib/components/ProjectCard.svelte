<script lang="ts">
	interface Props {
		name: string;
		description: string;
		year: string;
		image: string;
	}

	let { name, description, year, image }: Props = $props();
</script>

<div class="group hvr-grow-rotate cursor-pointer">
	<div class="relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:shadow-2xl hover:border-accent/30 duration-300 group-hover:scale-[1.02]">
		<!-- Project Image -->
		<div class="relative h-64 overflow-hidden">
			<img
				src={image}
				alt={name}
				class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
				loading="lazy"
			/>
			<!-- Overlay on hover -->
			<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

			<!-- Project Info Overlay -->
			<div class="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
				<h3 class="text-xl font-bold mb-1">{name}</h3>
				<p class="text-sm opacity-90 mb-2">{description}</p>
			</div>
		</div>

		<!-- Bottom Info -->
		<div class="p-4 border-t border-gray-100">
			<div class="flex justify-between items-center">
				<div>
					<h3 class="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
					<p class="text-gray-600 text-sm">{description}</p>
				</div>
				<span class="text-gray-500 text-sm font-medium">{year}</span>
			</div>
		</div>
	</div>
</div>
