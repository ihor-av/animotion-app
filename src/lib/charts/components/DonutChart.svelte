<script lang="ts">
	import type { ChartDatum } from '../types';
	import { chartColor } from '../utils/color';
	import { formatCompact, formatPercent } from '../utils/format';
	import { arcPath } from '../utils/svg';
	import Legend from './Legend.svelte';

	type Props = {
		data: ChartDatum[];
		size?: number;
		innerRadius?: number;
		centerLabel?: string;
		centerValue?: string;
		format?: (value: number) => string;
		showLegend?: boolean;
		maxSlices?: number;
		otherLabel?: string;
		class?: string;
		ariaLabel?: string;
	};

	let {
		data,
		size = 220,
		innerRadius = 0.62,
		centerLabel,
		centerValue,
		format,
		showLegend = true,
		maxSlices = 8,
		otherLabel = 'Інше',
		class: className = '',
		ariaLabel = 'Donut chart'
	}: Props = $props();

	const valueFormatter = $derived(format ?? ((value: number) => formatCompact(value)));

	const slices = $derived.by(() => {
		const positive = data
			.filter((datum) => datum.value > 0)
			.slice()
			.sort((a, b) => b.value - a.value);

		if (positive.length === 0) return [];

		let items = positive;
		if (maxSlices > 1 && positive.length > maxSlices) {
			const visible = positive.slice(0, maxSlices - 1);
			const rest = positive.slice(maxSlices - 1);
			items = [
				...visible,
				{
					label: otherLabel,
					value: rest.reduce((sum, datum) => sum + datum.value, 0)
				}
			];
		}

		const total = items.reduce((sum, datum) => sum + datum.value, 0);
		const radius = size / 2 - 2;
		const inner = radius * Math.min(0.95, Math.max(0, innerRadius));
		const gap = items.length > 1 ? 0.012 : 0;

		let angle = -Math.PI / 2;

		return items.map((datum, index) => {
			const share = total > 0 ? datum.value / total : 0;
			const sweep = share * Math.PI * 2;
			const start = angle + gap / 2;
			const end = angle + sweep - gap / 2;
			angle += sweep;

			return {
				...datum,
				share,
				color: datum.color ?? chartColor(index),
				path: arcPath(size / 2, size / 2, inner, radius, start, Math.max(start + 0.0001, end))
			};
		});
	});

	const total = $derived(slices.reduce((sum, slice) => sum + slice.value, 0));

	const legendItems = $derived(
		slices.map((slice) => ({
			label: slice.label,
			color: slice.color,
			value: `${valueFormatter(slice.value)} · ${formatPercent(slice.share * 100)}`
		}))
	);

	const displayValue = $derived(centerValue ?? valueFormatter(total));
	const showCenter = $derived(innerRadius > 0.2 && slices.length > 0);
</script>

<div class="donut {className}" data-centered={!showLegend}>
	<svg viewBox="0 0 {size} {size}" role="img" aria-label={ariaLabel} style="max-width: {size}px">
		{#if slices.length === 1}
			<circle
				cx={size / 2}
				cy={size / 2}
				r={size / 2 - 2}
				fill={slices[0].color}
				stroke="var(--chart-surface, #ffffff)"
				stroke-width="2"
			>
				<title>{slices[0].label}: {valueFormatter(slices[0].value)}</title>
			</circle>
			{#if showCenter}
				<circle cx={size / 2} cy={size / 2} r={(size / 2 - 2) * innerRadius} fill="var(--chart-surface, #ffffff)" />
			{/if}
		{:else}
			{#each slices as slice}
				<path
					d={slice.path}
					fill={slice.color}
					stroke="var(--chart-surface, #ffffff)"
					stroke-width="2"
					stroke-linejoin="round"
				>
					<title>{slice.label}: {valueFormatter(slice.value)} ({formatPercent(slice.share * 100)})</title>
				</path>
			{/each}
		{/if}

		{#if showCenter}
			<text
				x={size / 2}
				y={centerLabel ? size / 2 - 2 : size / 2 + 4}
				text-anchor="middle"
				font-size={size * 0.11}
				font-weight="600"
				fill="var(--chart-text, #000000)">{displayValue}</text
			>
			{#if centerLabel}
				<text
					x={size / 2}
					y={size / 2 + size * 0.09}
					text-anchor="middle"
					font-size={size * 0.08}
					fill="var(--chart-muted, #4a4a4a)">{centerLabel}</text
				>
			{/if}
		{/if}
	</svg>

	{#if showLegend}
		<div class="legend">
			<Legend items={legendItems} />
		</div>
	{/if}
</div>

<style>
	.donut {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem 1.5rem;
		min-width: 0;
	}

	.donut[data-centered='true'] {
		justify-content: center;
	}

	svg {
		display: block;
		width: 100%;
		height: auto;
	}

	.legend {
		flex: 1 1 12rem;
		min-width: 0;
	}
</style>
