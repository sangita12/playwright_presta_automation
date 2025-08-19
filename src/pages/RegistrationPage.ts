import { Page, Locator, FrameLocator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { TestData } from "../utils/test-data";

export class RegistrationPage extends BasePage {
    // Locator for the registration form
    private readonly registarationLink: Locator;
    private readonly registrationFrame: FrameLocator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly birthDateInput: Locator;
    private readonly radioButtonLocator: Locator;
    private readonly checkBoxButton1Locator: Locator;
    private readonly checkBoxButton2Locator: Locator;
    private readonly checkBoxButton3Locator: Locator;
    private readonly saveButtonLocator: Locator;
    private readonly successMessage: Locator;
    private readonly loggedInUser: Locator;
    private readonly loadingMessage: Locator;
    

    constructor(page: Page) {
        super(page);
        this.registrationFrame = this.getMainFrame();
        this.loadingMessage = this.registrationFrame.locator('#loadingMessage');
        this.registarationLink = this.registrationFrame.locator('a[href*="/en/registration"]', { hasText: 'Create one here' });
        this.firstNameInput = this.registrationFrame.locator('input[id="field-firstname"]');
        this.lastNameInput = this.registrationFrame.locator('input[id="field-lastname"]');
        this.emailInput = this.registrationFrame.locator('input[id="field-email"]');
        this.passwordInput = this.registrationFrame.locator('input[id="field-password"]');
        this.birthDateInput = this.registrationFrame.locator('input[id="field-birthday"]');
        this.radioButtonLocator = this.registrationFrame.locator('input[id="field-id_gender-2"]');
        this.checkBoxButton1Locator = this.registrationFrame.locator('input[name="psgdpr"]');
        this.checkBoxButton2Locator = this.registrationFrame.locator('input[name="newsletter"]');
        this.checkBoxButton3Locator = this.registrationFrame.locator('input[name="customer_privacy"]');
        this.saveButtonLocator = this.registrationFrame.getByRole('button', { name: 'Save' });
        this.successMessage = this.registrationFrame.locator('.alert.alert-success');
        //this.loggedInUser = this.iframeSelector.getByTitle('View my customer account');
        this.loggedInUser = this.registrationFrame.getByTitle('View my customer account');
        

    }
    // Navigate to the registration page
    async navigateToRegistrationPage(): Promise<void> {
        await this.loadingMessage.waitFor({state: "hidden", timeout: 15000});
        await this.registarationLink.click();
    }

    async fillRegistrationForm(firstName: string, lastName: string, email: string, password: string, birthdate: string): Promise<void> {
        // Step 1: 
        await this.radioButtonLocator.check()

        // Step 2: Fill in the registration form fields
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.birthDateInput.fill(birthdate);


        await this.checkBoxButton1Locator.check();
        await this.checkBoxButton2Locator.check();
        await this.checkBoxButton3Locator.check();
    }

    // 
    async fillOptionalBirthdate(birthdate: string) {
        const birthInput = this.birthDateInput;
        // Check if the birthdate input exists before filling it
        if (await birthInput.count() > 0) {
            await birthInput.fill(birthdate);
        }

        /* Select the check boxes */

    }

    /* Submits the registration form */
    async submitRegistrationForm(): Promise<void> {
        await this.saveButtonLocator.click();
    }

    // Assertions
    async verifyRegisterPageLoaded(): Promise<void>{
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.emailInput).toBeVisible();
    }
 
   
    async verifyRegistrationErrors(): Promise<void>{
        const validationMessage = await this.firstNameInput.evaluate((el: HTMLInputElement) => el.validationMessage);
         expect(validationMessage).toContain('Please fill out this field');
       
    }


}