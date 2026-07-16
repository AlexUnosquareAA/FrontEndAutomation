import { test } from '@playwright/test';
import { LoginPage } from '@page-objects/loginPage';
import { InventoryPage } from '@page-objects/inventoryPage';
import { CartPage } from '@page-objects/cartPage';
import { CheckoutStepOnePage } from '@page-objects/checkoutStepOnePage';
import { CheckoutStepTwoPage } from '@page-objects/checkoutStepTwoPage';
import { CheckoutCompletePage } from '@page-objects/checkoutCompletePage';
import { Contants } from '@utils/Constants';

/**
 *  Testing SauceDemo E-Commerce from login to order completion
 */
test.describe('User Can finish the checkout Process', { tag: '@uitest'}, () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutStepOnePage: CheckoutStepOnePage;
    let checkoutStepTwoPage: CheckoutStepTwoPage;
    let checkoutCompletePage: CheckoutCompletePage;

    /**
     * Setup page objects before each test
     */
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutStepOnePage = new CheckoutStepOnePage(page);
        checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        checkoutCompletePage = new CheckoutCompletePage(page);
    });

    test('Complete SauceDemo e-Commerce workflow', async () => {
        // Step 1: Open https://saucedemo.com
        await test.step('Navigate to SauceDemo page', async () => { 
            await loginPage.gotoLoginPage();
            await loginPage.verifyLoginPageLoaded();  
        });

        // Step 2: Login with valid username and password
        await test.step('Login with valid credentials', async () => {
            await loginPage.signIn(Contants.VALID_USERNAME, Contants.VALID_PASSWORD);
            await inventoryPage.verifyInventoryPageLoaded(Contants.INVENTORY_URL);
        });
          
        // Step 3: Adding the first product to the cart
        await test.step('User can add the first product to the cart', async () => { 
            await inventoryPage.verifyProductVisible();
            await inventoryPage.addProductOne();
            await inventoryPage.verifyShoppingCartBadgeVisible();
            await inventoryPage.verifyRemoveButtonVisible();
        });

        // Step 4: Open the cart 
        await test.step('Navigate to the cart page', async () => {
            await inventoryPage.goToCartPage();
            await cartPage.verifyYourCartTitleVisible();
            await cartPage.verifyCheckoutButtonVisible();
        });  

        // Step 5: Click on Checkout button
        await test.step('Checkout order', async () => {
            await cartPage.clickCheckout();
            await checkoutStepOnePage.verifyPageLoaded();
        });

        // Step 6: Fill random data First Name, Last Name and Zip
        await test.step('Fill customer information with random data', async () => {
            await checkoutStepOnePage.fillCustomerInformation();
            await checkoutStepOnePage.clickContinue();
            await checkoutStepTwoPage.verifyPageLoaded();
        });

        // Step 7: Click on finish button
        await test.step('Continue to order review', async () => {
            await checkoutStepTwoPage.clickFinish();
            await checkoutCompletePage.verifyOrderCompleted();
        });

        // Step 8: Return to Inventory page
        await test.step('Return to the inventory Page', async () => {
            await checkoutCompletePage.returnToInventoryPage();
            await inventoryPage.verifyInventoryPageLoaded(Contants.INVENTORY_URL);
        });
    });

    /**
     * Test trace on failure
     */
    test('Verify error handling for empty credentials', async () => {
        await loginPage.gotoLoginPage();
        await loginPage.verifyLoginPageLoaded();  
 
        await loginPage.clickLoginButton();

        // Expected message for trying to login with empty fields.
        await loginPage.verifyErrorMessageNoCredentials(Contants.MISSING_USERNAME_ERROR);

        // Invalid message for tryng to login with empty fields - screenshots + trace on failure
        await loginPage.verifyErrorMessageNoCredentials(Contants.INCORRECT_USERNAME_ERROR);
    });

    test('Verify error handling for invalid username', async () => {
        await loginPage.gotoLoginPage();
        await loginPage.verifyLoginPageLoaded();

        // Expected message for trying to login with Invalid Username
        await loginPage.signIn(Contants.INVALID_USERNAME, Contants.VALID_PASSWORD);
        await loginPage.verifyErrorMessageNoCredentials(Contants.INVALID_CREDENTIALS_ERROR);

        // Invalid message for tryng to login with Invalid Username - screenshots + trace on failure
        await loginPage.signIn(Contants.INVALID_USERNAME, Contants.VALID_PASSWORD);
        await loginPage.verifyErrorMessageNoCredentials(Contants.INCORRECT_ERROR_FOR_INVALID_USERNAME_ERROR);
    });

    test('Verify error handling for invalid password', async () => {
        await loginPage.gotoLoginPage();
        await loginPage.verifyLoginPageLoaded();

        // Expected message for trying to login with Invalid Password.
        await loginPage.signIn(Contants.VALID_USERNAME, Contants.INVALID_PASSWORD);
        await loginPage.verifyErrorMessageNoCredentials(Contants.INVALID_CREDENTIALS_ERROR);

        // Invalid message for tryng to login with Invalid Password - screenshots + trace on failure
        await loginPage.signIn(Contants.VALID_USERNAME, Contants.INVALID_PASSWORD);
        await loginPage.verifyErrorMessageNoCredentials(Contants.INCORRECT_ERROR_FOR_INVALID_PASSWORD_ERROR);
    });

    test('Verify incorrect locator for Loggin button', async () => {
        await loginPage.gotoLoginPage();
        await loginPage.verifyLoginPageLoaded2();  
    });

    test('Verify expected element not present on inventory page', async () => {
        await loginPage.gotoLoginPage();
        await loginPage.verifyLoginPageLoaded();   

        // Step 2: Login with valid username and password
        await loginPage.signIn(Contants.VALID_USERNAME, Contants.VALID_PASSWORD);
        await inventoryPage.verifyInventoryPageLoaded2('Incorrect URL');
    });
});