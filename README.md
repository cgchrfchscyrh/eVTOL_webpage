# eVTOL research webpage

2026-10-18 视觉精简：首页采用 Abstract / Method / Results / Citation，标题和作者位于完整双视频上方，长图注与媒体说明可展开。静音视频首次进入视口时自动播放并循环，仅保留各视频的原生播放/暂停控件，移除独立全局按钮；减少动画或省流量时不自动播放，滚出视口暂停，用户暂停不会被自动恢复。主页取消 UF 单位介绍和免责声明；原研究附件不变。


论文：**Reinforcement learning based multi-perspective motion planning of manned electric vertical take-off and landing vehicle in urban environment with wind fields**。2025 年发表论文及其原表是已验证方法与量化结果的事实来源；原始 PDF 保持不变，不在仓库中重新分发。本次修订另使用作者提供的六页 `Flying DNA - Copy 1.pptx` 介绍更广泛的项目愿景，明确区分愿景、演示素材与论文实验。

网站地址：<https://cgchrfchscyrh.github.io/eVTOL_webpage/>。科研代码仓库与本网页仓库分开：<https://github.com/cgchrfchscyrh/eVTOL_RL>。

## 网站内容

- `/`：浅灰标题与作者、完整双视频、Abstract / Method / Results / Citation、可展开图注及媒体说明。
- `/paper/`：不索引的兼容页，引导已有书签前往首页 Method。
- `/results/`：不索引的兼容页，引导已有书签前往首页 Results；网页不再展示数字结果、定量训练图或数据下载入口。
- `/accessibility/`：无障碍说明、媒体来源、附件限制和联系信息。
- `/404.html`：保留导航的错误页面。

中性炭黑和灰白界面不使用 UF 标志或蓝橙主题。按用户 2026-10-18 最新要求，网站不再展示机构介绍和免责声明，作者姓名及原论文资料保持不变。原论文图的科学配色保持不变，另提供文字说明。

Flying DNA 的三柱为 Digital Twin、Networked Systems、Artificial Intelligence。这是项目的研究愿景，不表示 2025 年论文已经验证完整的三柱系统。PPT 阅读副本仅选第 5 页的数字孪生城市场景与风场静图，以及第 6 页嵌入的 `image13.gif`；原 PPT 保持不变，不整份公开。静图提供 alt text 和完整 HTML 说明，保留科学图示的原配色，不将其作为界面品牌配色。

首屏左侧保留 NASA/Joby 现实背景视频，右侧使用 Flying DNA 原速无音轨仿真。两者不是同场实验，也不构成本论文实机验证。所有宽度下标题均位于完整画面上方，窄屏纵向排列。首屏两段视频与正文三个短片段均保留原生控件、完整 HTML 画面说明和 WebVTT 描述轨道；自动播放与暂停行为见页首最新约定。无 JavaScript 时仍可用原生控件播放和阅读说明。

前轮历史发布版本：`a2019de`，GitHub Actions [部署及检查通过](https://github.com/cgchrfchscyrh/eVTOL_webpage/actions/runs/39156613305)。CI 完成 11 次 axe 扫描与 112 项功能检查；线上另验证 5 页、25 个资源、32 个页内目标与 11 项浏览器行为。无障碍扫描不是完整 ADA/WCAG 认证。

## 本地运行与检查

需要 Node.js 24。使用项目自带的锁定文件安装。

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run audit:security
BASE_PATH=/eVTOL_webpage SITE_URL=https://cgchrfchscyrh.github.io npm run build
BASE_PATH=/eVTOL_webpage npm run preview -- --host 127.0.0.1 --port 4332
```

在另一终端运行：

```sh
npx playwright install chromium
TEST_URL=http://127.0.0.1:4332/eVTOL_webpage npm run test:a11y
```

也可以用 `CHROME_PATH` 指定已安装的 Chrome。无障碍测试包括 axe、键盘跳转/标签页/视频控制、320 像素回流、文字间距、无 JavaScript 页面、媒体描述轨道和引用复制。详细记录见 [ACCESSIBILITY.md](ACCESSIBILITY.md)。

2026 年 10 月 11 日安全审计为零漏洞、无公告例外：仅将 `http-cache-semantics` 从 4.2.0 更新至 4.3.0，并移除未使用的 Markdown 检查器及其 KaTeX 依赖链；其他保留包版本未变。`audit:security` 保留原始 npm 输出，并拒绝任何漏洞或审计失败。详见 [SECURITY.md](SECURITY.md)。这是有日期的依赖检查，不是未来安全保证。

2026 年 10 月 11 日本轮 Flying DNA 与双视频修订已通过本地 lint、Astro/TypeScript 检查及构建：检查 21 个文件，0 错误、0 警告、0 提示，生成 5 个页面。无障碍测试完成 10 次 axe 扫描和 111 项功能检查，0 违规、0 检查错误。已目视核对 1440 CSS 像素桌面、完整画面模式和 320 CSS 像素移动端截图，未发现页面横向溢出；动态背景按最亮白色像素核算时，所检查标题文字的最低对比度为 6.89:1。自动检查与这些人工核对不代表完整 WCAG/ADA 认证。

本轮 GitHub Actions 已成功发布，且完成线上资源、媒体、HTTPS 和浏览器复核；完整记录见本文末尾。2026 年 10 月 3 日检查仅作历史记录。

## 修改内容

- `src/data/site.json`：论文题目、作者、原图说明、数值与 BibTeX。
- `src/data/narrative.json`：七段研究叙事与独立相关工作。
- `src/data/presentation.json`、`hero-media.json`：PPT 静图和仿真视频的说明与来源。
- `src/components/` 和 `src/pages/`：布局和交互。
- `src/styles/global.css`：响应式样式、可见焦点、打印与 reduced-motion 支持。
- `public/figures/`：原论文图与 Flying DNA 第 5 页静图的阅读副本。
- `public/data/`：原论文 CSV 数据保持不变，本次精简仅移除网页展示和下载入口。
- `public/media/`：静音片段、封面及英文画面描述 VTT；`evtol-clips.json` 是片段来源、切点和说明的唯一配置。
- `reports/source-provenance.json`：原 PDF 文件名、SHA-256、提取来源和核对日期。

论文数字使用原表数值，未复用与数值不一致的百分比表述。缺失的训练轨迹数据没有从图片猜测或补造。首屏仅保留指向已发表论文 DOI 的 Paper 按钮。

## GitHub Pages

`.github/workflows/astro.yml` 在推送 `main` 后执行安装、审计、lint、构建和 axe 检查，再部署 `dist/`。仓库 Settings → Pages → Build and deployment 的 Source 使用 **GitHub Actions**。构建使用仓库名作为 `base`，所有资源通过统一的路径函数生成。

```sh
git add src public scripts package.json package-lock.json README.md ACCESSIBILITY.md SECURITY.md .github astro.config.ts eslint.config.mjs prettier.config.ts
git commit -m "Update research website"
git push origin main
```

分享给导师时发送网站地址；GitHub 仓库地址适合查看源码。GitHub Pages 是公开发布，不是私密审稿空间。

## 素材与规范

视频来源：[NASA · “NASA and Joby Complete Air Taxi Testing” · 2021](https://images.nasa.gov/details/NHQ20210915ARMD01)。使用方式、完整画面说明与研究录像的区别见网站媒体说明。

PPT 仿真视频来自作者提供的 Flying DNA 第 6 页嵌入动画 `image13.gif`。完整动画按原有时间顺序转换为可暂停的静音 MP4，不在网页直接放置不可控循环 GIF。它展示项目演示场景，不能据此推断已完成实机试飞或扩展论文验证范围。

[GeoWind2Plan 的 HTML 预印本](https://arxiv.org/html/2609.36056v1) 与 [PDF](https://arxiv.org/pdf/2609.36056v1) 作为独立作者的相关工作链接，不能将其结果写成本项目实验。该外部 PDF 未加标签，阅读顺序与辅助技术体验未核验；优先提供 HTML 阅读入口，但不声明外部内容已完全无障碍。本项目原始 Elsevier PDF 虽报告含标签，也不能据此认定其阅读顺序、公式或图示已完全合规。

自动化检查不代表 ADA 或完整 WCAG 认证。原始论文与研究数据不因视觉精简而改变。

基于 Roman Hauksson 的 [Academic Project Astro Template](https://github.com/RomanHauksson/academic-project-astro-template)，按本研究内容重新实现。已上线的 HOIST 网站由另一个仓库维护。

## 本轮发布记录 — 2026 年 10 月 11 日

[GitHub Actions 部署成功](https://github.com/cgchrfchscyrh/eVTOL_webpage/actions/runs/38172730548)，版本 `f464007`。云端重复通过 10 次 axe 扫描、111 项功能检查，零违规或错误；线上已验证 5 个页面、30 个页面/资源 URL、37 个页内定位链接及两段视频的字节范围请求。键盘播放/暂停、完整画面切换、320 CSS 像素回流和 HTTPS 均通过，具体证据保存在 `reports/ci/`、`reports/live-deployment.json`、`reports/live-browser.json`。这不是完整 ADA/WCAG 认证。
