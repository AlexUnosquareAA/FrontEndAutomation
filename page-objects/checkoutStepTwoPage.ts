import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutStepTwoPage extends BasePage {
    readonly finishButton: Locator;
    readonly checkoutOverviewTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.finishButton = page.getByRole('button', { name: 'Finish'});
        this.checkoutOverviewTitle = page.getByText('Checkout: Overview');
    }

    async clickFinish(): Promise<void> {
        await this.clickElement(this.finishButton);
    }

    async verifyPageLoaded() {
        await this.verifyElementVisible(this.checkoutOverviewTitle);
        await this.verifyElementVisible(this.finishButton);
    }
}