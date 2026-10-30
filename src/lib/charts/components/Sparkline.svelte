<script lang="ts">
	import { areaPath, linePath, type Point } from '../utils/svg';

	type Props = {
		data: (number | null)[];
		width?: number;
		height?: number;
		color?: string;
		area?: boolean;
		strokeWidth?: number;
		class?: string;
	};

	let {
		data,
		width = 160,
		height = 40,
		color = 'var(--chart-1, #2563eb)',
		area = true,
		strokeWidth = 1.5,
		class: className = ''
	}: Props = $props();

	const geometry = $derived.by(() => {
		const values = data.filter((value): value is number => value !== null && Number.isFinite(value));
		if (values.length === 0) return { points: [] as Point[], baseline: height, last: null as Point | null };

		let min = Math.min(...values);
		let max = Math.max(...values);

		if (min === max) {
			min -= 1;
			max += 1;
		}

		const padding = 2;
		const x = (index: number) =>
			data.length <= 1 ? width / 2 : (index / (data.length - 1)) * width;
		const y = (value: number) =>
			padding + ((max - value) / (max - min)) * (height - padding * 2);

		const points = data
			.map((value, index) => (value === null || !Number.isFinite(value) ? null : ([x(index), y(value)] as Point)))
			.filter((point): point is Point => point !== null);

		return {
			points,
			baseline: height,
			last: points.at(-1) ?? null
		};
	});
</script>

<svg
	class={className}
	viewBox="0 0 {width} {height}"
	preserveAspectRatio="none"
	style="height: {height}px"
	role="img"
	aria-label="Sparkline"
>
	{#if geometry.points.length > 0}
		{#if area}
			<path d={areaPath(geometry.points, geometry.baseline)} fill={color} fill-opacity="0.14" stroke="none" />
		{/if}
		<path
			d={linePath(geometry.points)}
			fill="none"
			stroke={color}
			stroke-width={strokeWidth}
			stroke-linecap="round"
			stroke-linejoin="round"
			vector-effect="non-scaling-stroke"
		/>
		{#if geometry.last}
			<circle
				cx={geometry.last[0]}
				cy={geometry.last[1]}
				r="2"
				fill={color}
				vector-effect="non-scaling-stroke"
			/>
		{/if}
	{/if}
</svg>

<style>
	svg {
		display: block;
		width: 100%;
		overflow: visible;
	}
</style>
