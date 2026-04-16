# Hermes Blog Workflow

Last updated: 2026-04-13

## Publishing policy

- Hermes may research, outline, draft, revise, and prepare blog posts.
- Hermes may NOT publish blog posts live without explicit user approval.
- Hermes may NOT push blog-post content to `main` until the user approves that specific post.

## Canonical repo

- Working repo: `/Users/jarvis/hermes-workspaces/Niko-Portfolio-site`
- Live deploy source: GitHub repo `nikopastore/Niko-Portfolio-site`

## Safe workflow

1. Draft posts under `docs/blog-drafts/` until approved.
2. After approval, convert draft into `src/content/blog/<slug>.mdx`.
3. Add images under `src/content/blog/images/`.
4. Run `npm run build`.
5. Commit and push only after approval.

## Recurring automation rules

- Recurring jobs may propose ideas, outlines, and draft candidates.
- Recurring jobs may audit the content backlog and repo health.
- Recurring jobs must never publish or request external posting.
