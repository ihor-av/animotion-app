# Hackathon judging criteria

This is the source of truth for the final deliverable. The live demo and the
presentation must follow these eight criteria **in this order**. Each criterion
is worth 10 points.

## The eight criteria (as published, Ukrainian)

1. **Актуальність проблеми** (10 балів). Опис проблеми, її актуальність,
   важливість вирішення. Чітко визначена актуальна проблема та запропоновано
   рішення (ваш проєкт).
2. **Якість використання відкритих даних** (10 балів). Учасники мають
   використовувати один або кілька наборів відкритих даних для розробки своїх
   проєктів. Проєкти оцінюються на основі використання даних, їхньої
   релевантності для розв'язання поставленої проблеми, а також ефективності
   інтеграції цих даних у фінальний продукт.
3. **Креативність та інноваційність** (10 балів). Креативність у розв'язанні
   проблеми. Створення цифрового рішення (застосунку, сервісу чи іншого
   продукту) з унікальним використанням відкритих даних.
4. **Потенціал на ринку** (10 балів). Зрілість проєкту: готовність для
   застосування рішення або реальна оцінка термінів його реалізації. Чи має
   проєкт потенціал до масштабування або адаптації для інших громад?
5. **Суспільний потенціал** (10 балів). Показати, як рішення, засноване на
   відкритих даних, може вплинути на суспільство або галузі. Важливі обсяг і
   глибина можливого впливу, стійкість змін та ефективність виконання. Чи
   вирішує рішення актуальну проблему в Чернівецькій громаді?
6. **Технічна життєздатність** (10 балів). Чи продемонстровано реалізацію через
   прототип? Чи є запропоноване рішення технічно можливим?
7. **Затратність на створення/підтримку проєкту** (10 балів). Враховані
   розрахунки досягнення мети проєкту та його подальша підтримка.
8. **Бізнес-модель та фінансова життєздатність** (10 балів). Чи команда
   презентувала стійку бізнес-модель? Як рішення може генерувати дохід або
   підтримуватися у довгостроковій перспективі?

## Required deck order

The title and closing slides are not scored. The eight scored sections must
appear in this order:

1. Title
2. Problem relevance
3. Open data and how it is integrated
4. Creativity and innovation
5. Market potential and scaling
6. Social impact in Chernivtsi
7. Technical viability and live prototype
8. Cost to build and maintain
9. Business model and financial viability
10. Ask, next steps, contacts

Slide copy is Ukrainian. Code, docs, commits, and agent output stay English.

## Evidence rules

- **Fact**: a source URL with an accessed date, or a D1 view/query.
- **Estimate**: label it `estimate`, show the assumption and the calculation.
- **Unknown**: write `not verified` instead of inventing a number.
- Every data slide shows units, source, and as-of date where the data has one.
- Every market, social-impact, cost, and business-model claim needs a source or
  an explicit assumption. Unsupported claims are a review blocker.
- The live URL is the technical-viability evidence. A broken demo is a blocker.

## Per-criterion checklist

| # | Criterion | The deck must show | Evidence source | What reviewers check |
| --- | --- | --- | --- | --- |
| 1 | Problem relevance | Who is affected, why now, cost of inaction, the proposed solution, Chernivtsi context | Local sources, D1 aggregates, official city data | A clear problem and a solution that addresses it |
| 2 | Open data use | Which datasets/views, provenance, why they are relevant, how the product uses them | D1 tables/views, `DATA.md`, source portal | Data is relevant, integrated, and honestly represented |
| 3 | Creativity and innovation | What is new compared with existing tools, the unique data combination or visual | Demo, comparison, design notes | The novelty is real and demonstrated |
| 4 | Market potential | Maturity, prototype status, scaling to other communities, realistic timeline | Roadmap, comparable cities, assumptions | Claims are realistic and sourced or labeled |
| 5 | Social impact | Beneficiaries, impact mechanism, scale, sustainability, the Chernivtsi problem solved | Local context, data, pilot plan | The impact story is concrete and supported |
| 6 | Technical viability | Live demo, architecture, D1, CI, deployment, reproducibility | Live URL, repo, CI runs | The prototype works and the path is technically sound |
| 7 | Cost | Build cost, hosting, data refresh, maintenance effort, calculations | Cloudflare pricing, time estimates, assumptions | The estimates show their assumptions |
| 8 | Business model | Revenue or support model, partners, unit economics, long-term viability | Pricing, grants, municipal SaaS, assumptions | The model is coherent and financially plausible |

## Current deck status

The current `src/routes/+page.svelte` uses the Hackathon 2026 design language
(see [`design-system.md`](./design-system.md)) but is still a scaffold: a title
slide and a non-scored "About the data" context slide. The eight scored
sections above are not populated yet. It must be reordered and extended into
the sequence above. Do not treat the scaffold as the final narrative.
