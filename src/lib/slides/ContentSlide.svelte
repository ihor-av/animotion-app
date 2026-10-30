<script lang="ts">
	import type { Snippet } from 'svelte';
	import SlideFrame from './SlideFrame.svelte';

	type Props = {
		title: string;
		eyebrow?: string;
		lead?: string;
		source?: string;
		slideNumber?: string;
		footerLeft?: string;
		footerCenter?: string;
		class?: string;
		children: Snippet;
		aside?: Snippet;
	};

	let {
		title,
		eyebrow,
		lead,
		source,
		slideNumber,
		footerLeft,
		footerCenter,
		class: className = '',
		children,
		aside
	}: Props = $props();
</script>

<SlideFrame
	variant="light"
	header="band"
	{slideNumber}
	{footerLeft}
	{footerCenter}
	class="content-slide {className}"
>
	<div class="content-stage">
		<header class="content-head">
			{#if eyebrow}
				<p class="slide-eyebrow eyebrow">{eyebrow}</p>
			{/if}
			<h2>{title}</h2>
			{#if lead}
				<p class="lead">{lead}</p>
			{/if}
		</header>

		<div class="content-grid" data-has-aside={Boolean(aside)}>
			<div class="content-main">
				{@render children()}
			</div>
			{#if aside}
				<aside>
					{@render aside()}
				</aside>
			{/if}
		</div>

		{#if source}
			<p class="source">{source}</p>
		{/if}
	</div>
</SlideFrame>

<style>
	.content-stage {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
	}

	.content-head {
		flex: none;
		max-width: 66rem;
		padding-left: 1.5rem;
		border-left: 0.35rem solid var(--template-red);
	}

	.eyebrow {
		margin-bottom: 0.55rem;
		color: var(--template-blue);
	}

	h2 {
		max-width: 28ch;
		font-size: 2.5rem;
		line-height: 1.02;
		text-transform: uppercase;
	}

	.lead {
		max-width: 65ch;
		margin-top: 0.85rem;
		color: var(--template-gray);
		font-size: 1.15rem;
		line-height: 1.48;
	}

	.content-grid {
		display: grid;
		flex: 1;
		grid-template-columns: minmax(0, 1fr);
		gap: 2rem;
		min-height: 0;
		margin-top: 1.55rem;
	}

	.content-grid[data-has-aside='true'] {
		grid-template-columns: minmax(0, 1.55fr) minmax(15rem, 0.8fr);
	}

	.content-main {
		min-width: 0;
		min-height: 0;
		overflow: hidden;
	}

	aside {
		min-width: 0;
		min-height: 0;
		padding-left: 2rem;
		border-left: 1px solid var(--slide-line);
	}

	.source {
		flex: none;
		margin-top: 1rem;
		padding-top: 0.6rem;
		border-top: 1px solid var(--slide-line);
		color: var(--slide-muted);
		font-size: 0.68rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		line-height: 1.35;
		text-transform: uppercase;
	}
</style>
