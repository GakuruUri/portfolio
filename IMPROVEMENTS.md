# Portfolio → GodMode Roadmap

A prioritized walk-through of `urigakuru.uriroots.com`, from must-fix bugs to
the features that turn a solid portfolio into a standout one. Items are grouped
by effort/impact so you can pick off the top of each list.

---

## Tier 0 — Broken / must fix (do these first)

1. **Dead contact form.** `index.html` posts to
   `https://formspree.io/f/YOUR_FORM_ID` — every message is lost. Either drop in
   your real Formspree ID, or (better, see Tier 3) build a serverless form that
   doubles as a portfolio piece.
2. **Form has no labels.** Inputs use only `placeholder`, which disappears on
   focus and fails screen readers. Add `<label>` (visually hidden is fine) and
   `aria-label`s.
3. **Brand color split.** Main site = green `#27ae60` / bronze; learning pages =
   purple `#6c63ff`. Pick one accent and apply it everywhere. The split makes the
   subpages feel like a different site.
4. **Theme doesn't persist on the main site.** `app.js` toggles `light-mode` but
   never saves it, so it resets to dark every reload. The learning pages already
   persist via `localStorage` (`learn-theme`) — unify on one key and also respect
   `prefers-color-scheme` on first visit.
5. **Email / contact consistency.** Site shows `urigakuru@live.co.uk`; consider a
   domain address (e.g. `hello@uriroots.com`) for a more professional, on-brand
   look. Phone is half-masked on the site but full in the resume — decide which.

## Tier 1 — Quick wins (small effort, visible polish)

6. **Copy edits in the About section:** "microsoft PowerApps" → "Microsoft
   PowerApps"; "predicted to slashed" → "projected to slash"; "Cloud Engineer or
   DevOps roles" → "Cloud Engineer or DevOps role".
7. **Repo hygiene.** Remove `styles/styles.css.bak`, `styles/styles.css.map`, and
   the stray `html2` file before deploy. (`SOURCE_DIR: portfolio` ships the whole
   folder to S3.)
8. **Animated stat counters.** The "7+ / 1200+ / 70+ / 6+" numbers are static —
   count them up when the About section reveals. Big perceived-quality boost for
   ~15 lines of JS, and your reveal hooks already exist.
9. **`loading="lazy"` + explicit `width`/`height`** on every portfolio/blog image
   to cut load time and eliminate layout shift (CLS).
10. **Syntax highlighting** on learning-page code blocks (currently plain
    monospace). Add Prism.js or highlight.js — instantly more credible for a
    technical audience.
11. **Downloadable PDF resume.** You have a print-styled `resume.html`; add a
    "Download PDF" button (print-to-PDF or a generated file) next to the existing
    Resume link.
12. **Scroll progress + active-section sync.** A thin top progress bar and
    auto-highlighting the side-nav dot as sections change makes navigation feel
    deliberate.

## Tier 2 — Performance, SEO & discoverability

13. **Structured data (JSON-LD).** Add `schema.org/Person` on the homepage and
    `Article` + `BreadcrumbList` on learning pages. Helps Google show rich
    results for your name.
14. **`sitemap.xml` + `robots.txt`.** Neither exists. Generate the sitemap in CI
    so new learning pages are indexed automatically.
15. **Real Open Graph image.** All OG/Twitter cards point to your headshot
    (`Uri.png`). A branded 1200×630 card (name + title + accent) shares far
    better on LinkedIn/X.
16. **Trim Font Awesome.** You load the full CDN bundle for a handful of icons.
    Self-host an SVG subset (or use inline SVGs) to drop a large render-blocking
    request.
17. **Preload the web font** and add `font-display: swap` (Poppins) to avoid
    invisible-text flashes.
18. **Image optimization.** Serve WebP/AVIF with JPEG fallback; the `img/*.jpg`
    files are likely larger than they need to be.
19. **SPA content visibility.** Non-active sections are `display:none`, so
    crawlers and screen readers may miss them. Consider keeping content in the DOM
    and accessible, or pre-render. At minimum add a `<noscript>` fallback.

## Tier 3 — GodMode features (the differentiators)

20. **Serverless contact form as a portfolio piece.** API Gateway → Lambda → SES,
    with a Terraform module in your repo and a short write-up. It fixes the dead
    form *and* demonstrates exactly the skills you're selling. Highest-leverage
    single item here.
21. **Security headers via CloudFront Response Headers Policy:** CSP, HSTS,
    `X-Content-Type-Options`, `Referrer-Policy`. Cheap, and a security-minded
    recruiter will notice (add a Mozilla Observatory / securityheaders.com badge).
22. **PWA / offline.** You already ship `site.webmanifest`. Add a service worker
    for offline access and installability — a slick, on-brand touch for a cloud
    engineer.
23. **Live dev.to blog feed.** Pull your latest posts from the dev.to API at build
    or runtime so the Blogs section updates itself instead of being hand-maintained.
24. **Project filtering + deeper case studies.** Tag projects (AWS / Linux / Data /
    Automation) with filter chips, and expand 1–2 write-ups into full
    problem→architecture→outcome case studies with diagrams. Depth > breadth.
25. **Privacy-friendly analytics** (Plausible, or Cloudflare Web Analytics) so you
    can see which projects and articles actually land.
26. **An interactive "architecture" centerpiece.** A small animated diagram of the
    site's own AWS stack (S3 + CloudFront + Route 53 + ACM + GitHub Actions) on the
    homepage — shows, doesn't tell.

## Tier 4 — Engineering / pipeline maturity

27. **Pin GitHub Actions to versions/SHAs.** `cicd.yml` uses
    `actions/checkout@master` and `jakejarvis/s3-sync-action@master`. Floating
    `@master` can break or be compromised — pin to a release tag or commit SHA.
28. **Add quality gates to CI:** HTML validation, link checking, and Lighthouse CI
    (perf/SEO/a11y budgets) on every push. Great signal *and* it keeps the site
    healthy.
29. **Set cache headers on sync.** Long-cache hashed assets, short-cache HTML, so
    repeat visits are instant and deploys still go live immediately (you already
    invalidate CloudFront).
30. **Asset fingerprinting + minify** CSS/JS in the pipeline so cache-busting is
    automatic (no more hard-refresh after a CSS change like the skill bars).

---

### Suggested order of attack
Tier 0 (fixes) → #8, #10, #11 (quick credibility wins) → #20 (serverless form) →
#13–15 (SEO) → #21–22 (security/PWA). That sequence fixes what's broken, adds the
features recruiters notice, and turns the site itself into evidence of your skills.
