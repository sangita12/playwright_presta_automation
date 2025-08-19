import { test, expect, Page, FrameLocator } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/BasePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { TestData } from "../utils/test-data";
import { HomePage } from '../pages/HomePage'




test.describe('Purchase Flow', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;
  let registrationPage: RegistrationPage;
  let homePage: HomePage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page, baseURL }) => {
    basePage = new BasePage(page);
    loginPage = new LoginPage(page);
    registrationPage = new RegistrationPage(page);
    productPage = new ProductPage(page);
    homePage = new HomePage(page);
    await basePage.navigateToHome();
  });


  test('should complete purchase flow as registered user', async ({
    page,
  }) => {
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

    const userLoggedInAfterReg = await loginPage.isUserLoggedIn();
    if (userLoggedInAfterReg) {
      await loginPage.clickSignOut();
    }
    await loginPage.clickSignIn();
    await loginPage.verifyLoginPageLoaded();
    await loginPage.fillLoginForm(
      userData.email,  // Use the email from registration
      userData.password  // Use the password from registration
    );
    await loginPage.submitLogin();

    const loginSuccessful = await loginPage.isUserLoggedIn();
    expect(loginSuccessful).toBeTruthy();

    // Navigate to home and add product to cart
    
    //await homePage.openFirstProduct();
    await homePage.clickFirstProduct();

    // Add product to cart
    await productPage.getProductDetails();
    await productPage.addToCart();
   // await productPage.verifyModalAppear();
   // await productPage.verifyProductAddedToCart();
  });
});