<script lang="ts">
	import type { TableColumn } from '../types';
	import { formatNumber } from '../utils/format';

	type Props = {
		columns: TableColumn[];
		rows: Record<string, unknown>[];
		maxRows?: number;
		dense?: boolean;
		caption?: string;
		class?: string;
	};

	let {
		columns,
		rows,
		maxRows = 10,
		dense = false,
		caption,
		class: className = ''
	}: Props = $props();

	const visibleRows = $derived(rows.slice(0, maxRows));

	function cellValue(column: TableColumn, row: Record<string, unknown>): string {
		const value = row[column.key];

		if (column.format) return column.format(value, row);
		if (value === null || value === undefined || value === '') return '—';
		if (typeof value === 'number') return formatNumber(value);
		if (typeof value === 'boolean') return value ? 'Yes' : 'No';

		return String(value);
	}
</script>

<div class="table-wrap {className}">
	<table data-dense={dense}>
		{#if caption}
			<caption>{caption}</caption>
		{/if}
		<thead>
			<tr>
				{#each columns as column}
					<th scope="col" data-align={column.align ?? 'left'}>{column.label}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each visibleRows as row, index (index)}
				<tr>
					{#each columns as column}
						<td data-align={column.align ?? 'left'}>{cellValue(column, row)}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	{#if rows.length > visibleRows.length}
		<p class="more">Showing {visibleRows.length} of {rows.length} rows</p>
	{/if}
</div>

<style>
	.table-wrap {
		min-width: 0;
		overflow-x: auto;
		color: var(--chart-text, #111111);
		text-align: left;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 1.15rem;
		line-height: 1.35;
	}

	caption {
		padding-bottom: 0.5rem;
		color: var(--chart-muted, #6b7280);
		font-size: 1.05rem;
		text-align: left;
	}

	.table-wrap th {
		padding: 0.45rem 0.55rem;
		border-bottom: 1px solid var(--chart-border, #e5e7eb);
		color: var(--chart-muted, #6b7280);
		font-size: 1rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.table-wrap td {
		padding: 0.55rem;
		border-bottom: 1px solid var(--chart-border, #e5e7eb);
		vertical-align: top;
	}

	.table-wrap tbody tr:last-child td {
		border-bottom: 0;
	}

	.table-wrap [data-dense='true'] th,
	.table-wrap [data-dense='true'] td {
		padding: 0.35rem 0.45rem;
	}

	[data-align='left'] {
		text-align: left;
	}

	[data-align='right'] {
		text-align: right;
		font-variant-numeric: tabular-nums;
	}

	[data-align='center'] {
		text-align: center;
	}

	.more {
		margin: 0.55rem 0 0;
		color: var(--chart-muted, #6b7280);
		font-size: 1rem;
	}
</style>
