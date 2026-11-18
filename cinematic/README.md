# Concept D — A Journey to the Indonesian Table

Next.js App Router, React, TypeScript, Three.js, React Three Fiber, Drei, Lenis and Motion. Source lives in `cinematic/`; the checked GitHub Pages export lives in `concept-d/`.

## Run and verify

```sh
cd cinematic
npm ci
npm run dev
npm run typecheck
npm test
npm run export:pages
npm run verify:pages
```

Development runs at http://127.0.0.1:3000. The exporter builds with the Pages base path and copies output to `concept-d/`, published from `main`. It invokes the installed Next CLI with the active Node runtime. `verify:pages` checks the generated HTML and asset references after export.

## Current page architecture

`CinematicExperience` renders six semantic, normally scrolling document sections. Desktop reading sections place copy beside a complete rectangular food photograph; mobile stacks heading, photograph and copy. Images retain their original 5:4 aspect and use `object-fit: contain`. No fixed reading panels, image masks, inner section scrolling or food photos behind cards remain in the home page.

`PageDirector` uses Lenis for desktop wheel and chapter-link navigation, with native touch scrolling. Navigation duration scales with distance, uses quintic easing and is interruptible by wheel, touch and navigation keys. New clicks retarget travel, destinations receive focus, and browser Back/Forward follows chapter hashes. Reading content stays available throughout. A mutable CSS progress value drives the thin line in the top navigation; React chapter state changes only at chapter boundaries.

The landing presents Candi Bentar on its frontal centreline. Separate sculpture interludes give the penjor, carved foliage and flower their own space between reading sections. `SculptureInterlude` owns a short sticky stage, locally sampled scroll progress and a rendered loading poster. It mounts a lazy `SculptureCanvas` only near the viewport. The canvas renders on demand, with no continuous idle animation. Each stage has its own camera; photos remain ordinary HTML images.

`lib/sculpture-bounds.json` contains union bounds across all quality tiers. `lib/interlude.ts` fits the complete model to the available aspect ratio with margins. It holds the full composition, approaches gently, then fades the entire stage before the final close passage. This avoids showing cut-off model fragments. Reverse scrolling samples the identical path. Tests project actual model bounds across portrait/landscape sizes and raycast prepared geometry through every final passage.

Medium assets and DPR 1 are used on mobile; desktop uses High and DPR up to 1.5. Save Data or limited device memory selects Low. `useImportedModel` counts shared geometry/texture owners and disposes cached GPU resources after the final owner unmounts. Canvas errors or context loss restore that stage's poster. Posters are rendered from the same credited models and fitted to match the live camera composition.

Reduced motion, unavailable WebGL or Explore → Pause 3D motion uses static posters and ordinary page scrolling. The choice lasts for the browser session; switching preserves the current reading section. No content depends on model loading.

The previous `SceneCanvas`, `ScrollDirector`, world-space photo effects and global journey remain as reference code and regression fixtures. They are **not mounted by the current home page**. `WEBGL_UPGRADE.md` records that earlier prototype and the subsequent changes.

## Navigation and reservations

The top navigation combines Explore, chapter count/progress, Hours & directions (Visit on mobile), Call and a desktop booking link. Explore contains all chapters, menu access and the motion toggle. Escape returns focus to Explore; outside clicks and tabbing away dismiss the panel.

Mobile has one safe-area-aware persistent Book a table / View menu dock. Visit details, opening hours, group information and footer links scroll with the document, with clearance above the dock. Booking is an ordinary external link to the restaurant's official `#Booking` section; it does not submit a reservation. Copy explains that the restaurant replies to confirm a request.

## Photography and facts

All five WebP photographs originate from https://www.balibalirestaurant.com/ at their original 550 × 440 dimensions. No upscaling or generated restaurant photographs are used.

| File                            | Original path                 |
| ------------------------------- | ----------------------------- |
| `public/images/sate.webp`       | `/images/dishes/2023/015.jpg` |
| `public/images/sharing.webp`    | `/images/dishes/2023/009.jpg` |
| `public/images/rendang.webp`    | `/images/dishes/2023/003.jpg` |
| `public/images/vegetables.webp` | `/images/dishes/2023/004.jpg` |
| `public/images/rice.webp`       | `/images/dishes/2023/016.jpg` |

Higher-resolution approved originals remain an asset priority. Heritage and pre-theatre photographs are explicitly captioned as restaurant food, without claiming to show an interior, archive or street view. Visit uses no background food image.

The current HTML menu selection and linked official PDF are retained. Update `lib/content.ts` and `app/menu/page.tsx` whenever the restaurant revises its menu. Prices and terms were checked against the official 2026 menu on 16 November 2026; address, phone, hours, halal meat and group capacity were checked on 5 November 2026. The 1986 establishment date comes from the client brief. This layout update changes none of those facts.

Local fonts are Cormorant Garamond and DM Sans under SIL OFL. No reference-site branding or imagery is copied.

## 3D assets

| Stage                     | Source and licence                                                                                                         | Local manifest             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| Candi Bentar              | [nusaheritage.id / Sketchfab](https://sketchfab.com/3d-models/candi-bentar-9051dc244c984da8a1a4ec7e90e1a567), CC BY 4.0    | `lib/gateway-model.json`   |
| Balinese Penjor           | [alterego.visual / Sketchfab](https://sketchfab.com/3d-models/balinese-penjor-7aca638e85d04c1699c04918cdc36a9e), CC BY 4.0 | `lib/penjor-model.json`    |
| Carved foliage            | Locally generated decorative frame                                                                                         | `lib/cultural-geometry.ts` |
| Jepun / Frangipani Flower | [elkid / BlendSwap](https://blendswap.com/blend/14800), CC0 1.0                                                            | `lib/flower-model.json`    |

The gateway is a complete split-gate scan, not the restaurant entrance. Preparation removes disconnected scan fragments and peripheral ground/vegetation, normalises the passage, simplifies tiers and recompresses atlases. The penjor retains its complete bamboo bow, ten original groups and two material colours. The flower retains all five original petals, thickness, UVs and photographed texture; no hole is cut into its centre. The foliage frame is the only remaining procedural sculpture. Sources and modifications are documented on `/credits/` and in `public/models/*ATTRIBUTION.txt`.

GLB sizes for High/Medium/Low are approximately 5.37/2.83/1.95 MB (gateway), 2.40/1.54/1.00 MB (penjor), and 616/179/60 KB (flower). All files and textures are locally served; no model host or decoder is contacted at runtime. Four 600 × 600 loading posters total about 48 KB.

Ignored original source assets remain in `asset-source/`. Rebuild with:

```sh
npm run assets:gateway -- /path/to/source.glb
npm run assets:penjor
python scripts/prepare-flower.py /path/to/source.blend asset-source/frangipani
npm run assets:flower
```

The flower conversion requires Blender Foundation's `bpy` 4.5 for Python 3.11 and disables embedded file scripts. Packing uses the existing Sharp and pinned meshoptimizer development dependencies. After changing any model, regenerate union bounds/loading posters and rerun framing and passage checks.

## Verification

`npm test` checks prepared source assets, original camera/effect fixtures and the current interlude framing/continuity/reversibility. `npm run verify:pages` checks six native chapter targets, full photo figures, four independent stages and Visit content in the export. Browser evidence in `verification/editorial-*.jpg` covers desktop food layout, mobile food, full penjor and naturally scrolling Visit details. Manual checks include 320 × 568 and 402 × 874 phones, chapter clicks and motion switching.

The original 550 × 440 food photographs limit sharpness. The model exit deliberately fades before the close camera movement, so no clipped fragments overlap reading content. No measured restaurant scan, interior photography, food models or fabricated historical imagery are introduced.
