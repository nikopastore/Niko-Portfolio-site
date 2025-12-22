# Screenshot Capture Instructions

I've updated the project data for HirePriority and SipWiki with their live URLs. Now you need to capture clean screenshots of the homepages.

## Option 1: Automated Script (Recommended)

1. Install Puppeteer:
   ```bash
   npm install --save-dev puppeteer
   ```

2. Run the screenshot capture script:
   ```bash
   node capture-screenshots.js
   ```

This will automatically capture both websites and save them to `public/screenshots/`.

## Option 2: Manual Screenshot Capture

If you prefer to capture screenshots manually:

1. Open each website in your browser:
   - https://hirepriority.scalepilotlabs.com/
   - https://www.sipwiki.app/

2. Set your browser window to 1920x1080 resolution

3. Take a clean screenshot of the homepage (above the fold)

4. Save the screenshots as:
   - `public/screenshots/hirepriority.png`
   - `public/screenshots/sipwiki.png`

## What I've Already Done

✅ Updated `src/lib/data.ts` to:
- Add `url: "https://hirepriority.scalepilotlabs.com/"` to HirePriority
- Add `url: "https://www.sipwiki.app/"` to SipWiki
- Changed image paths to `/screenshots/hirepriority.png` and `/screenshots/sipwiki.png`

✅ Created the `public/screenshots/` directory

✅ The WorksGrid component already supports the URL field and will show "Visit Site" buttons for these projects

## After Screenshots Are Captured

Once the screenshots are in place, the portfolio will automatically display:
- Clean screenshots of your live sites
- Working "Visit Site" buttons that open the projects in new tabs
- Professional presentation of your live work

You can delete this file and `capture-screenshots.js` once you're done!
