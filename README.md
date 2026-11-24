# Niko Pastore portfolio

The portfolio and blog for Niko Pastore, built with Next.js, TypeScript, MDX, Tailwind CSS, and Framer Motion. The homepage presents selected product work, data engineering experience, apps, and a contact flow; the blog is sourced from `src/content/blog`.

## Local development

Use Node.js 20 or newer, then install dependencies and start the dev server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Other available scripts are:

```bash
npm run lint
npm run build
npm run start
```

The optional comments and newsletter endpoints store runtime data under `data/runtime`, which is intentionally gitignored. Set `ADMIN_API_KEY` in the deployment environment before using `/api/comments/approve`.

## Project structure

- `src/app/page.tsx` — homepage composition
- `src/lib/data.ts` — site identity, projects, apps, experience, and training content
- `src/content/blog` — MDX posts and post assets
- `src/components` — reusable sections and interactive UI
- `src/app/api` — comments and newsletter endpoints
- `public` — images and other static assets

Deployments can run directly on Vercel from the `main` branch. Keep the production URL in `src/lib/data.ts` in sync with the deployed domain so metadata, feeds, and the sitemap point at the right host.
