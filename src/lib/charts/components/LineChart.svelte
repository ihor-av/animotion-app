<script lang="ts">
	import type { ChartSeries } from '../types';
	import { seriesColor } from '../utils/color';
	import { formatCompact } from '../utils/format';
	import { niceDomain, scaleLinear } from '../utils/scale';
	import { areaPath, linePath, truncateLabel, type Point } from '../utils/svg';
	import Legend from './Legend.svelte';

	type Props = {
		labels: string[];
		series: ChartSeries[];
		height?: number;
		format?: (value: number) => string;
		tickFormat?: (value: number) => string;
		area?: boolean;
		showDots?: boolean;
		showLegend?: boolean;
		xLabelEvery?: number;
		zero?: boolean;
		strokeWidth?: number;
		class?: string;
		ariaLabel?: string;
	};

	let {
		labels,
		series,
		height = 280,
		format,
		tickFormat,
		area = true,
		showDots = false,
		showLegend = true,
		xLabelEvery,
		zero = true,
		strokeWidth = 2,
		class: className = '',
		ariaLabel = 'Line chart'
	}: Props = $props();

	const valueFormatter = $derived(format ?? ((value: number) => formatCompact(value)));
	const tickFormatter = $derived(tickFormat ?? ((value: number) => formatCompact(value)));

	const legendItems = $derived(
		series.map((item, index) => ({
			label: item.label,
			color: seriesColor(item, index)
		}))
	);

	const geometry = $derived.by(() => {
		const width = 640;
		const margin = { top: 16, right: 16, bottom: 60, left: 110 };
		const plotWidth = width - margin.left - margin.right;
		const plotHeight = height - margin.top - margin.bottom;
		const values = series.flatMap((item) =>
			item.values.filter((value): value is number => value !== null && Number.isFinite(value))
		);
		const dataMin = values.length ? Math.min(...values) : 0;
		const dataMax = values.length ? Math.max(...values) : 1;
		const domain = niceDomain(zero ? Math.min(0, dataMin) : dataMin, zero ? Math.max(0, dataMax) : dataMax, 5, zero);
		const y = scaleLinear([domain.min, domain.max], [margin.top + plotHeight, margin.top]);
		const x = (index: number) =>
			labels.length <= 1
				? margin.left + plotWidth / 2
				: margin.left + (index / (labels.length - 1)) * plotWidth;

		const paths = series.map((item) => {
			const segments: Point[][] = [];
			let current: Point[] = [];

			item.values.forEach((value, index) => {
				if (value === null || !Number.isFinite(value)) {
					if (current.length) segments.push(current);
					current = [];
					return;
				}

				current.push([x(index), y(value)]);
			});

			if (current.length) segments.push(current);
			return segments;
		});

		const step = xLabelEvery ?? Math.max(1, Math.ceil(labels.length / 6));
		const labelIndices = new Set<number>();
		for (let index = 0; index < labels.length; index += step) labelIndices.add(index);

		if (labels.length) {
			const last = labels.length - 1;
			if (!labelIndices.has(last)) {
				const shown = [...labelIndices].sort((a, b) => a - b);
				const previous = shown.at(-1);
				if (previous !== undefined && last - previous < step) labelIndices.delete(previous);
				labelIndices.add(last);
			}
		}

		return { width, margin, plotWidth, plotHeight, domain, y, x, paths, labelIndices };
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

		{#each series as item, seriesIndex}
			{@const color = seriesColor(item, seriesIndex)}
			{#each geometry.paths[seriesIndex] as segment}
				{#if area && segment.length > 1}
					<path
						d={areaPath(segment, geometry.margin.top + geometry.plotHeight)}
						fill={color}
						fill-opacity="0.12"
						stroke="none"
					/>
				{/if}
				<path
					d={linePath(segment)}
					fill="none"
					stroke={color}
					stroke-width={strokeWidth}
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			{/each}

			{#each item.values as value, index}
				{#if value !== null && Number.isFinite(value)}
					{@const cx = geometry.x(index)}
					{@const cy = geometry.y(value)}
					<circle
						cx={cx}
						cy={cy}
						r="9"
						fill="transparent"
					>
						<title>{labels[index]} · {item.label}: {valueFormatter(value)}</title>
					</circle>
					{#if showDots}
						<circle cx={cx} cy={cy} r="2.5" fill={color} />
					{/if}
				{/if}
			{/each}
		{/each}

		{#each labels as label, index}
			{#if geometry.labelIndices.has(index)}
				<text
					x={geometry.x(index)}
					y={height - 18}
					text-anchor="middle"
					font-size="22"
					fill="var(--chart-muted, #6b7280)">{truncateLabel(label, 10)}</text>
				>
			{/if}
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
