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
		padding: 1.1rem 1.2rem;
		border: 1px solid var(--chart-border, #d9d9d9);
		border-top: 3px solid var(--template-red, #ee252f);
		border-radius: 0;
		background: var(--chart-surface, #ffffff);
		color: var(--chart-text, #000000);
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
		font-size: 1.05rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		line-height: 1.25;
		text-transform: uppercase;
	}

	.subtitle {
		margin: 0;
		color: var(--chart-muted, #4a4a4a);
		font-size: 0.94rem;
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
		padding-top: 0.65rem;
		border-top: 1px solid var(--chart-border, #d9d9d9);
		color: var(--chart-muted, #4a4a4a);
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		line-height: 1.4;
		text-transform: uppercase;
	}
</style>
