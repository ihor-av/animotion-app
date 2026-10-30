export const chartPalette = [
	'var(--chart-1, #2563eb)',
	'var(--chart-2, #0d9488)',
	'var(--chart-3, #b45309)',
	'var(--chart-4, #dc2626)',
	'var(--chart-5, #7c3aed)',
	'var(--chart-6, #0891b2)',
	'var(--chart-7, #4d7c0f)',
	'var(--chart-8, #be185d)'
];

export function chartColor(index: number): string {
	return chartPalette[index % chartPalette.length];
}

export function seriesColor(series: { color?: string }, index: number): string {
	return series.color ?? chartColor(index);
}
