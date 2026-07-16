/**
 * Constants used in the test framework
 * Contains URLs, test data and configuration values
 */ 

export class Contants {

    // Base URLs

    static readonly INVENTORY_URL = 'https://www.saucedemo.com/inventory.html';

    // Product Names

    static readonly SAUCE_LABS_BACKPACK = 'Sauce Labs Backpack';


    // Test Valid Users
     static readonly VALID_USERNAME = 'standard_user';
     static readonly VALID_PASSWORD = 'secret_sauce';

     static readonly INVALID_USERNAME = 'Username_Invalid';
     static readonly INVALID_PASSWORD = 'Username_Password';

    // Error Messages

    static readonly MISSING_USERNAME_ERROR = 'Epic sadface: Username is required'
    static readonly MISSING_PASSWORD_ERROR = 'Epic sadface: Password is required'
    static readonly INVALID_CREDENTIALS_ERROR = 'Epic sadface: Username and password do not match any user in this service' 
    static readonly INCORRECT_USERNAME_ERROR = 'Epic sadface: Username is required'
    static readonly INCORRECT_ERROR_FOR_INVALID_USERNAME_ERROR = 'Epic sadface: Username and password do not match any user in this service'
    static readonly INCORRECT_ERROR_FOR_INVALID_PASSWORD_ERROR = 'Epic sadface: Username and password do not match any user in this service'

}