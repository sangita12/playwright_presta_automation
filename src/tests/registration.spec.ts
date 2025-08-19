import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { TestData } from '../utils/test-data';

test.describe('Registration Tests', () => {
      let loginPage: LoginPage;
      let registrationPage: RegistrationPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToHome();
        await loginPage.clickSignIn();
        registrationPage = new RegistrationPage(page);
        await registrationPage.navigateToRegistrationPage();
    });

    test('should successfully register a new user with valid data', async ({ page }) => {
        const userData = TestData.generateUserData();
        await registrationPage.fillRegistrationForm(
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.password,
            userData.dateOfBirth
        );
        console.log("FirstName: ", userData.firstName);
        console.log("LastName:", userData.lastName);
        console.log("Email: ", userData.email);
        console.log("Password:", userData.password);
        console.log("DOB:", userData.dateOfBirth);
        await registrationPage.fillOptionalBirthdate(userData.dateOfBirth);
        await registrationPage.submitRegistrationForm();
        await registrationPage.verifyRegisterPageLoaded();
    });

  test('should show error for empty email field', async ({ page }) => {
    // Try to submit without filling required fields and Verify validation errors appear  
    await registrationPage.submitRegistrationForm();
    await registrationPage.verifyRegistrationErrors();
    });
    
   
});

