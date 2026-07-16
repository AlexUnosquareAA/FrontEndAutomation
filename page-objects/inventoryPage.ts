import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Contants } from '../utils/Constants';

export class InventoryPage extends BasePage {
    readonly firstProductTitle: Locator;
    readonly firstProductAddToCartButton: Locator;
    readonly cartPageIcon: Locator;
    readonly productsTitle: Locator;
    readonly inventoryContainer: Locator;
    readonly firstProductRemoveButton: Locator;

    constructor(page: Page) {
        super(page);  
        this.firstProductTitle = page.locator('.inventory_item')
            .filter({ hasText: Contants.SAUCE_LABS_BACKPACK });
        this.firstProductAddToCartButton = page.locator('.inventory_item')
            .filter({ hasText: Contants.SAUCE_LABS_BACKPACK })
            .getByRole('button', { name: 'Add to cart' });
        this.cartPageIcon = page.locator('.shopping_cart_badge');
        this.productsTitle = page.locator('.title');
        this.inventoryContainer = page.locator('.inventory_container');
        this.firstProductRemoveButton = page.locator('.inventory_item')
            .filter({ hasText: Contants.SAUCE_LABS_BACKPACK })
            .getByRole('button', { name: 'Remove' });
    }

    async addProductOne(): Promise<void> { 
        await this.clickElement(this.firstProductAddToCartButton);
    }

    async goToCartPage(): Promise<void> {
        await this.clickElement(this.cartPageIcon);
    }

    async verifyInventoryPageLoaded(expectedUrl: string) {
        await this.verifyElementVisible(this.productsTitle);
        await this.verifyElementVisible(this.inventoryContainer);
        await this.verifyCurrentUrl(expectedUrl);
    }

    async verifyInventoryPageLoaded2(expectedUrl2: string) {
        await this.verifyCurrentUrlDontExist(expectedUrl2);
    }

    async verifyProductVisible() {
        await this.verifyElementVisible(this.firstProductTitle);
    }

    async verifyShoppingCartBadgeVisible() {
        await this.verifyElementVisible(this.cartPageIcon);
    }

    async verifyRemoveButtonVisible() {
        await this.verifyElementVisible(this.firstProductRemoveButton);
    }
}