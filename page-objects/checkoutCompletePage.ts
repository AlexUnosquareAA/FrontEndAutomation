import { Page, Locator,expect } from '@playwright/test'

export class CheckoutCompletePage {
    readonly page: Page;
    readonly backHomeButton: Locator;
    readonly checkoutCompleteTitle: Locator;
    readonly successfulOrderMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backHomeButton = page.getByRole('button', { name: 'Back Home'});
        this.checkoutCompleteTitle = page.getByText('Checkout: Complete!');
        this.successfulOrderMessage = page.getByText('Thank you for your order!');
    }

    async returnToInventoryPage() {
        await this.backHomeButton.click();
    }

    async verifyOrderCompleted() {
        await expect(this.checkoutCompleteTitle).toBeVisible()
        await expect(this.successfulOrderMessage).toBeVisible()
        await expect(this.backHomeButton).toBeVisible()


    }
}