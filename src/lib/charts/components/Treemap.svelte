<script lang="ts">
	import type { ChartDatum } from '../types';
	import { chartColor } from '../utils/color';
	import { formatCompact } from '../utils/format';
	import { treemap } from '../utils/treemap';
	import { truncateLabel } from '../utils/svg';

	type Props = {
		data: ChartDatum[];
		height?: number;
		format?: (value: number) => string;
		showValues?: boolean;
		class?: string;
		ariaLabel?: string;
	};

	let {
		data,
		height = 300,
		format,
		showValues = true,
		class: className = '',
		ariaLabel = 'Treemap'
	}: Props = $props();

	const valueFormatter = $derived(format ?? ((value: number) => formatCompact(value)));
	const width = 640;
	const rects = $derived(
		treemap(data, width, height).map((rect, index) => ({
			...rect,
			color: rect.color ?? chartColor(index)
		}))
	);
</script>

<svg
	class={className}
	viewBox="0 0 {width} {height}"
	role="img"
	aria-label={ariaLabel}
>
	{#each rects as rect}
		<g>
			<rect
				x={rect.x + 1}
				y={rect.y + 1}
				width={Math.max(0, rect.width - 2)}
				height={Math.max(0, rect.height - 2)}
				rx="4"
				fill={rect.color}
			>
				<title>{rect.label}: {valueFormatter(rect.value)}</title>
			</rect>

			{#if rect.width > 56 && rect.height > 32}
				<text
					x={rect.x + 9}
					y={rect.y + 27}
					font-size="22"
					font-weight="500"
					fill="#ffffff">{truncateLabel(rect.label, Math.max(4, Math.floor((rect.width - 18) / 11)))}</text
				>
			{/if}

			{#if showValues && rect.width > 72 && rect.height > 54}
				<text
					x={rect.x + 9}
					y={rect.y + 49}
					font-size="20"
					fill="#ffffff"
					fill-opacity="0.82">{valueFormatter(rect.value)}</text
				>
			{/if}
		</g>
	{/each}
</svg>

<style>
	svg {
		display: block;
		width: 100%;
		height: auto;
		overflow: hidden;
	}
</style>
