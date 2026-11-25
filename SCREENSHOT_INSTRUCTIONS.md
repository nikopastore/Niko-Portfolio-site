# Screenshot Capture Instructions

Use `capture-screenshots.js` (or headless Chrome) to capture fresh 16:9 screenshots of the live portfolio sites.

## Option 1: Automated Script (Recommended)

1. Temporarily install Puppeteer:
   ```bash
   npm install --no-save puppeteer
   ```

2. Run the screenshot capture script:
   ```bash
   node capture-screenshots.js
   ```

This captures all configured sites and saves them to `public/screenshots/`.

## Option 2: Manual Screenshot Capture

1. Open each website in your browser at 1440x810 (16:9):
   - https://nikopastore.github.io/agent-memory-site/
   - https://sdhomepros.app/
   - https://www.nationalplanninggroup.com/
   - https://trysitepilot.com/
   - https://sipwiki.app/
   - https://www.elementarystateofmind.com/

2. Save the screenshots as:
   - `public/screenshots/agentmemorysite.png`
   - `public/screenshots/sdhomepros.png`
   - `public/screenshots/nationalplanninggroup.png`
   - `public/screenshots/sitepilot.png`
   - `public/screenshots/sipwiki.png`
   - `public/screenshots/elementarystateofmind.png`

## Notes

- `src/lib/data.ts` maps each live project to its canonical URL and screenshot in `public/screenshots/`.
- `src/components/WorksGrid.tsx` renders each screenshot in a `16:9` (`aspect-video`) frame with a `"Visit Site"` link when `url` is present.
