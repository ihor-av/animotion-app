<script lang="ts">
	import { Presentation, Slide } from '@animotion/core';
	import { ContentSlide, MetricSlide, RubricRail, SlideFrame, TitleSlide } from '$lib/slides';

	const problems = [
		{
			index: '01',
			title: 'N конекторів',
			text: 'Claude, Cursor, VS Code, агенти — кожен інтегрує Чернівці по-своєму.'
		},
		{
			index: '02',
			title: 'Немає стандарту',
			text: 'Місто не може підтримувати новий UI чи протокол для кожного вендора.'
		},
		{
			index: '03',
			title: 'Дані є — доступу немає',
			text: '121 набір у каталозі, але AI-агенти не бачать їх як tools.'
		}
	];

	const mcpTools = [
		{ name: 'list_datasets', desc: 'Каталог 121 набору' },
		{ name: 'get_schema', desc: 'Таблиці, подання, поля' },
		{ name: 'query_assets', desc: 'v_assets_summary: оренда, борги' },
		{ name: 'query_roads', desc: 'v_roads_spend: кошти на дороги' },
		{ name: 'query_housing', desc: 'v_housing_collection: збори' },
		{ name: 'query_land', desc: 'v_land_contracts: договори' }
	];

	const marketMetrics = [
		{ label: 'Каталог', value: '121', hint: 'набір у DATA.md' },
		{ label: 'MCP-сервер', value: '1', hint: 'для всіх клієнтів' },
		{ label: 'Клієнти', value: 'N', hint: 'MCP-стандарт' },
		{ label: 'Нові UI', value: '0', hint: 'design goal' }
	];

	const marketSteps = [
		{
			number: '01',
			title: 'Чернівці',
			text: '3–5 tools, MCP Inspector, 2 клієнти.'
		},
		{
			number: '02',
			title: 'Громади',
			text: 'Той самий сервер, локальні дані.'
		},
		{
			number: '03',
			title: 'MCP-реєстр',
			text: 'Публічний каталог міських MCP-серверів.'
		}
	];

	const impactCards = [
		{
			index: '01',
			title: 'Розробники',
			text: 'Отримують місто як tools, а не як PDF і форму.'
		},
		{
			index: '02',
			title: 'Журналісти й ГО',
			text: 'Ставлять питання про оренду, борги, дороги; відповіді з джерелами.'
		},
		{
			index: '03',
			title: 'Місто',
			text: 'Одна підтримувана інтеграція замість N конекторів.'
		}
	];

	const archSteps = [
		{ number: '01', title: 'MCP client', text: 'Claude, Cursor, VS Code, агенти.' },
		{ number: '02', title: 'Transport', text: 'HTTP/SSE або stdio.' },
		{ number: '03', title: 'Chernivtsi MCP', text: 'Tools, resources, prompts.' },
		{ number: '04', title: 'D1', text: 'Read-only views, 31/23.' }
	];

	const costItems = [
		{ label: 'Хостинг', value: '$5/міс', hint: 'Workers Paid; оцінка' },
		{ label: 'D1', value: 'малий обсяг', hint: 'росте із запитами' },
		{ label: 'MCP-сервер', value: '1 раз', hint: 'tools + transport' },
		{ label: 'Дані', value: '1–2 дні/міс', hint: 'оновлення й перевірка' },
		{ label: 'Підтримка', value: '0.5 FTE/міс', hint: 'оцінка' },
		{ label: 'Новий tool', value: '2–4 тижні', hint: 'схема + тести' }
	];

	const businessStreams = [
		{
			index: '01',
			title: 'Муніципальна підписка',
			text: 'Фіксована ціна за MCP-сервер і підтримку.'
		},
		{
			index: '02',
			title: 'Hosting + SLA',
			text: 'Розміщення, оновлення, моніторинг.'
		},
		{
			index: '03',
			title: 'White-label + гранти',
			text: 'Інші громади, AI-вендори, EU/UNDP/GIZ.'
		}
	];

	const closingSteps = [
		{
			number: '01',
			title: 'Тиждень 1–2',
			text: '3 tools: assets, roads, housing.'
		},
		{
			number: '02',
			title: 'Тиждень 3',
			text: 'MCP server + Inspector.'
		},
		{
			number: '03',
			title: 'Тиждень 4',
			text: '2 MCP-клієнти + пілот.'
		}
	];
</script>

<svelte:head>
	<title>Chernivtsi MCP — стандартний MCP-сервер для міста</title>
	<meta
		name="description"
		content="Chernivtsi MCP: один MCP-сервер для відкритих даних і послуг Чернівців. Jira MCP для міста, без нового UI."
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
			title="Chernivtsi MCP"
			subtitle="Стандартний MCP-сервер для відкритих даних і послуг міста. Jira MCP для Чернівців: без нового UI, без нового стандарту."
			meta={[
				{ label: 'Протокол', value: 'MCP' },
				{ label: 'Дані', value: 'Cloudflare D1' },
				{ label: 'Транспорт', value: 'HTTP/SSE · stdio' }
			]}
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Прототип · 2026"
			slideNumber="01"
		/>
	</Slide>

	<Slide class="template-slide">
		<ContentSlide
			eyebrow="Критерій 01 · 8 · Проблема"
			title="Місто розкладене на десятки інтеграцій"
			lead="AI-агенти хочуть знати Чернівці — кожен клієнт будує свій конектор."
			source="Гіпотеза проблеми; DATA.md: 121 набір; D1: 31 таблиця / 23 подання; MCP — відкритий стандарт (modelcontextprotocol.io)."
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Критерій 01 з 8"
			slideNumber="02"
		>
			<div class="problem-layout">
				<blockquote class="citizen-quote">
					<p>
						«Дай мені дані про оренду, борги й дороги Чернівців» — і кожен
						AI-клієнт інтегрується по-своєму.
					</p>
					<cite>Кожен вендор — новий конектор, новий формат, нова підтримка</cite>
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
						<strong>Chernivtsi MCP</strong> — один MCP-сервер, який віддає
						місто будь-якому AI-клієнту стандартними tools.
					</p>
				</div>
			</div>
		</ContentSlide>
	</Slide>

	<Slide class="template-slide">
		<ContentSlide
			eyebrow="Критерій 02 · 8 · Відкриті дані"
			title="Дані — це tool surface"
			lead="Chernivtsi MCP обгортає D1 у стандартні tools. Кожен tool має схему, джерело, одиниці й дату зрізу."
			source="D1 chernivtsi-finance-v2 · DATA.md · 24 завантажені набори. MCP tool surface — наступний білд; ремонти/транспорт/POI — roadmap."
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Критерій 02 з 8"
			slideNumber="03"
		>
			<div class="data-layout">
				<div class="data-grid">
					{#each mcpTools as tool}
						<article class="data-tool">
							<code>{tool.name}</code>
							<p>{tool.desc}</p>
						</article>
					{/each}
				</div>

				<div class="data-note">
					<span class="note-label">Контракт</span>
					<p>Кожен tool: JSON Schema, read-only, provenance, units, as-of date.</p>
					<span class="readonly">D1 · лише читання · без вигаданих чисел</span>
				</div>
			</div>
		</ContentSlide>
	</Slide>

	<Slide class="template-slide">
		<ContentSlide
			eyebrow="Критерій 03 · 8 · Інновації"
			title="Один стандарт замість нових UI"
			lead="Jira MCP дає агентам задачі. Chernivtsi MCP дає агентам місто: дані, схеми, джерела."
			source="MCP spec: modelcontextprotocol.io. Поточний прототип: D1 read-only + бот; MCP-сервер — наступний білд."
			footerLeft="chernivtsi-finance-v2"
			footerCenter="Критерій 03 з 8"
			slideNumber="04"
		>
			<div class="mcp-layout">
				<div class="mcp-flow">
					<div class="mcp-clients">
						<span class="mcp-label">MCP clients</span>
						<div class="mcp-chips">
							<span>Claude</span>
							<span>Cursor</span>
							<span>VS Code</span>
							<span>Agent</span>
						</div>
					</div>
					<span class="mcp-arrow">→</span>
					<div class="mcp-server">
						<span class="mcp-label">Chernivtsi MCP</span>
						<strong>tools · resources · prompts</strong>
						<span class="mcp-sub">JSON Schema · read-only</span>
					</div>
					<span class="mcp-arrow">→</span>
					<div class="mcp-data">
						<span class="mcp-label">D1</span>
						<strong>31 таблиця · 23 подання</strong>
						<span class="mcp-sub">chernivtsi-finance-v2</span>
					</div>
				</div>

				<div class="mcp-code">
					<span class="mcp-label">Tool call</span>
					<pre>{`{
  "tool": "query_assets",
  "arguments": {
    "view": "v_assets_summary"
  }
}`}</pre>
					<span class="mcp-label">Tool surface</span>
					<ul class="mcp-tools">
						{#each mcpTools as tool}
							<li>{tool.name}</li>
						{/each}
					</ul>
				</div>
			</div>
		</ContentSlide>
	</Slide>

	<Slide class="template-slide">
		<MetricSlide
			eyebrow="Критерій 04 · 8 · Ринок"
			title="Один MCP — багато AI-клієнтів"
			lead="MCP уже підтримують Claude, Cursor, VS Code та агенти."
			metrics={marketMetrics}
			columns={4}
			source="121 — DATA.md. 3–5 tools і 2 клієнти — оцінка пілоту; MCP — modelcontextprotocol.io."
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
			title="Менше інтеграцій — більше доступу"
			lead="Один MCP-сервер замість N конекторів. Місто стає доступним для AI-клієнтів, журналістів, ГО й розробників."
			source="Гіпотеза впливу. KPI пілоту: tool calls, data coverage, time-to-answer, integration time."
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
						<p>Кожен клієнт — свій конектор</p>
					</div>
					<span class="arrow">→</span>
					<div>
						<span class="ba-label">Стало</span>
						<p>Один MCP — усі клієнти</p>
					</div>
				</div>
			</div>
		</ContentSlide>
	</Slide>

	<Slide class="template-slide">
		<ContentSlide
			eyebrow="Критерій 06 · 8 · Техніка"
			title="MCP-сервер, а не новий UI"
			lead="Стандартний MCP: tools, resources, prompts. D1 read-only. Транспорт — HTTP/SSE або stdio. Ніякого кастомного UI."
			source="MCP spec: modelcontextprotocol.io. Зараз: D1 31/23, read-only бот. Далі: MCP server, Inspector, 2 client tests."
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
						<p>D1 read-only, 31 таблиця / 23 подання, бот.</p>
					</div>
					<div>
						<span class="built-label next">Далі</span>
						<p>MCP server, Inspector, auth, rate limits, 2 client tests.</p>
					</div>
				</div>
			</div>
		</ContentSlide>
	</Slide>

	<Slide class="template-slide">
		<ContentSlide
			eyebrow="Критерій 07 · 8 · Витрати"
			title="Один сервер, без UI"
			lead="MCP-сервер на Cloudflare Workers + D1. Нові дані — нові tools, а не нові екрани."
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
			title="MCP як міська інфраструктура"
			lead="Муніципальна підписка + hosting/SLA + white-label для громад. Відкритий core, щоб місто не платило за кожен UI."
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

				<div class="flow">1 MCP → N клієнтів → N громад → підписка</div>
				<p class="partners">Цільові партнери: міська рада · open-data команда · AI-вендори</p>
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
					<h2>MCP за 30 днів</h2>
					<p class="closing-lead">
						3 tools → MCP server + Inspector → 2 клієнти → пілот і KPI.
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
					Потрібні: 1 департамент · 3 набори · 2 MCP-клієнти.
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
		padding: 0.6rem 0.8rem;
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
		margin-top: 0.3rem;
		color: var(--template-gray);
		font-size: 0.72rem;
		line-height: 1.32;
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

	.mcp-layout {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
		gap: 1rem;
		height: 100%;
	}

	.mcp-flow {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.25rem;
	}

	.mcp-clients,
	.mcp-server,
	.mcp-data {
		padding: 0.45rem 0.6rem;
		border: 1px solid var(--template-line);
	}

	.mcp-clients {
		border-top: 0.25rem solid var(--template-blue);
	}

	.mcp-server {
		border-top: 0.25rem solid var(--template-red);
		background: var(--template-black);
		color: var(--template-white);
	}

	.mcp-data {
		border-top: 0.25rem solid var(--template-coral);
	}

	.mcp-label {
		display: block;
		color: var(--template-gray);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		line-height: 1.2;
		text-transform: uppercase;
	}

	.mcp-server .mcp-label {
		color: var(--template-coral);
	}

	.mcp-chips {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.25rem;
		margin-top: 0.25rem;
	}

	.mcp-chips span {
		padding: 0.12rem 0.25rem;
		border: 1px solid var(--template-line);
		color: var(--template-gray);
		font-size: 0.62rem;
		font-weight: 600;
		line-height: 1.2;
	}

	.mcp-server strong,
	.mcp-data strong {
		display: block;
		margin-top: 0.15rem;
		font-size: 0.8rem;
		font-weight: 700;
		line-height: 1.2;
	}

	.mcp-server strong {
		color: var(--template-white);
	}

	.mcp-sub {
		display: block;
		margin-top: 0.1rem;
		color: var(--template-gray);
		font-size: 0.6rem;
		line-height: 1.25;
	}

	.mcp-server .mcp-sub {
		color: #b8b8b8;
	}

	.mcp-arrow {
		color: var(--template-red);
		font-size: 0.8rem;
		font-weight: 700;
		line-height: 1;
		text-align: center;
	}

	.mcp-code {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		min-height: 0;
	}

	.mcp-code pre {
		margin: 0;
		padding: 0.55rem 0.65rem;
		background: var(--template-black);
		color: var(--template-white);
		font-family: var(--r-code-font);
		font-size: 0.62rem;
		line-height: 1.4;
		overflow: hidden;
	}

	.mcp-tools {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.15rem 0.6rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.mcp-tools li {
		color: var(--template-gray);
		font-family: var(--r-code-font);
		font-size: 0.64rem;
		line-height: 1.35;
	}

	.mcp-tools li::before {
		color: var(--template-red);
		content: '· ';
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
		font-size: 0.79rem;
		line-height: 1.38;
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
		font-size: 0.79rem;
		line-height: 1.38;
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
