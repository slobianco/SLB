# ADR 0002: CSS Modules + CSS custom properties instead of a UI kit

## Status

Accepted

## Context

The site's look and feel is meant to be bespoke and bold (Metallica.com-inspired: dark, cinematic,
high-contrast typography), with a required light/dark theme toggle. Off-the-shelf component
libraries (MUI, Chakra, Bootstrap, etc.) impose their own visual language and typically require
significant override work to look distinctive rather than "generic dashboard."

## Decision

Use **CSS Modules** for component-scoped styles, plus a small set of **CSS custom properties**
(design tokens) for theming, rather than adopting a third-party UI component library.

## Rationale

- Full creative control over visual identity — no fighting a UI kit's default look.
- CSS custom properties make light/dark theming trivial: swap the token values under a
  `[data-theme="dark"|"light"]` attribute on `<html>`, no JS-in-CSS runtime needed.
- CSS Modules keep styles component-scoped (no global class name collisions) without adding a
  CSS-in-JS runtime dependency or build-time overhead.
- Smaller bundle size than pulling in a full component library for what is ultimately a
  content-focused marketing/fan site, not an app with complex interactive widgets.

## Alternatives Considered

- **Tailwind CSS**: fast to build with, but the utility-class approach fights against a small
  set of bespoke, reusable design tokens and can obscure the "band poster" visual identity
  under generic utility classes. Not chosen for v1; could be reconsidered later if velocity
  becomes a bigger concern than bespoke visual identity.
- **MUI / Chakra / Bootstrap**: rejected — strong opinionated visual language, harder to make
  look like a metal album/band site rather than a generic dashboard or SaaS product.

## Consequences

- We own more low-level styling work (no free component behaviors like modals, dropdowns) —
  base UI primitives (`Button`, `Card`, `Section`, `Badge`, `Container`) are hand-built in
  Phase 1 instead of imported.
- Consistency depends on discipline around using the shared design tokens rather than one-off
  magic values in component styles.
