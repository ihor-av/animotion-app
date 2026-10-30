<script lang="ts">
	import type { ChartSeries } from '../types';
	import { seriesColor } from '../utils/color';
	import { formatCompact, formatPercent } from '../utils/format';
	import { niceDomain, scaleBand, scaleLinear, sum } from '../utils/scale';
	import { truncateLabel } from '../utils/svg';
	import Legend from './Legend.svelte';

	type Props = {
		categories: string[];
		series: ChartSeries[];
		height?: number;
		percent?: boolean;
		format?: (value: number) => string;
		tickFormat?: (value: number) => string;
		showValues?: boolean;
		showTotals?: boolean;
		showLegend?: boolean;
		class?: string;
		ariaLabel?: string;
	};

	let {
		categories,
		series,
		height = 280,
		percent = false,
		format,
		tickFormat,
		showValues = false,
		showTotals = false,
		showLegend = true,
		class: className = '',
		ariaLabel = 'Stacked bar chart'
	}: Props = $props();

	const valueFormatter = $derived(format ?? ((value: number) => formatCompact(value)));
	const tickFormatter = $derived(
		tickFormat ?? (percent ? (value: number) => formatPercent(value, 0) : (value: number) => formatCompact(value))
	);

	const legendItems = $derived(
		series.map((item, index) => ({
			label: item.label,
			color: seriesColor(item, index)
		}))
	);

	const columns = $derived.by(() =>
		categories.map((category, categoryIndex) => {
			const raw = series.map((item) => Math.max(0, item.values[categoryIndex] ?? 0));
			const total = sum(raw);
			const values = percent
				? raw.map((value) => (total > 0 ? (value / total) * 100 : 0))
				: raw;
			const starts: number[] = [];
			let cursor = 0;

			for (const value of values) {
				starts.push(cursor);
				cursor += value;
			}

			return { category, raw, values, starts, total };
		})
	);

	const geometry = $derived.by(() => {
		const width = 640;
		const margin = { top: 18, right: 14, bottom: 60, left: 110 };
		const plotWidth = width - margin.left - margin.right;
		const plotHeight = height - margin.top - margin.bottom;
		const totals = columns.map((column) => (percent ? 100 : column.total));
		const domain = percent
			? { min: 0, max: 100, step: 25, ticks: [0, 25, 50, 75, 100] }
			: niceDomain(0, Math.max(0, ...totals), 5, true);
		const y = scaleLinear([domain.min, domain.max], [margin.top + plotHeight, margin.top]);
		const band = scaleBand(categories, [margin.left, margin.left + plotWidth], 0.3);

		return { width, margin, plotWidth, plotHeight, domain, y, band };
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

		{#each columns as column, categoryIndex}
			{@const x = geometry.band.at(categoryIndex)}
			{@const barWidth = geometry.band.bandwidth}
			{#each series as item, seriesIndex}
				{@const value = column.values[seriesIndex]}
				{@const start = column.starts[seriesIndex]}
				{@const end = start + value}
				{@const yStart = geometry.y(start)}
				{@const yEnd = geometry.y(end)}
				{@const y = Math.min(yStart, yEnd)}
				{@const height = Math.abs(yEnd - yStart)}
				<rect
					x={x}
					y={y}
					width={barWidth}
					height={Math.max(0, height)}
					fill={seriesColor(item, seriesIndex)}
				>
					<title>{column.category} · {item.label}: {percent
							? formatPercent(value, 1)
							: valueFormatter(column.raw[seriesIndex])}</title>
				</rect>
				{#if showValues && height > 16}
					<text
						x={x + barWidth / 2}
						y={y + height / 2 + 7}
						text-anchor="middle"
						font-size="20"
						fill="#ffffff">{percent ? formatPercent(value, 0) : valueFormatter(value)}</text
					>
				{/if}
			{/each}
			{#if showTotals}
				<text
					x={x + barWidth / 2}
					y={geometry.y(percent ? 100 : column.total) - 9}
					text-anchor="middle"
					font-size="20"
					fill="var(--chart-muted, #6b7280)">{valueFormatter(column.total)}</text
				>
			{/if}
			<text
				x={geometry.band.center(categoryIndex)}
				y={height - 18}
				text-anchor="middle"
				font-size="22"
				fill="var(--chart-muted, #6b7280)">{truncateLabel(column.category, 10)}</text>
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
