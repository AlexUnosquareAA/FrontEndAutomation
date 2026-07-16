import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly checkoutButton: Locator;
    readonly yourCartTitle: Locator;
    
    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.getByRole('button', { name: 'Checkout'});
        this.yourCartTitle = page.getByText('Your Cart');
    }

    async clickCheckout(): Promise<void> {
        await this.clickElement(this.checkoutButton);
    }

    async verifyYourCartTitleVisible() {
        await this.verifyElementVisible(this.yourCartTitle);
    }

    async verifyCheckoutButtonVisible() {
        await this.verifyElementVisible(this.checkoutButton);
    }
}