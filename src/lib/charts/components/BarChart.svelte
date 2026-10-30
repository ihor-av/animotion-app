<script lang="ts">
	import type { ChartDatum } from '../types';
	import { formatCompact } from '../utils/format';
	import { niceDomain, scaleBand, scaleLinear } from '../utils/scale';
	import { truncateLabel } from '../utils/svg';

	type Props = {
		data: ChartDatum[];
		orientation?: 'horizontal' | 'vertical';
		height?: number;
		labelWidth?: string;
		format?: (value: number) => string;
		tickFormat?: (value: number) => string;
		color?: string;
		showValues?: boolean;
		max?: number;
		class?: string;
		ariaLabel?: string;
	};

	let {
		data,
		orientation = 'horizontal',
		height = 280,
		labelWidth = '10rem',
		format,
		tickFormat,
		color = 'var(--chart-1, #0033a1)',
		showValues = true,
		max,
		class: className = '',
		ariaLabel = 'Bar chart'
	}: Props = $props();

	const valueFormatter = $derived(format ?? ((value: number) => formatCompact(value)));
	const tickFormatter = $derived(tickFormat ?? ((value: number) => formatCompact(value)));

	const horizontal = $derived.by(() => {
		const values = data.map((datum) => datum.value).filter((value) => Number.isFinite(value));
		const domainMin = Math.min(0, ...values);
		const domainMax = Math.max(max ?? 0, 0, ...values);
		const span = domainMax - domainMin || 1;
		const zero = ((0 - domainMin) / span) * 100;

		return data.map((datum) => {
			const start = datum.value >= 0 ? zero : ((datum.value - domainMin) / span) * 100;
			const width = (Math.abs(datum.value) / span) * 100;

			return {
				...datum,
				start,
				width: Math.min(100 - Math.max(0, start), width)
			};
		});
	});

	const vertical = $derived.by(() => {
		const width = 640;
		const margin = { top: 18, right: 14, bottom: 60, left: 110 };
		const plotWidth = width - margin.left - margin.right;
		const plotHeight = height - margin.top - margin.bottom;
		const values = data.map((datum) => datum.value);
		const domain = niceDomain(Math.min(0, ...values), Math.max(max ?? 0, 0, ...values), 5, true);
		const y = scaleLinear([domain.min, domain.max], [margin.top + plotHeight, margin.top]);
		const band = scaleBand(
			data.map((datum) => datum.label),
			[margin.left, margin.left + plotWidth],
			0.3
		);
		const step = Math.max(1, Math.ceil(data.length / 7));
		const labelIndices = new Set<number>();
		for (let index = 0; index < data.length; index += step) labelIndices.add(index);
		if (data.length) {
			const last = data.length - 1;
			if (!labelIndices.has(last)) {
				const previous = [...labelIndices].sort((a, b) => a - b).at(-1);
				if (previous !== undefined && last - previous < step) labelIndices.delete(previous);
				labelIndices.add(last);
			}
		}

		return { width, margin, plotWidth, plotHeight, domain, y, band, labelIndices };
	});
</script>

{#if orientation === 'horizontal'}
	<div class="bars {className}" style="--label-width: {labelWidth}" aria-label={ariaLabel} role="img">
		{#each horizontal as datum}
			<div class="row">
				<span class="label" title={datum.label}>{datum.label}</span>
				<div class="track">
					<span
						class="bar"
						style:left="{datum.start}%"
						style:width="{datum.width}%"
						style:background={datum.color ?? color}
						title="{datum.label}: {valueFormatter(datum.value)}"
					></span>
				</div>
				{#if showValues}
					<span class="value">{valueFormatter(datum.value)}</span>
				{/if}
			</div>
		{/each}
	</div>
{:else}
	<svg
		class={className}
		viewBox="0 0 {vertical.width} {height}"
		role="img"
		aria-label={ariaLabel}
	>
		{#each vertical.domain.ticks as tick}
			<line
				x1={vertical.margin.left}
				x2={vertical.width - vertical.margin.right}
				y1={vertical.y(tick)}
				y2={vertical.y(tick)}
				stroke="var(--chart-grid, #e6e4df)"
				stroke-width="1"
			/>
			<text
				x={vertical.margin.left - 8}
				y={vertical.y(tick) + 7}
				text-anchor="end"
				font-size="22"
				fill="var(--chart-muted, #4a4a4a)">{tickFormatter(tick)}</text
			>
		{/each}

		<line
			x1={vertical.margin.left}
			x2={vertical.width - vertical.margin.right}
			y1={vertical.y(0)}
			y2={vertical.y(0)}
			stroke="var(--chart-axis, #8a8a8a)"
			stroke-width="1"
		/>

		{#each data as datum, index}
			{@const x = vertical.band.at(index)}
			{@const barWidth = vertical.band.bandwidth}
			{@const valueY = vertical.y(datum.value)}
			{@const zeroY = vertical.y(0)}
			<rect
				x={x}
				y={Math.min(valueY, zeroY)}
				width={barWidth}
				height={Math.abs(valueY - zeroY)}
				rx="0"
				fill={datum.color ?? color}
			>
				<title>{datum.label}: {valueFormatter(datum.value)}</title>
			</rect>
			{#if showValues}
				<text
					x={x + barWidth / 2}
					y={datum.value >= 0 ? valueY - 10 : valueY + 20}
					text-anchor="middle"
					font-size="20"
					fill="var(--chart-muted, #4a4a4a)">{valueFormatter(datum.value)}</text
				>
			{/if}
			{#if vertical.labelIndices.has(index)}
				<text
					x={x + barWidth / 2}
					y={height - 18}
					text-anchor="middle"
					font-size="22"
					fill="var(--chart-muted, #4a4a4a)">{truncateLabel(datum.label, 10)}</text
				>
			{/if}
		{/each}
	</svg>
{/if}

<style>
	.bars {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		min-width: 0;
	}

	.row {
		display: grid;
		grid-template-columns: minmax(4.5rem, var(--label-width)) minmax(0, 1fr) auto;
		align-items: center;
		gap: 0.9rem;
		min-width: 0;
	}

	.label {
		display: -webkit-box;
		overflow: hidden;
		color: var(--chart-muted, #4a4a4a);
		font-size: 1rem;
		line-height: 1.3;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
	}

	.track {
		position: relative;
		height: 0.65rem;
		border-radius: 0;
		background: var(--chart-grid, #e6e4df);
	}

	.bar {
		position: absolute;
		top: 0;
		bottom: 0;
		border-radius: 0;
	}

	.value {
		color: var(--chart-text, #000000);
		font-size: 1rem;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	svg {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
	}
</style>
