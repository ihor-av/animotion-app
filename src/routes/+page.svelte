<script lang="ts">
	import { Presentation, Slide } from '@animotion/core';
</script>

<svelte:head>
	<title>Finance data visualization</title>
	<meta
		name="description"
		content="Finance data visualization slides and charts for Chernivtsi open data, built with Svelte and Animotion."
	/>
</svelte:head>

<Presentation options={{ controls: false, progress: false, transition: 'fade' }}>
	<Slide class="h-full place-content-center place-items-center">
		<h1 class="text-9xl font-semibold tracking-[-0.05em]">Hello world</h1>
	</Slide>

	<Slide class="h-full place-content-center place-items-center">
		<div class="max-w-3xl text-center">
			<h2 class="text-5xl font-semibold tracking-[-0.03em]">About the data</h2>
			<p class="mt-6 text-2xl leading-relaxed opacity-80">
				This deck uses Chernivtsi open data served from Cloudflare D1.
			</p>
		</div>
	</Slide>
</Presentation>
