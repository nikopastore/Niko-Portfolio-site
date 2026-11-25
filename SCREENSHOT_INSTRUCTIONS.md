# Screenshot Capture Instructions

Use `capture-screenshots.js` to capture fresh screenshots of the live portfolio sites.

## Option 1: Automated Script (Recommended)

1. Install Puppeteer:
   ```bash
   npm install --save-dev puppeteer
   ```

2. Run the screenshot capture script:
   ```bash
   node capture-screenshots.js
   ```

This will automatically capture the configured sites and save them to `public/screenshots/`.

## Option 2: Manual Screenshot Capture

If you prefer to capture screenshots manually:

1. Open each website in your browser:
   - https://sdhomepros.app/
   - https://sipwiki.app/
   - https://www.elementarystateofmind.com/
   - https://www.nationalplanninggroup.com/

2. Set your browser window to 1920x1080 resolution

3. Take a clean screenshot of the homepage (above the fold)

4. Save the screenshots as:
   - `public/screenshots/sdhomepros.png`
   - `public/screenshots/sipwiki.png`
   - `public/screenshots/elementarystateofmind.png`
   - `public/screenshots/nationalplanninggroup.png`

## What Is Configured

- `src/lib/data.ts` maps each live project to its canonical URL and screenshot in `public/screenshots/`
- `src/components/WorksGrid.tsx` renders each screenshot and a "Visit Site" link when `url` is present

You can delete this file and `capture-screenshots.js` once you're done!
