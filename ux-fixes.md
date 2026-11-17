# UX audit fixes — 16 November 2026

The eight findings in `ux-audit.md` have corresponding implementation changes. The original audit is preserved as the baseline.

| Finding | Change |
| --- | --- |
| Small practical text | Visit details use 16px text, supporting copy uses 14px, and labels use 12px. Mobile details stack. Every cinematic scene can scroll locally and accept programmatic keyboard focus. |
| Booking expectations | D uses “Request a table” and explains confirmation by reply. Calling is directly available from the fixed controls and the new menu page. |
| PDF-only price discovery | A new server-rendered menu selection includes six dishes, prices, Special Rijsttafel pricing and key spending/booking terms. All concepts link to it; the full official PDF remains available. |
| Visit discoverability | Fixed Hours & directions and Call shortcuts; all six chapters, including pre-theatre, appear in Explore. |
| Unlabelled chapter navigation | Desktop shows every chapter name at full opacity with an underlined current chapter. Mobile shows plain progress text; Explore contains every destination. |
| B headline clipping | Shrinkable grid columns, responsive heading sizing and address wrapping. |
| A–C menu dismissal | Shared disclosure script handles Escape, outside pointer events, focus leaving and link selection. Controls reference a stable navigation ID. |
| Continuous reading access | Explore includes a reading view and a return to the journey. The current section and session preference are preserved; reading mode exposes all six headings. |

## Verification

- `npm run typecheck` passed.
- `npm run export:pages` passed after the final source change, including production compilation, TypeScript and static generation of `/` and `/menu/`.
- `node --check assets/navigation.js` and `git diff --check` passed.
- D: inspected at 320 × 568, 390 × 844 and 1440 × 900. Verified 16px visit text and 14px supporting text, single-column mobile details, fixed actions, and scrollable overflow.
- D: all six desktop chapter links activated the corresponding scene. Every desktop chapter label was displayed.
- D: switching from Visit to reading mode retained `#visit`, focused the visit section, and removed hidden/inert state from the complete reading document. Switching back retained the visit chapter and restored focus to Explore.
- The HTML menu opened from D's primary menu action, displayed the verified selection and prices, and provided working local navigation back to the restaurant page. A–C use that same generated page.
- B at 320px: hero heading and address measured no internal horizontal overflow; the complete “Share everything.” headline was visually confirmed.
- A, B and C: Escape closed the disclosure and returned focus to the toggle. The shared implementation also covers outside clicks and focus leaving; those paths were inspected in source, not exercised in every concept.
- Screenshots: `tmp/ux-fixes/desktop-visit.jpg` and `tmp/ux-fixes/mobile-menu.jpg`.

## Limits and maintenance

No live reservation was submitted or external site changed. No physical-device, screen-reader, 200% text-enlargement or field-performance verification was performed. Those remain launch validation work; the implementation should not be described as a full accessibility certification.

Menu prices and terms were checked against the [official 2026 PDF](https://www.balibalirestaurant.com/pdf/bali_bali_menu_2026.pdf) on 16 November 2026. `cinematic/README.md` documents the content-maintenance locations. Keep the HTML selection, Rijsttafel teaser and PDF aligned whenever the restaurant changes prices.

## Scroll boundary correction — 17 November 2026

The scene-wide `overscroll-behavior: contain` trapped scrolling whenever a scene had overflow, even just the hero's 8.5px overflow at 1280 × 720. After the inner content reached its edge, Lenis deferred to the contained panel and the page never advanced. Scene panels now use vertical overscroll `auto`, allowing the existing direction-aware nested-scroll handling to return control to the journey. The Explore disclosure retains containment.

Reproduced before the change with repeated centre-screen wheel gestures: hero scroll reached 8.5px while page scroll stayed at zero. After the fix, the same gestures advanced the page to 2160px and chapter 4, then reached the final chapter; reverse gestures returned to earlier chapters. At 390 × 844, the visit panel scrolled its full 322px content range. Scrolling back to its top and continuing upward returned to earlier journey chapters. These checks used browser wheel gestures; physical touch devices were not tested. The production export, including TypeScript, passed after the correction.
