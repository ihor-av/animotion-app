<script lang="ts">
	import { Presentation, Slide } from '@animotion/core';
	import { ContentSlide, MetricSlide, RubricRail, SlideFrame, TitleSlide } from '$lib/slides';

	const problems = [
		{
			index: '01',
			title: 'Розкидано',
			text: 'Портали, форми, карти й черги не пов’язані між собою.'
		},
		{
			index: '02',
			title: 'Дорого часом',
			text: 'Кожне питання — новий пошук і новий дзвінок.'
		},
		{
			index: '03',
			title: 'Не для всіх',
			text: 'Найбільше платять люди з низькою цифровою грамотністю.'
		}
	];

	const dataTools = [
		{ name: 'v_assets_summary', desc: 'Земля, будівлі, оренда, борги' },
		{ name: 'v_roads_spend', desc: 'Кошти на дороги' },
		{ name: 'v_housing_collection', desc: 'Збори й заборгованість' },
		{ name: 'v_parking_latest', desc: 'Паркування' },
		{ name: 'v_land_contracts', desc: 'Земельні договори' },
		{ name: 'v_catalog', desc: '121 набір у каталозі' }
	];

	const innovations = [
		{
			index: '01',
			title: 'Tool output = живий UI',
			text: 'Застосунок збирається під конкретний запит, а не з готового віджета.'
		},
		{
			index: '02',
			title: 'Стан і пристрій',
			text: 'GPS, ETA й маршрут — у хостовому runtime.'
		},
	];

	const marketMetrics = [
		{ label: 'Каталог', value: '121', hint: 'набір у DATA.md' },
		{ label: 'Пілот', value: '3–5', hint: 'послуг; оцінка' },
		{ label: 'Runtime', value: '1', hint: 'для всіх громад' },
		{ label: 'Нові екрани', value: '0', hint: 'design goal' }
	];

	const marketSteps = [
		{
			number: '01',
			title: 'Чернівці',
			text: '1–2 департаменти, 3–5 послуг, 20–50 тестових користувачів.'
		},
		{
			number: '02',
			title: 'Сусідні громади',
			text: 'Той самий runtime, нові tools і локальні набори даних.'
		},
		{
			number: '03',
			title: 'Національний шаблон',
			text: 'Відкритий core та інтеграції для громад з відкритими даними.'
		}
	];

	const impactCards = [
		{
			index: '01',
			title: 'Люди',
			text: 'Швидша відповідь, маршрут і зрозумілі джерела. Менше часу на пошук.'
		},
		{
			index: '02',
			title: 'Громада',
			text: 'Прозоріші дані про оренду, борги й дороги. Більше довіри до міста.'
		},
		{
			index: '03',
			title: 'Місто',
			text: 'Менше повторюваних звернень. Час команди — на складні кейси.'
		}
	];

	const archSteps = [
		{ number: '01', title: 'Chat', text: 'Telegram зараз; web — далі.' },
		{ number: '02', title: 'Orchestrator', text: 'Cloudflare Worker + DO.' },
		{ number: '03', title: 'Tools / MCP', text: 'D1, міські API, карти.' },
		{ number: '04', title: 'UI runtime', text: 'Схема → Svelte; GPS bridge.' }
	];

	const costItems = [
		{ label: 'Хостинг', value: '$5/міс', hint: 'Workers Paid; оцінка' },
		{ label: 'D1', value: 'малий обсяг', hint: 'росте із запитами' },
		{ label: 'Модель', value: 'за токени', hint: 'вимірюємо в пілоті' },
		{ label: 'Дані', value: '1–2 дні/міс', hint: 'оновлення й перевірка' },
		{ label: 'Підтримка', value: '0.5 FTE/міс', hint: 'оцінка' },
		{ label: 'Нова послуга', value: '2–4 тижні', hint: 'tool + UI' }
	];

	const businessStreams = [
		{
			index: '01',
			title: 'Пілот громади',
			text: 'Фіксована ціна за 3–5 послуг; оплата з бюджету digital.'
		},
		{
			index: '02',
			title: 'SaaS + SLA',
			text: 'Річна підписка: runtime, оновлення, підтримка.'
		},
		{
			index: '03',
			title: 'Інтеграції + гранти',
			text: 'Нові tools, партнери, EU/UNDP/GIZ.'
		}
	];

	const closingSteps = [
		{
			number: '01',
			title: 'Тиждень 1–2',
			text: '3 tools: фінанси, активи, дороги.'
		},
		{
			number: '02',
			title: 'Тиждень 3',
			text: 'Мінізастосунок маршруту: концепт → прототип.'
		},
		{
			number: '03',
			title: 'Тиждень 4',
			text: '20 користувачів, KPI, рішення про продовження.'
		}
	];
</script>

<svelte:head>
	<title>City Copilot — розмовний помічник для міських послуг</title>
	<meta
		name="description"
		content="City Copilot: чат, який перетворює відкриті дані Чернівців на відповіді та живі мінізастосунки."
	/>
</svelte:head>

<Presentation
	options={{
		controls: false,
		progress: false,
		transition: 'none',
		width: 1280,
		height: 720,
		margin: 0,
		center: false
	}}
>
	<Slide class="template-slide">
		<TitleSlide
			eyebrow="CHERNIVTSI OPEN DATA HACKATHON 3.0"
			title="City Copilot"
			subtitle="Розмовний помічник для міських послуг: відповідає текстом, а коли тексту мало — збирає живий мінізастосунок у чаті."
			meta={[
				{ label: 'Контекст', value: 'Відкриті дані Чернівців' },
				{ label: 'Шар даних', value: 'Cloudflare D1 + tools' },
				{ label: 'Стек', value: 'SvelteKit · Animotion' }
			]}
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Прототип · 2026"
			slideNumber="01"
		/>
	</Slide>

	<Slide class="template-slide">
		<ContentSlide
			eyebrow="Критерій 01 · 8 · Проблема"
			title="Місто розкладене на десятки вікон"
			lead="Люди питають природною мовою. Місто відповідає PDF або формою."
			source="Гіпотеза проблеми для пілоту. Каталог: 121 набір; D1: 31 таблиця, 23 подання (DATA.md)."
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Критерій 01 з 8"
			slideNumber="02"
		>
			<div class="problem-layout">
				<blockquote class="citizen-quote">
					<p>
						«Коли відремонтують вулицю X? Як доїхати до гуртожитку на вулиці N і
						поїсти дорогою?»
					</p>
					<cite>Типове питання сьогодні розкладається на кілька сервісів</cite>
				</blockquote>

				<div class="pain-grid">
					{#each problems as problem}
						<article class="pain-card">
							<span class="pain-index">{problem.index}</span>
							<h3>{problem.title}</h3>
							<p>{problem.text}</p>
						</article>
					{/each}
				</div>

				<div class="solution-strip">
					<span class="solution-label">Рішення</span>
					<p>
						<strong>City Copilot</strong> — один чат, який знає місто і відповідає
						текстом або живим мінізастосунком.
					</p>
				</div>
			</div>
		</ContentSlide>
	</Slide>

	<Slide class="template-slide">
		<ContentSlide
			eyebrow="Критерій 02 · 8 · Відкриті дані"
			title="Дані — це контекст дії"
			lead="City Copilot підключає авторитетні міські дані як tools. Перший шар — фінанси й активи Чернівців у Cloudflare D1."
			source="Джерело: chernivtsi-finance-v2 · DATA.md · 24 завантажені набори. Ремонти, транспорт і POI — roadmap."
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Критерій 02 з 8"
			slideNumber="03"
		>
			<div class="data-layout">
				<div class="data-grid">
					{#each dataTools as tool}
						<article class="data-tool">
							<code>{tool.name}</code>
							<p>{tool.desc}</p>
						</article>
					{/each}
				</div>

				<div class="data-note">
					<span class="note-label">Далі</span>
					<p>Ремонти, транспорт, POI, черги — нові tools, без нових екранів.</p>
					<span class="readonly">D1 · лише читання · без вигаданих чисел</span>
				</div>
			</div>
		</ContentSlide>
	</Slide>

	<Slide class="template-slide">
		<ContentSlide
			eyebrow="Критерій 03 · 8 · Інновації"
			title="Відповідь — це застосунок"
			lead="Замість меню й екранів — чат. Замість статичної відповіді — мінізастосунок, який живе в чаті."
			source="Концепт. Поточний прототип: чат + D1 tools. Мінізастосунки — наступний шар."
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Критерій 03 з 8"
			slideNumber="04"
		>
			<div class="innovation-grid">
				<div class="chat-panel">
					<div class="chat-head">
						<span>City Copilot</span>
						<span class="live-dot">live</span>
					</div>
					<div class="chat-row user">
						<span class="chat-label">Ви</span>
						<p>Хочу до гуртожитку на вул. N і поїсти дорогою.</p>
					</div>
					<div class="chat-row bot">
						<span class="chat-label">Copilot</span>
						<p>Ось маршрут. Я стежу за вашою позицією.</p>
					</div>

					<div class="micro-app">
						<div class="map" aria-hidden="true">
							<span class="map-grid"></span>
							<span class="route"></span>
							<span class="marker start">Ви</span>
							<span class="marker food">Їжа</span>
							<span class="marker end">Гуртожиток</span>
							<div class="map-bar">
								<span>ETA live</span>
								<span>Оновити маршрут</span>
							</div>
						</div>
					</div>
				</div>

				<div class="innovation-points">
					{#each innovations as point}
						<article>
							<span>{point.index}</span>
							<h3>{point.title}</h3>
							<p>{point.text}</p>
						</article>
					{/each}
					<p class="innovation-note">
						<strong>Нова послуга = tool.</strong> Додаємо tool + мінізастосунок, без нового екрана.
					</p>
				</div>
			</div>
		</ContentSlide>
	</Slide>

	<Slide class="template-slide">
		<MetricSlide
			eyebrow="Критерій 04 · 8 · Ринок"
			title="Один runtime — багато громад"
			lead="Старт — Чернівці. Далі — громади з відкритими даними."
			metrics={marketMetrics}
			columns={4}
			source="121 — DATA.md (v_catalog). 3–5 послуг і 20–50 тестів — оцінка пілоту; перевіряємо."
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Критерій 04 з 8"
			slideNumber="05"
		>
			<div class="steps">
				{#each marketSteps as step}
					<article class="step">
						<span class="step-number">{step.number}</span>
						<h3>{step.title}</h3>
						<p>{step.text}</p>
					</article>
				{/each}
			</div>
		</MetricSlide>
	</Slide>

	<Slide class="template-slide">
		<ContentSlide
			eyebrow="Критерій 05 · 8 · Вплив"
			title="Менше бар'єрів — більше участі"
			lead="Одна розмова замість десятків вікон. City Copilot знижує ціну доступу до міста."
			source="Гіпотеза впливу. KPI пілоту: time-to-answer, task completion, satisfaction, staff time."
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Критерій 05 з 8"
			slideNumber="06"
		>
			<div class="impact-layout">
				<div class="impact-grid">
					{#each impactCards as card}
						<article class="impact-card">
							<span class="impact-index">{card.index}</span>
							<h3>{card.title}</h3>
							<p>{card.text}</p>
						</article>
					{/each}
				</div>

				<div class="before-after">
					<div>
						<span class="ba-label">Було</span>
						<p>Пошук по порталах, форми, дзвінки</p>
					</div>
					<span class="arrow">→</span>
					<div>
						<span class="ba-label">Стало</span>
						<p>Одна розмова + живий мінізастосунок</p>
					</div>
				</div>
			</div>
		</ContentSlide>
	</Slide>

	<Slide class="template-slide">
		<ContentSlide
			eyebrow="Критерій 06 · 8 · Техніка"
			title="Прототип уже розмовляє"
			lead="Живий Telegram-бот, read-only D1 tools, графіки й нотатки. Мінізастосунки — наступний шар на тому самому runtime."
			source="Live: team-notes-bot · animotion-app · GitHub CI green · D1 31 таблиця / 23 подання."
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Критерій 06 з 8"
			slideNumber="07"
		>
			<div class="tech-layout">
				<div class="arch">
					{#each archSteps as step}
						<div class="arch-step">
							<span>{step.number}</span>
							<h3>{step.title}</h3>
							<p>{step.text}</p>
						</div>
						{#if step.number !== '04'}
							<span class="arch-arrow">→</span>
						{/if}
					{/each}
				</div>

				<div class="built-next">
					<div>
						<span class="built-label">Зараз</span>
						<p>Чат, D1 read-only, графіки, нотатки, Cloudflare CI/CD.</p>
					</div>
					<div>
						<span class="built-label next">Далі</span>
						<p>Мінізастосунки, GPS bridge, ремонти/транспорт/POI, авторизація пілоту.</p>
					</div>
				</div>
			</div>
		</ContentSlide>
	</Slide>

	<Slide class="template-slide">
		<ContentSlide
			eyebrow="Критерій 07 · 8 · Витрати"
			title="Дешево запустити, реально підтримувати"
			lead="Інфраструктура — Cloudflare Workers + D1. Нові послуги — це tool + мінізастосунок, а не новий екран."
			source="Оцінки для пілоту. Cloudflare Workers Paid $5/міс — перевірити pricing. Не фінансова порада."
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Критерій 07 з 8"
			slideNumber="08"
		>
			<div class="cost-grid">
				{#each costItems as item}
					<article class="cost-item">
						<span>{item.label}</span>
						<strong>{item.value}</strong>
						<p>{item.hint}</p>
					</article>
				{/each}
			</div>
		</ContentSlide>
	</Slide>

	<Slide class="template-slide">
		<ContentSlide
			eyebrow="Критерій 08 · 8 · Бізнес-модель"
			title="Хто платить за місто, що відповідає"
			lead="Муніципальний SaaS + інтеграції + гранти на пілот. Відкритий core, щоб громади не платили за кожен екран."
			source="Гіпотеза бізнес-моделі; ціни й попит перевіряємо з 3 пілотами."
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Критерій 08 з 8"
			slideNumber="09"
		>
			<div class="business-layout">
				<div class="business-grid">
					{#each businessStreams as stream}
						<article class="business-card">
							<span>{stream.index}</span>
							<h3>{stream.title}</h3>
							<p>{stream.text}</p>
						</article>
					{/each}
				</div>

				<div class="flow">1 runtime → N громад → нові tools → підписка</div>
				<p class="partners">Цільові партнери: міська рада · open-data команда · ГО</p>
			</div>
		</ContentSlide>
	</Slide>

	<Slide class="template-slide">
		<SlideFrame
			variant="dark"
			header="band"
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Дякуємо"
			slideNumber="10"
		>
			<div class="closing-stage">
				<div class="closing-copy">
					<p class="slide-eyebrow closing-eyebrow">Далі</p>
					<h2>Пілот за 30 днів</h2>
					<p class="closing-lead">
						Чернівці → 3 послуги → 20 користувачів → KPI → рішення про продовження.
					</p>
				</div>

				<div class="closing-steps">
					{#each closingSteps as step}
						<article>
							<span>{step.number}</span>
							<h3>{step.title}</h3>
							<p>{step.text}</p>
						</article>
					{/each}
				</div>

				<p class="closing-ask">
					Потрібні: 1 департамент · 3 набори · 20 тестових користувачів.
				</p>

				<div class="closing-links">
					<span>Live: animotion-app.hackaton-scope-creep.workers.dev</span>
					<span>Bot: team-notes-bot.hackaton-scope-creep.workers.dev</span>
					<span>Code: github.com/ihor-av/animotion-app</span>
				</div>

				<RubricRail />
			</div>
		</SlideFrame>
	</Slide>
</Presentation>

<style>
	.problem-layout {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		height: 100%;
	}

	.citizen-quote {
		padding: 0.7rem 1rem;
		border-left: 0.35rem solid var(--template-red);
		background: var(--template-paper);
	}

	.citizen-quote p {
		font-size: 1.02rem;
		font-weight: 600;
		line-height: 1.35;
	}

	.citizen-quote cite {
		display: block;
		margin-top: 0.35rem;
		color: var(--template-gray);
		font-size: 0.64rem;
		font-style: normal;
		letter-spacing: 0.1em;
		line-height: 1.3;
		text-transform: uppercase;
	}

	.pain-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.8rem;
	}

	.pain-card {
		padding: 0.65rem 0.85rem;
		border: 1px solid var(--template-line);
		border-top: 0.3rem solid var(--template-blue);
		background: var(--template-white);
	}

	.pain-card:nth-child(2) {
		border-top-color: var(--template-red);
	}

	.pain-card:nth-child(3) {
		border-top-color: var(--template-coral);
	}

	.pain-index {
		color: var(--template-gray);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		line-height: 1;
	}

	.pain-card h3 {
		margin-top: 0.25rem;
		font-size: 0.94rem;
		font-weight: 700;
		line-height: 1.2;
		text-transform: uppercase;
	}

	.pain-card p {
		margin-top: 0.35rem;
		color: var(--template-gray);
		font-size: 0.75rem;
		line-height: 1.35;
	}

	.solution-strip {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		margin-top: auto;
		padding: 0.65rem 0.9rem;
		background: var(--template-black);
		color: var(--template-white);
	}

	.solution-label {
		flex: none;
		padding: 0.22rem 0.4rem;
		background: var(--template-red);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.solution-strip p {
		font-size: 0.82rem;
		line-height: 1.35;
	}

	.data-layout {
		display: grid;
		grid-template-columns: minmax(0, 1.65fr) minmax(13rem, 0.85fr);
		gap: 1rem;
		height: 100%;
	}

	.data-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.55rem;
	}

	.data-tool {
		padding: 0.55rem 0.7rem;
		border: 1px solid var(--template-line);
		border-left: 0.25rem solid var(--template-blue);
	}

	.data-tool:nth-child(2n) {
		border-left-color: var(--template-red);
	}

	.data-tool:nth-child(3n) {
		border-left-color: var(--template-coral);
	}

	.data-tool code {
		color: var(--template-blue);
		font-family: var(--r-code-font);
		font-size: 0.72rem;
		font-weight: 700;
		line-height: 1.2;
	}

	.data-tool p {
		margin-top: 0.2rem;
		color: var(--template-gray);
		font-size: 0.76rem;
		line-height: 1.3;
	}

	.data-note {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.75rem;
		border: 1px solid var(--template-line);
		background: var(--template-paper);
	}

	.note-label {
		color: var(--template-red);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		line-height: 1;
		text-transform: uppercase;
	}

	.data-note p {
		font-size: 0.84rem;
		line-height: 1.4;
	}

	.readonly {
		margin-top: auto;
		color: var(--template-gray);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		line-height: 1.35;
		text-transform: uppercase;
	}

	.innovation-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
		gap: 1rem;
		height: 100%;
	}

	.chat-panel {
		display: flex;
		flex-direction: column;
		min-height: 0;
		border: 1px solid var(--template-line);
		background: var(--template-white);
	}

	.chat-head {
		display: flex;
		justify-content: space-between;
		padding: 0.45rem 0.7rem;
		background: var(--template-black);
		color: var(--template-white);
		font-size: 0.62rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.live-dot {
		color: var(--template-coral);
	}

	.chat-row {
		display: flex;
		gap: 0.5rem;
		padding: 0.5rem 0.7rem;
		border-bottom: 1px solid var(--template-line);
	}

	.chat-row.user {
		background: var(--template-paper);
	}

	.chat-label {
		flex: none;
		width: 4.1rem;
		color: var(--template-gray);
		font-size: 0.58rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		line-height: 1.3;
		text-transform: uppercase;
	}

	.chat-row p {
		font-size: 0.78rem;
		line-height: 1.35;
	}

	.micro-app {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		margin: 0.5rem 0.7rem 0.7rem;
		border: 1px solid var(--template-black);
	}

	.map {
		position: relative;
		flex: 1;
		min-height: 0;
		overflow: hidden;
		background: var(--template-black);
	}

	.map-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
		background-size: 2rem 2rem;
	}

	.route {
		position: absolute;
		top: 62%;
		left: 18%;
		width: 55%;
		height: 0.22rem;
		background: var(--template-coral);
		transform: rotate(-28deg);
		transform-origin: left center;
	}

	.marker {
		position: absolute;
		padding: 0.18rem 0.32rem;
		font-size: 0.54rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		line-height: 1;
		text-transform: uppercase;
	}

	.marker.start {
		top: 62%;
		left: 12%;
		background: var(--template-red);
		color: var(--template-white);
	}

	.marker.food {
		top: 44%;
		left: 43%;
		background: var(--template-coral);
		color: var(--template-white);
	}

	.marker.end {
		top: 26%;
		right: 8%;
		background: var(--template-blue);
		color: var(--template-white);
	}

	.map-bar {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.55rem;
		background: rgba(0, 0, 0, 0.82);
		color: var(--template-white);
		font-size: 0.56rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.map-bar span:last-child {
		padding: 0.18rem 0.35rem;
		background: var(--template-red);
	}

	.innovation-points {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		height: 100%;
	}

	.innovation-points article {
		flex: none;
		padding: 0.45rem 0.6rem;
		border: 1px solid var(--template-line);
		border-top: 0.25rem solid var(--template-blue);
	}

	.innovation-points article:nth-child(2) {
		border-top-color: var(--template-red);
	}

	.innovation-points article:nth-child(3) {
		border-top-color: var(--template-coral);
	}

	.innovation-points span {
		color: var(--template-gray);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		line-height: 1;
	}

	.innovation-points h3 {
		margin-top: 0.15rem;
		font-size: 0.8rem;
		font-weight: 700;
		line-height: 1.2;
		text-transform: uppercase;
	}

	.innovation-points p {
		margin-top: 0.2rem;
		color: var(--template-gray);
		font-size: 0.7rem;
		line-height: 1.3;
	}

	.innovation-note {
		margin-top: 0.2rem;
		padding: 0.5rem 0.6rem;
		border-left: 0.3rem solid var(--template-red);
		background: var(--template-paper);
		color: var(--template-gray);
		font-size: 0.76rem;
		line-height: 1.35;
	}

	.innovation-note strong {
		color: var(--template-black);
	}

	.steps {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.8rem;
	}

	.step {
		padding: 0.7rem 0.8rem;
		border: 1px solid var(--template-line);
		border-top: 0.25rem solid var(--template-blue);
	}

	.step:nth-child(2) {
		border-top-color: var(--template-red);
	}

	.step:nth-child(3) {
		border-top-color: var(--template-coral);
	}

	.step-number {
		color: var(--template-gray);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		line-height: 1;
	}

	.step h3 {
		margin-top: 0.2rem;
		font-size: 0.9rem;
		font-weight: 700;
		line-height: 1.2;
		text-transform: uppercase;
	}

	.step p {
		margin-top: 0.3rem;
		color: var(--template-gray);
		font-size: 0.78rem;
		line-height: 1.35;
	}

	.impact-layout {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		height: 100%;
	}

	.impact-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.8rem;
	}

	.impact-card {
		padding: 0.8rem 0.9rem;
		border: 1px solid var(--template-line);
		border-top: 0.3rem solid var(--template-blue);
	}

	.impact-card:nth-child(2) {
		border-top-color: var(--template-red);
	}

	.impact-card:nth-child(3) {
		border-top-color: var(--template-coral);
	}

	.impact-index {
		color: var(--template-gray);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		line-height: 1;
	}

	.impact-card h3 {
		margin-top: 0.25rem;
		font-size: 0.94rem;
		font-weight: 700;
		line-height: 1.2;
		text-transform: uppercase;
	}

	.impact-card p {
		margin-top: 0.35rem;
		color: var(--template-gray);
		font-size: 0.75rem;
		line-height: 1.35;
	}

	.before-after {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 0.8rem;
		margin-top: auto;
		padding: 0.7rem 0.9rem;
		background: var(--template-black);
		color: var(--template-white);
	}

	.ba-label {
		color: var(--template-coral);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		line-height: 1;
		text-transform: uppercase;
	}

	.before-after p {
		margin-top: 0.25rem;
		font-size: 0.8rem;
		line-height: 1.35;
	}

	.arrow {
		color: var(--template-coral);
		font-size: 1.2rem;
		font-weight: 700;
	}

	.tech-layout {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		height: 100%;
	}

	.arch {
		display: flex;
		align-items: stretch;
		gap: 0.35rem;
	}

	.arch-step {
		flex: 1;
		min-width: 0;
		padding: 0.55rem 0.6rem;
		border: 1px solid var(--template-line);
		border-top: 0.25rem solid var(--template-blue);
	}

	.arch-step:nth-of-type(2) {
		border-top-color: var(--template-red);
	}

	.arch-step:nth-of-type(3) {
		border-top-color: var(--template-coral);
	}

	.arch-step:nth-of-type(4) {
		border-top-color: var(--template-blue);
	}

	.arch-step span {
		color: var(--template-gray);
		font-size: 0.55rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		line-height: 1;
	}

	.arch-step h3 {
		margin-top: 0.2rem;
		font-size: 0.78rem;
		font-weight: 700;
		line-height: 1.2;
		text-transform: uppercase;
	}

	.arch-step p {
		margin-top: 0.25rem;
		color: var(--template-gray);
		font-size: 0.68rem;
		line-height: 1.3;
	}

	.arch-arrow {
		align-self: center;
		color: var(--template-red);
		font-size: 1rem;
		font-weight: 700;
	}

	.built-next {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.8rem;
		margin-top: auto;
	}

	.built-next div {
		padding: 0.6rem 0.7rem;
		border: 1px solid var(--template-line);
		border-left: 0.3rem solid var(--template-blue);
	}

	.built-next div:last-child {
		border-left-color: var(--template-red);
	}

	.built-label {
		color: var(--template-blue);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		line-height: 1;
		text-transform: uppercase;
	}

	.built-label.next {
		color: var(--template-red);
	}

	.built-next p {
		margin-top: 0.25rem;
		color: var(--template-gray);
		font-size: 0.76rem;
		line-height: 1.35;
	}

	.cost-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.6rem;
		height: 100%;
	}

	.cost-item {
		padding: 0.6rem 0.7rem;
		border: 1px solid var(--template-line);
		border-top: 0.25rem solid var(--template-blue);
	}

	.cost-item:nth-child(2) {
		border-top-color: var(--template-red);
	}

	.cost-item:nth-child(3) {
		border-top-color: var(--template-coral);
	}

	.cost-item:nth-child(4) {
		border-top-color: var(--template-blue);
	}

	.cost-item:nth-child(5) {
		border-top-color: var(--template-red);
	}

	.cost-item:nth-child(6) {
		border-top-color: var(--template-coral);
	}

	.cost-item span {
		color: var(--template-gray);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		line-height: 1;
		text-transform: uppercase;
	}

	.cost-item strong {
		display: block;
		margin-top: 0.28rem;
		font-size: 1rem;
		font-weight: 700;
		line-height: 1.2;
	}

	.cost-item p {
		margin-top: 0.2rem;
		color: var(--template-gray);
		font-size: 0.7rem;
		line-height: 1.3;
	}

	.business-layout {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		height: 100%;
	}

	.business-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.8rem;
	}

	.business-card {
		padding: 0.8rem 0.9rem;
		border: 1px solid var(--template-line);
		border-top: 0.3rem solid var(--template-blue);
	}

	.business-card:nth-child(2) {
		border-top-color: var(--template-red);
	}

	.business-card:nth-child(3) {
		border-top-color: var(--template-coral);
	}

	.business-card span {
		color: var(--template-gray);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		line-height: 1;
	}

	.business-card h3 {
		margin-top: 0.25rem;
		font-size: 0.92rem;
		font-weight: 700;
		line-height: 1.2;
		text-transform: uppercase;
	}

	.business-card p {
		margin-top: 0.35rem;
		color: var(--template-gray);
		font-size: 0.75rem;
		line-height: 1.35;
	}

	.flow {
		margin-top: auto;
		padding: 0.6rem 0.8rem;
		background: var(--template-black);
		color: var(--template-white);
		font-size: 0.8rem;
		font-weight: 600;
		text-align: center;
	}

	.partners {
		color: var(--template-gray);
		font-size: 0.66rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		line-height: 1.3;
		text-transform: uppercase;
	}

	.closing-stage {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		height: 100%;
		color: var(--slide-fg);
	}

	.closing-eyebrow {
		color: var(--template-coral);
	}

	.closing-copy h2 {
		color: var(--slide-fg);
		font-size: 3rem;
		font-weight: 700;
		letter-spacing: -0.025em;
		line-height: 1;
		text-transform: uppercase;
	}

	.closing-lead {
		max-width: 62ch;
		margin-top: 0.5rem;
		color: var(--slide-muted);
		font-size: 1rem;
		line-height: 1.4;
	}

	.closing-steps {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.8rem;
	}

	.closing-steps article {
		padding: 0.65rem 0.75rem;
		border: 1px solid var(--slide-line);
		border-top: 0.25rem solid var(--template-coral);
	}

	.closing-steps span {
		color: var(--template-coral);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		line-height: 1;
	}

	.closing-steps h3 {
		margin-top: 0.2rem;
		color: var(--slide-fg);
		font-size: 0.88rem;
		font-weight: 700;
		line-height: 1.2;
		text-transform: uppercase;
	}

	.closing-steps p {
		margin-top: 0.3rem;
		color: var(--slide-muted);
		font-size: 0.78rem;
		line-height: 1.35;
	}

	.closing-ask {
		padding-left: 0.75rem;
		border-left: 0.3rem solid var(--template-red);
		color: var(--slide-fg);
		font-size: 0.85rem;
		line-height: 1.35;
	}

	.closing-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem 1rem;
		color: var(--slide-muted);
		font-size: 0.6rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		line-height: 1.35;
		text-transform: uppercase;
	}

	.closing-links span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
