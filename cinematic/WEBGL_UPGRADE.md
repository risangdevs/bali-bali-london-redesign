# Concept D WebGL upgrade

## Current runtime — editorial sections and model interludes

The home page now uses normal-flow reading sections and complete rectangular HTML photos, with four separate 3D stages. `PageDirector`, `SculptureInterlude`, `SculptureCanvas` and `lib/interlude.ts` replace the mounted global camera/photo overlay pipeline. Each model is fitted completely inside its stage and fades before its close passage. Visit details scroll naturally; chapter progress is integrated into the top navigation. Rendered posters cover loading, reduced motion and graphics failure. The source/licence of each imported model is unchanged. See `README.md` for current architecture and verification.

The sections below describe the earlier overlay prototype and its historical refinements. Its camera/effect files remain reference code and tests; they are not mounted by the current home page.

Implemented in the existing Next.js project. The six chapters, Cormorant Garamond/DM Sans typography, ivory/burgundy/terracotta/brass palette, editorial layouts, authentic food photographs and original booking/menu destinations are retained. Concepts A–C are unchanged.

## Audit and integration

The source is `cinematic/`; `concept-d/` is its GitHub Pages static export. The existing stack already includes Next.js App Router, React, TypeScript, R3F v9, Three.js, Drei, GSAP ScrollTrigger and Lenis. The original camera follows world-space photo planes through a physical ceramic ring, then approaches an overhead sharing table, heritage study, address study and booking scene. Photo visibility previously used only opacity windows.

There are five approved 550 × 440 food photographs, local fonts, no video and no authentic interior/street/depth-map assets. Booking remains an ordinary external link to the official `#Booking` section; menu remains the existing HTML selection and linked PDF. No booking form or restaurant data has been replaced.

## Effects implemented

- **Spatial transitions:** `SceneTransition` retains five bounded handoff windows and two shader-composited transitions. Physical flights render the actual camera directly through a candi-bentar-inspired split gateway, beneath an ornamental penjor bow, through a pepatran-inspired carved frame, and between jepun petal tips. `CulturalPassage` contains the first pair; `HeritageScene` contains the second. Sculpture and camera transforms share `lib/cultural-layout.ts`. Gateway, penjor and flower are locally served imported models with source credits; the foliage frame is generated locally. Desktop/mobile use their own scales and paths; progress is entirely reversible scroll sampling.
- **Depth:** World-space photo layers and camera keyframes are retained. Plate surfaces gain slight analytic relief, tessellated by quality level, plus soft contact-shadow planes. Cover UVs preserve photo aspect ratio, including the existing portrait heritage composition. Mobile has its own plate sizes/positions and wider lens. Relief is deliberately shallow to preserve the food photography.
- **Steam:** Custom GPU point shaders use stable seeds, varied lifetimes, soft alpha, expansion, rising world-space motion and procedural turbulence. Only hot dishes emit steam. Visibility follows the scene/photo and fades during handoffs. High uses 64 points per hot plate, Medium 22, Low none.
- **Heat:** Very small UV displacement is masked to a region above the hot food inside each photograph. It follows the dish through all camera movement. Shader branches avoid noise work on cold dishes and outside the heat mask. Text and controls never enter this pass.
- **Atmosphere:** Scroll-sampled warm backgrounds, exposure, ambient/key lighting, warm shadow bounce, contact shadows and a slight vignette. Cultural sculptures use physically based materials. Bloom is omitted because the available photography has no interior light sources that justify it.

## Animation architecture

`ScrollDirector` still owns one scrubbed ScrollTrigger and one Lenis ticker. It updates mutable `journey.progress`; no second scroll controller or per-frame React state was added. `journey.time` advances inside the existing R3F frame loop.

`useSceneSample` registers material and scene samplers, with cleanup on unmount. The compositor samples visibility, table transforms, camera framing, exposure and uniforms for each offscreen camera, then restores live progress. It explicitly owns R3F v9's rendering job and renders directly outside transition windows. Mutable uniforms carry time, scroll/scene/transition progress, effect intensity and quality. React updates only at chapter, scene-loading, responsive and quality boundaries.

## Performance and resilience

| Tier   | Rendering                                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| High   | Depth-aware dual targets, 24-segment relief, full procedural noise, 64 steam points per hot dish, DPR ≤ 1.65                    |
| Medium | Dual targets capped at 0.72 MP each, 10-segment relief, simpler noise, 22 points, DPR ≤ 1.2                                     |
| Low    | Direct rendering, one-segment photo planes and original photo visibility transitions; no render targets, steam or heat; DPR ≤ 1 |

High targets are capped at 1.25 MP each and 1600 pixels wide. Targets allocate GPU storage on first use and release it between handoffs. A 90-frame averaging window with downgrade/recovery hysteresis avoids tier oscillation; idle/background gaps and isolated jank do not cause downgrades. Device memory, core count, portrait/mobile and Save Data provide conservative initial ceilings.

A single demand-loop invalidation chain keeps visible steam/heat alive when scroll stops. Quiet chapters return to demand rendering. Hidden tabs and offscreen canvases stop atmospheric animation. Scene windows cull irrelevant chapters, and later scenes load ahead of their transitions. Geometry/material disposal is managed by R3F; shared photo textures have reference-counted ownership and loader-cache cleanup. Context loss, shader failure, load timeout or unavailable WebGL select the photographic edition. Failure preserves the current chapter. The original reduced-motion preference handling remains in place.

Mobile uses a shorter 610svh track versus 700svh on desktop; native touch scrolling remains enabled. Mobile uses the safe-area-aware sticky booking/menu actions without duplicate inline hero buttons; desktop retains both hero CTAs. Canvas containers have no pointer events. Booking copy still explains that the restaurant replies to confirm the request.

## Files changed

Existing source:

- `components/SceneCanvas.tsx`, `SceneTransition.tsx`, `CameraRig.tsx`, `DepthLayer.tsx`
- `components/FoodScene.tsx`, `HeritageScene.tsx`, `BookingScene.tsx`
- `components/CinematicExperience.tsx`, `ScrollDirector.tsx`, `Navigation.tsx`, `ReservationActions.tsx`
- `lib/journey.ts`, `app/globals.css`, `app/menu/page.tsx`
- `package.json`, `scripts/export-pages.mjs`, `README.md`
- Repository `concept-d-notes.md` and regenerated `concept-d/` HTML/RSC/chunks/CSS. The exporter now removes obsolete generated chunks only after a successful build.

Added:

- `components/CulturalSculpture.tsx`, `CulturalPassage.tsx`, `AtmosphericLighting.tsx`, `SteamParticles.tsx`, `RenderQuality.tsx`
- `components/useSceneSample.ts`, `useOwnedTexture.ts`
- `lib/effects.ts`, `lib/shaders.ts`, `lib/cultural-layout.ts`, `lib/cultural-geometry.ts`, `scripts/check-effects.cjs`
- This report and `verification/` browser screenshots.

No dependencies or restaurant image assets were added or changed.

## Verification

- `npm test`: camera keyframes, finite values, path continuity, exact reverse samples and crossing the original z=-13 passage plane; three device-quality tiers; downgrade/recovery hysteresis; ceilings; idle/jank rejection; non-overlapping transition windows and deterministic reverse camera samples.
- `npm run typecheck`: passed.
- `npm run export:pages`: production compilation, TypeScript and static generation passed; `concept-d/` refreshed with the existing GitHub Pages base path.
- All 22 initial script, stylesheet, image and preload references in the exported home/menu HTML resolve locally.
- Browser checks at desktop and 390 × 844 portrait: hero, spatial passage, reverse scrolling, full chapter navigation, original menu route, visible/clickable booking controls, reading-mode switch and return, keyboard Escape dismissal with focus returned to Explore, and no horizontal overflow.
- Reading mode removes the canvas and restores all six semantic sections. Development resource counters returned from 10 textures during a handoff to 6 after leaving it; scene samplers clean up when reading mode unmounts the canvas.
- Production browser console: no warnings/errors observed during the checked journey. High and Medium shader variants rendered successfully.

## Remaining limits

The original 550 × 440 photographs still limit fullscreen sharpness. True extracted foregrounds, measured depth maps and interior/street photography are unavailable; shallow analytic plate relief and the existing labelled studies are the honest alternatives. This is a 2.5D photo composition, not a scanned restaurant.

The 60 FPS target needs profiling on physical target devices and additional browsers; desktop viewport emulation is not a phone benchmark. Reduced-motion switching, forced context-loss fault injection and Low-tier GPU rendering were not independently exercised through browser emulation in this session; their implementation was inspected and quality policy was tested. Short resource-counter checks are not an exhaustive long-duration GPU leak test.

Deployment uses the repository's existing GitHub Pages pipeline from `main`, publishing the checked-in static export. The verification above records pre-deployment checks. No reservation submission was performed.

## Balinese cultural sculpture revision

The B/A/L/I sculptures and derived font subset have been replaced by four original procedural objects: a stepped split gateway, ornamental bamboo bow with palm-leaf flourishes, an open carved botanical frame and five cupped frangipani petals. No ceremonial shrine, sacred inscription or offering is represented. This is a stylised cultural composition, not a fabricated view of the restaurant.

`makeCulturalGeometry` merges all geometry into three material buckets per sculpture. Low/Medium/High reduce curve and radial segments, with bevels omitted on Low. High sculptures each use fewer than 30,000 vertices. The existing sampler and demand rendering remain authoritative; no controller, per-frame React state or extra animation loop was added. The UI font, actual food photography, chapter copy, booking/menu links, mobile CTA policy and photographic fallback are preserved.

## Cultural passage verification

Camera and meshes share transforms from `lib/cultural-layout.ts`. Crossings occur through the real central split, beneath the bamboo bow, through the carved aperture and between the flower's outer petal tips. The golden throat stays intact. Objects remain opaque through each crossing. Camera tests check both responsive routes, all keyframes, continuous/reversible sampling, alignment, visibility and a nine-ray lens-clearance sweep against actual Low/Medium/High triangle geometry. Geometry tests also verify solid defining surfaces, finite vertices/normals, spatial depth, three material groups, adaptive triangle budgets and disposal. `npm test`, typecheck and the production Pages export pass.

## Motion polish and sculptural detail

The cultural assets now use rounded stone edges, cupped palm leaves, lobed foliate carving with scrolls and continuous golden-throat petal colouring. High geometry stays below 30,000 vertices per sculpture and three material batches; Medium and Low retain adaptive detail. Camera interpolation is C1 continuous, with constant straight-through passage velocities and unchanged gate clearance.

Image fades use quintic envelopes and wider edge feathers, transparent photo meshes no longer write depth, and scene windows remain mounted until their fades finish. Composited camera samples converge to the actual view with matching endpoint velocity; UV displacement and aperture edges are restrained. Text entrance/exit envelopes avoid overlapping paragraphs, and reading shades blend from progress rather than React chapter changes.

Section clicks use distance-based, interruptible Lenis motion with target preparation, retargeting, focus on arrival and browser history support. Intermediate copy fades during travel. One Lenis/GSAP ticker still owns the journey; ScrollTrigger follows it directly, removing the former second smoothing delay. Existing reduced-motion/static fallbacks and ordinary booking/menu links are preserved.

Verification adds camera velocity continuity and uninterrupted passage-speed checks, navigation timing and reversible photo envelopes, compositor boundary velocity checks, finite vertex colour attributes and the existing lens-clearance/quality/disposal tests. Production build and desktop/mobile preview checks cover long clicks, rapid retargeting, manual interruption, history navigation and destination focus.

## Licensed gateway scan integration

Replaced the procedural gateway with the user-selected **Candi Bentar** scan by **nusaheritage.id** (Sketchfab model `9051dc244c984da8a1a4ec7e90e1a567`), licensed CC BY 4.0. The 62.4 MB downloaded source is prepared offline into 5.4/2.8/2.0 MB High/Medium/Low GLBs with 60,095/38,629/27,382 triangles and embedded 1536/1024/768 px texture atlases. Preparation removes detached scan debris and peripheral vegetation/ground, retains the paired gate, carvings and stairs, and measures the actual open passage for the existing camera route.

The opening composition waits for the gateway model, with a lightweight rendered gateway poster during loading. Deferred tier changes retain the current asset while fetching its replacement. Source geometry and textures have counted ownership with final disposal/cache cleanup; cloned instance materials carry the existing fade and depth-write policy. All assets are served locally through the existing Pages base path. `/credits/` and the visit footer provide creator/source/licence attribution and disclose modifications. The other three sculptures, food imagery, section navigation and booking/menu destinations are preserved.

Camera tests now raycast the actual prepared GLB triangles on desktop/mobile at every tier. Asset tests verify embedded textures, file/detail budgets, both solid halves and the open gap, source identity, licence and attribution. Production export also generates the credits route.

## Gateway first landing

The gateway now opens the journey head-on, centred symmetrically around the camera axis with zero yaw. Responsive camera distances and centred compact titles reveal both halves before scrolling. Its physical crossing moves to 0.125–0.145; food imagery and photo shadows remain invisible at landing and enter behind it. The first transition stays on the physical camera, and the reading shade fades in continuously. Later sculptures and chapter destinations keep their existing timings.

## Imported frangipani flower

Replaced the procedural jepun with the user-selected CC0 Frangipani Flower by elkid (BlendSwap 14800). The actual five petals and packed photographed texture are converted locally with Blender 4.5, retaining their original arrangement, UVs, subdivision and thickness. Source camera/light objects are excluded; the legacy material is mapped to double-sided PBR. High/Medium/Low GLBs are 616/179/60 KB with 24,880/6,520/1,780 triangles and embedded 1024/768/512 px JPEG textures. Source and adaptations appear on the credits page.

The natural outer-petal passage is measured at local [0.20, 0.42], preserving the flower centre and existing crossing timing. Camera tests now use actual flower triangles at every tier/device; new asset checks cover its provenance, five textured petals, intact centre, curvature/thickness and budgets. Gateway and flower share a counted resource loader with cloned fade materials; the remaining procedural assets are penjor and foliage.

## Imported penjor and corrected food-photo staging

Replaced the procedural penjor with the user-selected Balinese Penjor by alterego.visual (Sketchfab 7aca638e85d04c1699c04918cdc36a9e), CC BY 4.0. Local preparation retains the full bow, ten original ornament/pole groups and two source materials, bakes node transforms and emits 2.40/1.54/1.00 MB tiers. Source/modifications are credited and actual prepared triangles are included in camera-clearance tests.

Centralised photo layouts now preserve image aspect, postpone sharing images until their chapter, clear heritage images before the flower and bring final food in after the flower crossing. Responsive placements reduce portrait clutter. A camera-facing/coverage guard fades photos and their shadows/steam before lens collisions, oversized crops or back-facing views. Sharing-table motion samples before child photo framing in every direct/composited view. Timing/framing tests cover both screen types and exact reverse travel.
