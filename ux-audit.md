# Bali Bali UX audit

16 November 2026. Audit only; application files were not changed.

Concept D has a clear visual identity and persistent reservation access. The main opportunities are making practical information readable, explaining the booking request process, and helping visitors judge the food and cost without leaving the page.

## Scope and evidence

Primary review: the current Concept D static export, cross-checked against `cinematic/` source. Browser inspection covered 390 × 844 and 1440 × 900, the Explore disclosure, Visit navigation, chapter navigation and the official booking destination. Concept B received a targeted browser check at 320 × 568. A and C received source inspection only. The comparison hub received source inspection.

This is an expert review, not a user study or a full accessibility conformance assessment. No reservation was submitted. No physical-device, screen-reader, text-enlargement, reduced-motion runtime or performance benchmark testing was performed. Recommendations about abandonment and comprehension are hypotheses to validate, not measured conversion effects.

P1 means address before launch because a core task is materially affected. P2 means a meaningful usability improvement. Findings below describe the current files and rendered behavior; historical audit notes are not evidence that a fix remains present.

## Findings

### 1. P1 — Practical information is too small to read comfortably

**Evidence:** In D, mobile address and opening hours use 10px text, their headings and kitchen note use 8px, and the group note uses 9px. Desktop visit details use 12px, with a 9px kitchen note. These sizes were visible in the browser and confirmed in CSS. The information fits, but its scale makes a routine visit-planning task unnecessarily demanding.

**Location:** `cinematic/app/globals.css:480`, `:951`.

**Fix:** Set practical information to 14–16px and supporting labels to at least 12px. Let the visit layout grow, and stack the address and hours on narrow screens. Preserve generous link targets.

**Acceptance:** Address, phone, hours and kitchen cutoff remain readable at 390px and 320px without pinch zoom. At 200% text size, all information remains reachable with no overlapping text or horizontal scrolling.

### 2. P2 — The booking CTA does not explain that this is a request

**Evidence:** D labels the action “Book a table” and opens another site in a new tab. The destination is a booking request form that says the restaurant will reply with confirmation. The redesign does not explain this before the handoff. The destination loads successfully; this is an expectation problem, not a broken link.

**Location:** `cinematic/components/ReservationActions.tsx:11`, `cinematic/components/Navigation.tsx:88`, `cinematic/components/CinematicExperience.tsx:315`.

**Fix:** Add nearby text such as “Send a booking request. Your table is confirmed when we reply.” Keep the compact primary CTA consistent, and make “Call to book” readily available for urgent or same-day plans. A future native booking flow should show availability and confirmation status explicitly.

**Acceptance:** Before following the primary CTA, visitors can tell whether they are requesting or confirming a reservation. The final confirmation message clearly distinguishes a submitted request from a confirmed table.

**External evidence:** [Official booking page](https://www.balibalirestaurant.com/#Booking), inspected in the browser, including the loaded embedded form.

### 3. P2 — Visitors must leave the page to assess prices

**Evidence:** D introduces sate and the Special Rijsttafel without prices. The only complete menu is an external eight-page PDF. The rice-table section explains the minimum party size but omits the per-person price, a key decision detail. A–C also route menu access to the PDF.

**Location:** `cinematic/components/CinematicExperience.tsx:145`, `:186`; `cinematic/components/ReservationActions.tsx:14`.

**Fix:** Add a responsive HTML menu or a concise selection of dishes with prices, descriptions and verified dietary information. Put the rice-table price and minimum order beside its description. Keep the PDF as an additional format. Establish a price-update owner so page and PDF stay aligned.

**Acceptance:** A visitor can identify a suitable dish, estimate the cost and understand rice-table pricing without opening a PDF. Prices match the restaurant-approved source.

**External evidence:** The [official menu PDF](https://www.balibalirestaurant.com/pdf/bali_bali_menu_2026.pdf) currently lists the Special Rijsttafel at £34 per person, minimum two people. Reconfirm when implementing.

### 4. P2 — Visit planning takes more exploration than necessary

**Evidence:** D's mobile quick-action bar exposes booking and the PDF menu. Phone and hours are only in the last scene; directions appear in the fifth and sixth scenes. Explore → Visit us works, so the information is reachable, but visitors arriving to check hours or get directions must discover the disclosure or progress through the story. The main disclosure also omits the pre-theatre chapter.

**Location:** `cinematic/components/Navigation.tsx:64`, `:97`; `cinematic/components/CinematicExperience.tsx:303`.

**Fix:** Expose a clearly named “Hours & directions” shortcut near the hero or in persistent navigation. Include pre-theatre in Explore. Preserve booking and menu prominence; use a compact visit panel if additional fixed buttons would crowd the screen.

**Acceptance:** From the initial view, hours and directions are available through one clearly labelled action. Calling is easy to find without completing the journey.

### 5. P2 — Chapter navigation hides its destinations

**Evidence:** On desktop, inactive chapter links display only numbers. The selected chapter alone shows its name. Inactive links also have 50% opacity and 9–10px text. On mobile, only the current chapter remains visible, so this strip cannot be used to choose another chapter. Accessible names exist, but visual users lack equivalent destination labels.

**Location:** `cinematic/components/ScrollProgress.tsx:14`; `cinematic/app/globals.css:572`, `:1127`.

**Fix:** Show meaningful desktop chapter labels at readable contrast. On mobile, make the current chapter a clearly indicated chapter picker, or treat it as progress text and keep all destinations in Explore. Avoid presenting the current chapter as the only apparent navigation option.

**Acceptance:** Visitors can identify where a chapter control leads before selecting it, using touch, keyboard or pointer.

### 6. P2 — Concept B clips important text at 320px

**Evidence:** At 320 × 568, “Share everything.” runs beyond the right edge and is clipped. The hero heading's right edge measured about 331px. The address heading also has internal overflow. The document itself reports a 320px width because horizontal overflow is hidden; a document-width check alone would miss this defect.

**Location:** `concept-b.html` hero and mobile typography styles.

**Fix:** Allow grid children to shrink with zero minimum column widths and `min-width: 0`. Reduce narrow-screen display sizing and use deliberate wrapping for long words and the address. Check text bounds, not only document scroll width.

**Acceptance:** The full headline and address fit at 320px, 360px and 390px. No text is clipped by overflow hiding.

### 7. P2 — Earlier concepts have incomplete menu dismissal behavior

**Evidence:** In B, pressing Escape after opening Explore leaves the menu expanded; reproduced in the browser. A and C have similarly limited inline scripts: they handle the toggle and link selection but do not handle Escape, outside clicks or focus leaving the disclosure. D already handles these cases and returns focus on Escape.

**Location:** Inline navigation scripts at the end of `concept-a.html`, `concept-b.html` and `concept-c.html`.

**Fix:** Use a consistent disclosure implementation across A–C, borrowing D's dismissal behavior. In A, correct `aria-controls="nav"`, which currently has no matching target ID.

**Acceptance:** Escape dismisses the disclosure and restores focus to Explore; clicking outside or moving focus outside closes it; state and control relationships remain accurate.

### 8. P2 — Reading the complete content depends on scene progression

**Evidence:** D sets inactive scene sections to `inert` and `aria-hidden`. This appropriately prevents invisible controls from receiving focus, but it also removes inactive headings and content from accessibility navigation. The photographic edition exists, yet it is selected only by reduced-motion preference, graphics support or failure; there is no in-page way to choose it. The heading-navigation limitation is code-confirmed; actual screen-reader behavior was not tested.

**Location:** `cinematic/components/ScrollDirector.tsx:40`; `cinematic/components/CinematicExperience.tsx:42`.

**Fix:** Offer a persistent “Read page” or “Photo version” choice and preserve the visitor's current section when switching. Keep inactive animated controls inert. The reading edition should expose the full heading structure in normal document flow.

**Acceptance:** Visitors can choose a continuous reading layout independently of operating-system settings. Validate full-page heading traversal, section jumps and focus with a screen reader before launch.

## Keep these strengths

- D's mobile booking/menu controls remain outside the animated stage and have generous touch targets.
- The Explore → Visit destination works, and D's Escape dismissal restores focus.
- Food copy explains unfamiliar terms and gives first-time diners a useful starting point.
- The photographic fallback and reduced-motion path are already implemented in source.
- Phone and directions are ordinary links rather than interactions dependent on WebGL.

## Suggested order

1. Enlarge practical text and make the visit layout accommodate it.
2. Explain booking requests and add a visible route to hours, directions and calling.
3. Add price information and an HTML menu path.
4. Improve chapter labels and expose the reading edition.
5. Fix B's narrow-screen wrapping and align A–C disclosure behavior.

Then run short task tests: choose dinner for two within a stated budget; find tonight's hours and directions; request a table before a show and explain when it becomes confirmed. Measure completion, misinterpretations and time to locate information before assigning a conversion score.
