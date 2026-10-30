<script lang="ts">
	import type { Snippet } from 'svelte';
	import SlideFrame from './SlideFrame.svelte';

	type MetaItem = {
		label: string;
		value: string;
	};

	type Props = {
		title: string;
		subtitle?: string;
		eyebrow?: string;
		meta?: MetaItem[];
		slideNumber?: string;
		footerLeft?: string;
		footerCenter?: string;
		class?: string;
		children?: Snippet;
	};

	let {
		title,
		subtitle,
		eyebrow,
		meta = [],
		slideNumber,
		footerLeft,
		footerCenter,
		class: className = '',
		children
	}: Props = $props();
</script>

<SlideFrame
	variant="dark"
	header="full"
	{footerLeft}
	{footerCenter}
	{slideNumber}
	class="title-slide {className}"
>
	<div class="title-stage">
		<div class="title-plate">
			{#if eyebrow}
				<p class="slide-eyebrow eyebrow">{eyebrow}</p>
			{/if}

			<h1>{title}</h1>

			{#if subtitle}
				<p class="subtitle">{subtitle}</p>
			{/if}

			{#if meta.length > 0}
				<dl class="meta">
					{#each meta as item}
						<div>
							<dt>{item.label}</dt>
							<dd>{item.value}</dd>
						</div>
					{/each}
				</dl>
			{/if}

			{#if children}
				<div class="title-extra">
					{@render children()}
				</div>
			{/if}
		</div>
	</div>
</SlideFrame>

<style>
	.title-stage {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		min-height: 0;
		padding: 1.5rem 5rem 1rem;
	}

	.title-plate {
		position: relative;
		width: min(66rem, 100%);
		padding: 2rem 3rem 1.75rem;
		border-top: 0.5rem solid var(--template-red);
		background: var(--template-white);
		box-shadow: 0.75rem 0.75rem 0 var(--template-coral);
		color: var(--template-black);
	}

	.title-plate::after {
		position: absolute;
		top: 0;
		right: 0;
		width: 0.5rem;
		height: 4.5rem;
		background: var(--template-blue);
		content: '';
	}

	.eyebrow {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 1rem;
		color: var(--template-blue);
	}

	.eyebrow::before {
		width: 0.55rem;
		height: 0.55rem;
		background: var(--template-red);
		content: '';
	}

	h1 {
		max-width: 24ch;
		font-size: 3.2rem;
		font-weight: 700;
		letter-spacing: -0.025em;
		line-height: 0.98;
		text-transform: uppercase;
	}

	.subtitle {
		max-width: 58ch;
		margin-top: 0.9rem;
		color: var(--template-gray);
		font-size: 1.18rem;
		font-style: italic;
		line-height: 1.4;
	}

	.meta {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.25rem;
		margin-top: 1.3rem;
		padding-top: 0.9rem;
		border-top: 1px solid var(--template-line);
	}

	.meta div {
		min-width: 0;
		padding-left: 1rem;
		border-left: 1px solid var(--template-line);
	}

	.meta div:first-child {
		padding-left: 0;
		border-left: 0;
	}

	dt {
		color: var(--template-gray);
		font-size: 0.62rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		line-height: 1.3;
		text-transform: uppercase;
	}

	dd {
		margin-top: 0.3rem;
		font-size: 0.88rem;
		font-weight: 500;
		line-height: 1.35;
	}

	.title-extra {
		margin-top: 1.5rem;
	}
</style>
