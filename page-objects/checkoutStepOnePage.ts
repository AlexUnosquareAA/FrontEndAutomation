import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { faker } from '@faker-js/faker';

export class CheckoutStepOnePage extends BasePage {
    readonly inputFirstName: Locator;
    readonly inputLastName: Locator;
    readonly inputZipCode: Locator;
    readonly continueButton: Locator;
    readonly checkoutYourInformationTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.inputFirstName = page.getByPlaceholder('First Name');
        this.inputLastName = page.getByPlaceholder('Last Name');
        this.inputZipCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue'});
        this.checkoutYourInformationTitle = page.getByText('Checkout: Your Information');
    }

    async fillCustomerInformation(): Promise<void> {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const zipCode = faker.location.zipCode();
        
        await this.fillInput(this.inputFirstName, firstName);
        await this.fillInput(this.inputLastName, lastName);
        await this.fillInput(this.inputZipCode, zipCode);

        console.log(`Customer data generated:
            First name: ${firstName}, 
            Last Name: ${lastName}, 
            ZipCode: ${zipCode}`);
    }

    async clickContinue(): Promise<void> {
        await this.clickElement(this.continueButton);
    }

    async verifyPageLoaded() {
        await this.verifyElementVisible(this.continueButton);
        await this.verifyElementVisible(this.checkoutYourInformationTitle);
    }
}