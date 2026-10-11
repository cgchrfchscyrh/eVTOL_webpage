# Accessibility review — 11 October 2026

Target: WCAG 2.1 Level A and AA. This is a technical review record, not an ADA/WCAG certification or institutional brand approval.

## Current revision and verification status

The current revision draws on the authors’ six-slide `Flying DNA - Copy 1.pptx`. The Digital Twin, Networked Systems, and Artificial Intelligence pillars describe the project vision. They are explicitly separated from the methods and quantitative findings validated in the 2025 published eVTOL paper; no complete three-pillar system is claimed as a result of that paper.

Only the digital-twin city and wind-field still images from slide 5 and the embedded `image13.gif` animation from slide 6 are selected as presentation media. The stills have alt text and complete HTML explanations. Original scientific colors remain part of the figures, not the website’s UF branding palette. The source PPT is unchanged and is not republished as a complete downloadable attachment.

The title pairs the existing 15-second NASA/Joby context video on the left with the complete approximately 20.93-second slide 6 animation on the right. The latter is converted to an original-speed MP4 without an audio track. These videos are from separate sources and are not a shared experiment or evidence of real-aircraft validation of the paper’s controller. Both videos have complete HTML visual alternatives and WebVTT description tracks.

Desktop users can play, pause, or replay both clips together, or choose Show full video frames to see complete frames outside the title overlay. At widths up to 1000 CSS pixels, the title appears before the complete frames; at widths up to 700 CSS pixels, the videos stack vertically. Native controls remain present from initial load and work without JavaScript. Neither video starts automatically or loops; no uncontrolled GIF is embedded.

Local verification of this revision completed on 11 October 2026. Lint passed; Astro/TypeScript checked 21 files with zero errors, warnings, or hints, and the production build generated five pages. The dependency audit reported zero vulnerabilities with no advisory exceptions. GitHub Actions deployment and live verification of this revision are still pending; previous production records are identified as historical below.

## Current automated results — 11 October 2026

The current local production build passed **10 axe scans and 111 functional checks, with zero violations and zero check errors**. The report is in `reports/axe-wcag21aa.json`; dependency results are in `reports/security-audit.json` and `reports/security-review.json`.

The checks cover the homepage, research guide, result tables, accessibility page, and 404 page at desktop and mobile sizes. Coverage includes keyboard navigation, visible focus, the first skip link, shared video playback/pause/replay, full-frame switching, media descriptions, BibTeX copying, and wide-table scrolling. They also cover 320 CSS-pixel reflow, increased text spacing, no autoplay or loop, no-JavaScript content, reduced-motion visits, heading hierarchy, unique IDs, and internal anchors.

## Current visual review — 11 October 2026

The 1440 CSS-pixel desktop view, full-frame video mode, and 320 CSS-pixel mobile view were visually inspected. No page-level horizontal overflow was observed. For the reviewed title text over the dynamic background, using a white video pixel as the brightest background case gives a minimum contrast ratio of **6.89:1** after the overlay is applied. This calculation concerns the title treatment, not every annotation inside scientific raster figures; those retain their accompanying HTML alternatives.

These automated and visual checks do not establish full WCAG/ADA conformance. The PDF, assistive-technology, and institutional-review limitations below remain applicable.

## Previous automated results — 3 October 2026

The previous local production build with its GitHub Pages base path passed **10 axe scans and 91 additional checks, with zero violations or check errors**. These counts are retained for the 3 October version history and are superseded by the 11 October local results above.

Previous coverage included the homepage, research guide, result tables, accessibility page, and 404 page at desktop and mobile sizes. Keyboard checks covered the first skip link, visible focus, main-content focus, video playback/pause/end/replay, copying BibTeX, and scrolling wide tables. The tests checked 320 CSS-pixel reflow, increased text spacing, no autoplay/loop, media descriptions, no-JavaScript content, reduced-motion visits, heading hierarchy, unique IDs, and internal anchors.

## Previous visual and content checks — 3 October 2026

- Desktop and 320-pixel screenshots inspected. Long DOI wrapping and lazy-image layout reservation were corrected.
- Original figure crops checked for complete labels and boundaries. Original scientific colors remain intact; textual descriptions and HTML data tables explain the comparisons without relying on color.
- All data tables have captions and scoped row/column headers. CSV values were checked against the same data used by the HTML tables; see `reports/content-verification.json`.
- The source PDF hash matches the original uploaded file. No manuscript text, numbers, or original PDF files were changed.
- The MP4 has only a video stream; `ffprobe` evidence is in `reports/media-review.json`. The excerpt has no speech or meaningful audio requiring captions. Its full visual description, a timed VTT track, original source, and distinction from the authors’ experiment are provided.
- The initial explicit Play button reveals native controls when playback begins, avoiding a browser loading indicator over the still poster. With JavaScript disabled, native controls remain present from the start.
- Every page, including 404, retains the UF non-endorsement disclaimer. There is no UF logo or UF blue/orange interface palette. Affiliations are preserved as text.

## Current axe items requiring interpretation

Remaining incomplete rules are `color-contrast` and `video-caption`. Both video files have no audio tracks and include HTML visual alternatives and timed description tracks. There is no speech to transcribe as captions.

Axe cannot determine the changing video pixels behind hero text. The separate worst-case contrast calculation described above covers that text. Other indeterminate nodes include decorative arrows marked `aria-hidden`; surrounding link names and explicit before/after values convey their meaning. Scientific raster figures retain full text descriptions, and original results also have HTML tables; their pixel-level contrast has not been certified.

## Limits and pending human assessment

The supplied eVTOL publisher PDF reports tags, but tag presence is not a verification of semantic structure, reading order, mathematical accessibility, or assistive-technology usability. The original publisher PDF is not republished here. External papers remain clearly identified; the local research guide is a companion, not a complete full-text replacement.

GeoWind2Plan is cited as related work by independent authors, with links to its [HTML preprint](https://arxiv.org/html/2609.36056v1) and [PDF](https://arxiv.org/pdf/2609.36056v1). Its results are not presented as experiments by this project. The external GeoWind2Plan PDF is untagged; its reading order and assistive-technology behavior have not been verified. The HTML link provides another reading format, not a claim that the external paper has received a complete accessibility assessment.

Manual testing with multiple screen readers and users with disabilities, full remediation of external scholarly PDFs, and UF institutional accessibility/brand approval have not been completed. A neutral palette or disclaimer does not grant an exemption from applicable institutional requirements.

For official requirements, consult [UF Web Standards](https://brandcenter.ufl.edu/web-standards/) and [UF EIT Accessibility Policy](https://policy.ufl.edu/policy/electronic-information-technology-and-communication-accessibility-policy/). Contact for access barriers: liusongyang@ufl.edu.

## Previous published build verification — 3 October 2026

The [previous successful deployment workflow](https://github.com/cgchrfchscyrh/eVTOL_webpage/actions/runs/37144902582) scanned 10 page states and passed 91 additional checks. Its report was saved in `reports/ci/axe-wcag21aa.json`. Live verification checked 5 pages and 25 unique page/resource URLs, confirmed public-media bytes matched the source assets, tested video playback and pause, and checked 320 CSS-pixel reflow. These checks predate Flying DNA and the two-video title layout. This revision has completed local verification but is still awaiting publication and live checks. Deployment reports must be updated after publishing; see `reports/live-deployment.json` and `reports/live-browser.json`.
