# AGENTS.md — animotion-app

Read this before changing anything. It is the contract for humans and agents.

## Mission

Build the team's hackathon presentation: a finance data-visualization deck
using Chernivtsi open data served from Cloudflare D1. The final deliverable is
a live demo plus a Ukrainian presentation that follows the eight judging
criteria in [`docs/judging-criteria.md`](./docs/judging-criteria.md), in order.
The exact assignment is announced on-site, so the deck will change. Optimize
for small, reviewable changes, not for a fixed story.

## Hackathon rubric

The final deliverable is judged on eight criteria, 10 points each. The deck
must present them in this order:

1. Problem relevance
2. Open data use and integration
3. Creativity and innovation
4. Market potential and scaling
5. Social impact in Chernivtsi
6. Technical viability and live prototype
7. Cost to build and maintain
8. Business model and financial viability

The full rubric, the required slide order, and the evidence rules live in
[`docs/judging-criteria.md`](./docs/judging-criteria.md). That file is the
source of truth; read it before any deck or narrative change.

Rules:

- Every issue names the criterion it serves and the evidence it adds.
- Keep the eight scored sections in order. The title and closing slides are not
  scored.
- Every problem, market, social-impact, cost, and business-model claim needs a
  source or an explicit assumption. Never invent a number.
- Slide copy is Ukrainian. Code, docs, commits, and agent output are English.
- The live URL is the technical-viability evidence. A broken demo is not done.

## Stack

- SvelteKit 2 + Svelte 5 (runes) + TypeScript
- Animotion (`@animotion/core`) for slides
- Tailwind CSS 4
- `@sveltejs/adapter-static`; the whole site is prerendered
- Chart kit in `src/lib/charts`
- Assets-only Cloudflare Worker (`wrangler.jsonc`)

Live URL: https://animotion-app.hackaton-scope-creep.workers.dev

## Commands

```bash
npm run dev                   # local dev server
npm run check                 # svelte-check; must pass
npm run build                 # static build to ./build; must pass
npm run check:meta            # exactly one meta description per built page
npm run preview               # preview the production build
npx wrangler deploy --dry-run # validate the Worker config
```

`npm run check`, `npm run build`, and `npm run check:meta` must pass before any
handoff.

## Map

```text
src/routes/+page.svelte          the deck (Animotion Presentation/Slide)
src/routes/gallery/+page.svelte  working examples of every chart
docs/judging-criteria.md         the 8-criterion rubric, deck order, evidence rules
src/lib/charts/                  chart components, types, scales, formatters
src/lib/charts/index.ts          public chart-kit imports
src/lib/server/d1.ts             server/build-only D1 REST helper
src/styles/app.css               chart CSS variables
static/                          static files
wrangler.jsonc                   Worker name and ./build assets
.github/workflows/               CI, deploy, builder loop, review loop
.opencode/agent/                 builder, reviewer, researcher prompts
scripts/                         deterministic loop helpers
```

## Data contract

- D1 is **read-only**. Never write SQL, never add a write path.
- `src/lib/server/d1.ts` is server/build-only. Never import it into client code
  and never expose `CF_D1_TOKEN` to the browser.
- The site is prerendered. D1 reads happen at build time, not in the visitor's
  browser.
- Every chart and slide must show units, a source, and an as-of date where the
  data has one.
- Anonymize individuals. Do not surface raw tenant names.
- Never invent, round-trip, or extrapolate numbers. Missing data stays missing;
  say so on the slide.
- Do not compare snapshots or datasets with different semantics without saying
  so.

## Design contract

- Compose from `$lib/charts` components. Do not build a parallel chart system.
- Use `ChartCard` and `KpiCard` for framing, and the existing formatters and
  palette.
- Slides are 16:9. Check at 1280x720 and 1920x1080; text must not overflow.
- Text must stay legible when projected. Prefer one takeaway per slide.
- No decorative charts. If a chart does not support the takeaway, remove it.
- Keep Tailwind classes consistent with the existing gallery.

## Agent workflow

- A task is a GitHub issue with acceptance criteria and a named rubric
  criterion. The chatbot sends the issue number to the Cloudflare `app-builder`
  Worker.
- The builder creates `agent/issue-<n>`, opens a PR, and never touches `main`.
- Every PR gets two independent adversarial reviews from the Cloudflare
  reviewer. A PASS with green CI is squash-merged automatically. A FAIL starts
  a fix round and a fresh review; a second FAIL leaves the PR open.
- One issue per branch and PR. Keep diffs small; split unrelated work.
- Do not edit `.github/**`, `.opencode/**`, `scripts/**`, `AGENTS.md`,
  `wrangler.jsonc`, `.env*`, `build/**`, or `.svelte-kit/**` from a task.
- Do not add dependencies without a human decision. Do not silently change the
  lockfile.
- No TODO stubs, skipped tests, commented-out code, or "temporary" workarounds.
- If you need a paragraph-long comment to justify a workaround, fix the code.
- English in code, comments, commits, docs, and agent output. Slide copy is
  Ukrainian.

## Definition of done

- Acceptance criteria in the issue are met.
- The change names the rubric criterion it serves and adds evidence for it.
- The eight scored sections remain in the required order.
- Every problem, market, social-impact, cost, or business-model claim has a
  source or an explicit assumption.
- `npm run check`, `npm run build`, and `npm run check:meta` pass.
- No secrets, tokens, personal data, or generated directories in the diff.
- The deck still works at `/` and the chart gallery at `/gallery`.
- The PR explains what changed, why, and any remaining risk.

## Review contract

- Reviewers are read-only. They do not edit, commit, or push.
- Each review runs two independent reviewer processes; both must say `PASS`.
- A re-review of the same FAILed commit is refused. Push a fix commit first.
- A finding needs a severity, `file:line`, evidence, and a suggested fix.
- Reviewers judge against this file, `docs/judging-criteria.md`, and the issue's
  acceptance criteria, not personal style preferences.
- For deck/content changes, the named criterion must be served, the eight
  sections must stay in order, and every claim must be sourced or labeled as an
  assumption. Missing evidence or an out-of-order section is `MAJOR`.
- For code-only changes, do not demand new rubric slides; judge only the issue's
  scope.
- A reviewer must end with exactly `VERDICT: PASS` or `VERDICT: FAIL`.
- `BLOCKER` or `MAJOR` findings mean `FAIL`. `MINOR` findings do not block.
