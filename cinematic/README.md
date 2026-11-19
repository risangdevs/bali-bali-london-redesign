# Concept D — Bali Bali

Next.js App Router, React, TypeScript, Three.js / React Three Fiber / Drei, GSAP, Lenis and Motion. Source lives in `cinematic/`; GitHub Pages serves the checked export in `concept-d/` from `main`.

## Run and verify

```sh
cd cinematic
npm ci
npm run dev
npm run typecheck
npm test
npm run export:pages
```

Development runs at http://127.0.0.1:3000. The exporter invokes the installed Next CLI with the active Node runtime, builds with the Pages base path and copies output into `concept-d/`.

## Mobile restaurant page

Below 768 px, the site is an ordinary restaurant page with native document scrolling and native chapter anchors. Food photographs sit directly below headings, followed by descriptions, prices and menu links. Story and pre-theatre copy are compact; Visit contains the address, phone, opening hours, group details and footer. There are no model interludes, pinned sections, hidden camera passages, nested reading scroll areas or animation spacers. The one safe-area booking/menu dock remains.

`MobileGateway` is a compact, normal-flow opening image with progressive 3D enhancement. `GatewayCanvas` frames the entire gateway frontally and renders on demand; scrolling does not move its camera. Only this model is loaded on mobile. Its local rendered poster covers loading, reduced motion, unavailable WebGL and context loss. The gateway and poster occupy the same fixed area, so switching between them leaves reading content in place. `useImportedModel` counts shared GPU resource owners and disposes textures/materials/geometry after the final owner unmounts. Explore offers a gateway image/3D choice for the browser session.

The mobile page uses no Lenis or custom scroll controller. Menu disclosure keeps Escape/outside/tab dismissal and visible focus. Prices, phone, directions, menu and booking remain normal links. Booking opens the official restaurant `#Booking` section and does not submit a request; copy explains that the restaurant replies to confirm it.

## Desktop camera journey

Desktop retains the six-scene composition, fixed reading panels, original food photo layouts, lighting/effects and chapter controls. `ScrollDirector` owns the scrubbed GSAP timeline and Lenis ticker. Mutable journey progress invalidates the demand-rendered canvas; React updates at chapter boundaries. `CameraRig` follows continuous, reversible Hermite position/target tracks. Chapter links scale duration with distance and support interruption, retargeting, history and destination focus.

`SceneTransition` owns rendering and uses bounded color/depth targets for shader handoffs, with direct physical-camera rendering during sculpture passages. `DepthLayer` retains aspect-preserving photo relief, feathered edges and contact shadows. GPU steam and dish-local heat refraction are restrained and disabled at Low quality. Shared texture ownership, deferred loading, target disposal and adaptive quality keep the effect bounded. Reduced motion, graphics failure or Explore's reading option retains the photographic edition.

The cultural sequence is Candi Bentar → Balinese Penjor → Dwarapala guardian → Jepun. The Dwarapala replaces the former procedural foliage frame. The third camera lane is outside the intact statue, passing beside it around progress 0.625–0.65. Other sculpture passages and chapter timings are retained. The original foliage generator remains reference code and an independent geometry fixture; it is not mounted in the site.

## 3D assets and credits

| Asset                        | Creator / source                                                                                                             | Licence   | High / Medium / Low    |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------- |
| Candi Bentar                 | [nusaheritage.id / Sketchfab](https://sketchfab.com/3d-models/candi-bentar-9051dc244c984da8a1a4ec7e90e1a567)                 | CC BY 4.0 | 20.03 / 2.83 / 1.95 MB |
| Balinese Penjor              | [alterego.visual / Sketchfab](https://sketchfab.com/3d-models/balinese-penjor-7aca638e85d04c1699c04918cdc36a9e)              | CC BY 4.0 | 2.40 / 1.54 / 1.00 MB  |
| Patung Dwarapala Pintu Utara | [nusaheritage.id / Sketchfab](https://sketchfab.com/3d-models/patung-dwarapala-pintu-utara-75a1945e6b9e4a62866b13479fb48e1b) | CC BY 4.0 | 1.54 / 0.81 / 0.47 MB  |
| Frangipani Flower / Jepun    | [elkid / BlendSwap](https://blendswap.com/blend/14800)                                                                       | CC0 1.0   | 616 / 179 / 60 KB      |

All GLBs/textures are locally served with no external decoder or model host at runtime. Creator/source/licence/modifications appear on `/credits/`, in each `lib/*-model.json` manifest and in `public/models/*ATTRIBUTION.txt`. The opening gateway poster is rendered from the credited Candi Bentar model. Cultural assets do not depict the restaurant entrance or interior.

Gateway preparation removes detached fragments and peripheral ground/vegetation, retaining the split gate/stairs. Desktop High uses five native 4096 × 4096 photographed atlases with 8× anisotropic filtering (limited by the GPU). The Medium gateway renders first and stays visible while the 4K version loads; mobile continues using the unchanged 1024 px Medium or 768 px Low textures. The versioned `candi-bentar-high-4k.glb` URL avoids stale browser caches. Penjor preparation keeps its complete bamboo bow, ten ornament groups and source colours. Flower conversion retains its five original petals, thickness, photographed texture and UVs. Dwarapala preparation removes one detached 83-triangle fragment far below/behind the statue, keeps the full statue/pedestal, smooths duplicate scan normals without merging UV seams, and prepares 31,558 / 20,512 / 11,048-triangle tiers. Its solid centre remains intact.

Ignored source downloads remain in `asset-source/`. Rebuild with:

```sh
npm run assets:gateway -- /path/to/source.glb
npm run assets:penjor
npm run assets:dwarapala
python scripts/prepare-flower.py /path/to/source.blend asset-source/frangipani
npm run assets:flower
```

The flower converter needs Blender Foundation's `bpy` 4.5 for Python 3.11 and disables embedded scripts. GLB packing uses the existing Sharp and pinned meshoptimizer development dependencies.

## Photography and content

All food WebPs are original 550 × 440 restaurant photographs from https://www.balibalirestaurant.com/. No upscaling or generated restaurant imagery is used.

| File                            | Original path                 |
| ------------------------------- | ----------------------------- |
| `public/images/sate.webp`       | `/images/dishes/2023/015.jpg` |
| `public/images/sharing.webp`    | `/images/dishes/2023/009.jpg` |
| `public/images/rendang.webp`    | `/images/dishes/2023/003.jpg` |
| `public/images/vegetables.webp` | `/images/dishes/2023/004.jpg` |
| `public/images/rice.webp`       | `/images/dishes/2023/016.jpg` |

Higher-resolution approved originals remain an asset priority. No fabricated storefront, archival or interior photograph is introduced. Local Cormorant Garamond and DM Sans fonts use SIL OFL.

Update `lib/content.ts` and `app/menu/page.tsx` when the restaurant revises its menu. Prices/menu terms were checked against the official 2026 menu on 16 November 2026. Address, phone, hours, halal meat and group capacity were checked on 5 November 2026; the 1986 establishment date comes from the client brief. This visual update changes none of those facts. The HTML selection and official full PDF remain linked.

## Checks

`npm test` covers camera continuity, exact reverse sampling and clearance against actual prepared model triangles, photo timing/aspect, adaptive effects, licensed model integrity/budgets, the solid Dwarapala centre/exterior lane, and complete frontal gateway framing across aspect ratios and detail tiers. Browser verification checks mobile reading flow, native anchors, model loading, footer clearance, short phones and the desktop statue composition. Previous experiments are documented chronologically in `WEBGL_UPGRADE.md` and `concept-d-notes.md`.
