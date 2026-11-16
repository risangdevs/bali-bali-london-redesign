# Bali Bali copywriting audit

Reviewed 16 November 2026 using Humanizer.

Implementation update, 16 November 2026: Applied the copy changes across A, B, C, D and the comparison page. Removed the three review sections pending independently checked review sources, updated navigation labels and menu destinations, and removed the guest-facing production notes. The findings below record the original copy.

Checked the [restaurant website](https://www.balibalirestaurant.com/) and [2026 menu](https://www.balibalirestaurant.com/pdf/bali_bali_menu_2026.pdf) during implementation. The menu confirms the Special Rijsttafel has eight dishes with a minimum order for two people, and identifies the vegetarian sate as mock chicken. The website reproduces review excerpts, but the linked Tripadvisor pages could not be independently read. The old review summaries remain withheld. Image descriptions were checked against the local photographs; B's second story image is a drink, and C's hero photograph is now described without an unconfirmed dish name.

Validation: TypeScript and the production export passed. Browser checks covered all five pages at widths of 1440, 390 and 360 pixels, plus all six cinematic scenes on desktop and mobile. Menu destinations, navigation states and local asset links passed. Refreshed the four preview images to show the updated copy. Small layout adjustments keep headings and action labels readable on narrow screens.

The copy is strongest when it names the food, the address or something a guest can do. Concept B has the clearest invitation. Concept C has the most useful practical detail, but needs substantial trimming. Concept A needs a more natural editorial voice. Concept D repeats broad hospitality slogans across scenes that could each tell the guest something different.

## Scope

Reviewed all 27 main content sections across the four designs: seven each in A, B and C, and six in D. Also reviewed the comparison page, making 28 content sections in total, plus navigation, actions, metadata, dietary notes, image descriptions and footer copy. Checked D's exported HTML against its source for the visible copy discussed here.

Sources:

- [Concept A](/Users/risang/Documents/ChatGPT/bali-bali-redesign/concept-a.html)
- [Concept B](/Users/risang/Documents/ChatGPT/bali-bali-redesign/concept-b.html)
- [Concept C](/Users/risang/Documents/ChatGPT/bali-bali-redesign/concept-c.html)
- [Concept D source](/Users/risang/Documents/ChatGPT/bali-bali-redesign/cinematic/components/CinematicExperience.tsx) and [export](/Users/risang/Documents/ChatGPT/bali-bali-redesign/concept-d/index.html)
- [Comparison page](/Users/risang/Documents/ChatGPT/bali-bali-redesign/index.html)

The design notes and cinematic README supplied context. They were not treated as guest copy. This audit originally reviewed the source without changing the designs. See the implementation update above for subsequent changes and source checks.

## Fix first

| Priority | Finding | Recommended action |
| --- | --- | --- |
| Before publication | C says "only a very few dishes contain nuts" and "we will keep your meal safe" (line 561). The first phrase downplays an allergen; the second promises an outcome the page cannot establish. | Use "Please tell us about any allergies before ordering." Have the restaurant confirm any more detailed allergen guidance. |
| Before publication | A and B put unattributed review summaries inside `blockquote` elements. C makes recurring-review claims without traceable review evidence in the supplied files. | Obtain sources. Publish exact, attributed excerpts or clearly identified summaries supported by those sources. Hold the review copy until then. |
| High | D says "There's always room at our table" (line 307), while the other designs explain that tables are limited. | Use "Join us on Shaftesbury Avenue." |
| High | C's hero "View the menu" points to `#food` (line 501). | Point it to the menu PDF, or rename it "Explore the food" if the destination stays. |
| High | D exposes "INTERIOR PORTRAIT TO FOLLOW" and "STREET PHOTOGRAPHY TO FOLLOW" (lines 245 and 297). | Move production notes to the design notes. Keep the photographs and address artwork honestly described. |
| Medium | Navigation uses "Menu" for site links beside "Menu" for food. C's toggle keeps the accessible name "Open menu" after opening. | Use "Explore" / "Close" for navigation and "View menu (PDF)" for food. Update C's accessible name with its state. |

## Concept A: London Institution

Keep the address, establishment date, straightforward booking language and dish descriptions. The editorial character works best with plain sentences. "Quietly established" and "not a fine-dining performance" make the restaurant sound self-conscious.

| Section and source line | Finding | Suggested copy or decision |
| --- | --- | --- |
| Hero, 29–30 | "A London table, cooking Indonesian" gives the table an awkward action. The introduction stacks "relaxed, generous and happy to guide" around a dash. | Headline: "Indonesian cooking. A London home since 1986." Intro: "We're a small, family-run restaurant on Shaftesbury Avenue. New to Indonesian food? We'll help you choose." |
| Food, 37–43 | "Hot" and "spicy" overlap in the introduction. Rendang's "deep, aromatic and one of Indonesia's best-loved dishes" combines description with an unsupported popularity claim. | Intro: "Some dishes are mild, others hot or tangy. Tell us what you like and we'll help you choose dishes that go together." Rendang: "Beef slow-cooked with chilli and coconut." Nasi goreng: "Indonesian fried rice with mild spices. A good place to start." Keep the concrete sate and gado gado descriptions and the allergy request. |
| Rice table, 46 | The explanation supplies useful facts. "Discover several flavours in one sitting" and "One generous introduction" add promotional weight. | "Rijsttafel means 'rice table': a selection of dishes to share. The Special Rijsttafel includes eight popular dishes for two or more people." Supporting label: "Eight dishes to share." Caption: "Come with a friend and ask us about each dish." |
| Pre-theatre, 48 | Useful location and booking information. "Theatre timing" and "appropriate reservation time" sound administrative. "A useful note" announces the note. | "Seeing a show? Tell us when it starts when you book. We're on Shaftesbury Avenue, near Leicester Square and Covent Garden, and can help you choose a reservation time." Rename "A useful note" to "Booking ahead". Keep the limited-table and change-of-plan request. |
| Story, 50 | "Family-run. Quietly established." is staged. "Built its reputation over decades" asserts reputation without evidence, and "not a fine-dining performance" rejects an alternative the guest has not raised. | Heading: "Family-run since 1986." Body: "Bali Bali has served Indonesian food in London's West End since 1986. We're a small, relaxed restaurant where regulars and first-time visitors can ask the team for help choosing a meal." |
| Reviews, 52–55 | "Warm welcomes. Real flavour." is generic. The three summaries resemble customer quotations, although each is labelled "Recurring review theme". "Excellent value" is an evaluative claim requiring support. | Hold for review evidence. If publishing supported summaries, use "What guests say", remove quotation markup and identify them as summaries. Do not invent a customer quotation or attribution. |
| Visit and booking, 58 | "Find your table on Shaftesbury Avenue" blurs location and booking, but the practical paragraph is clear. | Heading: "Visit us on Shaftesbury Avenue." Body: "Call to book, and tell us your show time, any allergies or whether you're celebrating." Keep address, phone, stations, kitchen note and group size. |

Ancillary copy:

- Keep "Book a table", "Call to book" and "Directions". The first leads to the contact panel and the second starts a phone call; that sequence is understandable.
- Change the navigation toggle from "Menu" to "Explore" to distinguish it from the food menu. Retain "Close" when expanded.
- Use "View menu (PDF)" for the food link. Retain the compact mobile label if space requires it, with a clear accessible name.
- The footer's address, hours and dietary information are useful. Keep the numbers and contact details unchanged pending business verification.
- Image descriptions such as "A colourful Indonesian dish" are vague. Name only what the image and approved asset information establish. Avoid guessing a dish to make an alt description more specific.

## Concept B: Indonesian Table

Keep "Come hungry. Share everything." It is a purposeful invitation that suits this food-led design. Most editing belongs in the explanatory copy and review section.

| Section and source line | Finding | Suggested copy or decision |
| --- | --- | --- |
| Hero, 21 | The headline works. "Curious first-timers, old friends and everyone who likes a generous table" is an unnecessary three-part audience list. | Keep the headline. Intro: "Indonesian dishes to share at our family-run restaurant on Shaftesbury Avenue. New to the food? We'll help you choose." |
| Food, 24 | "Indonesian food is made for a table" is a broad claim. "Something... something... something" and "tastes, textures and amounts" make the explanation mechanical. | Heading: "Choose a few dishes to share." Body: "Start with sate, then add a curry, vegetables and rice. Ask us which dishes go well together and how much to order." Heat note: "Ask for sambal if you'd like more heat. All meat is halal and vegetarian dishes are available. Please tell us about allergies before ordering." |
| Rice table, 26 | The eight-dish and minimum-two information is useful. "The easiest way" overstates a preference; "Share together" repeats itself. | "Rijsttafel means 'rice table': several Indonesian dishes served together. The Special Rijsttafel includes eight popular dishes for two or more people." Keep the number labels. Change "Share together" to "For sharing". Retain "Mild + tangy" only if it accurately describes the current selection. |
| Pre-theatre, 28 | "A West End ritual" inflates an ordinary dinner. The body supplies useful information, while "Plan your table" obscures the booking action. | Eyebrow: "Pre-theatre dining." Keep "Eat before the show." Body: "Tell us when your show starts when you book. We're on Shaftesbury Avenue, near Leicester Square and Covent Garden." Rename the action "Book a table". Keep the booking-ahead request and group enquiry. |
| Story, 30 | "Small restaurant. Big welcome." is familiar hospitality shorthand. The following paragraph already has a warmer and more specific voice. | Heading: "Family-run since 1986." Body: "We've served Indonesian food in London's West End since 1986. Ask us about the dishes, share a few plates and find what you like." |
| Reviews, 32 | "Food remembered. Hospitality felt." is an abstract pair of fragments. Unattributed summaries in quotation markup imply direct testimony. | Hold for review evidence. Use "What guests say" if sources support the section. Summaries must remain summaries; quoted words need a real author and source. |
| Visit and booking, 34 | The address-led heading is direct. "Call to confirm your reservation" can imply that a reservation already exists. The Friday/Saturday separation is clear. | Keep "150 Shaftesbury Avenue." Booking copy: "Call to book. Tell us your show time and any allergies, or anything else we should know." Keep the complete hours and directions. Use "View menu (PDF)" for the menu link. |

Ancillary copy:

- Keep the short factual strip: halal meat, family ownership, pre-theatre dining and address each add distinct information.
- Use "Explore" for navigation and "View menu (PDF)" for food, following the same distinction as A.
- Preserve the footer's dietary information. Its short lines are practical labels, not dramatic fragments that need merging.
- "A second Bali Bali dish" supplies little useful information as alt text. Replace it with an accurate visual description after checking the asset.
- The prototype meta description's "food-led, generous homepage centred on..." is suitable for a design review but would need guest-facing wording before restaurant publication.

## Concept C: West End Evening

Keep "West End supper, since 1986." The location, year and practical theme distinguish this design. The longer sections repeatedly explain how to order, and the review introduction talks about the writing process.

| Section and source line | Finding | Suggested copy or decision |
| --- | --- | --- |
| Hero and strip, 495–540 | The headline works. "In the heart of", the hot/mild/tangy sequence and "first time or your fiftieth" crowd the introduction. The strip promises to plan the meal around the show. | Keep the headline. Intro: "A small, family-run Indonesian restaurant on Shaftesbury Avenue. Tell us what you like and we'll help you choose." Strip: "Seeing a show? Tell us when it starts when you book." Change "See the schedule" to "Opening hours" because the target is an hours table. Resolve the hero menu-link mismatch. |
| Food, 548–602 | The cultural-influences paragraph is broad background with no supplied source. Ordering guidance repeats. The allergen sentence overpromises. "Let the tangy and the stewed dishes do the talking" adds metaphor to a practical note. | Heading: "From sate to sambal." Intro: "Start with sate or nasi goreng, then add vegetables and rice to share. Ask us which dishes go together and how much to order." Dietary note: "Ask for sambal if you'd like more heat. All meat is halal and vegetarian dishes are available. Please tell us about any allergies before ordering." Caption: "Add sambal a spoonful at a time, or choose milder dishes." Preserve the concrete dish ingredients below. |
| Rice table, 621–635 | "Easiest way", "a little of everything", "let the table do the talking" and a second ordering explanation repeat the same invitation. | "Rijsttafel means 'rice table': a selection of dishes to share. The Special Rijsttafel brings together eight of our most popular dishes for two or more people. Ask the team to talk you through them." Keep the dietary note, without the dash: "Vegetarian dishes are available and all meat is halal. Please tell staff about any allergies." |
| Pre-theatre, 646–687 | The useful request is buried in a long sentence ending "rather than rushing". "How to do it" adds staging. | Keep "Before the show". Body: "Tell us when your show starts when you book. We'll help you choose a reservation time." Note: "Please book ahead. We have limited tables, so give us as much notice as you can if your plans change." Kitchen note: "The kitchen closes about 30 minutes before the restaurant. Please allow time for your meal." Keep every day's hours and explicit last-order times. |
| Story, 697–706 | "Family-run, not fine dining" and "looked after rather than politely impressed" argue against an imagined alternative. The caption repeats the food introduction. | Heading: "Family-run since 1986." Body: "Bali Bali has served Indonesian food in London's West End since 1986. Come in for nasi goreng or share a rijsttafel. If you're new to the food, ask us where to start." Caption: use a verified dish name or a plain description of the photograph. |
| Reviews, 716–757 | "Talking with your mouth full" has personality but obscures the section's purpose. The introduction narrates how reviews were rewritten. "Personal, not corporate" is an unnecessary contrast. Repeated guest and value claims lack traceable evidence here. | Hold for review evidence. If sources substantiate these themes, use "What guests say" and remove the introduction about assembling the section. Keep only supported themes; give each a concrete, non-quoted summary. Do not substitute new praise for missing evidence. |
| Visit and booking, 768–818 | Address, stations and phone are useful. "Fri–Sat 12:00–22:45 / 23:00" makes guests work out which closing time applies to which day. "Dietary: Halal · Vegetarian" loses the distinction between halal meat and available vegetarian dishes. | Give Friday and Saturday separate rows, preserving the stated times. Use "All meat halal · Vegetarian dishes available". Booking copy: "Call to book, and tell us when your show starts. We have a limited number of tables, so please book ahead." Group copy: "Groups of 6 to 50: call to ask about a menu for your party." |

Dish-level edits:

| Current copy | Suggested copy |
| --- | --- |
| Sate: "A gentle, well-known way to start." | Delete this sentence. Keep the grilled meat or tofu and peanut sauce description. |
| Rendang: "Deep and aromatic rather than fiery." | "Aromatic, with a mild heat." Confirm that heat description with the kitchen before using it. Keep the beef, coconut paste and slow-cooking details. |
| Nasi goreng: "The easiest first plate." | "A good first dish." Keep the listed meats, seafood and mild spices if they describe the actual menu item. |
| Gado gado: "A good vegetarian plate and a natural partner to the grilled dishes." | "A vegetarian dish to share alongside the grilled dishes." Keep the vegetables, tofu and warm peanut sauce. |
| Sambal: "Ask for it if you want real heat — rice is the best cure." | "Ask for it on the side if you'd like more heat." Keep the description as a hot chilli sauce. |

Ancillary copy:

- Use sentence case in the navigation: "The food", "Rice table" and "Pre-theatre". Uppercase styling may stay in CSS where it serves the wayfinding design.
- Update the mobile toggle's accessible label to "Close navigation" when expanded, and "Open navigation" when collapsed. The current fixed `aria-label="Open menu"` overrides the visible "Close" text.
- Keep "Book a table", "Call to book" and "Directions". The main booking buttons lead to the contact section, where the phone action is explicit.
- Keep the address, telephone number, transport labels and full footer hours. Use "to" for time and day ranges in a Humanizer rewrite, for example "Monday to Thursday" and "12:00 to 22:00", without changing the values.
- Proposed meta description: "A small, family-run Indonesian restaurant at 150 Shaftesbury Avenue, established in 1986. All meat is halal. Vegetarian dishes and pre-theatre dining are available." This avoids implying that every listed service has been available since 1986.

## Concept D: A Journey to the Indonesian Table

The six-scene structure provides room for a sequence: introduce the restaurant, describe the food, explain rijsttafel, establish its history, help with a theatre visit, then book. The existing copy often repeats the invitation to share instead of advancing that sequence.

| Scene and source line | Finding | Suggested copy or decision |
| --- | --- | --- |
| First taste, 116–147 | The year appears in both the eyebrow and the bottom label. "A taste of Indonesia" and "A little closer to Indonesia. Right here in London" repeat a broad promise. | Keep the BALI BALI wordmark and "a taste of Indonesia." Eyebrow: "London's West End · Since 1986." Supporting copy: "A family-run Indonesian restaurant on Shaftesbury Avenue. New to the food? We'll help you choose." Remove the duplicate "Dining since 1986" block or use "150 Shaftesbury Avenue" in that position. Keep the family-run and halal seal. |
| Food, 156–183 | "A little heat. A lot of heart." is a generic paired slogan. Three food fragments are followed by "Follow your curiosity", which does not help someone order. | Eyebrow: "02 / The food." Heading: "Start with sate." Body: "Try grilled sate with rice, and ask for sambal if you'd like more heat. We'll help you find your favourites." Keep the three dish labels because they explain distinct items. Dietary: "All meat is halal. Vegetarian dishes are available. Please tell our team about allergies before ordering." |
| Sharing, 193–218 | "The art of sharing", "Good food is meant to be shared" and "Discover the richness" repeat the same idea. The explanation does not translate rijsttafel. | Eyebrow: "03 / Rijsttafel." Heading: "A rice table to share." Body: "Rijsttafel means 'rice table': a selection of dishes served together." Supporting note: "A good place to start if you're new to Indonesian food. Ask us about each dish." The eight-dish and minimum-two details in A to C could be added once the current menu confirms them; do not assume the pictured spread is that set. |
| Heritage, 229–246 | "A small restaurant. A long story", "Rooted in tradition" and "full of flavour" imply a story without telling it. The remaining three-part list is vague. A production note is exposed to guests. | Eyebrow: "04 / Our story." Heading: "Family-run since 1986." Body: "We've served Indonesian food in London's West End since 1986." Supporting copy: "Whether you know your favourites or are trying Indonesian food for the first time, ask us what to order." Remove the future-interior note from guest copy. Do not describe the food photographs as an interior or archival scene. |
| West End, 258–298 | "Before the curtain rises" fits the theatre context and can stay. "Make Bali Bali part of your West End evening" is less useful than the booking request. "Find us in London" is broad, and the street-photography note is a production detail. | Keep the heading. Body: "Eating before a show? Tell us when it starts when you book." Directions link: "Get directions." Keep the full street address and station names. Move the photography note to the design notes; the typographic address needs no apology. |
| Booking, 306–358 | "There's always room" overpromises capacity. The following sentence repeats the hero's flavours-and-hospitality claim. "Take your time" conceals the opening hours. | Eyebrow: "06 / Visit and booking." Heading: "Join us on Shaftesbury Avenue." Body: "Book a table and tell us about any allergies or theatre plans." Labels: "Find us" and "Opening hours". Kitchen note: "The kitchen closes around 30 minutes before the restaurant." Group line: "For groups of 6 to 50, call us to discuss your booking." Keep the contact details and each day's hours. |

Shared D copy:

| Element and source | Finding | Suggested copy or decision |
| --- | --- | --- |
| Navigation, `Navigation.tsx`, 53 | "Menu" opens navigation while "View Menu" opens food. | "Explore" when closed; "Close" when open. Use "View menu (PDF)" for the food link. |
| Booking actions, `ReservationActions.tsx`, 12 and 20 | The actions are clear; title case is unnecessary. | "Book a table" and "View menu (PDF)". Keep the external-link indicator because it communicates behavior. |
| Chapters, `lib/content.ts`, 8–15 | "The art of sharing" and "Come to the table" are less useful as navigation labels than the actual destination. | "First taste", "The food", "Rijsttafel", "Since 1986", "Pre-theatre", "Visit and booking". Keep anchor values unchanged. |
| Loading, `CinematicExperience.tsx`, 102 | "Setting the table…" is short, relevant and understandable in context. | Keep. There is no need to remove every playful line. |
| Fallback notice, `CinematicExperience.tsx`, 377 | "Enjoy the photographic edition" puts a promotional instruction before the status. | "Showing the photo version because animation is unavailable." |
| Metadata, `app/layout.tsx`, 6–9 | "Explore the table, discover rijsttafel, and plan your visit" is a three-part generic invitation. | "Family-run Indonesian restaurant on Shaftesbury Avenue in London's West End, established in 1986. View the menu and book a table." |
| Image descriptions, `CinematicExperience.tsx`, 185 and 249 | "A real Bali Bali spread" spends a word claiming authenticity. "Beef dish" is vague, but dish identity must be verified. | Remove "real". Use "Bali Bali's sate, rice, vegetables and sauces" where the image supports it. Use a specific approved dish name for the beef image only after checking it. |

## Comparison page

The reader here is reviewing design directions, so design language belongs here. The descriptions should help them distinguish the concepts. Keep framework details in the linked notes unless the reviewer needs them to make the decision.

| Element, source line | Current issue | Suggested copy |
| --- | --- | --- |
| Page heading, 15 | "Four ways to come to the table" makes the reader interpret the purpose. | "Four directions for Bali Bali." |
| Introduction, 15 | "Explore three editorial homepage directions and a new cinematic journey..." is long and describes D partly through an abstract three-item list. | "Compare three editorial homepages and a cinematic food journey for the restaurant." |
| D card, 17 | Describes camera mechanics and names frameworks before explaining how the direction feels to a guest. | "A six-scene journey from the first dish to booking, with a camera moving through food photographs. A photo version is available when animation is reduced or unavailable." |
| A card, 18 | "Editorial, heritage-led and quietly confident" is an abstract triad, followed by another list. | "A restaurant-journal approach, with serif headlines, warm paper colours and the 1986 date giving the page its character." |
| B card, 19 | "Food-led, generous and social" describes a mood that the next sentence already makes clearer. | "Large food photographs and the rice table put sharing at the centre of the page." |
| C card, 20 | "Contemporary, urban and practical" repeats the three-adjective template. | "London wayfinding cues and clear opening hours shape a page built around dinner before a show." |
| Links, 17–20 | "Read direction" is slightly unnatural. | "Design notes." Keep "Open prototype" and "Enter the experience" if their distinction is intentional. |
| Prototype note, 21 | The reservation distinction changes what the reviewer should expect. | Keep the full note. It is useful context, not drafting residue. |

Use sentence case for descriptive headings. Established concept names may retain their title styling. The "New" label on D is time-sensitive; remove it when the direction is no longer being introduced.

## Facts and claims to resolve

These are publication checks arising from the actual copy, not findings that the facts are false.

- Review themes: A to C need traceable support for guest-memory, value, hospitality and pre-theatre claims. The notes call them established themes but supply no review links or attributed excerpts.
- Allergens: confirm the restaurant's wording. Do not imply that a small number of nut dishes makes other dishes safe, or that telling staff guarantees an allergen-free meal.
- Menu specifics: confirm the sate variants, dish ingredients, heat descriptions, Special Rijsttafel's eight dishes and minimum two people against the current menu. Preserve these details when supported; do not silently replace them with generic praise.
- Operating facts: the README records checks on 5 November 2026 for address, telephone, hours, halal meat and group capacity. The 1986 date comes from the client brief. This audit has not repeated those checks. Preserve the stated values pending confirmation.
- Heritage: the supplied material establishes the year and family-run identity. It does not establish generations of ownership, unchanged recipes or a particular family history. The rewrites add none of those claims.

## Editorial rules for the next pass

Keep warm invitations that fit the restaurant, including B's hero and D's theatre heading. Give each section a different job. Use an actual dish, the address or a useful action whenever a line currently offers only "flavour", "heart", "tradition" or "hospitality".

Keep one helpful explanation of ordering in each design. Explain rijsttafel once, then give its supported serving details. Keep allergies, hours, booking and directions easy to find. Use sentence case for actions and distinguish navigation from the food menu.

The suggested rewrites remove decorative contrasts, dash-linked clauses and repeated hospitality slogans. Conditional items remain explicit: review evidence, allergen guidance, menu details and image identification need confirmation before final publication copy is set.
