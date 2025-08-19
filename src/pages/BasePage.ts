import { Page, Locator, FrameLocator, expect } from '@playwright/test';
import { testConfig } from '../config/test-config';
import { TIMEOUT } from 'dns';

export class BasePage {
    protected readonly page: Page;
    protected baseUrl: string;
    protected readonly mainFrame : FrameLocator;
    protected userLogout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = testConfig.baseUrl;
        this.mainFrame = page.frameLocator('iframe[name="framelive"]');
        this.userLogout = this.mainFrame.locator('.user-info .account');
    }

    async navigateToHome(path: string = ''): Promise<void> {
        await this.page.goto(`${this.baseUrl}${path}`);
    }

    async click(selector: string): Promise<void> {
        await this.page.click(selector);
    }

    async fill(selector: string, value: string): Promise<void> {
        await this.page.fill(selector, value);
    }
     /* Returns the main frame used by PrestaShop demo */
     getMainFrame(): FrameLocator{
        return this.mainFrame;
    }

    async logout(): Promise<void>{
        // Check if user is actually logged in first
        const loggedInSelectors = [
            this.mainFrame.locator('a[title*="View my customer account"]'),
            this.mainFrame.locator('a[href*="my-account"]'),
            this.mainFrame.locator('.user-info a[href*="my-account"]')
        ];
        
        let isLoggedIn = false;
        for (const selector of loggedInSelectors) {
            try {
                await selector.waitFor({ state: 'visible', timeout: 2000 });
                const href = await selector.getAttribute('href');
                // Verify it's actually a my-account link, not a login link
                if (href && href.includes('my-account') && !href.includes('login')) {
                    await selector.click({ timeout: 10000 });
                    isLoggedIn = true;
                    break;
                }
            } catch {
                continue;
            }
        }
        
    }
}
