export type Domain = [number, number];

function round(value: number, precision = 10): number {
	const factor = 10 ** precision;
	return Math.round(value * factor) / factor;
}

export function extent(values: Iterable<number | null | undefined>): Domain {
	let min = Number.POSITIVE_INFINITY;
	let max = Number.NEGATIVE_INFINITY;

	for (const value of values) {
		if (value === null || value === undefined || !Number.isFinite(value)) continue;
		if (value < min) min = value;
		if (value > max) max = value;
	}

	if (min === Number.POSITIVE_INFINITY) return [0, 1];
	if (min === max) return min === 0 ? [0, 1] : [Math.min(0, min), Math.max(0, max)];

	return [min, max];
}

export function niceDomain(
	min: number,
	max: number,
	count = 5,
	includeZero = false
): { min: number; max: number; step: number; ticks: number[] } {
	if (includeZero) {
		min = Math.min(min, 0);
		max = Math.max(max, 0);
	}

	if (!Number.isFinite(min) || !Number.isFinite(max)) return { min: 0, max: 1, step: 0.2, ticks: [0, 1] };
	if (min === max) {
		const step = Math.abs(min) >= 1 ? Math.abs(min) / 2 : 0.5;
		const ticks = [min - step, min, min + step].map((value) => round(value));
		return { min: ticks[0], max: ticks[2], step, ticks };
	}

	const span = max - min;
	const rawStep = span / Math.max(1, count);
	const magnitude = 10 ** Math.floor(Math.log10(rawStep));
	const normalized = rawStep / magnitude;
	const niceNormalized =
		normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
	const step = niceNormalized * magnitude;
	const niceMin = Math.floor(min / step) * step;
	const niceMax = Math.ceil(max / step) * step;
	const ticks: number[] = [];

	for (let value = niceMin; value <= niceMax + step / 2; value += step) {
		ticks.push(round(value));
	}

	return { min: round(niceMin), max: round(niceMax), step: round(step), ticks };
}

export function scaleLinear(domain: Domain, range: Domain): (value: number) => number {
	const [d0, d1] = domain;
	const [r0, r1] = range;
	if (d0 === d1) return () => (r0 + r1) / 2;

	return (value) => r0 + ((value - d0) / (d1 - d0)) * (r1 - r0);
}

export function scaleBand(
	labels: readonly string[],
	range: Domain,
	padding = 0.2
): {
	bandwidth: number;
	step: number;
	at: (index: number) => number;
	center: (index: number) => number;
} {
	const [r0, r1] = range;
	const count = Math.max(1, labels.length);
	const step = (r1 - r0) / count;
	const bandwidth = step * (1 - padding);
	const offset = (step - bandwidth) / 2;

	return {
		bandwidth,
		step,
		at: (index) => r0 + index * step + offset,
		center: (index) => r0 + index * step + step / 2
	};
}

export function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

export function sum(values: Iterable<number | null | undefined>): number {
	let total = 0;
	for (const value of values) {
		if (value === null || value === undefined || !Number.isFinite(value)) continue;
		total += value;
	}
	return total;
}
