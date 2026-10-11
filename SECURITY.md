# Security review — 11 October 2026

This is a static GitHub Pages site. Only the `dist/` artifact is deployed. Node.js, Astro, ESLint, and their dependency trees are build tools, not a running application server. There are no accounts, forms, analytics, remote-image transformations, or shared authenticated caches. Fonts and media are served locally. A restrictive hash-based Content Security Policy is added to every generated HTML page.

## Dependencies

The 11 October 2026 dependency audit reports zero vulnerabilities. The transitive package `http-cache-semantics` was updated from 4.2.0 to 4.3.0, outside the affected range reported by the current npm advisory for [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp). The unused `@eslint/markdown` checker and its exclusive dependencies were also removed after its transitive KaTeX dependency was flagged by [GHSA-238p-pmpm-9mq7](https://github.com/advisories/GHSA-238p-pmpm-9mq7). The site has no Markdown or MDX source pages; JavaScript, TypeScript, Astro, CSS, and JSON linting remain enabled. No other retained dependency versions were changed.

The previous expiring advisory exception has been removed. `npm run audit:security` now fails for any reported vulnerability or audit failure, as well as a change from the reviewed static-output configuration or the introduction of dynamic server/image/fetch usage. Raw findings and the dated summary are retained in `reports/security-audit.json` and `reports/security-review.json`. This is a point-in-time dependency check, not a guarantee against future vulnerabilities.

The initially inherited `braces` advisory was removed from the new projects by upgrading the Astro ESLint plugin/parser and pruning unused template packages. The original HOIST dependency tree was not changed.

## Deployment checks

Check HTTPS, repository base paths, media/figure/CSV links, CSP, and response headers after publishing. GitHub Pages controls HTTP response headers; HTML can provide CSP and referrer policy, but cannot impose HSTS, X-Frame-Options, or HTTP-only CSP directives. Record the actual live responses rather than claiming every header is configurable. No secrets or original licensed manuscript PDFs belong in this repository.

## Observed production response

The final live check confirmed HTTPS enforcement, GitHub Pages hosting, and `Strict-Transport-Security: max-age=31556952`. Every generated page has the intended HTML CSP, and the layout sets a strict-origin-when-cross-origin referrer policy. MP4 byte-range requests return 206 Partial Content. No HTTP `X-Frame-Options`, `X-Content-Type-Options`, or CSP response header was returned; these provider-controlled header limitations are recorded rather than claimed to be configured. See `reports/live-deployment.json`.
