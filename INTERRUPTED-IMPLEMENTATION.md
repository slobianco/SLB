# Cielo Rojo — Implementation Handoff

**Snapshot:** 2026-08-17. **Current milestone:** Phases 1–5 complete and locally verified.

## Current status

The Cielo Rojo website prototype is implemented. It is no longer the default Next.js starter.

- Phase 0 steps 1–6 remain complete. Step 7 (connect Vercel) still requires the user's account.
- Phase 1 is complete: tokens, light/dark themes, persisted theme control, typography, UI
  primitives, and the localized `/design-system` reference route.
- Phase 2 is complete: `next-intl`, `/en` and `/es` routing, locale-preserving navigation,
  bilingual dictionaries, middleware, and localized metadata.
- Phase 3 is complete: responsive header, mobile drawer, language/theme controls, footer, and
  locale-aware navigation across every route.
- Phase 4 is complete: typed MDX/JSON content layer, strict accessors, safe slug handling, and
  Vitest coverage.
- Phase 5 is complete: Home, Biography, Album/Lyrics, Tour, Merch, News, and Contact pages in
  both languages, including all dynamic lyric and article routes.

## Preview locally

Patch PATH in a fresh terminal if VS Code has not been restarted:

```powershell
$env:PATH = "C:\Program Files\Git\cmd;$env:LOCALAPPDATA\Programs\nodejs;" + $env:PATH
npm run dev
```

Open `http://localhost:3000`. Middleware redirects to the preferred locale (`/en` by default).

Useful routes:

- `/en` and `/es`
- `/en/biography`, `/en/album`, `/en/tour`, `/en/merch`, `/en/news`, `/en/contact`
- `/en/album/cielo-rojo` and `/es/album/renacer`
- `/en/news/album-arrives` and `/es/news/behind-the-music`
- `/en/design-system` and `/es/design-system`

## Verified checks

- `npm test`: 7/7 content accessor tests pass.
- `npm run typecheck`: passes with no diagnostics.
- `npm run lint`: passes with zero errors; one pre-existing warning remains in
  `commitlint.config.mjs` (`import/no-anonymous-default-export`).
- `npm run format:check`: passes.
- `npm run build`: passes with no warnings and generates 46 static pages.
- Desktop Playwright crawl: 20 routes, all HTTP 200, no overflow, broken images, or runtime
  errors.
- Mobile Playwright crawl at 390×844: 18 routes, all HTTP 200, no overflow, clipped H1 text,
  broken images, or runtime errors.
- Interactions verified: responsive drawer, locale preservation on dynamic routes, persistent
  theme selection, tour filtering, and contact-form prototype state.

## Placeholder content warning

The current biography, lyrics, news, tour dates, prices, contact addresses, social destinations,
photography, album art, and merch mockups are prototype content. Replace them with the artist's
real material before launch. Temporary visual sources are documented in
`public/images/README.md`.

## Remaining work

- Phase 0.7: connect GitHub to Vercel using the user's account.
- Phase 6: finalize architecture/content documentation, replace the starter README, and prepare
  release notes/changelog.
- Phase 7: formal axe and Lighthouse audits, sitemap/robots/JSON-LD, final performance and SEO
  work.
- Phase 8: production environment, real domain, content sign-off, deployment smoke test, and
  release tag.

## Git handoff

The Phase 1–5 implementation is intentionally uncommitted. Review the local prototype first.
When approved, create a Conventional Commit (for example,
`feat: build bilingual Cielo Rojo website prototype`) and push it to the remote.
