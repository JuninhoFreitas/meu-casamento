<script lang="ts">
	const socialLinks = [
		{
			name: 'Insights',
			url: 'https://x.com/danielsun_ui',
			icon: '𝕏',
			position: 'top-20 left-8'
		},
		{
			name: 'Social',
			url: 'https://www.instagram.com/daniel.sun_design',
			icon: '📷',
			position: 'top-32 left-8'
		},
		{
			name: 'Design',
			url: 'https://dribbble.com/daniel_sun',
			icon: '🎨',
			position: 'top-44 left-8'
		},
		{
			name: 'Youth',
			url: 'https://www.threads.net/@daniel.sun_design',
			icon: '🧵',
			position: 'top-56 left-8'
		},
		{
			name: 'Nerdville',
			url: 'https://www.linkedin.com/in/daniel-sun-47838b209/',
			icon: '💼',
			position: 'top-68 left-8'
		}
	];
</script>

<div class="fixed left-0 top-0 z-40 hidden lg:block">
	{#each socialLinks as link}
		<a
			href={link.url}
			target="_blank"
			rel="noopener noreferrer"
			class="absolute {link.position} transform -rotate-3 hover:rotate-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-3 hover:bg-white group shadow-lg"
		>
			<div class="flex items-center space-x-2">
				<span class="text-lg">{link.icon}</span>
				<span class="text-xs text-gray-700 group-hover:text-accent transition-colors">
					{link.name}
				</span>
			</div>
		</a>
	{/each}
</div>

<!-- Mobile Social Links -->
<!-- <div class="fixed bottom-4 right-4 z-40 lg:hidden">
	<div class="flex flex-col space-y-2">
		{#each socialLinks as link}
			<a
				href={link.url}
				target="_blank"
				rel="noopener noreferrer"
				class="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-3 hover:bg-white transition-colors group shadow-lg"
			>
				<span class="text-sm">{link.icon}</span>
			</a>
		{/each}
	</div>
</div> -->
