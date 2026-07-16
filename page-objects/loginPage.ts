import { Page, Locator, expect } from "@playwright/test"; 

export class LoginPage {

    readonly page: Page
    readonly inputUsername: Locator;
    readonly inputPassword: Locator;
    readonly loginButton: Locator;
    readonly loginButton2: Locator;
    readonly errorMessage: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.inputUsername = page.getByPlaceholder('Username');
        this.inputPassword = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login'})
        this.errorMessage = page.locator('[data-test="error"]')
        this.loginButton2 = page.locator('incorrectLocatorLogginButton');
    }

    async gotoLoginPage() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async signIn(user: string, pass: string) {
        await this.inputUsername.fill(user);
        await this.inputPassword.fill(pass);
        await this.loginButton.click();
    }

    async verifyLoginPageLoaded() {
        await expect(this.loginButton).toBeVisible();
        await expect(this.inputUsername).toBeVisible();
        await expect(this.inputPassword).toBeVisible();
    }
     async verifyLoginPageLoaded2() {
        await expect(this.loginButton2).not.toBeVisible(); 
    }

    async clickLoginButton () {
        await this.loginButton.click()
    }

    async verifyErrorMessageNoCredentials(errorMessage: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(errorMessage);
    }

}