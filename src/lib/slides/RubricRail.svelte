<script lang="ts">
	import { rubricSections, type RubricNumber } from './rubric';

	type Props = {
		active?: RubricNumber;
		compact?: boolean;
		class?: string;
	};

	let { active, compact = false, class: className = '' }: Props = $props();
</script>

<ol class="rubric-rail {className}" data-compact={compact} aria-label="Порядок оцінювання">
	{#each rubricSections as section}
		<li data-active={section.number === active}>
			<span class="number">{String(section.number).padStart(2, '0')}</span>
			<span class="label">{section.short}</span>
		</li>
	{/each}
</ol>

<style>
	.rubric-rail {
		display: grid;
		grid-template-columns: repeat(8, minmax(0, 1fr));
		gap: 0;
		margin: 0;
		padding: 0;
		list-style: none;
		border-top: 2px solid var(--slide-fg, var(--template-black));
		border-bottom: 1px solid var(--slide-line, var(--template-line));
	}

	li {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		min-width: 0;
		padding: 0.7rem 0.65rem 0.65rem;
		border-left: 1px solid var(--slide-line, var(--template-line));
	}

	li:first-child {
		border-left: 0;
	}

	li[data-active='true'] {
		background: var(--template-red);
		color: var(--template-white);
	}

	.number {
		color: var(--template-coral);
		font-size: 0.62rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		line-height: 1;
	}

	li[data-active='true'] .number {
		color: var(--template-white);
	}

	.label {
		overflow: hidden;
		color: var(--slide-fg, var(--template-black));
		font-size: 0.69rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		line-height: 1.2;
		text-overflow: ellipsis;
	}

	li[data-active='true'] .label {
		color: var(--template-white);
	}

	.rubric-rail[data-compact='true'] .label {
		font-size: 0.62rem;
	}

	.rubric-rail[data-compact='true'] li {
		padding: 0.5rem 0.45rem;
	}
</style>
