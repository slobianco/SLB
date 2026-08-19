# Cielo Rojo — Implementation Handoff

**Snapshot:** 2026-08-18 (updated same day: real lyrics, album artwork, and logo added). **Current
milestone:** Authentic project context and approved tracklist integrated; real lyrics and
artwork now in place.

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
- Phase 5 layouts are complete: Home, Biography, Album/Lyrics, Tour, Merch, News, and Contact
  pages in both languages. The 11 approved track titles/order are integrated. Missing biography,
  lyrics, tour, merch, news, contact, and social content uses explicit TODO or empty states.

The authoritative creative/content rules live in `docs/PROJECT-CONTEXT.md` and are linked from
`AGENTS.md`.

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
- `/en/album/silent-memory` and `/es/album/ansiedad`
- `/en/design-system` and `/es/design-system`

## Verified checks

- `npm test`: 8/8 content accessor tests pass.
- `npm run typecheck`: passes with no diagnostics.
- `npm run lint`: passes with zero errors; one pre-existing warning remains in
  `commitlint.config.mjs` (`import/no-anonymous-default-export`).
- `npm run format:check`: passes.
- `npm run build`: passes and generates 42 static pages, including 22 localized track pages.
- English/Spanish album track order verified in-browser.
- Dynamic locale switching verified on `/album/silent-memory`.
- Tour, Merch, News, Contact, and Biography empty/TODO states verified in both languages at
  390×844 with no horizontal overflow or runtime errors.

## Content status

Approved and integrated:

- Public artist identity: Santiago Lo Bianco.
- Album title: Cielo Rojo.
- Authoritative 11-track order and untranslated titles.
- Project narrative, visual direction, content rules, and technical priorities in
  `docs/PROJECT-CONTEXT.md`.
- Real lyrics for all 11 tracks (identical text in `en.mdx`/`es.mdx` per Santiago — the songs are
  not translated between languages).
- Real front and back album cover artwork (`public/images/album/cielo-rojo-cover.png` and
  `cielo-rojo-back-cover.png`), replacing the old placeholder mockup.
- Band logo (`public/images/branding/slb-logo.png`), shown in the site header.

Still awaiting approved material:

- Biography and artist photography.
- Track durations and streaming links (Spotify/Bandcamp/YouTube) per song — frontmatter fields
  exist and are empty.
- Track descriptions, Echoes, and credits.
- Tour dates, merchandise, news, contact details, and social links.

Temporary concept images (photography, merch mockups) remain clearly labelled as placeholders in
alt text and are documented in `public/images/README.md`.

## Remaining work

- Add streaming links and durations for each of the 11 songs (smallest remaining album-section gap).
- Replace TODO and empty states progressively as Santiago provides approved material (biography,
  tour, merch, news, contact, social links).
- Replace remaining temporary imagery (hero/biography photography, merch mockups) with approved
  photography and product shots.
- Phase 0.7: connect GitHub to Vercel only when a public preview is wanted.
- Phase 6: finalize architecture/content documentation, replace the starter README, and prepare
  release notes/changelog.
- Phase 7: formal axe and Lighthouse audits, sitemap/robots/JSON-LD, final performance and SEO
  work.
- Phase 8: production environment, real domain, content sign-off, deployment smoke test, and
  release tag.

## Git handoff

The authentic-context/de-fabrication update is currently uncommitted. Review the local prototype
first. When approved, create a Conventional Commit such as
`content: replace prototype fiction with approved project context` and push it to the remote.
