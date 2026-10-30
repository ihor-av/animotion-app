<script lang="ts">
	import { Presentation, Slide } from '@animotion/core';
	import { ContentSlide, RubricRail, TitleSlide } from '$lib/slides';
</script>

<svelte:head>
	<title>Фінанси Чернівців у відкритих даних</title>
	<meta
		name="description"
		content="Візуалізація фінансових даних Чернівців з відкритих наборів на SvelteKit та Animotion."
	/>
</svelte:head>

<Presentation
	options={{
		controls: false,
		progress: false,
		transition: 'fade',
		width: 1280,
		height: 720,
		margin: 0,
		center: false
	}}
>
	<Slide class="template-slide">
		<TitleSlide
			eyebrow="CHERNIVTSI OPEN DATA HACKATHON 3.0"
			title="Фінанси Чернівців у відкритих даних"
			subtitle="Інтерактивна презентація фінансових даних Чернівецької громади на основі відкритих наборів даних."
			meta={[
				{ label: 'Дані', value: 'Відкриті набори Чернівців' },
				{ label: 'Сховище', value: 'Cloudflare D1' },
				{ label: 'Стек', value: 'SvelteKit · Animotion' }
			]}
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Відкриті дані · Чернівці"
			slideNumber="01"
		/>
	</Slide>

	<Slide class="template-slide">
		<ContentSlide
			eyebrow="Контекст даних"
			title="Про дані"
			lead="Ця презентація використовує відкриті дані Чернівців, які зберігаються в Cloudflare D1. Кожен слайд із числами має показувати джерело, одиниці виміру та дату зрізу, якщо вона є."
			source="Джерело: chernivtsi-finance-v2 · доступ лише для читання"
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Поза оцінюванням"
			slideNumber="02"
		>
			<div class="about-grid">
				<article class="about-card">
					<p class="card-index">01</p>
					<h3>Джерело</h3>
					<p>Відкриті набори даних Чернівецької громади. Походження й обмеження фіксуються для кожного набору окремо.</p>
				</article>
				<article class="about-card">
					<p class="card-index">02</p>
					<h3>Сховище</h3>
					<p>Cloudflare D1 з доступом лише для читання. Запис у дані заборонено, числа не вигадуються й не імпутуються.</p>
				</article>
				<article class="about-card">
					<p class="card-index">03</p>
					<h3>Візуалізація</h3>
					<p>SvelteKit, Animotion і власний набір SVG-компонентів. Один візуальний словник для слайдів і графіків.</p>
				</article>
			</div>

			<div class="rubric-block">
				<div class="rubric-head">
					<p>Порядок оцінювання</p>
					<span>8 критеріїв · фіксована послідовність</span>
				</div>
				<RubricRail compact />
			</div>

			<p class="contract">
				Кожне твердження на слайдах має джерело або явне припущення. Невідомі дані
				позначаються як <strong>not verified</strong>.
			</p>
		</ContentSlide>
	</Slide>
</Presentation>

<style>
	.about-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.about-card {
		min-width: 0;
		padding: 1rem 1.1rem;
		border: 1px solid var(--template-line);
		border-top: 0.3rem solid var(--template-blue);
		background: var(--template-white);
	}

	.about-card:nth-child(2) {
		border-top-color: var(--template-red);
	}

	.about-card:nth-child(3) {
		border-top-color: var(--template-coral);
	}

	.card-index {
		color: var(--template-gray);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		line-height: 1;
	}

	h3 {
		margin-top: 0.35rem;
		color: var(--template-black);
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		line-height: 1.2;
		text-transform: uppercase;
	}

	.about-card p:last-child {
		margin-top: 0.45rem;
		color: var(--template-gray);
		font-size: 0.84rem;
		line-height: 1.4;
	}

	.rubric-block {
		margin-top: 1.1rem;
	}

	.rubric-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.45rem;
	}

	.rubric-head p {
		color: var(--template-black);
		font-size: 0.66rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		line-height: 1.3;
		text-transform: uppercase;
	}

	.rubric-head span {
		color: var(--template-gray);
		font-size: 0.66rem;
		letter-spacing: 0.08em;
		line-height: 1.3;
		text-transform: uppercase;
	}

	.contract {
		margin-top: 0.75rem;
		color: var(--template-gray);
		font-size: 0.72rem;
		line-height: 1.4;
	}

	.contract strong {
		color: var(--template-black);
		font-weight: 700;
	}
</style>
