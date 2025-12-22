/**
 * Screenshot capture script for portfolio projects
 * Run: node capture-screenshots.js
 *
 * This requires puppeteer. Install with:
 * npm install --save-dev puppeteer
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const websites = [
  {
    url: 'https://hirepriority.scalepilotlabs.com/',
    filename: 'hirepriority.png',
  },
  {
    url: 'https://www.sipwiki.app/',
    filename: 'sipwiki.png',
  },
];

async function captureScreenshots() {
  const screenshotsDir = path.join(__dirname, 'public', 'screenshots');

  // Ensure screenshots directory exists
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  for (const site of websites) {
    console.log(`Capturing screenshot of ${site.url}...`);

    const page = await browser.newPage();

    try {
      // Navigate to the page
      await page.goto(site.url, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Wait a bit for any animations to complete
      await page.waitForTimeout(2000);

      // Take screenshot
      const screenshotPath = path.join(screenshotsDir, site.filename);
      await page.screenshot({
        path: screenshotPath,
        fullPage: false, // Just capture the viewport (above the fold)
        type: 'png',
      });

      console.log(`✓ Saved screenshot to ${screenshotPath}`);
    } catch (error) {
      console.error(`✗ Failed to capture ${site.url}:`, error.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\nAll screenshots captured successfully!');
}

captureScreenshots().catch(console.error);
