<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title?: string;
		subtitle?: string;
		source?: string;
		variant?: 'card' | 'plain';
		class?: string;
		children: Snippet;
	};

	let {
		title,
		subtitle,
		source,
		variant = 'card',
		class: className = '',
		children
	}: Props = $props();
</script>

<div class="card {className}" data-variant={variant}>
	{#if title || subtitle}
		<header>
			{#if title}
				<h3>{title}</h3>
			{/if}
			{#if subtitle}
				<p class="subtitle">{subtitle}</p>
			{/if}
		</header>
	{/if}

	<div class="body">
		{@render children()}
	</div>

	{#if source}
		<footer>{source}</footer>
	{/if}
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 0;
		padding: 1.15rem 1.25rem;
		border: 1px solid var(--chart-border, #e5e7eb);
		border-radius: 1rem;
		background: var(--chart-surface, #ffffff);
		color: var(--chart-text, #111111);
		text-align: left;
	}

	.card[data-variant='plain'] {
		padding: 0;
		border: 0;
		border-radius: 0;
		background: transparent;
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		min-width: 0;
	}

	h3 {
		margin: 0;
		font-size: 1.35rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		line-height: 1.3;
	}

	.subtitle {
		margin: 0;
		color: var(--chart-muted, #6b7280);
		font-size: 1.05rem;
		line-height: 1.4;
	}

	.body {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		min-width: 0;
	}

	footer {
		color: var(--chart-muted, #6b7280);
		font-size: 1.05rem;
		line-height: 1.4;
	}
</style>
