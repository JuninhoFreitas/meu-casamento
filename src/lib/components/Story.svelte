<script lang="ts">
	import { onMount } from 'svelte';
	import SectionTitle from './SectionTitle.svelte';
	import StorySection from './StorySection.svelte';
	import BibleQuote from './BibleQuote.svelte';

	let storyElement = $state<HTMLElement>();
	let isVisible = $state(true);


	onMount(() => {
		isVisible = true;
	});
</script>

<section id="story" bind:this={storyElement} class="py-20 lg:py-32 px-6 lg:px-8 bg-gray-50">
	<div class="max-w-4xl mx-auto">
		<!-- Section Header -->
		<div class="mb-16">
			<SectionTitle
				title="Nossa história de amor"
				{isVisible}
			/>
		</div>

		<!-- Story Content -->
		<div class="space-y-11 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
			<StorySection
				title="Dia que nos conhecemos - 16 Setembro de 2024"
				joaoContent="Dia 16 de setembro de 2024, nos encontramos pela primeira vez. Naquele dia, eu retornava de uma missão no Amazonas onde fomos ensinar sobre aconselhamento bíblico para os Ribeirinhos."
				gabrielleContent="Eu estava vindo do Maranhão, onde morava após concluir a faculdade de medicina. Foi na Conferência de Aconselhamento Bíblico em Atibaia que nossos caminhos se cruzaram."
				delay={500}
				{isVisible}
			/>

			<StorySection
				title="Começo da Amizade - 19 Setembro de 2024"
				joaoContent="Começamos a conversar mais frequentemente sobre ministério e vida. Logo percebi que tínhamos muito em comum em nossa visão de vida e serviço."
				gabrielleContent="Nossa amizade cresceu naturalmente, compartilhando experiências de ministério e sonhos para o futuro."
				delay={600}
				{isVisible}
			/>

			<StorySection
				title="Começo do Namoro - 21 de Outubro de 2024"
				joaoContent="Após meses de oração e aconselhamento, decidimos iniciar um relacionamento com propósito de casamento."
				gabrielleContent="Foi um momento especial quando decidimos dar esse passo juntos, confiando na direção de Deus."
				delay={700}
				{isVisible}
			/>

			<StorySection
				title="Pedido de Casamento - 18 de Maio de 2025"
				joaoContent="Planejei cada detalhe do pedido, querendo tornar esse momento inesquecível para nós dois."
				gabrielleContent="Foi uma surpresa maravilhosa! Mal posso esperar para começar nossa vida juntos."
				delay={800}
				{isVisible}
			/>

			<StorySection
				title="Casamento - 07 de Março de 2026"
				joaoContent="..."
				gabrielleContent="..."
				delay={900}
				{isVisible}
			/>
		</div>

		<!-- Bible Quote -->
		<BibleQuote
			text="Dêem graças ao Senhor, porque Ele é bom"
			reference="Salmos 136.1a"
			delay={1500}
			{isVisible}
		/>
	</div>
</section>
