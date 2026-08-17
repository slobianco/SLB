# ADR 0001: Use Next.js App Router (TypeScript) as the framework

## Status

Accepted

## Context

The site needs to be public-facing, SEO-relevant (band/album discovery via search engines),
multilingual (English/Spanish), and content-heavy (bio, lyrics, tour dates, merch, news) while
still being built with React per the project requirements.

## Decision

Use **Next.js (App Router) with TypeScript** as the framework, scaffolded via `create-next-app`.

## Rationale

- Server-side rendering / static generation out of the box, which matters for SEO on a public
  band website (crawlable HTML, not a client-only SPA shell).
- File-system routing maps cleanly onto the site's sections (Home, Biography, Album & Lyrics,
  Tour, Merch, News, Contact) and onto locale-prefixed routes (`/en/...`, `/es/...`).
- First-class i18n routing support (works well with `next-intl`).
- Built-in image optimization (`next/image`) and font optimization (`next/font`), useful for a
  visually rich, photo/artwork-heavy site.
- Zero-config deployment to Vercel, including automatic PR preview deployments.
- TypeScript catches content-shape mistakes (e.g. malformed tour date objects) at build time.

## Alternatives Considered

- **Vite + React Router**: lighter, faster dev loop, simpler mental model — but weaker SEO
  out of the box (would need extra work for SSR/SSG) and no built-in i18n routing primitives.
- **Plain Create React App**: rejected — no longer actively maintained, SPA-only rendering.

## Consequences

- Slightly more framework "magic" (App Router conventions, server vs. client components) to
  learn/follow correctly.
- Ties hosting choice toward Vercel for the smoothest experience (still deployable elsewhere).
