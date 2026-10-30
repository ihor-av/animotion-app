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

<main
	class="min-h-screen px-5 py-10 md:px-10 md:py-14"
	style="background: var(--r-background-color); color: var(--r-main-color)"
>
	<header class="mx-auto max-w-6xl">
		<p class="text-[0.7rem] font-medium uppercase tracking-[0.22em] opacity-50">
			chernivtsi-finance-v2 · component gallery
		</p>
		<h1 class="mt-2 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Finance dataviz kit</h1>
		<p class="mt-3 max-w-2xl text-sm leading-6 opacity-60">
			Small SVG and HTML components with one visual language. Everything accepts plain arrays and
			formatting functions, so data can come from D1, a CSV, or a hardcoded fixture.
		</p>
	</header>

	<section class="mx-auto mt-8 grid max-w-6xl gap-3 sm:grid-cols-2">
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

	<section class="mx-auto mt-3 grid max-w-6xl gap-3 lg:grid-cols-2">
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
					{ label: 'Plan', values: enterprisePlan, color: 'var(--chart-1, #2563eb)' },
					{ label: 'Fact', values: enterpriseFact, color: 'var(--chart-2, #0d9488)' }
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
						color={manager.months > 6 ? 'var(--chart-4, #dc2626)' : 'var(--chart-1, #2563eb)'}
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

	<footer class="mx-auto mt-10 max-w-6xl text-xs leading-5 opacity-50">
		Sample values are aggregated from the read-only chernivtsi-finance-v2 database. Components never talk
		to D1 directly — load data on the server (or as a fixture) and pass arrays as props.
	</footer>
</main>
