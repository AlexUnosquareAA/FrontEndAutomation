import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { LoginPage } from '@page-objects/loginPage';
import { InventoryPage } from '@page-objects/inventoryPage';
import { CartPage } from '@page-objects/cartPage';
import { CheckoutStepOnePage } from '@page-objects/checkoutStepOnePage';
import { CheckoutStepTwoPage } from '@page-objects/checkoutStepTwoPage';
import { CheckoutCompletePage } from '@page-objects/checkoutCompletePage';
import { Contants } from '@utils/Constants';

setDefaultTimeout(15 * 1000); 

//  Page Objects Instances ( 'this.page' is managed by Cucumber World/Hooks)
let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutStepOnePage: CheckoutStepOnePage;
let checkoutStepTwoPage: CheckoutStepTwoPage;
let checkoutCompletePage: CheckoutCompletePage;

// --- BACKGROUND STEPS ---

Given('the user navigates to the SauceDemo login page', async function () {
    // Initialization of Page Objects using the current page context 
    loginPage = new LoginPage(this.page);
    inventoryPage = new InventoryPage(this.page);
    cartPage = new CartPage(this.page);
    checkoutStepOnePage = new CheckoutStepOnePage(this.page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(this.page);
    checkoutCompletePage = new CheckoutCompletePage(this.page);

    await loginPage.gotoLoginPage();
});

Then('the login page should be loaded successfully', async function () {
    await loginPage.verifyLoginPageLoaded();
});

// --- SCENARIO 1: WORKFLOW STEPS ---

When('the user logs in with valid username and password', async function () {
    await loginPage.signIn(Contants.VALID_USERNAME, Contants.VALID_PASSWORD);
});

Then('the inventory page should be loaded', async function () {
    await inventoryPage.verifyInventoryPageLoaded(Contants.INVENTORY_URL);
});

Then('the first product should be visible', async function () {
    await inventoryPage.verifyProductVisible();
});

When('the user adds the first product to the cart', async function () {
    await inventoryPage.addProductOne();
});

Then('the shopping cart badge should be visible', async function () {
    await inventoryPage.verifyShoppingCartBadgeVisible();
});

Then('the remove button should be visible', async function () {
    await inventoryPage.verifyRemoveButtonVisible();
});

When('the user navigates to the cart page', async function () {
    await inventoryPage.goToCartPage();
});

Then('the cart page titles and buttons should be visible', async function () {
    await cartPage.verifyYourCartTitleVisible();
    await cartPage.verifyCheckoutButtonVisible();
});

When('the user clicks on the Checkout button', async function () {
    await cartPage.clickCheckout();
});

Then('the checkout information page should be loaded', async function () {
    await checkoutStepOnePage.verifyPageLoaded();
});

When('the user fills customer information with random data and continues', async function () {
    await checkoutStepOnePage.fillCustomerInformation();
    await checkoutStepOnePage.clickContinue();
});

Then('the checkout overview page should be loaded', async function () {
    await checkoutStepTwoPage.verifyPageLoaded();
});

When('the user finishes the order', async function () {
    await checkoutStepTwoPage.clickFinish();
});

Then('the order should be completed successfully', async function () {
    await checkoutCompletePage.verifyOrderCompleted();
});

When('the user returns to the inventory page', async function () {
    await checkoutCompletePage.returnToInventoryPage();
});

// --- SCENARIO OUTLINE ERROR HANDLING STEPS ---

// This step receives the parameters directly from the Examples table
When('the user attempts to sign in with user {string} and password {string}', async function (user: string, pass: string) {
    await loginPage.signIn(user, pass);
});

// This step verifies whatever error message text was specified in the Examples row
Then('the error message should say {string}', async function (errorMessage: string) {
    await loginPage.verifyErrorMessageNoCredentials(errorMessage); 
});

// --- ALTERNATIVE VALIDATION STEPS ---
Then('the alternative login page check should pass successfully', async function () {
    await loginPage.verifyLoginPageLoaded2();
});

Then('the inventory page should confirm that it is not on URL {string}', async function (incorrectUrl: string) {
    await inventoryPage.verifyInventoryPageLoaded2(incorrectUrl);
});