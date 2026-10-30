# Hackathon 2026 design system

Source of truth for the deck's visual language. Extracted from the official
PowerPoint template at
`/home/ihor/Downloads/Шаблон_Hackathon 2026.pptx` on 2026-10-30.

The eight judging criteria, their order, and the evidence rules live in
[`judging-criteria.md`](./judging-criteria.md). This file only covers design.
It does not add or replace any content claim.

## Template facts

| Item | Extracted value |
| --- | --- |
| Slide size | `12192000 × 6858000` EMU = 13.333 × 7.5 in = 16:9 |
| Title slide background | Solid `#000000` |
| Content slide background | Master `lt1` = solid `#FFFFFF` |
| Shape language | Rectangles, square corners, no rounded cards, no drop shadows |
| Header image | `ppt/media/image1.png`, 2048 × 512 RGBA, original name `Для гугл форми (1).png` |
| Title-slide header | Full banner, source crop `b=29.249%`, displayed at 12,192,000 × 2,156,451 EMU |
| Content-slide header | Black band only, source crop `t=25.127%, b=29.247%`, displayed at 12,192,000 × 1,390,650 EMU |
| Footer placeholders | Date left, footer centre, slide number right at `y=6356350` EMU (~667 px at 1280 wide) |
| Title/body left edge | ~88–92 px at 1280 wide (`838200`–`881612` EMU) |
| Title-slide white card | `x=1060625`, `y=2337450`, `w=10070700`, `h=3124200` EMU; text starts at `x=4139930` |
| Title-slide title | Bold 32 pt, left aligned, black on white |
| Title-slide subtitle | Italic 24 pt, left aligned |
| Content title | Bold 32 pt, left aligned, black on white |
| Content body | 20 / 18 / 16 pt depending on density; team slide 14 pt |

## Colour tokens

The PPTX theme palette is the default Office palette, not the event brand. The
brand colours come from the official banner artwork (`image1.png`) and the
black/white shape system.

| Token | Hex | Use |
| --- | --- | --- |
| `--template-black` | `#000000` | Title background, primary text, banner |
| `--template-white` | `#FFFFFF` | Content background, reversed text |
| `--template-red` | `#EE252F` | Primary accent, rules, active states |
| `--template-blue` | `#0033A1` | Secondary accent, links, KPI rule |
| `--template-blue-mid` | `#264CA4` | Chart series, blue tint |
| `--template-blue-deep` | `#00237D` | Deep blue from the banner |
| `--template-coral` | `#D66B47` | Banner line art, tertiary accent |
| `--template-gray` | `#4A4A4A` | Secondary text |
| `--template-gray-light` | `#EBEBEB` | Neutral fill |
| `--template-line` | `#D9D9D9` | Borders and rules |
| `--template-paper` | `#F7F6F3` | Optional warm neutral |

Default Office theme values, recorded for completeness: `dk1 #000000`,
`lt1 #FFFFFF`, `dk2 #44546A`, `lt2 #E7E6E6`, `accent1 #4472C4`,
`accent2 #ED7D31`, `accent3 #A5A5A5`, `accent4 #FFC000`,
`accent5 #5B9BD5`, `accent6 #70AD47`, `hlink #0563C1`,
`folHlink #954F72`. These are not used for the deck brand.

Chart series use the template palette:

| Series | Light | Dark |
| --- | --- | --- |
| `--chart-1` | `#0033A1` | `#6D9EFF` |
| `--chart-2` | `#EE252F` | `#FF6B72` |
| `--chart-3` | `#D66B47` | `#F09377` |
| `--chart-4` | `#264CA4` | `#8AA9E8` |
| `--chart-5` | `#A6192E` | `#FF8A92` |
| `--chart-6` | `#4A4A4A` | `#C9C9C9` |
| `--chart-7` | `#55627A` | `#AAB4C8` |
| `--chart-8` | `#8A94A6` | `#D4DAE5` |

## Typography

| PPTX role | PPTX font | CSS role | CSS token / value |
| --- | --- | --- | --- |
| Theme major/minor | Arial | Fallback | System sans stack |
| Slide titles and most body copy | Verdana | Body and display | `--font-sans`, `--font-display` |
| Embedded font files | Roboto regular / bold / italic / bold italic | Self-hosted | `@fontsource-variable/roboto` |
| Hero title | Verdana bold 32 pt | `TitleSlide h1` | `clamp(2.75rem, 4.4vw, 3.9rem)` |
| Section title | Verdana bold 32 pt | `h2` | `clamp(2.15rem, 3.3vw, 3rem)` |
| Subtitle | Verdana italic 24 pt | `TitleSlide .subtitle` | `1.25rem` italic |
| Lead / large body | Verdana 20 pt | `.lead` | `1.15rem` |
| Body | Verdana 16–18 pt | body | `0.84–1.2rem` |
| Meta / footer | Verdana 14 pt | `.slide-footer` | `0.66rem` uppercase |

**Substitution:** Verdana is proprietary and is not copied into the repo. The
template embeds Roboto regular, bold, italic and bold italic; Roboto is the
closest available open face and is already part of the template package.
`@fontsource-variable/roboto` (SIL Open Font License 1.1) self-hosts it. If the
event later supplies the original Verdana licence, swap the font stack without
changing layout tokens.

## Media and licensing

- `static/template/hackathon-banner.png` — full 2048 × 512 official banner,
  including the white partner-logo strip and the black
  `CHERNIVTSI OPEN DATA HACKATHON 3.0` band.
- `static/template/hackathon-band.png` — the black band crop used on content
  slides.
- Partner logos in the banner include Chernivtsi City Council, EUACI, the
  European Union, the Ministry of Foreign Affairs of Denmark, the German
  Embassy, and UK International Development. They belong to those
  organisations.
- Licensing assumption: the PPTX is the official hackathon template supplied
  to participants, so these assets may be used in the hackathon deck and its
  live demo. They are not licensed as general-purpose brand assets and must not
  be reused outside this event without permission.
- No proprietary font files were copied. No other template media exists.

## Slide components

All slide components live in `src/lib/slides` and are exported from
`$lib/slides`. They fill a 1280 × 720 Animotion slide, use the shared tokens,
and keep the footer/slide-number treatment.

```svelte
<script lang="ts">
  import { ContentSlide, MetricSlide, RubricRail, SectionSlide, TitleSlide } from '$lib/slides';
</script>

<TitleSlide
  eyebrow="CHERNIVTSI OPEN DATA HACKATHON 3.0"
  title="Фінанси Чернівців у відкритих даних"
  subtitle="Один речення про продукт і дані."
  meta={[
    { label: 'Дані', value: 'Відкриті набори Чернівців' },
    { label: 'Сховище', value: 'Cloudflare D1' },
    { label: 'Стек', value: 'SvelteKit · Animotion' }
  ]}
  slideNumber="01"
/>

<SectionSlide number={1} summary="Одне речення про критерій." slideNumber="03">
  <!-- Evidence for the criterion. -->
</SectionSlide>

<ContentSlide
  title="Назва слайда"
  eyebrow="Критерій 02 · відкриті дані"
  lead="Головний висновок слайда."
  source="Джерело: view або набір · дата зрізу"
  slideNumber="04"
>
  <!-- ChartCard, KpiCard, DataTable, or prose. -->
</ContentSlide>

<MetricSlide
  title="Ключові числа"
  metrics={[
    { label: 'Метрика', value: '0', hint: 'Одиниці · джерело' }
  ]}
  source="Джерело · дата"
  slideNumber="05"
/>
```

`SectionSlide` requires a number from 1 to 8. Its default title comes from
`rubricSections` in `src/lib/slides/rubric.ts`, which preserves the required
order. `RubricRail` renders the same order as a compact navigation strip:
`<RubricRail active={2} />`.

### Layout rules

- Slides are 16:9; verify at 1280 × 720 and 1920 × 1080.
- Content slides are white; the title slide is black. Do not follow the OS
  colour scheme for slide surfaces.
- Use one takeaway per slide and one accent per section.
- Keep the banner band on content slides; do not stretch or recolour it.
- Use square corners. The only intentional exception is the hard coral offset
  shadow on the title plate.
- The footer carries the deck name, an optional section label, and the slide
  number. `slideNumber` accepts strings such as `"03 / 10"`.
- Slide copy is Ukrainian. Code, docs, comments, commits and agent output stay
  English.
- Never invent a number. Every chart and metric needs units, a source, and an
  as-of date where the data has one; unknown values are `not verified`.

## Chart kit alignment

`ChartCard`, `KpiCard`, `DataTable`, `Legend`, `ProgressBar` and the SVG charts
read the `--chart-*` tokens. Cards are square, have a 1 px line border, and use
a 3 px red or blue top rule. Bars, treemap cells and progress tracks are
square-cornered. The public palette is
[`src/lib/charts/utils/color.ts`](../src/lib/charts/utils/color.ts).

## Verification

```bash
npm run check
npm run build
npm run check:meta
```

`check:meta` must report exactly one description on `/` and `/gallery`.
