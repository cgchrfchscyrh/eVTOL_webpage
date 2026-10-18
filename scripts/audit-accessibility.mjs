import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import assert from "node:assert/strict";
const site = JSON.parse(await readFile(new URL("../src/data/site.json", import.meta.url), "utf8"));
const base = (process.env.TEST_URL || "http://127.0.0.1:4514/eVTOL_webpage").replace(/\/$/, "");
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}), args: ["--no-sandbox"] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, permissions: ["clipboard-read", "clipboard-write"] });
const page = await context.newPage();
const report = { date: new Date().toISOString(), project: site.id, target: "WCAG 2.1 A/AA", engine: "axe-core via Playwright", scans: [], checks: [], errors: [], limitations: ["Automated checks are not a complete WCAG or ADA certification.", "External PDFs, screen-reader usability, and scientific image contrast need separate review."] };
const check = (value, message) => (value ? report.checks : report.errors).push(message);
page.on("pageerror", (e) => report.errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") report.errors.push(m.text()); });
page.on("requestfailed", (r) => { if (!r.failure()?.errorText.includes("ERR_ABORTED")) report.errors.push(r.url() + ": " + r.failure()?.errorText); });
async function scan(name) {
  const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  report.scans.push({ name, passes: r.passes.length, violations: r.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.map((n) => ({ target: n.target, reason: n.failureSummary })) })), incomplete: r.incomplete.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })) });
}
const paused = (p) => p.locator("video").evaluateAll((vs) => vs.length === 2 && vs.every((v) => v.paused));
const waitPlaying = (p) => p.waitForFunction(() => [...document.querySelectorAll("video")].every((v) => !v.paused && v.currentTime > 0.1) && !document.querySelector("#hero-playback-toggle").hasAttribute("aria-busy"), {}, { timeout: 30000 });
try {
  for (const route of ["/", "/paper/", "/results/", "/accessibility/", "/404.html"]) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto(base + route, { waitUntil: "networkidle" });
    check(response?.ok() || route === "/404.html", route + ": page loads");
    check(await page.locator("h1").count() === 1, route + ": one H1");
    check(await page.locator("html").getAttribute("lang") === "en", route + ": English language declared");
    check(await page.locator('img:not([alt]),img[alt=""]').count() === 0, route + ": informative images have alternatives");
    check(await page.locator("iframe,video[autoplay]").count() === 0, route + ": no third-party player or unconditional HTML autoplay");
    check(!/University of Florida|official UF|institutional disclaimer|UF interface|author affiliations/i.test(await page.locator("body").innerText()), route + ": requested institutional text is absent");
    check(await page.evaluate(() => { const ids = [...document.querySelectorAll("[id]")].map((el) => el.id); return new Set(ids).size === ids.length; }), route + ": unique IDs");
    check(await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].every((el) => document.getElementById(el.getAttribute("href").slice(1)))), route + ": local anchors have targets");
    check(await page.evaluate(() => { let previous = 0; return [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter((el) => el.getClientRects().length).every((el) => { const level = Number(el.tagName[1]); const okay = level <= previous + 1; previous = level; return okay; }); }), route + ": headings do not skip levels");
    await page.keyboard.press("Tab");
    check(await page.locator(":focus").getAttribute("class") === "skip-link", route + ": skip link is first keyboard stop");
    check(await page.locator(":focus").evaluate((el) => getComputedStyle(el).outlineStyle !== "none"), route + ": visible focus");
    await page.keyboard.press("Enter");
    check(await page.locator(":focus").getAttribute("id") === "main", route + ": skip link focuses main");
    if (route === "/") {
      const videos = page.locator("video");
      const toggle = page.locator("#hero-playback-toggle");
      await waitPlaying(page);
      check(true, "Both silent videos start automatically on their first visible visit");
      check(await videos.evaluateAll((vs) => vs.every((v) => v.muted && v.controls && v.playsInline && v.loop)), "Both videos are muted, inline, looping and retain native controls");
      check(await toggle.innerText() === "Pause videos", "Automatic playback exposes an explicit Pause videos control");
      check(await videos.evaluateAll((vs) => vs.every((v) => v.getAttribute("aria-label") && v.getAttribute("aria-describedby")?.split(/\s+/).every((id) => document.getElementById(id)?.textContent.trim()))), "Both video names and complete text description targets exist");
      await toggle.focus();
      check(await toggle.evaluate((el) => getComputedStyle(el).outlineStyle !== "none"), "Shared playback control has visible focus");
      await page.keyboard.press("Space");
      check(await paused(page), "Keyboard pauses both automatically playing videos");
      await page.locator("#citation").scrollIntoViewIfNeeded();
      await page.locator(".hero-backdrops").scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      check(await paused(page), "Manual pause persists after leaving and returning to the videos");
      await toggle.focus();
      await page.keyboard.press("Enter");
      await waitPlaying(page);
      check(true, "Keyboard explicitly resumes both videos");
      await page.locator("#citation").scrollIntoViewIfNeeded();
      await page.waitForFunction(() => [...document.querySelectorAll("video")].every((v) => v.paused));
      check(true, "Videos pause when completely outside the viewport");
      await page.locator(".hero-backdrops").scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      check(await paused(page), "Returning does not force a second automatic start");
      await toggle.click();
      await waitPlaying(page);
      await page.locator("#context-video").evaluate((v) => { if (v instanceof HTMLVideoElement) v.pause(); });
      check(await page.locator("#context-video").evaluate((v) => v.paused) && await toggle.innerText() === "Pause videos", "Native pause remains effective while the group label reflects the other playing video");
      await toggle.click();
      check(await paused(page) && await toggle.innerText() === "Play videos", "Shared pause and label remain synchronized with native controls");
      for (const id of ["context-video", "simulation-video"]) {
        const video = page.locator("#" + id);
        await video.evaluate((v) => { v.textTracks[0].mode = "hidden"; });
        await page.waitForFunction((videoId) => document.getElementById(videoId).textTracks[0]?.cues?.length > 0, id);
        check(await video.evaluate((v) => v.textTracks[0].kind === "descriptions"), id + ": timed visual descriptions load");
      }
      await videos.evaluateAll((vs) => vs.forEach((v) => { v.currentTime = v.duration - 0.15; }));
      await toggle.click();
      await page.waitForFunction(() => [...document.querySelectorAll("video")].every((v) => !v.paused && v.currentTime < 2));
      check(true, "Loops restart without losing the available pause control");
      await toggle.click();
      await page.locator("#copy-citation").focus();
      await page.keyboard.press("Enter");
      check((await page.evaluate(() => navigator.clipboard.readText())).includes(site.citationKey), "Citation can be copied using the keyboard");
      await page.locator(".media-notes > summary").click();
      check(await page.locator("#media-description").isVisible(), "Complete media descriptions can be expanded");
      await scan("Homepage expanded media descriptions");
      await page.locator(".media-notes > summary").click();
    }
    if (route === "/results/") {
      check(await page.locator("table").count() === site.tables.length, "All original result tables are retained");
      check(await page.locator("table caption").count() === site.tables.length, "All result tables have captions");
      check(await page.locator("th:not([scope])").count() === 0, "All table headers have scope");
    }
    await scan(route + " desktop");
    for (const width of [320, 768]) {
      await page.setViewportSize({ width, height: 900 });
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route + `: no horizontal page overflow at ${width}px`);
      if (route === "/") {
        check(await page.locator("video").evaluateAll((vs) => vs.every((v) => getComputedStyle(v).objectFit === "contain")), `Videos retain complete frames at ${width}px`);
        check(await page.evaluate(() => document.querySelector(".hero-backdrops").getBoundingClientRect().top >= document.querySelector(".hero-text").getBoundingClientRect().bottom - 1), `Title and authors stay above complete videos at ${width}px`);
      }
    }
    await page.setViewportSize({ width: 320, height: 900 });
    const spacing = await page.addStyleTag({ content: "*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}" });
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route + ": 320px reflow with increased text spacing");
    await spacing.evaluate((el) => el.remove());
    await page.setViewportSize({ width: 390, height: 900 });
    await scan(route + " mobile");
    if (route === "/results/") {
      const table = page.locator(".table-scroll").first();
      await table.focus(); await page.keyboard.press("ArrowRight"); await page.waitForTimeout(200);
      check(await table.evaluate((el) => el.scrollLeft > 0), "Wide tables support keyboard scrolling");
    }
  }
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
  const n = await nojs.newPage(); await n.goto(base + "/");
  check(await n.locator("video[controls]").count() === 2, "Native video controls remain available without JavaScript");
  check(await paused(n), "No-JavaScript visit leaves videos paused");
  check(await n.locator("#hero-playback-toggle").isHidden(), "Unavailable script playback control is hidden without JavaScript");
  check(await n.locator("#figure-framework").isVisible() && await n.locator("#figure-training").isVisible(), "Method and result figures remain available without JavaScript");
  check(await n.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "320px layout reflows without JavaScript");
  check((await n.locator("#citation-text").innerText()).includes(site.citationKey), "Citation remains readable without JavaScript");
  await nojs.close();
  for (const preference of ["reduced-motion", "save-data"]) {
    const c = await browser.newContext({ viewport: { width: 1440, height: 1000 }, ...(preference === "reduced-motion" ? { reducedMotion: "reduce" } : {}) });
    if (preference === "save-data") await c.addInitScript(() => Object.defineProperty(navigator, "connection", { value: { saveData: true }, configurable: true }));
    const p = await c.newPage(); await p.goto(base + "/", { waitUntil: "networkidle" });
    check(await p.locator("video").evaluateAll((vs) => vs.every((v) => v.paused && v.currentTime === 0)), preference + ": both videos remain paused on entry");
    await p.locator("#hero-playback-toggle").click(); await waitPlaying(p);
    check(true, preference + ": explicit playback remains available");
    await p.locator("#hero-playback-toggle").click();
    check(await paused(p), preference + ": shared pause works after explicit playback");
    await c.close();
  }
} catch (e) { report.errors.push(e.stack || String(e)); }
finally { await browser.close(); await mkdir("reports", { recursive: true }); await writeFile("reports/axe-wcag21aa.json", JSON.stringify(report, null, 2) + "\n"); }
const violations = report.scans.reduce((n, s) => n + s.violations.length, 0);
console.log(JSON.stringify({ project: site.id, scans: report.scans.length, checks: report.checks.length, violations, errors: report.errors }, null, 2));
assert.equal(violations, 0, "axe violations found; see report");
assert.equal(report.errors.length, 0, "Functional or accessibility checks failed; see report");
