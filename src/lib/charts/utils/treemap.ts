export type TreemapInput = {
	label: string;
	value: number;
	color?: string;
};

export type TreemapRect = TreemapInput & {
	x: number;
	y: number;
	width: number;
	height: number;
};

function worstRatio(areas: number[], side: number): number {
	const total = areas.reduce((sum, area) => sum + area, 0);
	const max = Math.max(...areas);
	const min = Math.min(...areas);
	const sideSquared = side * side;

	return Math.max((sideSquared * max) / (total * total), (total * total) / (sideSquared * min));
}

export function treemap(
	input: TreemapInput[],
	width: number,
	height: number
): TreemapRect[] {
	const items = input
		.filter((item) => item.value > 0)
		.slice()
		.sort((a, b) => b.value - a.value);

	if (items.length === 0 || width <= 0 || height <= 0) return [];

	const total = items.reduce((sum, item) => sum + item.value, 0);
	if (total <= 0) return [];

	const scale = (width * height) / total;
	let remaining = items.map((item) => ({ ...item, area: item.value * scale }));
	const result: TreemapRect[] = [];

	let x = 0;
	let y = 0;
	let w = width;
	let h = height;

	while (remaining.length > 0) {
		const side = Math.min(w, h);
		const row = [remaining[0]];
		let rest = remaining.slice(1);
		let best = worstRatio(row.map((item) => item.area), side);

		while (rest.length > 0) {
			const candidate = [...row, rest[0]];
			const next = worstRatio(candidate.map((item) => item.area), side);

			if (next <= best) {
				row.push(rest[0]);
				rest = rest.slice(1);
				best = next;
			} else {
				break;
			}
		}

		const rowArea = row.reduce((sum, item) => sum + item.area, 0);

		if (w >= h) {
			const columnWidth = rowArea / h;
			let cursorY = y;

			for (const item of row) {
				const itemHeight = (item.area / rowArea) * h;
				result.push({
					label: item.label,
					value: item.value,
					color: item.color,
					x,
					y: cursorY,
					width: columnWidth,
					height: itemHeight
				});
				cursorY += itemHeight;
			}

			x += columnWidth;
			w -= columnWidth;
		} else {
			const rowHeight = rowArea / w;
			let cursorX = x;

			for (const item of row) {
				const itemWidth = (item.area / rowArea) * w;
				result.push({
					label: item.label,
					value: item.value,
					color: item.color,
					x: cursorX,
					y,
					width: itemWidth,
					height: rowHeight
				});
				cursorX += itemWidth;
			}

			y += rowHeight;
			h -= rowHeight;
		}

		remaining = rest;
	}

	return result;
}
