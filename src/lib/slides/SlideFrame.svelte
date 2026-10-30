<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		variant?: 'light' | 'dark';
		header?: 'band' | 'full' | 'none';
		footerLeft?: string;
		footerCenter?: string;
		slideNumber?: string;
		class?: string;
		children: Snippet;
	};

	let {
		variant = 'light',
		header = 'band',
		footerLeft = 'CHERNIVTSI OPEN DATA HACKATHON 3.0',
		footerCenter,
		slideNumber,
		class: className = '',
		children
	}: Props = $props();
</script>

<div class="slide-frame {className}" data-variant={variant} data-header={header}>
	{#if header !== 'none'}
		<div class="slide-banner" data-size={header}>
			<img
				src={header === 'full'
					? '/template/hackathon-banner.png'
					: '/template/hackathon-band.png'}
				alt={header === 'full' ? 'Chernivtsi Open Data Hackathon 3.0' : ''}
				decoding="async"
			/>
		</div>
	{/if}

	<div class="slide-body">
		{@render children()}
	</div>

	<footer class="slide-footer">
		<span class="footer-left">{footerLeft}</span>
		{#if footerCenter}
			<span class="footer-center">{footerCenter}</span>
		{/if}
		{#if slideNumber}
			<span class="slide-page-number">{slideNumber}</span>
		{/if}
	</footer>
</div>

<style>
	.slide-frame {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: var(--slide-bg);
		color: var(--slide-fg);
		text-align: left;
	}

	.slide-frame[data-variant='light'] {
		color-scheme: light;
		--slide-bg: var(--slide-bg-light);
		--slide-fg: var(--slide-fg-light);
		--slide-muted: var(--slide-muted-light);
		--slide-line: var(--slide-line-light);
	}

	.slide-frame[data-variant='dark'] {
		color-scheme: dark;
		--slide-bg: var(--slide-bg-dark);
		--slide-fg: var(--slide-fg-dark);
		--slide-muted: var(--slide-muted-dark);
		--slide-line: var(--slide-line-dark);
	}

	.slide-banner {
		flex: none;
		background: var(--template-black);
		line-height: 0;
	}

	.slide-banner img {
		display: block;
		width: 100%;
		height: auto;
		object-fit: cover;
		object-position: top center;
	}

	.slide-banner[data-size='band'] img {
		aspect-ratio: 2048 / 234;
	}

	.slide-banner[data-size='full'] img {
		aspect-ratio: 2048 / 362;
	}

	.slide-body {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		padding: 3.25rem 4.5rem 0.5rem;
	}

	.slide-frame[data-header='full'] .slide-body,
	.slide-frame[data-header='none'] .slide-body {
		padding: 0;
	}

	.slide-footer {
		display: grid;
		flex: none;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 1rem;
		min-height: 2.75rem;
		padding: 0 4.5rem;
		border-top: 1px solid color-mix(in srgb, var(--slide-fg) 14%, transparent);
		color: var(--slide-muted);
		font-size: 0.66rem;
		font-weight: 500;
		letter-spacing: 0.14em;
		line-height: 1.3;
		text-transform: uppercase;
	}

	.footer-left {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.footer-center {
		justify-self: center;
		text-align: center;
	}

	.slide-page-number {
		justify-self: end;
		color: var(--template-red);
		font-variant-numeric: tabular-nums;
	}

	.slide-frame[data-variant='dark'] .slide-page-number {
		color: var(--template-coral);
	}
</style>
