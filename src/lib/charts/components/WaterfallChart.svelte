<script lang="ts">
	import type { WaterfallDatum } from '../types';
	import { formatCompact } from '../utils/format';
	import { niceDomain, scaleBand, scaleLinear } from '../utils/scale';
	import { truncateLabel } from '../utils/svg';

	type Props = {
		data: WaterfallDatum[];
		height?: number;
		format?: (value: number) => string;
		tickFormat?: (value: number) => string;
		showValues?: boolean;
		positiveColor?: string;
		negativeColor?: string;
		totalColor?: string;
		class?: string;
		ariaLabel?: string;
	};

	let {
		data,
		height = 300,
		format,
		tickFormat,
		showValues = true,
		positiveColor = 'var(--chart-positive, #0033a1)',
		negativeColor = 'var(--chart-negative, #ee252f)',
		totalColor = 'var(--chart-1, #0033a1)',
		class: className = '',
		ariaLabel = 'Waterfall chart'
	}: Props = $props();

	const valueFormatter = $derived(format ?? ((value: number) => formatCompact(value)));
	const tickFormatter = $derived(tickFormat ?? ((value: number) => formatCompact(value)));

	const steps = $derived.by(() => {
		let running = 0;

		return data.map((datum) => {
			if (datum.total) {
				const end = running;
				return { ...datum, start: 0, end, display: end };
			}

			const start = running;
			const end = running + datum.value;
			running = end;

			return { ...datum, start, end, display: datum.value };
		});
	});

	const rotateLabels = $derived(data.some((datum) => datum.label.length > 7));

	const geometry = $derived.by(() => {
		const width = 640;
		const margin = { top: 20, right: 14, bottom: rotateLabels ? 96 : 60, left: 110 };
		const plotWidth = width - margin.left - margin.right;
		const plotHeight = height - margin.top - margin.bottom;
		const values = steps.flatMap((step) => [step.start, step.end, 0]);
		const domain = niceDomain(Math.min(...values), Math.max(...values), 5, true);
		const y = scaleLinear([domain.min, domain.max], [margin.top + plotHeight, margin.top]);
		const band = scaleBand(steps.map((step) => step.label), [margin.left, margin.left + plotWidth], 0.32);

		return { width, margin, plotWidth, plotHeight, domain, y, band, rotateLabels };
	});

	function color(step: (typeof steps)[number]): string {
		if (step.total) return totalColor;
		return step.display >= 0 ? positiveColor : negativeColor;
	}

	function label(step: (typeof steps)[number]): string {
		if (step.total) return valueFormatter(step.display);
		const sign = step.display > 0 ? '+' : '';
		return `${sign}${valueFormatter(step.display)}`;
	}
</script>

<svg class={className} viewBox="0 0 {geometry.width} {height}" role="img" aria-label={ariaLabel}>
	{#each geometry.domain.ticks as tick}
		<line
			x1={geometry.margin.left}
			x2={geometry.width - geometry.margin.right}
			y1={geometry.y(tick)}
			y2={geometry.y(tick)}
			stroke="var(--chart-grid, #e6e4df)"
			stroke-width="1"
		/>
		<text
			x={geometry.margin.left - 8}
			y={geometry.y(tick) + 7}
			text-anchor="end"
			font-size="22"
			fill="var(--chart-muted, #4a4a4a)">{tickFormatter(tick)}</text
		>
	{/each}

	{#each steps as step, index}
		{@const x = geometry.band.at(index)}
		{@const barWidth = geometry.band.bandwidth}
		{@const topY = geometry.y(Math.max(step.start, step.end))}
		{@const bottomY = geometry.y(Math.min(step.start, step.end))}
		{@const positive = step.end >= step.start}

		{#if index > 0}
			{@const previous = steps[index - 1]}
			<line
				x1={geometry.band.at(index - 1) + geometry.band.bandwidth}
				x2={x}
				y1={geometry.y(previous.end)}
				y2={geometry.y(previous.end)}
				stroke="var(--chart-axis, #8a8a8a)"
				stroke-width="1"
				stroke-dasharray="3 3"
			/>
		{/if}

		<rect
			x={x}
			y={topY}
			width={barWidth}
			height={Math.max(1, bottomY - topY)}
			rx="0"
			fill={color(step)}
		>
			<title>{step.label}: {label(step)}</title>
		</rect>

		{#if showValues}
			<text
				x={x + barWidth / 2}
				y={positive ? topY - 10 : bottomY + 20}
				text-anchor="middle"
				font-size="20"
				fill="var(--chart-muted, #4a4a4a)">{label(step)}</text
			>
		{/if}

		{@const labelX = geometry.band.center(index)}
		{@const labelY = height - (geometry.rotateLabels ? 84 : 18)}
		<text
			x={labelX}
			y={labelY}
			text-anchor={geometry.rotateLabels ? 'end' : 'middle'}
			transform={geometry.rotateLabels ? `rotate(-32 ${labelX} ${labelY})` : undefined}
			font-size="22"
			fill="var(--chart-muted, #4a4a4a)">{truncateLabel(step.label, 10)}</text
		>
	{/each}
</svg>

<style>
	svg {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
	}
</style>
