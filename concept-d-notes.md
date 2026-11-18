# Concept D — A Journey to the Indonesian Table

An immersive six-scene exploration added alongside concepts A, B and C.

1. **Rationale:** Follow a meal from first saté to a shared table, then connect it to family hospitality and an evening in the West End.
2. **Typography:** Cormorant Garamond's oversized editorial serif and italic, supported by compact DM Sans navigation and captions.
3. **Colour:** Warm ivory `#F4EBDD`, burgundy `#652D2B`, dark teak `#30251F`, terracotta `#B66D4D`, muted brass `#B89A62`.
4. **Photography:** Actual Bali Bali food images. The original files are 550 × 440; higher-resolution originals are the next asset priority. Interior and street photographs are explicitly marked as outstanding.
5. **Motifs:** Extruded B → A → L → I brand letters with brass sides, quiet table-like rules, large year and street-number typography.
6. **Hero:** An oversized BALI BALI wordmark across a close view of the restaurant's saté, with a persistent booking link and a small family-run/halal seal.
7. **Scenes:** First taste → camera flight through B → A openings between dishes → overhead sharing table → heritage photo study past L → I letter strokes → West End address study → booking and practical details.
8. **CTAs:** Burgundy Book a Table buttons open the official restaurant booking section, with confirmation by reply explained nearby. Menu links open an HTML selection with verified prices and a link to the complete PDF. Phone and directions remain directly available.
9. **Mobile and accessibility:** Lower graphics density, native touch scrolling, simple mobile navigation, automatic reduced-motion photographic edition, semantic content, inert inactive chapters, keyboard focus indicators and WebGL fallback. Explore offers a continuous reading edition; switching preserves the current section. Direct hours and calling shortcuts stay visible.

**Strongest aspect:** The camera and depth-aware shader handoffs create a reversible spatial food journey, with independent navigation and clear booking access.

**Current limitation:** Authentic interior/street assets and high-resolution food originals are still needed to realise the full photographic ambition. No substitute storefront or historical imagery is fabricated.

Source and run instructions: [cinematic/README.md](cinematic/README.md).

**WebGL upgrade:** Five reusable render-to-texture handoffs, depth-aware occlusion, aspect-preserving photo relief, GPU steam, dish-local heat refraction and timeline-sampled warm lighting enhance the existing composition. Three adaptive quality tiers preserve the photographic fallback and direct booking access. See [the implementation report](cinematic/WEBGL_UPGRADE.md).


## Balinese cultural passages

The former B/A/L/I sculptures are now a split stone gateway → ornamental penjor bamboo bow → carved foliate frame → jepun petals. The camera travels through their open spaces between the food photographs; the flower's centre remains intact. These are locally generated stylised cultural references rather than temple or ritual replicas. Source geometry/palettes live in `cinematic/lib/cultural-geometry.ts`; responsive mesh transforms and shared camera openings live in `cinematic/lib/cultural-layout.ts`. No new model, font or photography downloads.


### Motion refinement

Refined the four cultural sculptures with rounded stone, curved leaves, carved scrolls and gradient-coloured jepun petals. Continuous camera curves, softer image edges/fades and progress-based reading shades smooth the journey. Chapter clicks now use distance-based Lenis timing with interruption, retargeting, history navigation and destination focus; intermediate copy fades during travel.


### Licensed Candi Bentar scan

The gateway now uses the complete Candi Bentar scan by nusaheritage.id, Sketchfab `9051dc244c984da8a1a4ec7e90e1a567`, licensed CC BY 4.0. Prepared local GLB variants replace the procedural gate; the real opening drives the camera passage. Creator/source/licence and modifications appear on the credits page linked from the visit footer. The penjor, carved frame and jepun remain procedural.

- Gateway-first landing: frontal zero-yaw Candi Bentar centred on desktop/mobile; fully visible at progress 0, lightweight gateway loading poster, physical entry crossing at 0.125–0.145, food and photo shadows deferred until entry. Compact centred title leaves the carved halves visible.

- Imported the selected CC0 Frangipani Flower by elkid (BlendSwap 14800), retaining five curved/thick petals and original photographed texture. Adaptive local GLBs are 616/179/60 KB; measured outer-petal passage [0.20, 0.42] keeps the centre intact. Credits and actual-triangle camera checks updated.
