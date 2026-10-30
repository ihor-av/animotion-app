<script lang="ts">
	import type { ScatterPoint } from '../types';
	import { formatCompact } from '../utils/format';
	import { extent, niceDomain, scaleLinear } from '../utils/scale';

	type Props = {
		points: ScatterPoint[];
		height?: number;
		xLabel?: string;
		yLabel?: string;
		formatX?: (value: number) => string;
		formatY?: (value: number) => string;
		color?: string;
		size?: number;
		trendline?: boolean;
		zero?: boolean;
		class?: string;
		ariaLabel?: string;
	};

	let {
		points,
		height = 300,
		xLabel,
		yLabel,
		formatX,
		formatY,
		color = 'var(--chart-1, #2563eb)',
		size = 5,
		trendline = false,
		zero = false,
		class: className = '',
		ariaLabel = 'Scatter chart'
	}: Props = $props();

	const clipId = $props.id();
	const xFormatter = $derived(formatX ?? ((value: number) => formatCompact(value)));
	const yFormatter = $derived(formatY ?? ((value: number) => formatCompact(value)));

	const geometry = $derived.by(() => {
		const width = 640;
		const margin = { top: 16, right: 16, bottom: xLabel ? 68 : 54, left: yLabel ? 120 : 110 };
		const plotWidth = width - margin.left - margin.right;
		const plotHeight = height - margin.top - margin.bottom;
		const valid = points.filter(
			(point) => Number.isFinite(point.x) && Number.isFinite(point.y)
		);

		const [xMin, xMax] = extent(valid.map((point) => point.x));
		const [yMin, yMax] = extent(valid.map((point) => point.y));
		const xPad = (xMax - xMin) * 0.05 || 1;
		const yPad = (yMax - yMin) * 0.05 || 1;
		const xDomain = niceDomain(xMin - xPad, xMax + xPad, 5, zero);
		const yDomain = niceDomain(yMin - yPad, yMax + yPad, 5, zero);
		const x = scaleLinear([xDomain.min, xDomain.max], [margin.left, margin.left + plotWidth]);
		const y = scaleLinear([yDomain.min, yDomain.max], [margin.top + plotHeight, margin.top]);
		const sizes = valid
			.map((point) => point.size)
			.filter((value): value is number => value !== undefined && Number.isFinite(value));
		const minSize = sizes.length ? Math.min(...sizes) : 0;
		const maxSize = sizes.length ? Math.max(...sizes) : 0;

		let trend: { x1: number; y1: number; x2: number; y2: number } | null = null;

		if (trendline && valid.length >= 2) {
			const n = valid.length;
			const sumX = valid.reduce((sum, point) => sum + point.x, 0);
			const sumY = valid.reduce((sum, point) => sum + point.y, 0);
			const sumXY = valid.reduce((sum, point) => sum + point.x * point.y, 0);
			const sumXX = valid.reduce((sum, point) => sum + point.x * point.x, 0);
			const denominator = n * sumXX - sumX * sumX;

			if (denominator !== 0) {
				const slope = (n * sumXY - sumX * sumY) / denominator;
				const intercept = (sumY - slope * sumX) / n;
				const startX = xDomain.min;
				const endX = xDomain.max;

				trend = {
					x1: x(startX),
					y1: y(slope * startX + intercept),
					x2: x(endX),
					y2: y(slope * endX + intercept)
				};
			}
		}

		return {
			width,
			margin,
			plotWidth,
			plotHeight,
			xDomain,
			yDomain,
			x,
			y,
			valid,
			minSize,
			maxSize,
			trend
		};
	});

	function radius(point: ScatterPoint): number {
		if (point.size === undefined || geometry.maxSize === geometry.minSize) return size;
		const normalized = (point.size - geometry.minSize) / (geometry.maxSize - geometry.minSize);
		return size * (0.7 + normalized * 0.9);
	}
</script>

<svg class={className} viewBox="0 0 {geometry.width} {height}" role="img" aria-label={ariaLabel}>
	<defs>
		<clipPath id={clipId}>
			<rect
				x={geometry.margin.left}
				y={geometry.margin.top}
				width={geometry.plotWidth}
				height={geometry.plotHeight}
			/>
		</clipPath>
	</defs>

	{#each geometry.yDomain.ticks as tick}
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
			fill="var(--chart-muted, #6b7280)">{yFormatter(tick)}</text
		>
	{/each}

	{#each geometry.xDomain.ticks as tick}
		<text
			x={geometry.x(tick)}
			y={height - (xLabel ? 36 : 20)}
			text-anchor="middle"
			font-size="22"
			fill="var(--chart-muted, #6b7280)">{xFormatter(tick)}</text
		>
	{/each}

	<g clip-path="url(#{clipId})">
		{#if geometry.trend}
			<line
				x1={geometry.trend.x1}
				y1={geometry.trend.y1}
				x2={geometry.trend.x2}
				y2={geometry.trend.y2}
				stroke="var(--chart-muted, #6b7280)"
				stroke-width="1.5"
				stroke-dasharray="4 4"
			/>
		{/if}

		{#each geometry.valid as point}
			<circle
				cx={geometry.x(point.x)}
				cy={geometry.y(point.y)}
				r={radius(point)}
				fill={point.color ?? color}
				fill-opacity="0.78"
			>
				<title>{point.label ? `${point.label} · ` : ''}{xFormatter(point.x)}, {yFormatter(point.y)}</title>
			</circle>
		{/each}
	</g>

	{#if xLabel}
		<text
			x={geometry.margin.left + geometry.plotWidth / 2}
			y={height - 6}
			text-anchor="middle"
			font-size="20"
			fill="var(--chart-muted, #6b7280)">{xLabel}</text
		>
	{/if}

	{#if yLabel}
		<text
			x="20"
			y={geometry.margin.top + geometry.plotHeight / 2}
			text-anchor="middle"
			font-size="20"
			fill="var(--chart-muted, #6b7280)"
			transform="rotate(-90 20 {geometry.margin.top + geometry.plotHeight / 2})">{yLabel}</text
		>
	{/if}
</svg>

<style>
	svg {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
	}
</style>
