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

`CameraRig` samples reversible position/target keyframes in `lib/journey.ts`. It moves between real food photographs through four original cultural sculptures: a candi-bentar-inspired split gateway, an ornamental penjor bamboo bow, a pepatran-inspired carved foliage frame, and a five-petal jepun flower. `CulturalPassage` renders the gateway/bamboo pair; `HeritageScene` renders foliage/petals. `CulturalSculpture` shares quality, physically based materials, reversible opacity and explicit disposal. `SceneTransition` owns the R3F v9 render job. Three handoffs use outgoing/incoming color/depth targets; the sculpture flights render the actual camera directly for uninterrupted physical passage and real occlusion. Reverse scrolling samples the identical path.

`useSceneSample` registers scene/material samplers with cleanup. Each offscreen pass samples visibility, table transforms, exposure and uniforms at its camera's timeline position, then restores the live progress. GSAP remains the only scroll controller. `DepthLayer` preserves photo aspect with cover UVs, and uses a lightly tessellated analytic plate dome, a feathered aperture, soft contact-shadow planes and warm shadow bounce. The relief is an approximation, not a measured depth map. No food models or substitute imagery are used. `SteamParticles` uses seeded GPU lifetimes, upward motion and procedural turbulence; localized heat refraction samples only the food texture, never the DOM. Steam and heat fade through handoffs. `AtmosphericLighting` samples warm backgrounds, exposure and physically based lighting from the same journey.

The canvas renders on demand; progress changes invalidate it. A single R3F invalidation chain continues visible steam/heat when scrolling stops, and stops in quiet chapters, hidden tabs and offscreen canvases. `RenderQuality` measures active frame intervals; two slow 90-frame windows reduce quality, and five fast windows allow recovery up to the device ceiling. Idle gaps and isolated jank do not trigger changes. High uses 64 particles per hot plate, 24-segment relief and up to 1.65 DPR. Medium uses 22 particles, 10 segments, simpler noise, lower-resolution targets and 1.2 DPR. Low uses single-segment planes, native photo visibility transitions and no offscreen targets, steam or heat. Save Data and limited memory select Low initially; portrait/mobile and modest devices start at Medium.

Targets are capped at 1.25 megapixels each on High and 0.72 megapixels on Medium, allocated on first use and released between transition windows. Later scene textures load ahead of their handoff and remain available for reverse scrolling. React Three Fiber disposes mounted geometry/materials; reference-counted photo ownership also disposes shared textures and clears loader entries after the final consumer unmounts. Context loss or shader failure selects the photographic edition and preserves the current chapter. No rendering dependencies or photographic assets are added; the cultural sculptures are generated locally without external model or texture requests. Development builds expose quality, frame interval and GPU resource counters on the canvas dataset for inspection; these are not product UI.

## Reservation access

There is no full-width header or repeated navigation wordmark. A floating Explore disclosure opens all six chapters, the menu and a reading-view switch on every screen size. Hours & directions and Call shortcuts remain available beside it. Desktop keeps a separate floating Book a Table link in the opposite corner; mobile uses the bottom booking bar. Controls and the navigation panel have opaque backgrounds. Escape closes the panel and returns focus to its button; clicking outside or tabbing away also dismisses it. The hero remains the primary brand introduction.

On mobile, the safe-area-aware persistent bottom bar keeps Book a Table and View Menu available throughout the journey. Inline hero and other contextual booking actions are hidden at this breakpoint to avoid duplicate controls, including in reading mode. Desktop retains its inline hero actions. Portrait uses a wider camera lens, fewer photo planes, simpler sculpture geometry and a shorter 610svh track (700svh desktop). Touch scrolling remains native, with no touch synchronization or scroll trapping.

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

This is a 2.5D photographic journey, not a scan of the restaurant or a video shoot. The four cultural sculptures are original stylised interpretations, not replicas of a temple or ceremonial object. Steam and heat are deliberately restrained and disabled at Low quality. Bloom is omitted because there are no authentic bright interior light sources to justify it. No depth-of-field blur is used, preserving food detail. The photographic edition remains the usable fallback on small devices or unsupported graphics hardware.

## Menu maintenance

The site content maintainer must update `lib/content.ts` (the shared selection and Rijsttafel price) and `app/menu/page.tsx` (menu terms and checked date) whenever the restaurant revises its PDF. Prices and terms were checked against the official 2026 menu on 16 November 2026. All four concept pages link to the same exported HTML selection at `concept-d/menu/`. The full PDF remains the source for dishes outside this selection.

## Cultural sculpture geometry

`lib/cultural-geometry.ts` constructs the four sculptures procedurally from extrusions, bamboo tubes, carved leaves and cupped petal surfaces. `culturalPalettes` sets their stone, bamboo/palm, wood/brass and ivory/gold colours. Each sculpture batches all its parts into three material groups, with fewer curve segments and simpler bevels on lower tiers. No models, new fonts, images or rendering dependencies are downloaded. The old B/A/L/I generator and derived glyph subset have been removed; the existing UI font is unchanged.

`components/CulturalSculpture.tsx` owns geometry disposal on quality change/unmount and samples opacity from the existing timeline. Edit scale, position, rotation, visibility and local opening coordinates in `lib/cultural-layout.ts`; the camera uses those same coordinates. `CulturalPassage` renders gateway/penjor; `HeritageScene` renders foliage/jepun.

## Camera flight through the sculptures

The split gateway crosses around 33% scroll, the ornamental bamboo bow around 38%, the carved foliage aperture around 64%, and the gap between jepun petal tips around 72%. The flower's golden centre stays intact. Sculptures remain opaque throughout each crossing. Desktop and portrait use separate responsive scales and routes. Food photographs frame the lane, and the next meal emerges beyond the petals. The address panel retains its opaque ivory background for contrast. All four crossings bypass alternate-camera compositing; the other handoffs keep their existing shaders. Tests sweep a small lens radius against actual Low/Medium/High triangle geometry on both responsive routes, and check path continuity and exact reversibility.

## Cultural references

These are original decorative interpretations for a restaurant website. The penjor is ornamental, without a shrine, sacred text, deity or ritual offering. The foliate frame draws on Balinese pepatran rather than copying a particular sacred carving. Jepun is associated with Bali but is not unique to it, and candi bentar architecture also occurs outside Bali.

- [Penjor, including ceremonial and ornamental contexts — Humaniora / UGM](https://journal.ugm.ac.id/jurnal-humaniora/article/download/3316/3032)
- [Traditional foliate ornament vocabulary — ISI Denpasar](https://repo.isi-dps.ac.id/1348/)
- [Bunga Jepun — ISI Denpasar](https://repo.isi-dps.ac.id/5537/)

## Motion and asset refinement

The camera now uses continuous Hermite interpolation between compositions instead of stopping at each keyframe. Shared straight-through velocities retain the ray-tested openings. Food photos have wider feathered edges, quintic visibility envelopes and alpha blending without writing transparent rectangles into the depth buffer. Sharing/heritage visibility windows overlap their fades, and shader camera samples match the live camera's velocity at each transition boundary. Reading shades also blend continuously rather than switching at chapter boundaries.

All same-page chapter links, including Explore and Hours & directions, use one delegated Lenis navigation handler. Duration scales with distance (up to 3.6 seconds), follows quintic easing, and remains interruptible by scrolling, touch or navigation keys. New clicks replace the current destination. Intermediate chapter copy fades during longer journeys; the destination receives focus on arrival. Browser Back/Forward follows the same route. Target scenes prepare at click time, with the remaining food image cache warmed in advance. The ordinary photographic edition retains native anchor navigation.

Stone cornices have rounded edges on Medium/High; leaves curl in depth; the carved frame has lobed foliage and scroll details. The jepun petals use a continuous vertex-colour gradient instead of a hard gold/ivory seam. Each sculpture still uses three material groups and fewer than 30,000 vertices at High. No model, image or dependency was added.

## Imported Candi Bentar gateway

The gateway now uses **Candi Bentar by nusaheritage.id**, downloaded from https://sketchfab.com/3d-models/candi-bentar-9051dc244c984da8a1a4ec7e90e1a567 under **CC BY 4.0**. The source is a scan of a complete split gateway with its stairs, not the restaurant entrance. Creator/source/licence and modifications are shown on `/credits/`, linked from the visit footer, and recorded in `public/models/ATTRIBUTION.txt`. Penjor, foliage and jepun remain the existing procedural assets.

`components/GatewayModel.tsx` loads local GLB files, clones instance fade materials and counts ownership of cached geometry/textures. Cleanup disposes GPU resources and clears the loader cache after the last owner, including reading-mode switches. The opening scene waits for the gateway so its frontal composition is the first WebGL view; a 34 KB rendered gateway poster covers loading. Deferred quality changes retain the current model until the next tier is ready.

`lib/gateway-model.json` records the exact source, preparation, passage position and tier statistics. `lib/cultural-layout.ts` uses that measured opening for the same reversible camera route. Camera clearance tests now use triangles decoded from the actual prepared gateway GLBs; the former procedural gateway geometry has been removed.

| Tier | Triangles | Texture size per atlas | GLB bytes |
| --- | ---: | ---: | ---: |
| High | 60,095 | 1536 px | 5,365,960 |
| Medium | 38,629 | 1024 px | 2,830,528 |
| Low | 27,382 | 768 px | 1,951,040 |

The 62,367,236-byte 4K source remains locally in the ignored `asset-source/candi-bentar/` folder. Rebuild with `npm run assets:gateway -- /path/to/source.glb`. The offline preparation removes disconnected scan fragments, crops peripheral vegetation/ground, normalises the mesh around its passage, simplifies with locked material boundaries, compacts vertices and recompresses embedded JPEG atlases. It uses the pinned `meshoptimizer` development dependency and existing Sharp; no external decoder or model host is needed at runtime.

## Gateway landing composition

Candi Bentar is centred at Z=4 with zero yaw, fully opaque at progress 0. The desktop and mobile opening cameras share its split centreline and use level frontal views. Compact centred titles leave both carved halves visible. The first physical camera crossing now runs at 0.125–0.145; food and its shadows fade in behind the gateway from 0.10, then the route continues to the penjor and remaining chapters. The first transition uses the authoritative physical camera rather than offscreen compositing. The reading shade blends in as the camera enters the food scene. Camera tests cover landing alignment and the moved passage on every device/tier.
