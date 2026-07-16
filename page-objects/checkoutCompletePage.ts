import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
    readonly backHomeButton: Locator;
    readonly checkoutCompleteTitle: Locator;
    readonly successfulOrderMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.backHomeButton = page.getByRole('button', { name: 'Back Home'});
        this.checkoutCompleteTitle = page.getByText('Checkout: Complete!');
        this.successfulOrderMessage = page.getByText('Thank you for your order!');
    }

    async returnToInventoryPage(): Promise<void> {
        await this.clickElement(this.backHomeButton);
    }

    async verifyOrderCompleted() {
        await this.verifyElementVisible(this.checkoutCompleteTitle);
        await this.verifyElementVisible(this.successfulOrderMessage);
        await this.verifyElementVisible(this.backHomeButton);
    }
}