<script lang="ts">
	import { formatNumber } from '../utils/format';
	import { clamp } from '../utils/scale';

	type Props = {
		label?: string;
		value: number;
		max?: number;
		target?: number;
		format?: (value: number) => string;
		color?: string;
		showValue?: boolean;
		hint?: string;
		class?: string;
	};

	let {
		label,
		value,
		max = 100,
		target,
		format,
		color = 'var(--chart-1, #2563eb)',
		showValue = true,
		hint,
		class: className = ''
	}: Props = $props();

	const formatter = $derived(format ?? ((input: number) => formatNumber(input)));
	const safeMax = $derived(max === 0 ? 1 : max);
	const percent = $derived(clamp((value / safeMax) * 100, 0, 100));
	const targetPercent = $derived(
		target === undefined ? null : clamp((target / safeMax) * 100, 0, 100)
	);
</script>

<div class="progress-bar {className}">
	{#if label || showValue}
		<div class="row">
			{#if label}<span class="label">{label}</span>{/if}
			{#if showValue}
				<span class="value">{formatter(value)}<span class="muted"> / {formatter(max)}</span></span>
			{/if}
		</div>
	{/if}

	<div
		class="track"
		role="progressbar"
		aria-valuemin="0"
		aria-valuemax={max}
		aria-valuenow={value}
		aria-label={label}
	>
		<div class="fill" style:width="{percent}%" style:background={color}></div>
		{#if targetPercent !== null}
			<span class="target" style:left="{targetPercent}%" title="Target"></span>
		{/if}
	</div>

	{#if hint}
		<p class="hint">{hint}</p>
	{/if}
</div>

<style>
	.progress-bar {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		min-width: 0;
		color: var(--chart-text, #111111);
	}

	.row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
		font-size: 1.1rem;
	}

	.label {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: var(--chart-muted, #6b7280);
	}

	.value {
		flex: none;
		font-weight: 500;
		font-variant-numeric: tabular-nums;
	}

	.muted {
		color: var(--chart-muted, #6b7280);
		font-weight: 400;
	}

	.track {
		position: relative;
		height: 0.8rem;
		border-radius: 999px;
		background: var(--chart-grid, #e5e7eb);
		overflow: visible;
	}

	.fill {
		height: 100%;
		border-radius: inherit;
		transition: width 400ms ease;
	}

	.target {
		position: absolute;
		top: -3px;
		width: 2px;
		height: calc(100% + 6px);
		border-radius: 999px;
		background: var(--chart-text, #111111);
		opacity: 0.45;
		transform: translateX(-1px);
	}

	.hint {
		margin: 0;
		color: var(--chart-muted, #6b7280);
		font-size: 1.05rem;
		line-height: 1.4;
	}
</style>
