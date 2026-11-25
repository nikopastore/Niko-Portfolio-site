# CLAUDE.md

Guidance for coding agents working in `Niko-Portfolio-site`.

## Project Overview

Minimalist portfolio and engineering blog for Niko Pastore (Data Engineer & AI Product Builder), built on Next.js 16 (App Router) and React 19:
- **Homepage** (`src/app/page.tsx`): Server-rendered composition with interactive Matter.js physics pills in `Hero`, alternating `WorksGrid`, `TrainingSection` (`TEACH`), `AppsSection` (auto-hidden when no app has a public `url`), `Experience`, `Contact`, `Footer`, and `HireNikoCTA`.
- **Blog & AEO** (`src/app/blog/`, `src/content/blog/*.mdx`): 35 MDX field notes compiled with `remark-gfm` + `rehype-pretty-code`, interactive client-side search and tag filtering (`BlogExplorer`), `BlogPosting` + `FAQPage` JSON-LD (`BlogJsonLd`), RSS feed (`/blog/feed.xml`), `/llms.txt`, and dynamic Open Graph image (`src/app/opengraph-image.tsx`).
- **Theme system**: Dark default + light mode toggle (`ThemeContext.tsx`), inline pre-hydration script in `src/app/layout.tsx` to avoid FOUC, and CSS variables in `src/app/globals.css`.

## Commands

```bash
npm run dev        # Start local dev server (localhost:3000)
npm run typecheck  # tsc --noEmit
npm run lint       # ESLint (eslint-config-next)
npm test           # Node integrity tests (tests/*.test.mjs)
npm run build      # Production Next.js build
npm run start      # Serve production build
```

## Key Files & Conventions

- `src/lib/data.ts`: Single source of truth for `siteConfig` (including `enableDiscord`, `enableNewsletter`, `enableComments`, `enableTraining`), `projects`, `apps`, `experiences`, `education`, and `training`.
- `src/lib/blog.ts`: Loads `src/content/blog/*.mdx`, validates slugs with `isValidSlug` (`/^[a-z0-9-]+$/`), and compiles MDX with `remark-gfm` and `rehype-pretty-code`.
- `public/blog/images/` and `public/blog/generated/`: Static blog image assets referenced via `/blog/...` paths in MDX frontmatter and body. Do **not** place images under `src/content/`.
- `next.config.ts`: Image optimization settings (`avif`/`webp`) and security response headers (`CSP`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `HSTS`).
- `src/components/PhysicsCanvas.tsx`: Client-only Matter.js canvas with responsive mobile scaling, `IntersectionObserver` pause/resume off-screen, timer cleanup, and `prefers-reduced-motion` fallback.
- `tests/site-integrity.test.mjs` & `.github/workflows/ci.yml`: Automated verification for asset existence, blog frontmatter/slugs, security headers, and route safety.
