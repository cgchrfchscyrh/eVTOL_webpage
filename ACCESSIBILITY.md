# Accessibility review — 18 October 2026

## Current review — 27 October 2026

This revision replaces introductory topic subtitles with a title-led opening, removes visible text beneath each video, and connects a concrete research task to a larger collaborative vision. Full silent-video alternatives remain linked through `aria-describedby`, with timed WebVTT descriptions and complete descriptions/credits consolidated in the end-of-page media notes. Native controls, viewport playback, remembered manual pauses, reduced-motion and data-saving preferences remain available.

The current build and lint pass. The browser suite passed **11 axe scans and 186 functional checks**, with zero violations and errors. Desktop and 320 CSS-pixel layouts were visually reviewed after loading all figures. Dependency audit reports zero vulnerabilities. Original media and paper assets are unchanged. See `reports/story-review.json` and `reports/axe-wcag21aa.json`. This current review supersedes earlier descriptions of per-player captions or the previous section structure.

Automated checks are not complete ADA/WCAG certification. External PDF reading order, detailed scientific-artwork contrast, and multi-screen-reader usability still require separate review.


Target: WCAG 2.1 A/AA. Automated checks and this technical review are not an ADA/WCAG certification.

## Current content and media revision

The homepage contains Abstract, Method, Results, and Citation. The title and authors remain above complete paired videos. The Paper button links to the published article DOI. Separate global playback controls, research-guide/results-index navigation, numerical result cards, tables, training plots, and download controls have been removed. Existing `/paper/` and `/results/` bookmarks lead to concise noindex pages pointing to the homepage sections. Original research data, figures, and source media remain unchanged.

Five silent videos retain native controls and text alternatives: NASA/Joby context footage, the complete Flying DNA city animation, and three successive excerpts of that animation distributed through Abstract, Method, and Results. The clips have local posters and timed WebVTT descriptions. They retain complete frames and original speed. They illustrate the urban context and do not demonstrate the published controller or establish real-aircraft validation. The results text retains safety/time trade-offs and the simulation-only scope.

Visible videos can play and loop unless reduced motion or data saving is requested. Native controls support keyboard pause/resume, and manual pauses persist after scrolling. Offscreen/hidden-tab media pauses. Explicit native playback remains available with motion/data preferences. Without JavaScript, native controls remain available without automatic motion.

Author names and original scholarly materials are preserved. Institutional introductions, disclaimers, UF logos, and UF interface colors are absent. Method and city/wind images have alt text and expandable explanations; original scientific diagram colors remain part of the research content.

## Current local verification

The production build passed **11 axe scans and 189 functional checks**, with zero violations and zero errors. Coverage includes all five routes, desktop/mobile axe scans, expanded descriptions, headings and image alternatives, native Tab/Space playback, looping, remembered manual pauses, offscreen pausing, reduced-motion/data-saving preferences, pending-buffer pause, no-JavaScript access, citation copying, media duration/description/resource checks, and 320 CSS-pixel reflow with increased text spacing. See `reports/axe-wcag21aa.json`.

Lint and Astro/TypeScript/build checks passed with zero errors, warnings, or hints. No dependencies changed. Desktop and mobile screenshots were reviewed after all figures decoded; complete media frames and the concise section layout were confirmed. Evidence is summarized in `reports/content-cleanup-review.json`.

Publication and live HTTPS/resource verification follow the local checks. Existing `reports/live-deployment.json`, `reports/live-browser.json`, and `reports/ci/` contain earlier deployment evidence and should not be read as checks of this unpublished revision.

## Remaining review

These files contain no audio to transcribe; complete visual descriptions are provided. Raster scientific figure contrast, external PDF reading order, and multi-screen-reader usability are not fully certified. The publisher PDF reports tags, but tag presence does not establish correct headings, figure alternatives, equation reading, or reading order. GeoWind2Plan remains independent related work.

Assessment with users with disabilities and institutional accessibility/brand review remain outside the completed technical checks. For an access barrier, contact liusongyang@ufl.edu.
