# ADR 0003: File-based content layer (gray-matter + react-markdown) instead of a hosted CMS

## Status

Accepted (superseding the originally-proposed `next-mdx-remote`/Contentlayer approach — see
Amendment below)

## Context

The site needs an editable content model for bio, per-song lyrics, tour dates, merch, and news —
content that the artist (non-developer-facing, but comfortable editing files in this repo) will
update far more often than the code changes. A hosted headless CMS (Sanity, Contentlayer,
Strapi) would add an external service dependency, accounts, and API keys for what is, at v1,
static and infrequently updated content.

## Decision

Store content as version-controlled files in `content/` (Markdown/MDX with frontmatter for
lyrics/bio/news, plain JSON for structured lists like tour dates/merch/social links), parsed via
`gray-matter` (frontmatter) and rendered via `react-markdown` + `remark-gfm` (GitHub-flavored
Markdown). All access goes through typed accessor functions in `lib/data/*.ts`
(`getSongs`, `getTourDates`, `getMerch`, `getNews`, `getBio`).

## Rationale

- No external service/account/API key needed to ship v1 — content lives in git, versioned and
  reviewable like code.
- `lib/data/*.ts` is the deliberate seam: if/when real editorial workflows demand a hosted CMS
  or the Bandsintown API for tour dates, only these accessor functions change — no UI/component
  code needs to change.
- `gray-matter` + `react-markdown` is a lighter dependency footprint than Contentlayer for a
  single-contributor, non-monorepo project.

## Amendment (recorded during Phase 0 implementation)

The original plan draft mentioned `next-mdx-remote` or Contentlayer as the likely rendering
approach. During bootstrap, `gray-matter` + `react-markdown` + `remark-gfm` were installed
instead — a simpler combination that avoids Contentlayer's build-time codegen step and
`next-mdx-remote`'s server-component streaming API, at the cost of slightly less rich MDX
(no embedding custom interactive React components directly inside content files, only
standard Markdown + GFM). This is an acceptable trade-off for content that is prose/lyrics/lists,
not interactive.

## Alternatives Considered

- **Contentlayer**: rejected for v1 — extra build step/codegen, more moving parts than needed.
- **Sanity / Strapi (hosted CMS)**: rejected for v1 — external account + API keys + hosting cost
  for content that changes infrequently; revisit if/when non-technical collaborators need a
  web-based editing UI.
- **Bandsintown/Songkick embed for tour dates**: rejected for v1 — adds a third-party runtime
  dependency and less control over styling; the `lib/data/getTourDates.ts` seam allows adopting
  this later without touching the Tour page component.

## Consequences

- Adding a new song, tour date, merch item, or news post is a file-editing task (documented in
  `docs/CONTENT-GUIDE.md`), not a deploy-blocking code change — but it still requires a git
  commit + redeploy (no live/instant editing without a rebuild).
