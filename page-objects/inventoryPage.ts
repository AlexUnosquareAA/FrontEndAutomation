import { Page, Locator, expect } from '@playwright/test';
import { Contants } from '../utils/Constants';

export class InventoryPage {
    
    readonly page: Page;
    readonly firstProductTitle: Locator;
    readonly firstProductAddToCartButton: Locator;
    readonly cartPageIcon: Locator;
    readonly productsTitle: Locator;
    readonly inventoryContainer: Locator;
    readonly firstProductRemoveButton: Locator;

    constructor(page: Page) {
        this.page = page;  
        this.firstProductTitle =  page.locator('.inventory_item')
            .filter({ hasText: Contants.SAUCE_LABS_BACKPACK });
        this.firstProductAddToCartButton = page.locator('.inventory_item')
            .filter({ hasText: Contants.SAUCE_LABS_BACKPACK })
            .getByRole('button', { name: 'Add to cart' });
        this.cartPageIcon = page.locator('.shopping_cart_badge');
        this.productsTitle = page.locator('.title');
        this.inventoryContainer = page.locator('.inventory_container');
        this.firstProductRemoveButton = page.locator('.inventory_item')
            .filter({ hasText: Contants.SAUCE_LABS_BACKPACK })
            .getByRole('button', { name: 'Remove' });
    }

    async addProductOne() { 
        await this.firstProductAddToCartButton.click()
    }

    async goToCartPage() {
        await this.cartPageIcon.click()
    }

    async verifyInventoryPageLoaded(expectedUrl: string) {
        await expect(this.productsTitle).toBeVisible();
        await expect(this.inventoryContainer).toBeVisible()
        await expect(this.page).toHaveURL(expectedUrl);
    }

    async verifyInventoryPageLoaded2(expectedUrl2: string) {
        await expect(this.page).not.toHaveURL(expectedUrl2)
    }

    async verifyProductVisible() {
        await expect(this.firstProductTitle).toBeVisible();
    }

    async verifyShoppingCartBadgeVisible() {
        await expect(this.cartPageIcon).toBeVisible();
    }

    async verifyRemoveButtonVisible() {
        await expect(this.firstProductRemoveButton).toBeVisible();
    }
 
}