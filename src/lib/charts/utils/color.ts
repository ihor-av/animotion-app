export const chartPalette = [
	'var(--chart-1, #0033a1)',
	'var(--chart-2, #ee252f)',
	'var(--chart-3, #d66b47)',
	'var(--chart-4, #264ca4)',
	'var(--chart-5, #a6192e)',
	'var(--chart-6, #4a4a4a)',
	'var(--chart-7, #55627a)',
	'var(--chart-8, #8a94a6)'
];

export function chartColor(index: number): string {
	return chartPalette[index % chartPalette.length];
}

export function seriesColor(series: { color?: string }, index: number): string {
	return series.color ?? chartColor(index);
}
