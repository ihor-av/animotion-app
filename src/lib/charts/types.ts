export type ChartDatum = {
	label: string;
	value: number;
	color?: string;
};

export type ChartSeries = {
	label: string;
	values: (number | null)[];
	color?: string;
};

export type LegendItem = {
	label: string;
	color?: string;
	value?: string;
};

export type ScatterPoint = {
	x: number;
	y: number;
	label?: string;
	size?: number;
	color?: string;
};

export type WaterfallDatum = {
	label: string;
	value: number;
	total?: boolean;
};

export type TableColumn = {
	key: string;
	label: string;
	align?: 'left' | 'center' | 'right';
	format?: (value: unknown, row: Record<string, unknown>) => string;
};
