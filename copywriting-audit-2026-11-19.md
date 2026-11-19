# Bali Bali copywriting audit, 19 November 2026

The earlier rewrite resolved the inflated hospitality slogans, unattributed review summaries and allergy guarantee. The remaining work is mostly repetition and copy that has fallen behind the newer mobile experience. The menu page also has a few editorial notes that should read as dish descriptions.

Implementation update, 19 November 2026: Applied all seven findings and the smaller refinements across the seven pages. Booking copy now directs guests to call to check a reservation, without promising a reply. Removed repeated ordering pitches, tightened the menu descriptions and corrected the mobile image labels. Link targets, prices, opening hours and asset attribution records are preserved. The findings below record the copy before this rewrite.

Validation: The production export and TypeScript check passed. All seven pages passed browser checks at widths of 1440, 390 and 360 pixels. Mobile gateway descriptions were checked in the still, playing, completed and manually disabled states; desktop view-control labels also passed.

## Coverage

Reviewed commit `1653f80`, including:

- All 24 main homepage sections across concepts A, B, C and D.
- The comparison page.
- D's menu page: introduction, selected dishes, rice table, terms and booking.
- D's credits page: introduction, four asset credits and gateway-image credit.
- Navigation labels, motion controls, loading and fallback messages, metadata, image descriptions and booking actions.

That covers 36 content regions across seven pages, plus shared interface copy. All seven live HTML pages matched the local exported files. Conditional text was reviewed in its current source; this pass did not retest layout or interaction behavior. Source files and imported credit text were read directly. Design notes and the previous audit remain historical context.

## Findings

### 1. Check the promise to reply to every booking request

Locations: [hero booking note](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/components/CinematicExperience.tsx:230), [pre-theatre copy](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/components/CinematicExperience.tsx:360), [final booking section](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/components/CinematicExperience.tsx:406) and [menu-page booking note](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/app/menu/page.tsx:74).

Current wording: "We'll reply to confirm your table."

This is an operational promise, not an AI-writing tell. The official website asks guests to phone to confirm their reservation; the published text reviewed does not establish that every request receives a reply. This does not prove the promise is wrong. Confirm the process with the restaurant before keeping it. [Restaurant booking information](https://www.balibalirestaurant.com/#Booking).

If replies are confirmed, retain the explanation once beside the relevant booking action. Repetition beside independently encountered actions can be useful, especially on mobile. Avoid repeating it in every introductory paragraph.

Suggested copy while the reply process is unconfirmed:

- Hero note: "Call if you need to check your booking."
- Pre-theatre paragraph: "Eating before a show? Include your show time in your booking request."
- Final booking paragraph: "Send a booking request and include any allergies or theatre plans. Call to check your reservation."
- Menu-page note: "For a same-day visit or to check a booking, call +44 20 7836 2644."

Keep the distinction between requesting a table and receiving confirmation. Do not add a response-time promise.

### 2. Match the mobile food photograph's description to its image

Location: [food-section Photo](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/components/CinematicExperience.tsx:283).

The source switches the photograph to `sate.webp` on mobile but keeps this description:

> Bali Bali's sate, rice, vegetables and sauces served together

The inspected mobile photograph shows skewers, cucumber, onions and a bowl of sauce. It does not show rice. This is an accessibility accuracy issue, not a style preference.

Suggested mobile description:

> Sate skewers with peanut sauce, cucumber and onions on a ceramic plate

Keep a separate description for the desktop spread. Reuse the already specific hero description if that better fits the image's purpose. Do not add dishes that are outside the photograph.

### 3. Update the comparison page's description of D

Location: [D card](/Users/risang/Documents/ChatGPT/bali-bali-redesign/index.html:17).

Current copy:

> A six-scene journey from the first dish to booking, with a camera moving through food photographs. A photo version is available when animation is reduced or unavailable.

The camera description now applies to desktop. Mobile uses a scrolling page and a short gateway dissolve. The current summary makes that difference hard to anticipate. This is a scope clarification rather than evidence of AI writing.

Suggested copy:

> A moving camera connects six food scenes on desktop. Mobile uses a short gateway dissolve and a scrolling page, with a still version for reduced motion.

Keep the framework and texture-resolution details in the design notes. The comparison card needs to explain what the reviewer will experience.

### 4. Give the mobile gateway an accurate description in each state

Location: [gateway accessible label](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/components/MobileGateway.tsx:59).

The label says the gateway is "opening onto" sharing dishes even when animation is disabled and the gateway remains still. The completed animated state already has a separate description.

Suggested labels:

| State | Description |
| --- | --- |
| Still gateway or animation not yet started | A rendering of a Candi Bentar gateway |
| Dissolve playing | A Candi Bentar gateway fading into a photograph of Bali Bali's dishes |
| Dishes visible after the dissolve | Bali Bali's dishes arranged to share |

Retain the cultural name. Keep the credits page's explanation that this gateway does not depict the restaurant entrance; that contrast corrects a plausible misunderstanding.

### 5. Keep the offer to help choose in one place within each homepage

Locations: [A food and story](/Users/risang/Documents/ChatGPT/bali-bali-redesign/concept-a.html:37), [B food and story](/Users/risang/Documents/ChatGPT/bali-bali-redesign/concept-b.html:30), [C food and story](/Users/risang/Documents/ChatGPT/bali-bali-redesign/concept-c.html:555), and [D hero](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/components/CinematicExperience.tsx:225), [food](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/components/CinematicExperience.tsx:261), [rice table](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/components/CinematicExperience.tsx:312) and [story](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/components/CinematicExperience.tsx:339).

The individual sentences sound natural. Together, they repeat the same reassurance. D makes this offer in four of its six sections. Humanizer's useful test here is whether the next paragraph adds information; the repeated invitation usually does not.

For D:

- Keep the hero's "New to the food? We'll help you choose."
- Food: use "Try grilled sate with rice, and ask for sambal if you'd like more heat." Cut the second sentence about finding favourites.
- Rice table: keep the translation, eight dishes, £34 per person and minimum two people. Cut "New to Indonesian food? Ask us about each dish."
- Story: cut the paragraph beginning "Whether you know your favourites..." It repeats the ordering help and supplies no family history. Keep the family-run identity, establishment date and West End location. A future family story needs a real detail from the owners.

Apply the same principle to A, B and C: keep practical ordering guidance in the food section, then let the story section cover the restaurant. A's story ends with help choosing a meal; B's ends with finding what you like; C's ends with asking where to start. Those endings can be cut without losing the restaurant's history.

B's eyebrow "The people behind the table" also promises people or a family story that the paragraph does not supply. "About Bali Bali" is a more accurate label until that content exists.

### 6. Remove source-document narration and redundant menu explanations

Locations: [shared dish descriptions](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/lib/content.ts:10) and [menu section label](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/app/menu/page.tsx:36).

| Current copy | Finding | Suggested final copy |
| --- | --- | --- |
| Gado gado: "Indonesian salad with peanut sauce. Listed in the vegetarian section." | Humanizer §25: the second sentence explains the source document. State the dietary information directly. | Vegetarian Indonesian salad with peanut sauce. |
| Vegetarian sate: "Mock chicken skewers with peanut sauce. A vegetarian option." | Humanizer §24: the final sentence repeats the dish name. | Mock chicken skewers with peanut sauce. |
| Nasi putih: "Steamed rice to accompany your meal." | Small trim: the last five words add little in a menu. | Steamed rice. |
| Sate: "Chicken or beef skewers, cucumber and onions, with peanut sauce." | The list makes the ingredients' relationship awkward. | Chicken or beef skewers with peanut sauce, cucumber and onions. |
| Section heading: "Start here" | Names a reading instruction rather than the contents. | Selected dishes |

The menu distinguishes ordinary gado gado from Gado Gado Special, which contains shrimp paste. Keep the plain dish name and its correct price; do not broaden the vegetarian description to every similarly named dish. [Official 2026 menu, pages 6 and 7](https://www.balibalirestaurant.com/pdf/bali_bali_menu_2026.pdf).

Keep "A taste of the menu." It suits the subject and signals that the page is a selection. Also keep the link to the full menu, dietary request, price-check date and spending/booking conditions. Those details affect a guest's decision and are not drafting residue.

### 7. Simplify the repeated "when" in pre-theatre copy

Locations: [A pre-theatre](/Users/risang/Documents/ChatGPT/bali-bali-redesign/concept-a.html:48), [B pre-theatre](/Users/risang/Documents/ChatGPT/bali-bali-redesign/concept-b.html:34), [C strip](/Users/risang/Documents/ChatGPT/bali-bali-redesign/concept-c.html:537), [C pre-theatre](/Users/risang/Documents/ChatGPT/bali-bali-redesign/concept-c.html:651) and [C booking](/Users/risang/Documents/ChatGPT/bali-bali-redesign/concept-c.html:758).

Current construction: "Tell us when your show starts when you book."

This is an awkward sentence left by the last rewrite, not a strong AI tell by itself. Use:

> Tell us your show time when you book.

In C's booking section, use:

> Call to book and tell us your show time.

D's newer "Include your show time in your booking request" already avoids the problem. Keep it.

## Smaller refinements

| Location | Suggested refinement | Reason |
| --- | --- | --- |
| [Menu rice table](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/app/menu/page.tsx:52) | "Eight dishes served together as a rice table. The selection changes with the season." | More closely expresses the menu's changing selection than "Eight seasonal dishes", which may suggest a claim about ingredients. |
| [Menu terms](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/app/menu/page.tsx:59) | "Prices include VAT. Service charge is not included." | Matches the published scope without adding a rate or saying whether the charge is optional. Preserve the other conditions and amounts. |
| [Credits title](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/app/credits/page.tsx:18) | "3D asset credits" | More useful as a destination heading than "Craft and credit." This is a clarity choice, not a claim that the current phrase is AI-written. |
| [Credits image heading](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/app/credits/page.tsx:61) | "Gateway image" | Identifies the specific image being credited. |
| [Desktop mode control](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/components/Navigation.tsx:110) | "Use the animated view" / "Use the photo view" | Optional: describes the two modes more literally than "Watch the journey" / "Read the full page". The animated mode is scroll-controlled, and both modes contain the full page. |

Leave the authors, asset titles, licence names, source links and modification records intact. Technical detail is appropriate on a credits page. The mobile controls "Animate the gateway" and "Keep the gateway still" accurately describe the current behavior and can stay.

## Section-by-section disposition

| Page | Sections reviewed | Decision |
| --- | --- | --- |
| A | Hero, food, rice table, pre-theatre, story, visit | Keep the specific headline, dish information, dietary request and contact details. Trim the repeated ordering reassurance and theatre sentence. |
| B | Hero, food, rice table, pre-theatre, story, visit | Keep "Come hungry. Share everything." and the concrete food copy. Trim the story's ordering pitch, relabel its eyebrow and simplify the theatre sentence. |
| C | Hero, food, rice table, pre-theatre, story, visit | Keep "West End supper, since 1986.", the food explanations and practical information. Trim the story ending and repeated "when" phrasing. |
| D | Hero, food, rice table, story, pre-theatre, visit | Keep the food-led headings and supported prices. Reduce repetition, confirm the booking promise and correct the mobile image descriptions. |
| Comparison | Introduction and four concept cards | A, B and C descriptions remain useful. Update D's device-specific description. Keep the prototype-reservation note. |
| D menu | Introduction, dish list, rice table, terms, booking | Edit the source-document language and small redundancies. Preserve amounts, minimums, conditions and the recorded price-check date. |
| D credits | Introduction, four asset credits, image credit | Optional heading changes only. Preserve attribution and adaptation details. |

## Checks and limits

The official PDF still lists the six selected dish prices shown on D's menu page and the Special Rijsttafel at £34 per person for a minimum of two people. The displayed hours, contact details and group information agree with the restaurant website. The booking reply process remains an operational question. [Official menu](https://www.balibalirestaurant.com/pdf/bali_bali_menu_2026.pdf), [restaurant website](https://www.balibalirestaurant.com/).

No new review claims, allergy guarantees, invented family history or unsupported awards were found in the reviewed guest copy. No sections were left unread. Visual text fit and actual booking-response behavior were outside this audit.
