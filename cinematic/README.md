# Concept D — A Journey to the Indonesian Table

Next.js App Router / React / TypeScript / Tailwind 4 / GSAP ScrollTrigger / Lenis / Three.js / React Three Fiber / Drei / Motion.

## Run

```sh
cd cinematic
npm ci
npm run dev
```

Open http://127.0.0.1:3000. `npm run typecheck` checks TypeScript; `npm run build` makes a standalone static export in `out/`. `npm run export:pages` builds with the GitHub Pages base path and copies the generated files into the repository's `concept-d/` directory. The existing Pages configuration publishes that directory from `main`.

## Architecture

`CinematicExperience` provides semantic HTML for all six scenes, including a complete server-rendered photographic edition. WebGL is progressive enhancement; reduced motion selects the photographic edition automatically. The motion toggle can switch editions manually. Context loss, canvas errors or a 15-second loading timeout return to the static edition.

`ScrollDirector` owns one scrubbed ScrollTrigger and one mutable journey progress value. Lenis is advanced by GSAP's ticker in milliseconds; it notifies ScrollTrigger on scroll. The ticker callback, trigger, tween, listeners and Lenis instance are removed on cleanup. No React state is updated per scroll frame. React chapter state changes only when crossing a chapter boundary.

`CameraRig` samples reversible position/target keyframes in `lib/journey.ts`. It moves through world-space photographic planes and the ceramic ring at z=-13, then rises to an overhead table view. `SceneTransition` is real lit geometry. `DepthLayer` uses a GLSL aperture and timeline opacity, with actual restaurant photographs as textures. No food models are used. Scene windows prevent distant chapters appearing through previous scenes.

The canvas renders on demand; progress changes invalidate it. Mobile uses fewer photo layers, simpler portal geometry and lower pixel density. Later scene textures are requested as the camera approaches; fetched textures remain cached for reverse scrolling. React Three Fiber disposes mounted geometry/materials on unmount; the five small texture files are cached by Drei for subsequent mode toggles. No perpetual animation loop is needed when idle.

## Reservation access

On mobile, the persistent bottom bar is the single booking/menu action pair. Inline hero, pre-theatre and final-scene booking buttons are hidden at this breakpoint in both cinematic and reading modes, avoiding duplicated controls. Desktop retains its navigation and contextual actions.

Book a Table is the sole primary action; View Menu is secondary. Both appear in the hero and final scene, with contextual menu links in food scenes. Desktop navigation and the mobile safe-area-aware bottom bar sit outside the canvas and scene transitions. Booking remains a regular link, independent of scroll progress or WebGL readiness. Controls have at least 44-pixel touch targets and visible keyboard focus. Viewports under 741 pixels high use normal scrolling so content cannot be clipped by the cinematic stage; reduced-motion preferences also select this edition. The final mobile scene can scroll if enlarged text exceeds its available space.

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

Booking points to the verified official `#Booking` section (which embeds MachForm 11659). It opens externally and does not submit a reservation. Menu points to the official 2026 PDF. Address, phone, hours, halal meat and group capacity were checked against the restaurant website on 5 November 2026. The 1986 establishment date is supplied in the client brief. No reviews, awards, prices or new historical claims have been added.

Locally hosted fonts: Cormorant Garamond and DM Sans, available under the SIL Open Font License. Typeface sources: Google Fonts. Interaction reference: https://webflow.com/made-in-webflow/website/jeskojets-e9dc11 — continuous camera progression and occlusion; no reference branding, code or assets copied.

## Prototype limits

This is a 2.5D photographic journey, not a scan of the restaurant or a video shoot. The ceramic portal is a designed transition object, not a restaurant architectural feature. Steam and depth-of-field blur are intentionally omitted to preserve food detail and mobile performance. The photographic edition remains the usable fallback on small devices or unsupported graphics hardware.
