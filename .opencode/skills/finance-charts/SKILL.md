---
name: finance-charts
description: Svelte finance dataviz components for Animotion slides and dashboards — KPI cards, bar/line/donut/treemap/scatter/waterfall charts, tables, progress bars, and read-only Cloudflare D1 loading. Use when building finance charts, slides, or dashboards with $lib/charts or the chernivtsi-finance-v2 database.
---

# Finance charts

Use this skill when building a finance presentation or dashboard in this repo. The chart kit lives in `src/lib/charts` and is designed to be composed from plain arrays, not tied to D1 or Animotion internals.

## Quick start

```svelte
<script lang="ts">
	import { BarChart, ChartCard, KpiCard, formatCurrency } from '$lib/charts';

	const currency = (value: number) => formatCurrency(value, { compact: true });

	const spend = [
		{ label: 'Contractor A', value: 48_600_000 },
		{ label: 'Contractor B', value: 29_800_000 }
	];
</script>

<div class="grid grid-cols-4 gap-4">
	<KpiCard label="Annual rent" value={270_526_906.98} format={currency} hint="4,273 contracts" />

	<ChartCard title="Spend by contractor" subtitle="Road repairs" source="fact_road_project">
		<BarChart data={spend} format={currency} />
	</ChartCard>
</div>
```

Every chart is pure: it takes data + formatting, renders responsive HTML/SVG, and never fetches. Wrap charts in `ChartCard` for a consistent title/subtitle/source frame. Use `variant="plain"` on `ChartCard` when placing charts directly on a slide.

## Files

- `src/lib/charts/index.ts` — public imports and formatters.
- `src/lib/charts/components/` — one component per file.
- `src/lib/charts/types.ts` — shared data types.
- `src/lib/charts/utils/` — scales, SVG paths, formatting, palette, treemap layout.
- `src/lib/charts/sample-data.ts` — real aggregates used by the gallery.
- `src/routes/gallery/+page.svelte` — working examples of every component.
- `src/lib/server/d1.ts` — server-only D1 REST helper.
- `src/styles/app.css` — chart CSS variables (`--chart-*`).

## Data types

```ts
type ChartDatum = { label: string; value: number; color?: string };
type ChartSeries = { label: string; values: (number | null)[]; color?: string };
type ScatterPoint = { x: number; y: number; label?: string; size?: number; color?: string };
type WaterfallDatum = { label: string; value: number; total?: boolean };
type TableColumn = {
	key: string;
	label: string;
	align?: 'left' | 'center' | 'right';
	format?: (value: unknown, row: Record<string, unknown>) => string;
};
```

`ChartSeries.values` can contain `null`; `LineChart` breaks the line at gaps, while bar charts treat `null` as 0 (stacked/grouped) because a missing bar is usually zero visually.

## Components

### ChartCard

Frame for any chart. Props: `title`, `subtitle`, `source`, `variant: 'card' | 'plain'` (default `card`), `class`, `children`.

```svelte
<ChartCard title="Rental collection" subtitle="Charged vs paid" source="fact_payment">
	<LineChart ... />
</ChartCard>
```

### KpiCard

Props: `label`, `value: number | string`, `format?: (n) => string`, `delta?: number`, `deltaLabel?`, `hint?`, `trend?: (number|null)[]`, `trendColor?`, `variant: 'card' | 'plain'`, `class`.

`delta` is a percentage and is coloured positive/negative automatically. `trend` renders a small sparkline.

### BarChart

Single-series bars. Default orientation is **horizontal**, which is best for long Ukrainian labels.

Props: `data: ChartDatum[]`, `orientation?: 'horizontal' | 'vertical'` (default horizontal), `height?` (vertical only, default 280), `labelWidth?` (default `10rem`), `format?`, `tickFormat?`, `color?`, `showValues?` (default true), `max?`, `class`, `ariaLabel`.

```svelte
<BarChart data={roadsByContractor} format={currency} labelWidth="9.5rem" />
```

### GroupedBarChart

Compare 2–4 series across categories (for example plan vs fact). Vertical only.

Props: `categories: string[]`, `series: ChartSeries[]`, `height?` (280), `format?`, `tickFormat?`, `showValues?` (false), `showLegend?` (true), `max?`, `class`, `ariaLabel`.

```svelte
<GroupedBarChart
	categories={['Revenue', 'Costs', 'Profit']}
	series={[
		{ label: 'Plan', values: [100, 60, 40] },
		{ label: 'Fact', values: [120, 70, 50] }
	]}
	format={currency}
/>
```

### StackedBarChart

Composition over categories or time. Set `percent` for a 100% stacked view.

Props: `categories`, `series`, `height?` (280), `percent?` (false), `format?`, `tickFormat?`, `showValues?` (false), `showTotals?` (false), `showLegend?` (true), `class`, `ariaLabel`.

Negative values are clamped to 0; use a waterfall or line chart if negatives matter.

### LineChart

Time series or ordered values. Supports gaps (`null`), multiple series, optional area fill.

Props: `labels: string[]`, `series: ChartSeries[]`, `height?` (280), `format?`, `tickFormat?`, `area?` (true), `showDots?` (false), `showLegend?` (true), `xLabelEvery?`, `zero?` (true), `strokeWidth?` (2), `class`, `ariaLabel`.

```svelte
<LineChart
	labels={paymentMonths.map((month) => formatMonth(month))}
	series={paymentSeries}
	format={currency}
	area={false}
	showDots
/>
```

### DonutChart

Pie/donut with grouped small slices. `innerRadius` is a fraction of the outer radius: `0` = pie, `0.62` = donut.

Props: `data: ChartDatum[]`, `size?` (220), `innerRadius?` (0.62), `centerLabel?`, `centerValue?`, `format?`, `showLegend?` (true), `maxSlices?` (8), `otherLabel?` ('Інше'), `class`, `ariaLabel`.

Values must be positive. Slices are sorted descending; everything after `maxSlices - 1` is grouped.

### Treemap

Flat composition where area encodes value. Good for many categories where a pie becomes unreadable.

Props: `data: ChartDatum[]`, `height?` (300), `format?`, `showValues?` (true), `class`, `ariaLabel`.

Labels are truncated to fit; the full label is in the SVG tooltip.

### ScatterChart

Relationship between two numeric fields, optional linear trendline.

Props: `points: ScatterPoint[]`, `height?` (300), `xLabel?`, `yLabel?`, `formatX?`, `formatY?`, `color?`, `size?` (5), `trendline?` (false), `zero?` (false), `class`, `ariaLabel`.

`point.size` maps to a larger radius if provided.

### WaterfallChart

Finance-style variance bridge. Every `delta` starts from the running total; a `total: true` entry draws a bar from zero to the running total.

Props: `data: WaterfallDatum[]`, `height?` (300), `format?`, `tickFormat?`, `showValues?` (true), `positiveColor?`, `negativeColor?`, `totalColor?`, `class`, `ariaLabel`.

```ts
const revenue = [
	{ label: 'Plan', value: 31_653.7 },
	{ label: 'NHSU', value: 7_727.5 },
	{ label: 'Paid services', value: -18.1 },
	{ label: 'Fact', value: 0, total: true }
];
```

### ProgressBar

HTML progress bar for execution, collection rate, debt months, etc.

Props: `label?`, `value`, `max?` (100), `target?`, `format?`, `color?`, `showValue?` (true), `hint?`, `class`.

### DataTable

Compact table for details that do not belong in a chart.

Props: `columns: TableColumn[]`, `rows: Record<string, unknown>[]`, `maxRows?` (10), `dense?` (false), `caption?`, `class`.

```ts
const columns: TableColumn[] = [
	{ key: 'tenant', label: 'Tenant' },
	{ key: 'debt', label: 'Debt', align: 'right', format: (v) => formatCurrency(Number(v)) }
];
```

### Legend / Sparkline

`Legend` takes `items: { label, color?, value? }[]`, `align?`, `class`. `Sparkline` takes `data`, `width?`, `height?`, `color?`, `area?`, `strokeWidth?`, `class`. Charts already render legends; use these directly only for custom layouts.

## Formatting

Always format at the edge. The kit provides:

```ts
formatNumber(value, options?, locale?) // 12 345
formatCompact(value) // 12,3 тис.
formatCurrency(value, { compact?: boolean }) // 12 345 ₴ / 12,3 млн ₴
formatPercent(value, digits?) // 41,2%
formatDelta(value) // +12,4%
formatMonth('2026-09') // вер. 2026
formatMonth('2026-09', { year: false }) // вер.
formatDate(value)
```

Defaults use `uk-UA`, which fits the dataset. Pass a custom `format` function when a table is in thousands or the presentation should be English.

## Typography and labels

The kit is tuned for slides, not dense dashboards:

- SVG axis labels/ticks are 22 viewBox units and values are 20; supporting HTML text is 16–17px. The smallest SVG labels are roughly 2.2x the original sizes.
- `GroupedBarChart` and `WaterfallChart` rotate category labels when any label is longer than 7 characters.
- `BarChart` and `LineChart` automatically thin dense x-axis labels.
- `StackedBarChart` `showTotals` works best with 6 or fewer categories; with 8+ the total labels collide, so leave it off and use a `DataTable` or tooltip.
- On a slide, prefer a 2x2 KPI grid over 4-across when labels are long.

## Design tokens

Charts use CSS variables from `src/styles/app.css`:

- Series: `--chart-1` … `--chart-8` (fixed, white-text-safe).
- Neutrals: `--chart-text`, `--chart-muted`, `--chart-border`, `--chart-grid`, `--chart-axis`, `--chart-surface`.
- Semantics: `--chart-positive`, `--chart-negative`.

Override `--chart-surface`, `--chart-border`, `--chart-grid`, `--chart-muted` on a wrapper to make charts blend into a slide. `ChartCard variant="plain"` removes card chrome; charts then use the slide background.

## Animotion integration

A slide is a fixed 960×700 canvas scaled by Reveal. Do not use `vh`/`vw`; use the slide's own layout.

```svelte
<script lang="ts">
	import { Presentation, Slide } from '@animotion/core';
	import { ChartCard, KpiCard, LineChart, formatCurrency } from '$lib/charts';
</script>

<Presentation options={{ controls: false, progress: false, transition: 'fade' }}>
	<Slide class="h-full place-content-center place-items-center">
		<div class="grid w-full grid-cols-4 gap-4">
			<KpiCard label="Annual rent" value={270_526_906.98} format={(v) => formatCurrency(v, { compact: true })} />
			<KpiCard label="Arrears" value={943_541.23} format={(v) => formatCurrency(v, { compact: true })} />
			<KpiCard label="Parking collection" value={41.2} format={(v) => formatPercent(v)} />
			<KpiCard label="Leases" value={774} />
		</div>

		<ChartCard title="Rental collection" variant="plain" class="mt-8 w-full">
			<LineChart labels={months} series={series} format={(v) => formatCurrency(v, { compact: true })} />
		</ChartCard>
	</Slide>
</Presentation>
```

Rules of thumb:

- 4 KPI cards per row, 2 charts per row, one big chart per slide.
- On a `Slide`, add `w-full` to grids/cards so they do not shrink to content.
- Prefer `variant="plain"` for slides; keep default cards for standalone dashboards/gallery.
- `ChartCard`/`KpiCard` already use the theme's font and colors; do not restyle internals with Tailwind.
- Long Ukrainian labels: use horizontal `BarChart` or shorten labels; axis labels truncate at 13 chars and keep the full text in the tooltip.
- Keep category/unit labels in the chart, not in 8-line subtitles.

## Loading data from D1

The only database is `chernivtsi-finance-v2`:

- Account: `ce0212e5bd1959d094384750a1e5e78b`
- Database: `e493b2d5-3d7d-475f-b108-3b6f1cc0891d`
- 31 tables, 23 views, ~374k rows.

Credentials come from private env vars. Never import `$lib/server/d1` into a `.svelte` file or expose `CF_D1_TOKEN` to the browser.

```bash
# .env (gitignored)
CF_ACCOUNT_ID=ce0212e5bd1959d094384750a1e5e78b
CF_D1_DATABASE_ID=e493b2d5-3d7d-475f-b108-3b6f1cc0891d
CF_D1_TOKEN=...
```

Server load pattern:

```ts
// src/routes/+page.server.ts
import { queryD1 } from '$lib/server/d1';

export async function load() {
	const rows = await queryD1<{ manager: string; liability: number }>(`
		SELECT manager, ROUND(SUM(liability), 2) AS liability
		FROM v_housing_latest
		GROUP BY manager
		ORDER BY liability DESC
		LIMIT 8
	`);

	return { rows };
}
```

In the slide/page, receive `data` and map it into chart props. With `adapter-static` and `prerender = true`, server loads run at build time. For live data, add `export const prerender = false` to that route and use a server endpoint/`+page.server.ts` on a Node host, or refresh the data before building the deck.

Useful views (prefer these to avoid duplicate snapshots):

- `v_catalog`, `v_assets_summary`, `v_quality_summary`
- `v_housing_latest`, `v_housing_collection`
- `v_land_contracts`, `v_land_tenants`, `v_land_expiry`
- `v_enterprise_latest`, `v_building_arrears_top`, `v_building_expiry`
- `v_parking_latest`, `v_social_latest`, `v_tariff_latest`, `v_uses`

Data caveats:

- `fact_enterprise_report.plan/fact` are in **thousand UAH**; most other money columns are UAH. Normalise before charting.
- `fact_housing_account.year/month` snapshots are inconsistent; use `v_housing_latest` / `v_housing_collection`.
- `fact_social_payment` has missing months (for example February 2026); `LineChart` handles `null`, but do not interpolate silently.
- `fact_land_lease` is almost entirely `lease_type = 'Оренда'`, `lease_status = 'Чинний'`; group by tenant/area/rent instead.
- `fact_land_lease.area_ha` in hectares; building areas in m²; parking/rent amounts in UAH.
- `snapshot_date` can be `'unknown'`; the latest views already filter it.
- `quality_flags` and `data_quality_issue`/`v_quality_summary` mark missing geom/debt/rent; show a data-quality note on the slide if relevant.

## Verification

```bash
npm run check
npm run build
npm run dev
```

Open `/gallery` to see every component with real aggregates. Add new examples there before using a component in a slide.

## Gotchas

- `StackedBarChart` and `GroupedBarChart` expect `series[i].values` aligned with `categories`; use `null` or `0` for missing.
- `StackedBarChart` totals can overlap when there are many categories; keep `showTotals` off for 7+ categories.
- `BarChart` horizontal sorting is preserved; sort data descending yourself for rankings.
- Currency formatters default to UAH and `uk-UA`; an English deck should pass `formatCurrency(v, { locale: 'en-US' })` or a custom formatter.
- `DonutChart` needs positive values; zero/negative slices are ignored. Use `maxSlices` when there are many categories.
- `WaterfallChart` totals use the running total; to show an opening balance, make it the first delta from zero.
- Chord/heatmap/gauge components do not exist yet. Use `ProgressBar` for collection rates and `DonutChart` for a single percentage.
- All charts use `aria-label` and `<title>` tooltips, but if you remove labels for a visual effect, keep the surrounding `ChartCard` title meaningful.
- Inside a `Slide`, do not add `<section>` wrappers (Reveal styles nested sections) and do not reuse Reveal's class names (`progress`, `slides`, `reveal`, `fragment`). `ChartCard` and `ProgressBar` already use safe wrappers.
- When a `ChartCard` is stretched by a grid, its body centers the chart; use `class="h-full"` on the card so the chart has room.
