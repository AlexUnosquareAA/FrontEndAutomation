import { Page, Locator } from "@playwright/test"; 
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    readonly inputUsername: Locator;
    readonly inputPassword: Locator;
    readonly loginButton: Locator;
    readonly loginButton2: Locator;
    readonly errorMessage: Locator;
    
    constructor(page: Page) {
        super(page);
        this.inputUsername = page.getByPlaceholder('Username');
        this.inputPassword = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login'});
        this.errorMessage = page.locator('[data-test="error"]');
        this.loginButton2 = page.locator('testIncorrectLocator');
    }

    async gotoLoginPage(): Promise<void> {
        await this.navigateTo('https://www.saucedemo.com');
    }

    async signIn(user: string, pass: string): Promise<void> {
        await this.fillInput(this.inputUsername, user);
        await this.fillInput(this.inputPassword, pass);
        await this.clickElement(this.loginButton);
    }

    async clickLoginButton(): Promise<void> {
        await this.clickElement(this.loginButton);
    }

    async verifyLoginPageLoaded() {
        await this.verifyElementVisible(this.loginButton);
        await this.verifyElementVisible(this.inputUsername);
        await this.verifyElementVisible(this.inputPassword);
    }

    async verifyLoginPageLoaded2() {
        await this.verifyElementNotVisible(this.loginButton2); 
    }

    async verifyErrorMessageNoCredentials(errorMessage: string) {
        await this.verifyElementVisible(this.errorMessage);
        await this.verifyElementText(this.errorMessage, errorMessage);
    }
}
