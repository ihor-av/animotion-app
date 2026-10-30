export type Point = [number, number];

export function linePath(points: Point[]): string {
	if (points.length === 0) return '';
	if (points.length === 1) {
		const [x, y] = points[0];
		return `M ${x} ${y}`;
	}

	return points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
}

export function areaPath(points: Point[], baseline: number): string {
	if (points.length === 0) return '';

	const [firstX] = points[0];
	const [lastX] = points[points.length - 1];
	const line = linePath(points);
	return `${line} L ${lastX} ${baseline} L ${firstX} ${baseline} Z`;
}

export function arcPath(
	cx: number,
	cy: number,
	innerRadius: number,
	outerRadius: number,
	startAngle: number,
	endAngle: number
): string {
	const point = (radius: number, angle: number): Point => [
		cx + radius * Math.cos(angle),
		cy + radius * Math.sin(angle)
	];

	const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
	const [outerStartX, outerStartY] = point(outerRadius, startAngle);
	const [outerEndX, outerEndY] = point(outerRadius, endAngle);

	if (innerRadius <= 0) {
		return [
			`M ${cx} ${cy}`,
			`L ${outerStartX} ${outerStartY}`,
			`A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEndX} ${outerEndY}`,
			'Z'
		].join(' ');
	}

	const [innerEndX, innerEndY] = point(innerRadius, endAngle);
	const [innerStartX, innerStartY] = point(innerRadius, startAngle);

	return [
		`M ${outerStartX} ${outerStartY}`,
		`A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEndX} ${outerEndY}`,
		`L ${innerEndX} ${innerEndY}`,
		`A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStartX} ${innerStartY}`,
		'Z'
	].join(' ');
}

export function truncateLabel(label: string, maxChars: number): string {
	if (label.length <= maxChars) return label;
	return `${label.slice(0, Math.max(1, maxChars - 1)).trimEnd()}…`;
}
