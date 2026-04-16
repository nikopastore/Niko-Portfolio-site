# Hermes Blog Engine Status

Last verified: 2026-04-13
Owner: Hermes
Remote: https://github.com/nikopastore/Niko-Portfolio-site.git
Local working clone: /Users/jarvis/hermes-workspaces/Niko-Portfolio-site

## What I verified

- Cloned the live portfolio repo into a Hermes-owned workspace.
- Installed dependencies with `npm install`.
- Verified production build passes with `npm run build`.
- Confirmed blog content is sourced from `src/content/blog/*.mdx`.
- Confirmed blog feed exists at `src/app/blog/feed.xml/route.ts`.
- Confirmed live post schema in current repo uses:
  - `title`
  - `description`
  - `publishedAt`
  - `tags`
  - `image`

## Important findings

1. The old local path `~/nikopastore-portfolio/` is only a content mirror, not a full git repo.
2. The real publishing repo is `~/hermes-workspaces/Niko-Portfolio-site/` for Hermes operations.
3. The older OpenClaw blog skill had stale path assumptions; it has been updated.
4. `npm run lint` still fails on unrelated existing repo issues outside the blog publishing path, but `npm run build` passes and the blog engine itself is operational.

## Current publish workflow

1. Create/update an MDX post in `src/content/blog/`.
2. Add any images under `src/content/blog/images/`.
3. Run `npm run build` to verify.
4. Commit and push to `main`.
5. Vercel auto-deploys from the GitHub repo.

## Immediate next step for Hermes

Use this repo as the canonical blog publishing engine going forward and stop relying on the partial mirror at `~/nikopastore-portfolio/`.
