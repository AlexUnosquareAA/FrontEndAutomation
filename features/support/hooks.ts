import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, } from '@playwright/test';
import type { ChromiumBrowser, BrowserContext } from '@playwright/test';

// Global variables to control browser's lifecycle. 
let browser: ChromiumBrowser;
let context: BrowserContext;

// It executes ONCE before all tests in the suite start 
BeforeAll(async function () {
    browser = await chromium.launch({ 
        headless: false, // Change it to true if we don't want to see the browser open 
        slowMo: 100      // Add a little of delay so we can see the actions. 
    });
});

// It executes Before each scenario
Before(async function () {
    // 1. Create an isolated context and a new page. 
    context = await browser.newContext();
    this.page = await context.newPage(); // Save 'page' in 'World Context' of cucumber 
    
    // 2. Optional: Max the window 
    await this.page.setViewportSize({ width: 1280, height: 720 });
});

// It executes after each scenario
After(async function (scenario) {
    // 1. Take a screenshot automatically if the test failed
    if (scenario.result?.status === Status.FAILED) {
        const screenshot = await this.page.screenshot();
        await this.attach(screenshot, 'image/png'); // Attach the picture to Cucumber's report.
    }

    // 2. Clean: Close page and context so we don't have unfinished processes. 
    await this.page.close();
    await context.close();
});

// It is executed only ONE TIME when all test has been completed.
AfterAll(async function () {
    await browser.close();
});