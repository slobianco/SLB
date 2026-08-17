# Content Guide

> Status: draft skeleton created in Phase 0.6, based on the planned content model. Will be
> finalized in Phase 6 once `content/` and `lib/data/` exist (Phase 4). Until then, treat the
> paths below as the target structure, not yet present in the repo.

This guide is for adding/editing site content **without writing any component code**. All
content lives under `content/` as Markdown/MDX (with frontmatter) or JSON, and is bilingual
(English `en` + Spanish `es`) unless noted.

## Add or edit the biography

Edit:

- `content/bio/en.mdx`
- `content/bio/es.mdx`

Frontmatter fields: `title`, `updatedAt`. Body is Markdown (GitHub-flavored).

## Add a new song (lyrics + metadata)

1. Pick a URL-safe slug, e.g. `cielo-rojo` for the title track.
2. Create `content/lyrics/<slug>/en.mdx` and `content/lyrics/<slug>/es.mdx` with frontmatter:
   ```yaml
   ---
   title: 'Cielo Rojo'
   trackNumber: 2
   duration: '5:14'
   streamingLinks:
     spotify: ''
     bandcamp: ''
     youtube: ''
   ---
   ```
   Followed by the lyrics as Markdown body.
3. The track list page and `[track]` route pick up new songs automatically once
   `lib/data/getSongs.ts` exists (Phase 4) — no code changes needed.

## Add or update a tour date

Edit `content/tour-dates.json` — an array of objects:

```json
{
  "date": "2026-10-03",
  "city": "Mexico City",
  "country": "MX",
  "venue": "Foro Indie Rocks",
  "ticketUrl": "",
  "status": "on-sale"
}
```

`status` is one of `on-sale`, `coming-soon`, `sold-out`, `past`.

## Add or update a merch item

Edit `content/merch.json` — an array of objects:

```json
{
  "name": "Tour T-Shirt",
  "variant": "Black, front/back print",
  "priceUsd": 28,
  "image": "/images/merch/tshirt-black.jpg",
  "purchaseUrl": "",
  "category": "apparel"
}
```

## Add a news post

Create `content/news/<slug>/en.mdx` and `content/news/<slug>/es.mdx` with frontmatter:

```yaml
---
title: 'Cielo Rojo: The Album Has Arrived'
publishedAt: '2026-10-01'
coverImage: '/images/news/release-day.jpg'
---
```

Followed by the post body as Markdown.

## Update social links

Edit `content/social-links.json`:

```json
{
  "instagram": "",
  "youtube": "",
  "spotify": "",
  "bandcamp": "",
  "tiktok": "",
  "facebook": "",
  "twitter": ""
}
```

## Publishing

Content changes go through the same git workflow as code: commit with a Conventional Commit
message (e.g. `content: add Ecos del Silencio lyrics`), push, open a PR — CI (format/lint/
typecheck/build) validates the change, and Vercel builds a preview deploy automatically.
