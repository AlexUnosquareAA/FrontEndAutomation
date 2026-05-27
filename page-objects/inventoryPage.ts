import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    
    readonly page: Page;
    readonly firstProduct: Locator;
    readonly cartPageIcon: Locator;

    constructor(page: Page) {
        this.page = page;  
        this.firstProduct = page.locator('.inventory_item')
            .filter({ hasText: 'Sauce Labs Backpack' })
            .getByRole('button', { name: 'Add to cart' });
        this.cartPageIcon = page.locator('.shopping_cart_badge')
    }

    async addProductOne() { 
        await this.firstProduct.click()
    }

    async goToCartPage() {
        await this.cartPageIcon.click()
    }
 
}