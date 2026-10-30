<script lang="ts">
	import type { Snippet } from 'svelte';
	import SlideFrame from './SlideFrame.svelte';
	import {
		formatCriterionNumber,
		rubricSection,
		type RubricNumber
	} from './rubric';

	type Props = {
		number: RubricNumber;
		title?: string;
		summary?: string;
		slideNumber?: string;
		footerLeft?: string;
		footerCenter?: string;
		class?: string;
		children?: Snippet;
	};

	let {
		number,
		title,
		summary,
		slideNumber,
		footerLeft,
		footerCenter,
		class: className = '',
		children
	}: Props = $props();

	const section = $derived(rubricSection(number));
	const displayTitle = $derived(title ?? section.title);
	const displayFooter = $derived(footerCenter ?? `Критерій ${number} з 8`);
	const displayNumber = $derived(formatCriterionNumber(number));
</script>

<SlideFrame
	variant="light"
	header="band"
	{slideNumber}
	{footerLeft}
	footerCenter={displayFooter}
	class="section-slide {className}"
>
	<div class="section-stage">
		<div class="section-marker" aria-hidden="true">
			<span class="section-number">{displayNumber}</span>
			<span class="section-of">/ 08</span>
			<span class="section-rule"></span>
		</div>

		<div class="section-copy">
			<p class="slide-eyebrow eyebrow">Критерій {displayNumber} · 8</p>
			<h2>{displayTitle}</h2>
			{#if summary}
				<p class="summary">{summary}</p>
			{/if}
			{#if children}
				<div class="section-extra">
					{@render children()}
				</div>
			{/if}
		</div>
	</div>
</SlideFrame>

<style>
	.section-stage {
		display: grid;
		flex: 1;
		grid-template-columns: 10rem minmax(0, 1fr);
		gap: 3rem;
		align-items: start;
		min-height: 0;
		padding-top: 0.25rem;
	}

	.section-marker {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.section-number {
		color: var(--template-coral);
		font-family: var(--font-display);
		font-size: 10rem;
		font-weight: 700;
		letter-spacing: -0.07em;
		line-height: 0.72;
	}

	.section-of {
		margin-top: 0.45rem;
		margin-left: 0.35rem;
		color: var(--template-gray);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}

	.section-rule {
		width: 5rem;
		height: 0.35rem;
		margin-top: 1.2rem;
		margin-left: 0.35rem;
		background: var(--template-red);
	}

	.section-copy {
		min-width: 0;
		padding-top: 0.35rem;
	}

	.eyebrow {
		margin-bottom: 0.9rem;
		color: var(--template-blue);
	}

	h2 {
		max-width: 24ch;
		font-size: 2.5rem;
		line-height: 1.02;
		text-transform: uppercase;
	}

	.summary {
		max-width: 58ch;
		margin-top: 1.25rem;
		color: var(--template-gray);
		font-size: 1.2rem;
		line-height: 1.5;
	}

	.section-extra {
		margin-top: 1.75rem;
	}
</style>
