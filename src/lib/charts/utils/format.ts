const DEFAULT_LOCALE = 'uk-UA';

export function formatNumber(
	value: number | null | undefined,
	options: Intl.NumberFormatOptions = {},
	locale = DEFAULT_LOCALE
): string {
	if (value === null || value === undefined || Number.isNaN(value)) return '—';

	return new Intl.NumberFormat(locale, {
		maximumFractionDigits: 0,
		...options
	}).format(value);
}

export function formatCompact(
	value: number | null | undefined,
	locale = DEFAULT_LOCALE
): string {
	if (value === null || value === undefined || Number.isNaN(value)) return '—';
	if (Math.abs(value) < 1_000) return formatNumber(value, { maximumFractionDigits: 1 }, locale);

	return new Intl.NumberFormat(locale, {
		notation: 'compact',
		compactDisplay: 'short',
		maximumFractionDigits: 1
	}).format(value);
}

export function formatCurrency(
	value: number | null | undefined,
	options: {
		compact?: boolean;
		maximumFractionDigits?: number;
		currency?: string;
		locale?: string;
	} = {}
): string {
	if (value === null || value === undefined || Number.isNaN(value)) return '—';

	const {
		compact = false,
		maximumFractionDigits = compact ? 1 : 0,
		currency = 'UAH',
		locale = DEFAULT_LOCALE
	} = options;

	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		currencyDisplay: 'narrowSymbol',
		notation: compact ? 'compact' : 'standard',
		compactDisplay: 'short',
		maximumFractionDigits
	}).format(value);
}

export function formatPercent(
	value: number | null | undefined,
	maximumFractionDigits = 1,
	locale = DEFAULT_LOCALE
): string {
	if (value === null || value === undefined || Number.isNaN(value)) return '—';

	return `${formatNumber(value, { maximumFractionDigits, minimumFractionDigits: 0 }, locale)}%`;
}

export function formatDelta(
	value: number | null | undefined,
	maximumFractionDigits = 1,
	locale = DEFAULT_LOCALE
): string {
	if (value === null || value === undefined || Number.isNaN(value)) return '—';

	return `${formatNumber(
		value,
		{ maximumFractionDigits, minimumFractionDigits: 0, signDisplay: 'exceptZero' },
		locale
	)}%`;
}

export function formatMonth(
	month: string,
	options: { short?: boolean; year?: boolean; locale?: string } = {}
): string {
	const { short = true, year = true, locale = DEFAULT_LOCALE } = options;
	const match = /^(\d{4})-(\d{1,2})$/.exec(month);
	if (!match) return month;

	const date = new Date(Number(match[1]), Number(match[2]) - 1, 1);
	if (Number.isNaN(date.getTime())) return month;

	return new Intl.DateTimeFormat(locale, {
		month: short ? 'short' : 'long',
		...(year ? { year: 'numeric' as const } : {})
	}).format(date);
}

export function formatDate(
	value: string | number | Date | null | undefined,
	options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' },
	locale = DEFAULT_LOCALE
): string {
	if (value === null || value === undefined || value === '') return '—';

	const date = value instanceof Date ? value : new Date(value);
	if (Number.isNaN(date.getTime())) return String(value);

	return new Intl.DateTimeFormat(locale, options).format(date);
}
