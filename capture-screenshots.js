/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Screenshot capture script for portfolio projects
 * Run: node capture-screenshots.js
 *
 * This requires puppeteer (kept out of devDependencies to speed up CI/installs).
 * Install temporarily on demand with:
 * npm install --no-save puppeteer
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const websites = [
  {
    url: 'https://nikopastore.github.io/agent-memory-site/',
    filename: 'agentmemorysite.png',
  },
  {
    url: 'https://sdhomepros.app/',
    filename: 'sdhomepros.png',
  },
  {
    url: 'https://www.nationalplanninggroup.com/',
    filename: 'nationalplanninggroup.png',
  },
  {
    url: 'https://trysitepilot.com/',
    filename: 'sitepilot.png',
  },
  {
    url: 'https://sipwiki.app/',
    filename: 'sipwiki.png',
  },
  {
    url: 'https://www.elementarystateofmind.com/',
    filename: 'elementarystateofmind.png',
  },
];

async function captureScreenshots() {
  const screenshotsDir = path.join(__dirname, 'public', 'screenshots');

  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: {
      width: 1440,
      height: 810,
    },
  });

  for (const site of websites) {
    console.log(`Capturing screenshot of ${site.url}...`);

    const page = await browser.newPage();

    try {
      await page.goto(site.url, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      const screenshotPath = path.join(screenshotsDir, site.filename);
      await page.screenshot({
        path: screenshotPath,
        fullPage: false,
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
