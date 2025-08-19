import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/BasePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { TestData } from "../utils/test-data";

test.describe('Login Flow', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page, baseURL }) => {
    basePage = new BasePage(page);
    loginPage = new LoginPage(page);
    registrationPage = new RegistrationPage(page);
    await basePage.navigateToHome();
  });

  test.skip('should successfully login with valid credentials', async ({ page }) => {
    await loginPage.clickSignIn();
    await loginPage.verifyLoginPageLoaded();
    const credentials = TestData.getValidCredentials();
    await loginPage.fillLoginForm(
      credentials.email,
      credentials.password
    );
    console.log("Valid test email:", credentials.email);
    console.log("Valid test password:", credentials.password);
    await loginPage.submitLogin();

    const isLoggedIn = await loginPage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();

    const userName = await loginPage.getLoggedInUser();
    console.log("Logged in username:", userName);
    expect(userName).toBeTruthy();
  });

  test('Should successfully login with valid credentials after registration', async ({
    page,
  }) => {
    // First register a user to ensure we have valid credentials
    await loginPage.clickSignIn();
    await registrationPage.navigateToRegistrationPage();

    const userData = TestData.generateUserData();
    await registrationPage.fillRegistrationForm(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
      userData.dateOfBirth
    );
    await registrationPage.fillOptionalBirthdate(userData.dateOfBirth);
    await registrationPage.submitRegistrationForm();
    console.log("firstname: ", userData.firstName);
    console.log("lastname:", userData.lastName);
    console.log("email:", userData.email);
    console.log("password:", userData.password);

    // Force logout by navigating to logout URL if user is logged in
    const userLoggedInAfterReg = await loginPage.isUserLoggedIn();
    console.log('User is logged in after registration: ' + userLoggedInAfterReg);
    if (userLoggedInAfterReg) {
      await loginPage.clickSignOut();
    }
    await loginPage.clickSignIn();
    await loginPage.verifyLoginPageLoaded();
    await loginPage.fillLoginForm(
      userData.email,  // Use the email from registration
      userData.password  // Use the password from registration
    );
    console.log("login email:", userData.email);
    console.log("login password:", userData.password);
    await loginPage.submitLogin();

    // Verify login was successful
    const loginSuccessful = await loginPage.isUserLoggedIn();
    expect(loginSuccessful).toBeTruthy();
  });

  test('should show error for empty email field', async({page}) => {
    const invalidData = TestData.getInvalidLoginCredentials()[0];
    await loginPage.clickSignIn();
    await loginPage.verifyLoginPageLoaded();   
    await loginPage.submitLogin();   
    await loginPage.verifyLoginError();
  })
});
