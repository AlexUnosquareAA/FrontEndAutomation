import { Page, Locator, expect } from '@playwright/test'

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly yourCartTitle: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.getByRole('button', { name: 'Checkout'})
        this.yourCartTitle = page.getByText('Your Cart')
    }

    async clickCheckout() {
        await this.checkoutButton.click()
    }

    async verifyYourCartTitleVisible() {
        await expect(this.yourCartTitle).toBeVisible()
    }

    async verifyCheckoutButtonVisible() {
        await expect(this.checkoutButton).toBeVisible()
    }
}