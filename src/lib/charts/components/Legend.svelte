<script lang="ts">
	import type { LegendItem } from '../types';

	type Props = {
		items: LegendItem[];
		align?: 'start' | 'center' | 'end';
		class?: string;
	};

	let { items, align = 'start', class: className = '' }: Props = $props();
</script>

<div class="legend {className}" data-align={align}>
	{#each items as item}
		<span class="item">
			<span class="dot" style:background={item.color ?? 'var(--chart-1, #0033a1)'}></span>
			<span class="label">{item.label}</span>
			{#if item.value}
				<span class="value">{item.value}</span>
			{/if}
		</span>
	{/each}
</div>

<style>
	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		color: var(--chart-muted, #6b7280);
		font-size: 1.05rem;
		line-height: 1.2;
	}

	.legend[data-align='center'] {
		justify-content: center;
	}

	.legend[data-align='end'] {
		justify-content: flex-end;
	}

	.item {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		min-width: 0;
	}

	.dot {
		flex: none;
		width: 0.65rem;
		height: 0.65rem;
		border-radius: 0;
	}

	.label {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 20rem;
	}

	.value {
		color: var(--chart-text, #111111);
		font-variant-numeric: tabular-nums;
	}
</style>
