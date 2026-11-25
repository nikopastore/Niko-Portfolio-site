# Niko Pastore portfolio

The portfolio and engineering blog for Niko Pastore, built with Next.js 16, React 19, TypeScript, MDX (`remark-gfm` + `rehype-pretty-code`), Tailwind CSS v4, and Matter.js.

## Local development

Use Node.js 20 or newer, install dependencies, and start the dev server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Verification scripts:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run start
```

## Project structure

- `src/app/page.tsx` — Server Component homepage composition
- `src/app/opengraph-image.tsx` — Dynamic Open Graph image generator
- `src/app/blog/` — Blog index (`BlogExplorer` search + tag filter), `[slug]` MDX pages, and `feed.xml`
- `src/app/llms.txt/route.ts` — Machine-readable summary of projects, resources, and posts
- `src/lib/data.ts` — Site configuration, feature flags, selected works, apps, experience, and teaching items
- `src/lib/blog.ts` — MDX compilation (`remark-gfm` + Shiki via `rehype-pretty-code`) and slug validation
- `src/content/blog/` — 35 MDX posts (post assets live in `public/blog/images/` and `public/blog/generated/`)
- `src/components/` — UI sections, Matter.js `PhysicsCanvas`, MDX components, and interactive flows
- `src/app/api/` — Optional comments and newsletter endpoints (gated behind `siteConfig` feature flags)
- `tests/` — Node test suite validating content, asset paths, security headers, and route hygiene

## Feature flags & environment

`siteConfig` in `src/lib/data.ts` controls optional features (`enableTraining`, `enableDiscord`, `enableNewsletter`, `enableComments`). Comments and newsletter routes store local dev data under `data/runtime/` (gitignored; ephemeral in serverless hosting, so `enableComments` and `enableNewsletter` stay `false` until backed by persistent storage). Set `ADMIN_API_KEY` in the deployment environment before calling `/api/comments/approve`.

Deployments run on Vercel from `main`. Keep `siteConfig.url` in `src/lib/data.ts` in sync with the canonical production host.
