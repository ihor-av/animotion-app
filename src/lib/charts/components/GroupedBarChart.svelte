<script lang="ts">
	import type { ChartSeries } from '../types';
	import { seriesColor } from '../utils/color';
	import { formatCompact } from '../utils/format';
	import { niceDomain, scaleBand, scaleLinear } from '../utils/scale';
	import { truncateLabel } from '../utils/svg';
	import Legend from './Legend.svelte';

	type Props = {
		categories: string[];
		series: ChartSeries[];
		height?: number;
		format?: (value: number) => string;
		tickFormat?: (value: number) => string;
		showValues?: boolean;
		showLegend?: boolean;
		max?: number;
		class?: string;
		ariaLabel?: string;
	};

	let {
		categories,
		series,
		height = 280,
		format,
		tickFormat,
		showValues = false,
		showLegend = true,
		max,
		class: className = '',
		ariaLabel = 'Grouped bar chart'
	}: Props = $props();

	const valueFormatter = $derived(format ?? ((value: number) => formatCompact(value)));
	const rotateLabels = $derived(categories.some((category) => category.length > 7));
	const tickFormatter = $derived(tickFormat ?? ((value: number) => formatCompact(value)));

	const legendItems = $derived(
		series.map((item, index) => ({
			label: item.label,
			color: seriesColor(item, index)
		}))
	);

	const geometry = $derived.by(() => {
		const width = 640;
		const margin = { top: 18, right: 14, bottom: rotateLabels ? 96 : 60, left: 110 };
		const plotWidth = width - margin.left - margin.right;
		const plotHeight = height - margin.top - margin.bottom;
		const values = series.flatMap((item) =>
			item.values.filter((value): value is number => value !== null && Number.isFinite(value))
		);
		const domain = niceDomain(Math.min(0, ...values), Math.max(max ?? 0, 0, ...values), 5, true);
		const y = scaleLinear([domain.min, domain.max], [margin.top + plotHeight, margin.top]);
		const band = scaleBand(categories, [margin.left, margin.left + plotWidth], 0.26);
		const seriesCount = Math.max(1, series.length);
		const groupWidth = band.bandwidth / seriesCount;
		const barWidth = groupWidth * 0.82;

		return { width, margin, plotWidth, plotHeight, domain, y, band, groupWidth, barWidth, rotateLabels };
	});
</script>

<div class={className}>
	{#if showLegend && series.length > 1}
		<div class="legend">
			<Legend items={legendItems} />
		</div>
	{/if}

	<svg
		viewBox="0 0 {geometry.width} {height}"
		role="img"
		aria-label={ariaLabel}
	>
		{#each geometry.domain.ticks as tick}
			<line
				x1={geometry.margin.left}
				x2={geometry.width - geometry.margin.right}
				y1={geometry.y(tick)}
				y2={geometry.y(tick)}
				stroke="var(--chart-grid, #e5e7eb)"
				stroke-width="1"
			/>
			<text
				x={geometry.margin.left - 8}
				y={geometry.y(tick) + 7}
				text-anchor="end"
				font-size="22"
				fill="var(--chart-muted, #6b7280)">{tickFormatter(tick)}</text
			>
		{/each}

		<line
			x1={geometry.margin.left}
			x2={geometry.width - geometry.margin.right}
			y1={geometry.y(0)}
			y2={geometry.y(0)}
			stroke="var(--chart-axis, #9ca3af)"
			stroke-width="1"
		/>

		{#each categories as category, categoryIndex}
			{@const groupX = geometry.band.at(categoryIndex)}
			{#each series as item, seriesIndex}
				{@const value = item.values[categoryIndex] ?? 0}
				{@const barX = groupX + seriesIndex * geometry.groupWidth + (geometry.groupWidth - geometry.barWidth) / 2}
				{@const valueY = geometry.y(value)}
				{@const zeroY = geometry.y(0)}
				<rect
					x={barX}
					y={Math.min(valueY, zeroY)}
					width={geometry.barWidth}
					height={Math.abs(valueY - zeroY)}
					rx="2"
					fill={seriesColor(item, seriesIndex)}
				>
					<title>{category} · {item.label}: {valueFormatter(value)}</title>
				</rect>
				{#if showValues}
					<text
						x={barX + geometry.barWidth / 2}
						y={value >= 0 ? valueY - 9 : valueY + 18}
						text-anchor="middle"
						font-size="20"
						fill="var(--chart-muted, #6b7280)">{valueFormatter(value)}</text
					>
				{/if}
			{/each}
			{@const labelX = geometry.band.center(categoryIndex)}
			{@const labelY = height - (geometry.rotateLabels ? 84 : 18)}
			<text
				x={labelX}
				y={labelY}
				text-anchor={geometry.rotateLabels ? 'end' : 'middle'}
				transform={geometry.rotateLabels ? `rotate(-32 ${labelX} ${labelY})` : undefined}
				font-size="22"
				fill="var(--chart-muted, #6b7280)">{truncateLabel(category, 10)}</text
			>
		{/each}
	</svg>
</div>

<style>
	.legend {
		margin-bottom: 0.55rem;
	}

	svg {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
	}
</style>
