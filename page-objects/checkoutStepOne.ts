import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CheckoutStepOnePage {
    readonly page: Page;
    readonly inputFirstName: Locator;
    readonly inputLastName: Locator;
    readonly inputZipCode: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputFirstName = page.getByPlaceholder('First Name')
        this.inputLastName = page.getByPlaceholder('Last Name')
        this.inputZipCode = page.getByPlaceholder('Zip/Postal Code')
        this.continueButton = page.getByRole('button', { name: 'Continue '})
    }

    async fillCustomerInformation() {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const zipCode = faker.location.zipCode()
        await this.inputFirstName.fill(firstName);
        await this.inputLastName.fill(lastName);
        await this.inputZipCode.fill(zipCode);

        console.log(`Customer data generated:
            First name: ${firstName}, 
            Last Name: ${lastName}, 
            ZipCode: ${zipCode}`)
         
    }

    async clickContinue() {
        await this.continueButton.click();
    }

}