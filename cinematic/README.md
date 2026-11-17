# Concept D — A Journey to the Indonesian Table

Next.js App Router / React / TypeScript / Tailwind 4 / GSAP ScrollTrigger / Lenis / Three.js / React Three Fiber / Drei / Motion.

## Run

```sh
cd cinematic
npm ci
npm run dev
```

Open http://127.0.0.1:3000. `npm test` checks camera continuity/reversibility and adaptive quality/transition contracts; `npm run typecheck` checks TypeScript; `npm run build` makes a standalone static export in `out/`. `npm run export:pages` builds with the GitHub Pages base path and copies the generated files into the repository's `concept-d/` directory. The existing Pages configuration publishes that directory from `main`.

## Architecture

`CinematicExperience` provides semantic HTML for all six scenes, including a complete server-rendered photographic edition. WebGL is progressive enhancement; reduced motion selects the photographic edition automatically. Explore offers a reading edition and a return to the camera journey. The choice lasts for the current browser session, and switching preserves the current section. Context loss, canvas errors or a 15-second loading timeout return to the static edition.

`ScrollDirector` owns one scrubbed ScrollTrigger and one mutable journey progress value. Lenis is advanced by GSAP's ticker in milliseconds; it notifies ScrollTrigger on scroll. The ticker callback, trigger, tween, listeners and Lenis instance are removed on cleanup. No React state is updated per scroll frame. React chapter state changes only when crossing a chapter boundary.

`CameraRig` samples reversible position/target keyframes in `lib/journey.ts`. It moves through world-space photographic planes and the ceramic ring at z=-13, then rises to an overhead table view. `CeramicPortal` retains that physical, lit geometry. `SceneTransition` owns the R3F v9 render job: during five handoffs it renders outgoing and incoming camera samples into two color/depth targets, then composites them with a depth-weighted spatial aperture, foreground perspective enlargement and restrained procedural displacement. Outside these windows it renders the world directly. Transition endpoints match the direct views, and reverse scrolling samples the same deterministic path. No screenshot history or time-driven transition progress is used.

`useSceneSample` registers scene/material samplers with cleanup. Each offscreen pass samples visibility, table transforms, exposure and uniforms at its camera's timeline position, then restores the live progress. GSAP remains the only scroll controller. `DepthLayer` preserves photo aspect with cover UVs, and uses a lightly tessellated analytic plate dome, a feathered aperture, soft contact-shadow planes and warm shadow bounce. The relief is an approximation, not a measured depth map. No food models or substitute imagery are used. `SteamParticles` uses seeded GPU lifetimes, upward motion and procedural turbulence; localized heat refraction samples only the food texture, never the DOM. Steam and heat fade through handoffs. `AtmosphericLighting` samples warm backgrounds, exposure and physically based lighting from the same journey.

The canvas renders on demand; progress changes invalidate it. A single R3F invalidation chain continues visible steam/heat when scrolling stops, and stops in quiet chapters, hidden tabs and offscreen canvases. `RenderQuality` measures active frame intervals; two slow 90-frame windows reduce quality, and five fast windows allow recovery up to the device ceiling. Idle gaps and isolated jank do not trigger changes. High uses 64 particles per hot plate, 24-segment relief and up to 1.65 DPR. Medium uses 22 particles, 10 segments, simpler noise, lower-resolution targets and 1.2 DPR. Low uses single-segment planes, native photo visibility transitions and no offscreen targets, steam or heat. Save Data and limited memory select Low initially; portrait/mobile and modest devices start at Medium.

Targets are capped at 1.25 megapixels each on High and 0.72 megapixels on Medium, allocated on first use and released between transition windows. Later scene textures load ahead of their handoff and remain available for reverse scrolling. React Three Fiber disposes mounted geometry/materials; reference-counted photo ownership also disposes shared textures and clears loader entries after the final consumer unmounts. Context loss or shader failure selects the photographic edition and preserves the current chapter. No post-processing dependency or new assets are added. Development builds expose quality, frame interval and GPU resource counters on the canvas dataset for inspection; these are not product UI.

## Reservation access

There is no full-width header or repeated navigation wordmark. A floating Explore disclosure opens all six chapters, the menu and a reading-view switch on every screen size. Hours & directions and Call shortcuts remain available beside it. Desktop keeps a separate floating Book a Table link in the opposite corner; mobile uses the bottom booking bar. Controls and the navigation panel have opaque backgrounds. Escape closes the panel and returns focus to its button; clicking outside or tabbing away also dismisses it. The hero remains the primary brand introduction.

On mobile, the safe-area-aware persistent bottom bar keeps Book a Table and View Menu available throughout the journey. Inline hero and other contextual booking actions are hidden at this breakpoint to avoid duplicate controls, including in reading mode. Desktop retains its inline hero actions. Portrait uses a wider camera lens, fewer photo planes, simpler ceramic geometry and a shorter 610svh track (700svh desktop). Touch scrolling remains native, with no touch synchronization or scroll trapping.

Book a Table is the primary action; View Menu is secondary. Booking copy explains that the restaurant replies to confirm a request. Both appear in the desktop hero and final scene, with contextual menu links in food scenes. Desktop floating controls and the mobile safe-area-aware bottom bar sit outside the canvas and scene transitions. Booking remains a regular link, independent of scroll progress or WebGL readiness. Controls have at least 44-pixel touch targets and visible keyboard focus. Every cinematic scene can scroll locally as content grows; window height does not choose the photographic edition. Reduced-motion preferences and unavailable graphics select the photographic edition automatically. The final mobile scene can also scroll if enlarged text exceeds its available space.

## Assets and facts

All five WebP photographs originate from https://www.balibalirestaurant.com/ and are converted at their original dimensions (550 × 440). No upscaling or generated restaurant photographs are used.

| File                            | Original path                 |
| ------------------------------- | ----------------------------- |
| `public/images/sate.webp`       | `/images/dishes/2023/015.jpg` |
| `public/images/sharing.webp`    | `/images/dishes/2023/009.jpg` |
| `public/images/rendang.webp`    | `/images/dishes/2023/003.jpg` |
| `public/images/vegetables.webp` | `/images/dishes/2023/004.jpg` |
| `public/images/rice.webp`       | `/images/dishes/2023/016.jpg` |

The source photos are low-resolution. Replace these exact WebP filenames with approved higher-resolution restaurant images for a sharper full-screen experience. `asset-source/` retains the restaurant gallery used to identify the dishes; only selected WebP files are loaded by the site.

The restaurant's current site uses resort stock imagery for backgrounds, so those backgrounds were not reused. Authentic interior, archival and street photographs were not available in the source. The heritage scene uses a labelled food-photography study, and the West End scene uses the verified address in a labelled typography study. These are deliberate temporary compositions, not claims to show the real interior or storefront. Replace `HeritageScene` photo planes and the `address-art` component when approved assets are supplied.

Booking points to the verified official `#Booking` section (which embeds MachForm 11659). It opens externally and does not submit a reservation. Menu opens an HTML selection with prices, a Special Rijsttafel price and key menu terms. The official 2026 PDF remains linked for the full menu. Address, phone, hours, halal meat and group capacity were checked against the restaurant website on 5 November 2026. The 1986 establishment date is supplied in the client brief. No reviews, awards, prices or new historical claims have been added.

Locally hosted fonts: Cormorant Garamond and DM Sans, available under the SIL Open Font License. Typeface sources: Google Fonts. Interaction reference: https://webflow.com/made-in-webflow/website/jeskojets-e9dc11 — continuous camera progression and occlusion; no reference branding, code or assets copied.

## Prototype limits

This is a 2.5D photographic journey, not a scan of the restaurant or a video shoot. The ceramic portal is a designed transition object, not a restaurant architectural feature. Steam and heat are deliberately restrained and disabled at Low quality. Bloom is omitted because there are no authentic bright interior light sources to justify it. No depth-of-field blur is used, preserving food detail. The photographic edition remains the usable fallback on small devices or unsupported graphics hardware.

## Menu maintenance

The site content maintainer must update `lib/content.ts` (the shared selection and Rijsttafel price) and `app/menu/page.tsx` (menu terms and checked date) whenever the restaurant revises its PDF. Prices and terms were checked against the official 2026 menu on 16 November 2026. All four concept pages link to the same exported HTML selection at `concept-d/menu/`. The full PDF remains the source for dishes outside this selection.
