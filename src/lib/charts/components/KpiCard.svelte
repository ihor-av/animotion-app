<script lang="ts">
	import { formatDelta, formatNumber } from '../utils/format';
	import Sparkline from './Sparkline.svelte';

	type Props = {
		label: string;
		value: number | string;
		format?: (value: number) => string;
		delta?: number | null;
		deltaLabel?: string;
		hint?: string;
		trend?: (number | null)[];
		trendColor?: string;
		variant?: 'card' | 'plain';
		class?: string;
	};

	let {
		label,
		value,
		format,
		delta = null,
		deltaLabel,
		hint,
		trend,
		trendColor = 'var(--chart-1, #2563eb)',
		variant = 'card',
		class: className = ''
	}: Props = $props();

	const formattedValue = $derived(
		typeof value === 'number' ? (format ? format(value) : formatNumber(value)) : value
	);

	const tone = $derived(delta === null || delta === 0 ? 'neutral' : delta > 0 ? 'positive' : 'negative');
</script>

<div class="kpi {className}" data-variant={variant}>
	<p class="label">{label}</p>

	<div class="value-row">
		<span class="value">{formattedValue}</span>
		{#if delta !== null && delta !== undefined}
			<span class="delta" data-tone={tone}>
				<span aria-hidden="true">{tone === 'negative' ? '↓' : tone === 'positive' ? '↑' : '→'}</span>
				{formatDelta(delta)}
			</span>
		{/if}
	</div>

	{#if deltaLabel || hint}
		<p class="hint">
			{#if deltaLabel}<span>{deltaLabel}</span>{/if}
			{#if hint}<span>{hint}</span>{/if}
		</p>
	{/if}

	{#if trend && trend.length > 1}
		<div class="spark">
			<Sparkline data={trend} color={trendColor} height={34} />
		</div>
	{/if}
</div>

<style>
	.kpi {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		min-width: 0;
		padding: 1rem 1.1rem;
		border: 1px solid var(--chart-border, #e5e7eb);
		border-radius: 1rem;
		background: var(--chart-surface, #ffffff);
		color: var(--chart-text, #111111);
		text-align: left;
	}

	.kpi[data-variant='plain'] {
		padding: 0;
		border: 0;
		background: transparent;
	}

	.label {
		margin: 0;
		color: var(--chart-muted, #6b7280);
		font-size: 1rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		line-height: 1.3;
		text-transform: uppercase;
	}

	.value-row {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.35rem 0.6rem;
		min-width: 0;
	}

	.value {
		overflow: hidden;
		font-size: 1.8rem;
		font-weight: 600;
		letter-spacing: -0.035em;
		line-height: 1.1;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
	}

	.delta {
		display: inline-flex;
		align-items: center;
		gap: 0.15rem;
		font-size: 1rem;
		font-weight: 500;
		font-variant-numeric: tabular-nums;
	}

	.delta[data-tone='positive'] {
		color: var(--chart-positive, #15803d);
	}

	.delta[data-tone='negative'] {
		color: var(--chart-negative, #b91c1c);
	}

	.delta[data-tone='neutral'] {
		color: var(--chart-muted, #6b7280);
	}

	.hint {
		display: flex;
		flex-wrap: wrap;
		gap: 0.2rem 0.45rem;
		margin: 0;
		color: var(--chart-muted, #6b7280);
		font-size: 1rem;
		line-height: 1.4;
	}

	.spark {
		margin-top: auto;
		padding-top: 0.4rem;
	}
</style>
