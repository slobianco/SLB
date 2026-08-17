# Implementation Plan: Cielo Rojo Website (Phased)

> This document is the canonical, versioned copy of the phased implementation plan. It was
> originally drafted during planning and is reproduced here so it lives in the repository
> itself rather than only in tooling-specific memory/notes.

## TL;DR

Build a bilingual (en/es), light/dark-themed, Metallica-inspired band website for the album
"Cielo Rojo" using Next.js App Router + TypeScript + CSS Modules/custom properties. Content
(bio, lyrics, tour dates, merch, news) lives in a file-based content layer (MDX/JSON) behind
typed data accessors, so it can later be swapped for a real CMS/API without touching UI code.
Delivered in 9 phases (0–8), each independently verifiable, with docs/versioning set up from
day one (Phase 0) rather than bolted on later.

## Phases & Steps

### Phase 0 — Bootstrap & Engineering Foundations

1. Scaffold Next.js (App Router, TypeScript) project via `create-next-app`. ✅
2. Configure ESLint, Prettier, EditorConfig, strict `tsconfig.json`. ✅
3. Set up Husky + lint-staged (pre-commit lint/format) and commitlint (Conventional Commits). ✅
4. Set up Changesets for SemVer + automated `CHANGELOG.md`. ✅
5. Create GitHub Actions CI workflow: install → lint → typecheck → build on PR + push to main. ✅
6. Create `docs/` skeleton + ADR template; write ADR 0001 (Next.js App Router), ADR 0002
   (CSS Modules over UI kit), ADR 0003 (file-based content layer) capturing decisions
   already made. ✅ _(this step)_
7. Connect repo to Vercel for automatic PR preview deployments. ⏳ _(requires account access —
   see Phase 0.7 handoff notes)_

- Deliverable: running Next.js app, green CI, "coming soon" placeholder live on a Vercel preview URL.

### Phase 1 — Design System & Theming (_parallel with Phase 2_)

1. Define design tokens in `styles/tokens.css` (spacing, radii, fonts, shadows, breakpoints).
2. Implement `styles/theme-dark.css` (default, Metallica-like: near-black bg, blood-red accent,
   steel-silver secondary) and `styles/theme-light.css` (off-white bg, deep red accent, charcoal text).
3. Build `ThemeProvider` + `ThemeToggle` — toggles `data-theme` attribute on `<html>`, persists
   choice to `localStorage`, defaults to `prefers-color-scheme` on first visit.
4. Set up typography via `next/font` (bold condensed display font for headings + readable body font).
5. Build base UI primitives in `components/ui/`: `Button`, `Section`, `Card`, `Badge`, `Container`.

- Deliverable: `/design-system` internal route showing all tokens/components rendered in both themes.

### Phase 2 — Internationalization Infrastructure (_parallel with Phase 1_)

1. Install/configure `next-intl` with `[locale]` segment routing + middleware (default `en`,
   add `es`; structure supports adding more locales later).
2. Create dictionaries structure (`messages/en.json`, `messages/es.json`).
3. Build `LanguageSwitcher` component.
4. Wire locale-aware `metadata` (title/description/OpenGraph) per route for SEO.

- Deliverable: `/en` and `/es` both render root layout correctly; switching language preserves current route.

### Phase 3 — Core Layout & Navigation Shell (_depends on Phase 1 + 2_)

1. Build `Header` (logo, nav links, `LanguageSwitcher`, `ThemeToggle`) and `Footer` (social
   icons, quick links, copyright).
2. Responsive mobile nav (hamburger/drawer).
3. Apply global layout wrapper across all `[locale]` routes.

- Deliverable: consistent, responsive header/footer across every route, both themes, both locales.

### Phase 4 — Content Layer & Data Model (_parallel with Phases 1–3_)

1. Define TypeScript types/schemas: `Song`, `TourDate`, `MerchItem`, `NewsPost`, `BioContent`.
2. Create `content/` structure with bilingual placeholder MDX/JSON:
   `content/bio/{en,es}.mdx`, `content/lyrics/{track-slug}/{en,es}.mdx`,
   `content/news/{slug}/{en,es}.mdx`, `content/tour-dates.json`, `content/merch.json`,
   `content/social-links.json`.
3. Implement `lib/data/*.ts` accessors (`getSongs`, `getTourDates`, `getMerch`, `getNews`, `getBio`)
   using `gray-matter` + `react-markdown`/`remark-gfm` (see ADR 0003) — this is the swap point
   for a future CMS/API.

- Deliverable: typed accessors return placeholder content; covered by unit tests (Vitest/Jest).

### Phase 5 — Page Implementation (_depends on Phase 3 + 4; sub-steps independent of each other_)

1. Home — hero (album art/photo), featured track, latest news teaser, next tour date teaser.
2. Biography — renders bio MDX + photo gallery.
3. Album & Lyrics — track list page + `[track]` dynamic route (lyrics viewer + embedded
   Spotify/Bandcamp/SoundCloud player).
4. Tour — upcoming/past list with filter, ticket links.
5. Merch — product grid, external purchase links (showcase-only per current decision).
6. News — list page + `[slug]` article page.
7. Contact/Social — social icons grid; static contact form (e.g. Formspree, no backend needed).

- Deliverable: all 7 sections navigable, populated with placeholder content, responsive, both themes/locales.

### Phase 6 — Documentation Completion

1. Finalize `docs/ARCHITECTURE.md` (system diagram, folder structure, data flow).
2. Write `docs/CONTENT-GUIDE.md` — step-by-step for adding a song/tour date/news post/merch
   item without touching component code.
3. Write `README.md` (setup, dev, build, deploy instructions).
4. Cut first Changesets release entry summarizing v0.x work into `CHANGELOG.md`.

- Deliverable: a stranger can clone the repo and run it locally in under 5 minutes using only the README.

### Phase 7 — QA: Accessibility, Performance, SEO (_depends on Phase 5_)

1. Run axe + Lighthouse audits on both themes and both locales.
2. Verify WCAG 2.1 AA contrast, keyboard nav, visible focus states, `prefers-reduced-motion` support.
3. Add sitemap.xml, robots.txt, OpenGraph images, JSON-LD structured data (`MusicGroup`/`MusicAlbum`).
4. Performance pass: `next/image` usage audit, font subsetting, bundle analysis, remove unused CSS.

- Deliverable: Lighthouse ≥90 in Performance/Accessibility/Best Practices/SEO; zero critical axe violations.

### Phase 8 — Deployment & Launch (_depends on Phase 7_)

1. Configure production environment variables on Vercel.
2. Connect custom domain (pending user-provided domain name).
3. Final smoke test on production URL (all routes, both locales/themes, all external links).
4. Tag `v1.0.0`, publish final CHANGELOG entry.

- Deliverable: live public site at production domain.

## Relevant Files

- `app/[locale]/**` — all routes (layout.tsx, page.tsx per section, dynamic `[track]`/`[slug]`)
- `components/layout/{Header,Footer,LanguageSwitcher,ThemeToggle}.tsx`
- `components/ui/{Button,Section,Card,Badge,Container}.tsx`
- `components/{album,tour,merch,news}/*` — section-specific components
- `content/**` — MDX/JSON placeholder content (bilingual)
- `lib/data/*.ts` — typed content accessors (the CMS-swap seam)
- `lib/theme/ThemeProvider.tsx`, `lib/i18n/*`
- `styles/{tokens,theme-dark,theme-light}.css`
- `docs/ARCHITECTURE.md`, `docs/CONTENT-GUIDE.md`, `docs/adr/000X-*.md`
- `README.md`, `CHANGELOG.md`
- `.github/workflows/ci.yml`

## Verification

- **Automated**: CI pipeline (format + lint + typecheck + build) green on every PR; unit tests
  for `lib/data/*` accessors; Lighthouse ≥90 across categories; axe-core scan with zero critical
  violations.
- **Manual**: cross-browser check (Chrome/Firefox/Safari), mobile device check (iOS/Android
  widths), toggle both themes on every page, switch both locales on every page, click every
  external link (streaming, merch, social, ticket links) to confirm they resolve, user
  proofreads placeholder content before Phase 8 launch.

## Decisions

- Framework: Next.js App Router + TypeScript. Styling: CSS Modules + CSS custom properties (no UI kit).
- Languages: en (default) + es, structured for easy extension.
- Merch: showcase-only grid linking externally (no checkout) for v1.
- Music: embedded streaming players + on-site lyrics pages (no self-hosted audio for v1).
- Tour dates/news: file-based content (JSON/MDX) behind a data-access layer, not a hosted CMS, for v1.
- Hosting: Vercel. Versioning: Conventional Commits + Changesets + SemVer + ADRs.

## Further Considerations

1. Merch checkout depth — showcase-only (current default) vs. embedded store (Shopify Buy
   Button) vs. full cart/checkout. Recommendation: ship showcase-only for v1.0.0, revisit as a
   v1.x enhancement once real merch/vendor is decided.
2. Real content readiness — bio, lyrics, tour dates, photos, socials, release date, domain name
   are still placeholders (draft placeholder content already exists, pending transcription into
   `content/` in Phase 4). Recommendation: proceed with Phases 0–7 using placeholders now; swap
   in real content just before Phase 8 (Deployment & Launch) so building isn't blocked.
3. Additional languages beyond en/es — none requested yet; architecture (Phase 2) already
   supports adding locales cheaply later, so no action needed now.
