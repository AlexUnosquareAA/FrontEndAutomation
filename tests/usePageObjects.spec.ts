import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { InventoryPage } from '../page-objects/inventoryPage';
import { CartPage } from '../page-objects/cartPage';
import { CheckoutStepOnePage } from '../page-objects/checkoutStepOnePage';
import { CheckoutStepTwoPage } from '../page-objects/checkoutStepTwoPage';
import { CheckoutCompletePage } from '../page-objects/checkoutCompletePage';
import { Contants } from '../utils/Constants';

/**
 *  Testing SauceDemo E-Commerce from login to order completion
 */

test.describe('User Can finish the checkout Process', () => {
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
    })

 

    test('Complete SauceDemo e-Commerce workflow', async({ page }) => {
        // Step 1: Open https://www.saucedemo.com/
        await test.step('Navigate to SauceDemo page', async({}) => { 
            await loginPage.gotoLoginPage()
            await loginPage.verifyLoginPageLoaded()  
        })

        // Step 2: Login with valid username and password
        await test.step('Login with valid credentials', async({}) => {
            await loginPage.signIn(Contants.VALID_USERNAME, Contants.VALID_PASSWORD)
            await inventoryPage.verifyInventoryPageLoaded(Contants.INVENTORY_URL);
        })
          
        // Step 3: Adding the first product to the cart
        await test.step('User can add the first product to the cart', async({}) => { 
            await inventoryPage.verifyProductVisible() 
            await inventoryPage.addProductOne()
            await inventoryPage.verifyShoppingCartBadgeVisible()
            await inventoryPage.verifyRemoveButtonVisible()
        })

        // Step 4: Open the cart 
        await test.step('Navigate to the cart page', async({}) => {
            await inventoryPage.goToCartPage() 
            await cartPage.verifyYourCartTitleVisible()
            await cartPage.verifyCheckoutButtonVisible()
        })  

        // Step 5: Click on Checkout button
        await test.step('Checkout order', async({}) => {
            await cartPage.clickCheckout()
            await checkoutStepOnePage.verifyPageLoaded()
        })

        // Step 6: Fill random data First Name, Last Name and Zip
        await test.step('Fill customer information with random data', async({}) => {
            await checkoutStepOnePage.fillCustomerInformation()
            await checkoutStepOnePage.clickContinue()
            await checkoutStepTwoPage.verifyPageLoaded()
        })

        // Step 7: Click on finish button
        await test.step('Continue to order review', async({}) => {
            await checkoutStepTwoPage.clickFinish()
            await checkoutCompletePage.verifyOrderCompleted()
        })

        // Step 8: Return to Inventory page
        await test.step('Return to the inventory Page', async({}) => {
            await checkoutCompletePage.returnToInventoryPage()
            await inventoryPage.verifyInventoryPageLoaded(Contants.INVENTORY_URL)
        })
    })
})

