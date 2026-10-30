<script lang="ts">
	import {
		BarChart,
		ChartCard,
		DataTable,
		DonutChart,
		GroupedBarChart,
		KpiCard,
		LineChart,
		ProgressBar,
		ScatterChart,
		StackedBarChart,
		Treemap,
		WaterfallChart,
		formatCompact,
		formatCurrency,
		formatMonth,
		formatNumber,
		formatPercent
	} from '$lib/charts';
	import {
		arrearsColumns,
		assets,
		enterpriseCategories,
		enterpriseFact,
		enterprisePlan,
		housingDebtManagers,
		landScatter,
		landTenants,
		paymentMonths,
		paymentSeries,
		revenueWaterfall,
		roadsByContractor,
		socialByType,
		socialMonths,
		socialSeries,
		topArrears
	} from '$lib/charts/sample-data';

	const currency = (value: number) => formatCurrency(value, { compact: true });
	const thousands = (value: number) => formatCurrency(value * 1_000, { compact: true });
	const months = (value: number) => `${formatNumber(value, { maximumFractionDigits: 2 })} міс.`;
</script>

<svelte:head>
	<title>Finance dataviz kit</title>
	<meta name="description" content="A small, composable Svelte chart kit for the Chernivtsi finance dataset." />
</svelte:head>

<main class="gallery-page min-h-screen">
	<header class="masthead">
		<img src="/template/hackathon-band.png" alt="Chernivtsi Open Data Hackathon 3.0" />
		<div class="masthead-bar">
			<span>chernivtsi-finance-v2</span>
			<span>Component gallery</span>
			<span>Read-only D1</span>
		</div>
	</header>

	<div class="gallery-shell">
		<header class="gallery-head">
			<p class="gallery-eyebrow"><span></span>Design system · Hackathon 2026</p>
			<h1>Finance dataviz kit</h1>
			<p class="gallery-lede">
				Small SVG and HTML components with one visual language, drawn from the Hackathon 2026
				template. Everything accepts plain arrays and formatting functions, so data can come
				from D1, a CSV, or a hardcoded fixture.
			</p>
			<div class="swatches" aria-label="Template palette">
				<span style="--swatch: #000000">Black</span>
				<span style="--swatch: #ffffff">White</span>
				<span style="--swatch: #ee252f">Red</span>
				<span style="--swatch: #0033a1">Blue</span>
				<span style="--swatch: #d66b47">Coral</span>
				<span style="--swatch: #4a4a4a">Gray</span>
			</div>
		</header>

	<section class="mt-8 grid gap-4 sm:grid-cols-2">
		<KpiCard
			label="Land lease / year"
			value={assets.landAnnualRent}
			format={currency}
			hint="4,273 contracts · 792 ha"
		/>
		<KpiCard
			label="Building lease / year"
			value={assets.buildingAnnualRent}
			format={currency}
			hint="774 leases · 121k m²"
		/>
		<KpiCard
			label="Rent arrears"
			value={assets.buildingArrears}
			format={currency}
			hint="34 tenants with debt"
		/>
		<KpiCard
			label="Parking collection"
			value={assets.parkingCollectionPct}
			format={(value) => formatPercent(value)}
			hint="₴193.8k collected of ₴471k"
			trend={[41.2, 38.4, 44.1, 39.7, 41.2]}
		/>
	</section>

	<section class="mt-4 grid gap-4 lg:grid-cols-2">
		<ChartCard
			title="Road repair spend"
			subtitle="Top contractors by amount spent"
			source="fact_road_project · snapshot 2024-10-18"
		>
			<BarChart data={roadsByContractor} format={currency} labelWidth="9.5rem" />
		</ChartCard>

		<ChartCard
			title="Land rent by tenant type"
			subtitle="Annual rent in the current lease register"
			source="fact_land_lease · 4,678 parcels"
		>
			<DonutChart
				data={landTenants}
				format={currency}
				centerLabel="per year"
				centerValue={currency(assets.landAnnualRent)}
			/>
		</ChartCard>

		<ChartCard
			title="Rental collection"
			subtitle="Charged vs paid by month"
			source="fact_payment · snapshot 2026-10-01"
		>
			<LineChart
				labels={paymentMonths.map((month) => formatMonth(month, { year: false }))}
				series={paymentSeries}
				format={currency}
				area={false}
				showDots
				height={270}
			/>
		</ChartCard>

		<ChartCard
			title="Enterprise plan vs fact"
			subtitle="Q2 2026 · thousand UAH in source"
			source="fact_enterprise_report · enterprise 02005757"
		>
			<GroupedBarChart
				categories={enterpriseCategories}
				series={[
					{ label: 'Plan', values: enterprisePlan, color: 'var(--chart-1, #0033a1)' },
					{ label: 'Fact', values: enterpriseFact, color: 'var(--chart-2, #ee252f)' }
				]}
				format={thousands}
				height={270}
			/>
		</ChartCard>

		<ChartCard
			title="Social payments by month"
			subtitle="2026 · composition by programme"
			source="fact_social_payment · latest 2026-09"
		>
			<StackedBarChart
				categories={socialMonths}
				series={socialSeries}
				format={currency}
				height={270}
			/>
		</ChartCard>

		<ChartCard
			title="Social payments by type"
			subtitle="Where the 2026 money goes"
			source="fact_social_payment · grouped by type"
		>
			<Treemap data={socialByType} format={currency} height={270} />
		</ChartCard>

		<ChartCard
			title="Land area vs annual rent"
			subtitle="Each dot is a lease contract"
			source="fact_land_lease · top contracts by rent"
		>
			<ScatterChart
				points={landScatter}
				formatX={(value) => `${formatNumber(value, { maximumFractionDigits: 2 })} ha`}
				formatY={currency}
				xLabel="Area, ha"
				yLabel="Annual rent"
				trendline
				height={270}
			/>
		</ChartCard>

		<ChartCard
			title="Revenue variance"
			subtitle="Plan → NHSU → paid services → fact"
			source="fact_enterprise_report · enterprise 02005757"
		>
			<WaterfallChart
				data={revenueWaterfall}
				format={(value) => `${formatNumber(value)} тис. ₴`}
				tickFormat={(value) => formatCompact(value)}
				height={270}
			/>
		</ChartCard>

		<ChartCard
			title="Housing debt by manager"
			subtitle="Months of unpaid charges"
			source="v_housing_collection · latest snapshot"
		>
			<div class="grid gap-4">
				{#each housingDebtManagers as manager}
					<ProgressBar
						label={manager.manager}
						value={manager.months}
						max={12}
						format={months}
						color={manager.months > 6 ? 'var(--chart-2, #ee252f)' : 'var(--chart-1, #0033a1)'}
						hint={`Debt ${formatCurrency(manager.liability, { compact: true })}`}
					/>
				{/each}
			</div>
		</ChartCard>

		<ChartCard
			title="Largest rent arrears"
			subtitle="Top tenants by outstanding balance"
			source="v_building_arrears_top"
		>
			<DataTable columns={arrearsColumns} rows={topArrears} maxRows={6} dense />
		</ChartCard>
	</section>

		<footer class="gallery-foot mt-10">
			Sample values are aggregated from the read-only chernivtsi-finance-v2 database. Components
			never talk to D1 directly — load data on the server (or as a fixture) and pass arrays as
			props.
		</footer>
	</div>
</main>

<style>
	.gallery-page {
		background: var(--page-bg);
		color: var(--page-fg);
	}

	.masthead {
		background: var(--template-black);
		border-bottom: 4px solid var(--template-red);
	}

	.masthead img {
		display: block;
		width: 100%;
		height: auto;
	}

	.masthead-bar {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem 1.5rem;
		padding: 0.7rem clamp(1.25rem, 4vw, 2.5rem);
		color: #b8b8b8;
		font-size: 0.64rem;
		font-weight: 500;
		letter-spacing: 0.14em;
		line-height: 1.3;
		text-transform: uppercase;
	}

	.masthead-bar span:last-child {
		color: var(--template-coral);
	}

	.gallery-shell {
		width: min(100%, 76rem);
		margin: 0 auto;
		padding: clamp(2rem, 4vw, 3.5rem) clamp(1.25rem, 4vw, 2.5rem);
	}

	.gallery-head {
		max-width: 52rem;
	}

	.gallery-eyebrow {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		color: var(--template-blue);
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		line-height: 1.3;
		text-transform: uppercase;
	}

	.gallery-eyebrow span {
		width: 0.55rem;
		height: 0.55rem;
		background: var(--template-red);
	}

	.gallery-head h1 {
		margin-top: 0.7rem;
		font-size: clamp(2.2rem, 5vw, 3.5rem);
		font-weight: 700;
		letter-spacing: -0.035em;
		line-height: 0.98;
		text-transform: uppercase;
	}

	.gallery-lede {
		max-width: 62ch;
		margin-top: 0.9rem;
		color: var(--page-muted);
		font-size: 0.95rem;
		line-height: 1.55;
	}

	.swatches {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-top: 1.2rem;
	}

	.swatches span {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.35rem 0.55rem 0.35rem 0.35rem;
		border: 1px solid var(--page-line);
		color: var(--page-muted);
		font-size: 0.62rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		line-height: 1;
		text-transform: uppercase;
	}

	.swatches span::before {
		width: 0.8rem;
		height: 0.8rem;
		border: 1px solid var(--page-line);
		background: var(--swatch);
		content: '';
	}

	.gallery-foot {
		padding-top: 1rem;
		border-top: 1px solid var(--page-line);
		color: var(--page-muted);
		font-size: 0.72rem;
		line-height: 1.55;
	}
</style>
