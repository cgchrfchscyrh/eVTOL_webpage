# Accessibility review — 18 October 2026

Target: WCAG 2.1 A/AA. Automated checks and this technical review are not an ADA/WCAG certification.

## Visual overview and media

The overview now contains Abstract, Method, Experiments, Results, and Citation. The title and authors sit above two complete videos at every viewport width. The default visible overview has 316 words, including section links, captions, related reading and citation metadata; its core prose has 188 words. Detailed figure descriptions and media credits remain available through keyboard-operable disclosure controls. Original research tables, CSV data, figures, and scholarly links are retained.

At the user's explicit request, the silent local videos start on their first visible visit and may loop. Native controls and a clearly labelled Pause videos / Play videos button remain available. Automatic playback is suppressed by prefers-reduced-motion and navigator.connection.saveData. Scrolling both videos outside the viewport or hiding the tab pauses them. Returning does not force another automatic start or override a manual pause. Without JavaScript, native controls remain available and both videos stay paused.

The NASA/Joby recording supplies independent real-flight context. The Flying DNA recording illustrates the broader project vision. Neither is a real-aircraft validation of the article's learned policy. Both files have no audio tracks and retain complete HTML visual descriptions and timed WebVTT description tracks. The visual revision changes no media bytes. Original research colors remain within the figures; textual descriptions and result tables provide alternatives to color-only interpretation.

The user also requested removal of institutional introductions and disclaimers. These are absent from all five generated pages. Author names, contact links, paper metadata and original source materials are preserved.

## Verification

The local production build passed **11 axe scans and 112 functional checks**, with zero violations and zero check errors. The audit covers all five pages at desktop and mobile sizes, expanded media descriptions, semantic headings, image alternatives, internal anchors, keyboard skip/focus, native/shared pause, loop controls, offscreen pause, persistent manual pause, reduced-motion and data-saving visits, no-JavaScript content, BibTeX copying, and scrollable result tables. Every page reflows at 320 CSS pixels with increased text spacing. See `reports/axe-wcag21aa.json`.

Lint, Astro/TypeScript checking, and the production build pass. The dependency audit reports zero vulnerabilities and no exceptions; no dependency changes were needed for this revision. The local desktop and 320-pixel screenshots were inspected, including the method figure and complete media frames. Screenshot evidence and immutable-data checks are in `reports/visual-revision-review.json`.

The [successful GitHub Pages workflow](https://github.com/cgchrfchscyrh/eVTOL_webpage/actions/runs/39156613305) published commit `a2019dea58fa7e29d99a6e1be53b1c125bdae4cc` on 18 October 2026. Its clean CI run passed the same 11 axe scans and 112 checks; the downloaded artifact is stored in `reports/ci/axe-wcag21aa.json`. The dependency audit, lint, type checks, and build also passed.

Live verification checked five pages, 25 local resources (including font files), 32 internal fragment links, both MP4 byte-range responses, and an actual nonexistent path returning the custom noindex 404 page. All 25 resource bodies matched the local production build. HTTPS enforcement and HSTS are active; HTML CSP and the referrer policy are present. The browser passed 11 checks for automatic muted playback, native/shared keyboard pause, persistent manual pause, explicit resume, complete video frames, 320-pixel reflow, reduced-motion and data-saving preferences, and absent institutional copy. See `reports/live-deployment.json` and `reports/live-browser.json`.

## Remaining review

Axe's incomplete media-caption checks need interpretation: these videos contain no speech or audio to transcribe, and visual descriptions are provided. Raster figure contrast and reading order of external PDFs are not fully certified. The supplied publisher PDF reports tags, which does not establish correct headings, figure alternatives, equation reading, or reading order. The research guide is an HTML companion, not a complete replacement for the published article. The independent GeoWind2Plan reading link remains separate from this project's findings.

Multi-screen-reader assessment and evaluation with users with disabilities remain outside this automated review. For an access barrier, contact liusongyang@ufl.edu.
