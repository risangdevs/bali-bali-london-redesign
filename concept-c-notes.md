# Bali Bali — Concept C, “West End Evening”

A desktop-first homepage visual prototype for Bali Bali, an authentic Indonesian
restaurant at 150 Shaftesbury Avenue. Delivery file:
`concept-c.html` (single self-contained page, photography in
`assets/`).

The page follows the fixed eight-part architecture and nothing more:
Hero + trust → Signature food → Rijsttafel → Pre-theatre → Since 1986 → Social
proof → Visit + booking → Footer.

---

## 1. Design rationale

Concept C is built around **location and the ritual of eating before a show**.
Where a heritage concept would lean on nostalgia and a luxury concept on
material richness, this direction is deliberately **contemporary and urban**:
a warm, well-lit table in the middle of the West End, taken before the curtain
goes up. The mood is London, evening, intimate, energetic and convenient.

Three ideas drive every decision:

1. **The street is the brand.** Bali Bali’s strongest asset is its address, not
   a decorative theme. The design borrows the visual grammar of London
   wayfinding — route rails, station stops, house numbers, timetables — and lets
   it carry the identity.
2. **Warmth without luxury.** Ivory stone and oxblood read as candle-lit and
   generous, not fine-dining. No black-and-gold, no palace styling.
3. **Practical, not theatrical.** Pre-theatre dining is treated as logistics
   (a schedule you can actually read) rather than costume drama. No curtains,
   spotlights or stock theatre imagery.

What we deliberately avoided: tropical-resort cues and palm leaves, stereotypical
Bali iconography, black-and-gold luxury, SaaS card grids, heavy gradients, fake
historical photography, and invented facts, ratings, prices or opening times.

---

## 2. Typography direction

Three families, each with a distinct job — display and body are always different.

- **Display — Saira Condensed (500–800).** A contemporary condensed grotesk with
  the even rhythm of signage. Used for the hero, section titles, dish names,
  big numerals (1986, 150) and button labels. Its narrow width lets large type
  feel authoritative, like city wayfinding, without shouting.
- **Body — Spectral (300–600, plus italic).** A warm, readable serif for
  paragraphs, dish descriptions and ledes. The serif carries the hospitality and
  the “family-run” softness the condensed display cannot.
- **Utility — IBM Plex Mono (400–600).** Used only for the wayfinding layer:
  eyebrows, the utility bar, station and schedule notation, tags, footer legal.
  Mono is the schedule/ticket voice; keeping it in that lane stops it from
  becoming decoration.

Type scale is fluid via `clamp()`. Hero display tops out around 98px so it
never overflows its column at 1440px; section titles run 38–82px.

---

## 3. Colour system

All values are authored in OKLch; derived states are produced by shifting
lightness, never by inventing new hues.

| Token | OKLch | Role |
|---|---|---|
| `--bg` | 0.963 0.012 83 | Warm pale stone / ivory ground |
| `--surface` | 0.986 0.008 88 | Lifted warm white (cards, panels) |
| `--surface-2` | 0.930 0.016 82 | Stone band for alternating sections |
| `--ink` | 0.238 0.048 305 | Deep aubergine — text & dark surfaces |
| `--ink-soft` | 0.400 0.040 302 | Secondary body text |
| `--muted` | 0.460 0.030 300 | Captions, meta labels |
| `--border` / `--border-2` | 0.868 / 0.790 | Hairlines and stronger rules |
| `--accent` | 0.470 0.185 32 | Oxblood / vermilion — primary CTA & markers |
| `--accent-hover` | 0.410 0.180 32 | Darker red on button hover (contrast rises) |
| `--accent-lite` | 0.700 0.140 40 | Warm signal red for small text on dark |
| `--cool` | 0.440 0.080 248 | Restrained London-street steel blue |
| `--evening` / `--evening-2` | 0.212 / 0.275 | Deep aubergine for the pre-theatre band |

Discipline: **one accent colour**, used for the primary CTA and at most one
graphic marker per viewport (the active rail station). Steel blue is the
secondary “information” colour for wayfinding and meta text and never competes
with the red. Flat colour and sharp contrast do the work — there are no
decorative gradients except the two small, functional scrims (hero image caption,
ticket) and the masked grid in the pre-theatre band.

Contrast is verified as foreground/background pairs; hover states either keep
contrast level or raise it, and every interactive element has a visible
`:focus-visible` ring in steel blue.

---

## 4. Photography direction

Photography must evoke **evening warmth through genuine restaurant food**, not
stock theatre or fake streetscapes. All imagery is real Bali Bali food
photography from the restaurant’s own site, localised into `assets/` and
referenced by relative path — nothing is hotlinked and nothing is fabricated.

- The 2023 series (wood-table grounds, warm light) sets the primary tone and is
  used for the hero and the feature moments.
- The classic white-plate dishes appear where they genuinely fit (the rice-table
  spread) and are framed so the white ground reads as clean rather than dated.
- Crops are art-directed but honest: intrinsic ratios are respected, containers
  adopt the source ratio or a near match, and content images show their full
  frame. Source files are small (≤550px), so images are used as **inset panels**
  sized to stay sharp — never blown up to full-bleed blur.
- Where a named dish has no corresponding photograph (sate, whole seabass), it is
  presented typographically in the dish rail rather than mislabelled with the
  wrong picture. Every caption states only what the image actually shows.

If any image fails to load, the surrounding stone/ink panel stands as a neutral,
clearly non-photographic block — never a fake image.

---

## 5. Graphic motifs

Drawn abstractly from Shaftesbury Avenue wayfinding, with no literal theatre
props:

- **The section rail** — a fixed vertical spine of numbered stations (01–06)
  down the left margin, each a short tick that lengthens and turns oxblood when
  its section is in view. It is a real, clickable table of contents, not a
  decoration.
- **Route diagram** in the Visit section — Leicester Square and Covent Garden as
  termini with Bali Bali marked between them; a wayfinding line, not a map.
- **House-number motif** — a large “150” paired with the address, echoing street
  numbering.
- **Schedule notation** — opening hours drawn as a proportional day-track with a
  muted “kitchen closes 30 minutes earlier” tail; mono timecodes throughout.
- **Ticket block** — the hero overlay and booking panel use a compact
  ticket-like card with a mono kicker, abstractly echoing a stub without looking
  like a theatre ticket.
- **Urban grid** — a masked hairline grid in the pre-theatre band, suggesting a
  city street grid.

The **one decisive flourish** is the numbered wayfinding rail with its ticks and
hover station names; everything else stays quiet so it reads as intentional.

---

## 6. Hero composition

The hero is energetic and asymmetric rather than a centred hero card:

- **Left (~58%)** — eyebrow “Authentic Indonesian · Shaftesbury Avenue”, a huge
  condensed headline **“West End supper, since 1986.”** (the year in oxblood), a
  serif lede about hot/mild/tangy balance, then the two actions side by side.
- **Trust signals** sit directly beneath as a four-cell hairline grid: *All meat
  halal · Family-run since 1986 · Vegetarian dishes · Leicester Sq
  & Covent Garden*.
- **Right (~42%)** — a food plate (gado gado) with a **ticket overlay** anchored
  to the bottom-left with even inset: “Before the show / Tell us your theatre
  timing”. Below it, a two-up rail of smaller dishes (rendang, prawns) with mono
  captions. The column reads as a lit table seen from the street.
- A **pre-theatre strip** immediately follows the hero — dark aubergine, one line
  — surfacing pre-theatre relevance early on every screen size.

---

## 7. Section composition

Crisp, rhythmic and directional: **bands, rails, offsets and typographic
markers instead of cards.** Each section is announced by a numbered mono index
(`01 / FOOD`) and a large condensed title.

1. **Signature food** — an editorial split: a lede and an integrated
   “how we suggest you order” note (where all the dietary information lives
   naturally — heat, sambal, halal, vegetarian, allergies), a numbered dish rail
   with plain-English descriptions and small tags, and one tall feature image.
2. **Rijsttafel** — stone band; image left, explainer right, with the Special
   Rijsttafel (eight dishes, minimum two) in a compact panel of eight ticks.
3. **Pre-theatre** — the strongest, darkest band: full schedule table with
   proportional day-tracks, last-order notation and the “kitchen closes ~30
   minutes before” rule, plus practical booking reassurance. No invented timing
   promises — only the real hours, restated.
4. **Since 1986** — a large oxblood **1986** numeral offset against warm copy on
   family-run, relaxed, not-fine-dining tone.
5. **Social proof** — the five established review themes as oversized statement
   rows, explicitly framed as themes rather than lifted quotes; no ratings,
   awards, counts or invented quotations.
6. **Visit + booking** — address with the house-number motif, the route diagram,
   a contact/hours register, and an ink booking panel.
7. **Footer** — compact: identity, address and contact, opening hours, menu link
   and the halal / vegetarian / allergy line.

Groups and celebrations appear only as a small tertiary link beside the
pre-theatre CTA and as one line in the booking panel — never a standalone
section.

---

## 8. CTA treatment

CTAs are direct, high-contrast and utilitarian — excellent city wayfinding:

- **Primary (oxblood solid, near-white label):** *Book a table*. One solid
  primary per viewport. The sticky nav carries the same action as an **outlined**
  ghost so it never competes with the in-page primary.
- **Secondary (ink outline):** *View the menu*, pointing at the real 2026 menu
  PDF.
- **Tertiary (mono underline link):** *Groups of 6–50*, plus the phone link.
- Buttons are compact rectangles with a 2px radius, condensed uppercase labels
  and a mono arrow that nudges on hover. On hover, solids darken (contrast
  rises), outlines invert to solid ink, and the outline-on-dark inverts to
  light — foreground and background always move as a pair.

---

## 9. Mobile behaviour

The desktop composition is not merely squeezed; mobile is a prioritised
redesign.

- **Priority actions:** a fixed bottom action bar surfaces **Book · Menu · Call ·
  Directions** as four 44px+ targets, with Book carrying the solid accent and
  safe-area padding for gesture devices.
- **Pre-theatre surfaced early:** the dark pre-theatre strip follows the hero on
  every breakpoint, and the section keeps its schedule as a readable vertical
  list (day, track, time stacked) rather than a cramped row.
- **Rails become vertical sequences:** the dish rail, review rows, route stops,
  schedule and visit register all collapse to single-column stacks; the fixed
  section rail is hidden and replaced by the hamburger list.
- **Navigation:** the header collapses to a brand + a toggle that opens a clean
  vertical section list; the nav primary is replaced by the bottom bar.
- **Warmth preserved:** the page stays on ivory stone throughout and never
  darkens wholesale — only the pre-theatre band carries the evening tone.
- **No horizontal scroll:** fluid `clamp()` type, single-column grids and
  full-width stacked CTAs keep every width from 360px up clean.

---

## Verification notes

Static review covered: closed tags and complete markup; a walk-through of the
primary flow (Book → Visit panel → call, Menu, rail navigation); dietary
information integrated into food content; one primary CTA per viewport; hover and
focus state contrast; imagery provenance (all local, real Bali Bali
photography); intrinsic-ratio-preserving crops; and no fabricated facts, prices,
ratings or opening times.
