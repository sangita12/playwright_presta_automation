import { BasePage } from './BasePage';
import { Page, expect, Locator, FrameLocator } from '@playwright/test';


export class LoginPage extends BasePage {
  private readonly loginFrame: FrameLocator;
  private readonly signInLink: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;
  private readonly signOutLink: Locator;
  private readonly userAccountDropdown: Locator;
  private readonly errorMessage: Locator;
  


  constructor(page: Page) {
    super(page);
    this.loginFrame = this.getMainFrame();
    
    this.signInLink = this.loginFrame.locator('a[href*="/en/login"] span[class="hidden-sm-down"]');
    this.emailInput = this.loginFrame.locator('input[id="field-email"]');
    this.passwordInput = this.loginFrame.locator('input[id="field-password"]');
    this.signInButton = this.loginFrame.locator('button[id="submit-login"]');
    this.signOutLink = this.loginFrame.getByRole('link', { name: 'Sign out', exact: true });
    this.userAccountDropdown = this.loginFrame.locator('div[class="language-selector dropdown js-dropdown"]');
    this.errorMessage = this.loginFrame.locator('.alert-danger');
  }

  async clickSignIn(): Promise<void> {
    await expect(this.signInLink).toBeVisible({ timeout: 15000 });
    await this.signInLink.click();
  }

  async clickSignOut(): Promise<void> {
    await expect(this.signOutLink).toBeVisible({ timeout: 15000 });
   
    await this.signOutLink.click();
  }

  async getLoggedInUser(): Promise<string | null> {
    // Remove networkidle wait - rely on element visibility instead

    const userLocators = [
      this.loginFrame.locator('.user-info a'),
      this.loginFrame.locator('a[class*="account"]'),
      this.loginFrame.locator('.header-nav .user-info'),
      this.loginFrame.locator('a[title*="View my customer account"]')
    ];

    for (const locator of userLocators) {
      try {
        await locator.waitFor({ state: 'visible', timeout: 8000 });
        
        return await locator.textContent();
      } catch {
        continue;
      }
    }

    throw new Error('Could not find logged-in user element');
  }

  async fillLoginForm(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submitLogin(): Promise<void> {
    await this.signInButton.click();
    // Wait for navigation to complete with a more lenient approach
    try {
      await this.page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    } catch {
      // If domcontentloaded fails, wait a bit and continue
      await this.page.waitForTimeout(2000);
    }
  }

  async verifySuccessfulLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/.*my-account.*/);
  }

 async isUserLoggedIn(): Promise<boolean>{
  // Scope everything to the PrestaShop demo iframe
  

  // Element that only appears when logged in
  const accountLink = this.signOutLink;

  // Wait until it becomes visible (or fail if not found in timeout)
  await accountLink.waitFor({ state: 'visible', timeout: 10000 });  
  return await accountLink.isVisible();
 }
 
  // Assertions
  async verifyLoginPageLoaded(): Promise<void> {
    await expect(this.emailInput).toBeVisible({ timeout: 10000 });
    await expect(this.passwordInput).toBeVisible({ timeout: 10000 });
    await expect(this.signInButton).toBeVisible({ timeout: 10000 });
  }
        async verifyLoginError(): Promise<void>{
        const validationMessage = await this.emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
         expect(validationMessage).toContain('Please fill out this field');
    }
}
