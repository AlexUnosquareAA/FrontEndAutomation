import { Page, Locator } from '@playwright/test'

export class CheckoutCompletePage {
    readonly page: Page;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backHomeButton = page.getByRole('button', { name: 'Back Home'});
    }

    async returnToInventoryPage() {
        await this.backHomeButton.click();
    }
}