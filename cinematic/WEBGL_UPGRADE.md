# Concept D WebGL upgrade

Implemented in the existing Next.js project. The six chapters, Cormorant Garamond/DM Sans typography, ivory/burgundy/terracotta/brass palette, editorial layouts, authentic food photographs and original booking/menu destinations are retained. Concepts A–C are unchanged.

## Audit and integration

The source is `cinematic/`; `concept-d/` is its GitHub Pages static export. The existing stack already includes Next.js App Router, React, TypeScript, R3F v9, Three.js, Drei, GSAP ScrollTrigger and Lenis. The original camera follows world-space photo planes through a physical ceramic ring, then approaches an overhead sharing table, heritage study, address study and booking scene. Photo visibility previously used only opacity windows.

There are five approved 550 × 440 food photographs, local fonts, no video and no authentic interior/street/depth-map assets. Booking remains an ordinary external link to the official `#Booking` section; menu remains the existing HTML selection and linked PDF. No booking form or restaurant data has been replaced.

## Effects implemented

- **Spatial transitions:** `SceneTransition` is a reusable two-camera color/depth render-to-texture compositor. Five bounded windows cover the opening food approach, ceramic passage, table-to-heritage, heritage-to-address and address-to-booking handoffs. Closer geometry holds the reveal edge, foreground perspective enlargement suggests passing behind it, and a small deterministic noise displacement softens the boundary. `CeramicPortal` retains the original physical ring and adds restrained ceramic clearcoat. Endpoint views match the ordinary camera path; progress comes entirely from scroll, in either direction.
- **Depth:** World-space photo layers and camera keyframes are retained. Plate surfaces gain slight analytic relief, tessellated by quality level, plus soft contact-shadow planes. Cover UVs preserve photo aspect ratio, including the existing portrait heritage composition. Mobile has its own plate sizes/positions and wider lens. Relief is deliberately shallow to preserve the food photography.
- **Steam:** Custom GPU point shaders use stable seeds, varied lifetimes, soft alpha, expansion, rising world-space motion and procedural turbulence. Only hot dishes emit steam. Visibility follows the scene/photo and fades during handoffs. High uses 64 points per hot plate, Medium 22, Low none.
- **Heat:** Very small UV displacement is masked to a region above the hot food inside each photograph. It follows the dish through all camera movement. Shader branches avoid noise work on cold dishes and outside the heat mask. Text and controls never enter this pass.
- **Atmosphere:** Scroll-sampled warm backgrounds, exposure, ambient/key lighting, warm shadow bounce, contact shadows and a slight vignette. Ceramic geometry uses physically based materials. Bloom is omitted because the available photography has no interior light sources that justify it.

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

- `components/CeramicPortal.tsx`, `AtmosphericLighting.tsx`, `SteamParticles.tsx`, `RenderQuality.tsx`
- `components/useSceneSample.ts`, `useOwnedTexture.ts`
- `lib/effects.ts`, `lib/shaders.ts`, `scripts/check-effects.cjs`
- This report and `verification/` browser screenshots.

No dependencies or restaurant image assets were added or changed.

## Verification

- `npm test`: camera keyframes, finite values, path continuity, exact reverse samples and physical portal crossing; three device-quality tiers; downgrade/recovery hysteresis; ceilings; idle/jank rejection; non-overlapping transition windows and deterministic reverse camera samples.
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
