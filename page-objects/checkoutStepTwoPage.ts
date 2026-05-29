import { Page, Locator,expect } from "@playwright/test";

export class CheckoutStepTwoPage {
    readonly page: Page;
    readonly finishButton: Locator;
    readonly checkoutOverviewTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.finishButton = page.getByRole('button', { name: 'Finish'});
        this.checkoutOverviewTitle = page.getByText('Checkout: Overview')
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async verifyPageLoaded() {
        await expect(this.checkoutOverviewTitle).toBeVisible()
        await expect(this.finishButton).toBeVisible()
    }
}