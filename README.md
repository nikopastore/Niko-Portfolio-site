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

- `src/app/page.tsx` — Server Component homepage composition (7 selected projects, teaching showcase, experience, contact)
- `src/app/opengraph-image.tsx` — Dynamic Open Graph image generator
- `src/app/blog/` — Blog index (`BlogExplorer` search + tag filter), `[slug]` MDX pages, and `feed.xml`
- `src/app/llms.txt/route.ts` — Machine-readable summary of projects, resources, and posts
- `src/lib/data.ts` — Site configuration, feature flags, selected works, experience, and teaching items
- `src/lib/blog.ts` — MDX compilation (`remark-gfm` + Shiki via `rehype-pretty-code`) and slug validation
- `src/content/blog/` — 35 MDX posts (post assets live in `public/blog/images/` and `public/blog/generated/`)
- `src/components/` — UI sections, Matter.js `PhysicsCanvas`, MDX components, and `HireNikoCTA` modal
- `src/app/api/` — Contact (`/api/contact` via Resend with `mailto:` fallback) plus optional comments/newsletter endpoints
- `tests/` — Node test suite validating content, asset paths, pillar AEO metadata, security headers, and route hygiene

## Environment variables & feature flags

- **Contact form (`/api/contact`)**: Set `RESEND_API_KEY` (and optionally `CONTACT_FROM_EMAIL`, defaulting to `onboarding@resend.dev`) in Vercel environment variables for direct inbox delivery; when unset, `HireNikoCTA` falls back to `mailto:` and `"Copy brief"`.
- **Analytics**: `@vercel/analytics` and `@vercel/speed-insights` are mounted in `src/app/layout.tsx` and allowed by CSP in `next.config.ts`.
- **Feature flags**: `siteConfig` in `src/lib/data.ts` controls `enableTraining`, `enableDiscord`, `enableNewsletter`, and `enableComments`. Comments and newsletter routes persist locally under `data/runtime/` (gitignored; ephemeral in serverless hosting, so `enableComments` and `enableNewsletter` stay `false` until backed by durable storage). Set `ADMIN_API_KEY` before using `/api/comments/approve`.

Deployments run on Vercel from `main`. Keep `siteConfig.url` in `src/lib/data.ts` in sync with the canonical production host.
