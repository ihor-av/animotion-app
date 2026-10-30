<script lang="ts">
	import type { Snippet } from 'svelte';
	import SlideFrame from './SlideFrame.svelte';

	type Metric = {
		label: string;
		value: string;
		hint?: string;
	};

	type Props = {
		title: string;
		eyebrow?: string;
		lead?: string;
		metrics: Metric[];
		columns?: 2 | 3 | 4;
		source?: string;
		slideNumber?: string;
		footerLeft?: string;
		footerCenter?: string;
		class?: string;
		children?: Snippet;
	};

	let {
		title,
		eyebrow,
		lead,
		metrics,
		columns = 3,
		source,
		slideNumber,
		footerLeft,
		footerCenter,
		class: className = '',
		children
	}: Props = $props();
</script>

<SlideFrame
	variant="light"
	header="band"
	{slideNumber}
	{footerLeft}
	{footerCenter}
	class="metric-slide {className}"
>
	<div class="metric-stage">
		<header class="metric-head">
			{#if eyebrow}
				<p class="slide-eyebrow eyebrow">{eyebrow}</p>
			{/if}
			<h2>{title}</h2>
			{#if lead}
				<p class="lead">{lead}</p>
			{/if}
		</header>

		<div class="metric-grid" data-columns={columns}>
			{#each metrics as metric}
				<article class="metric">
					<p class="metric-label">{metric.label}</p>
					<p class="metric-value">{metric.value}</p>
					{#if metric.hint}
						<p class="metric-hint">{metric.hint}</p>
					{/if}
				</article>
			{/each}
		</div>

		{#if children}
			<div class="metric-extra">
				{@render children()}
			</div>
		{/if}

		{#if source}
			<p class="source">{source}</p>
		{/if}
	</div>
</SlideFrame>

<style>
	.metric-stage {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
	}

	.metric-head {
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

	.metric-grid {
		display: grid;
		flex: none;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 1.65rem;
	}

	.metric-grid[data-columns='2'] {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.metric-grid[data-columns='4'] {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}

	.metric {
		display: flex;
		flex-direction: column;
		min-width: 0;
		padding: 1.2rem 1.3rem 1.1rem;
		border: 1px solid var(--slide-line);
		border-top: 0.3rem solid var(--template-red);
		background: var(--slide-bg);
	}

	.metric-label {
		color: var(--slide-muted);
		font-size: 0.66rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		line-height: 1.35;
		text-transform: uppercase;
	}

	.metric-value {
		margin-top: 0.55rem;
		color: var(--slide-fg);
		font-family: var(--font-display);
		font-size: 2.35rem;
		font-weight: 700;
		letter-spacing: -0.04em;
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	.metric-hint {
		margin-top: 0.55rem;
		color: var(--slide-muted);
		font-size: 0.86rem;
		line-height: 1.4;
	}

	.metric-extra {
		min-height: 0;
		margin-top: 1.3rem;
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
