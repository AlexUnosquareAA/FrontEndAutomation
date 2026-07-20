Feature: SauceDemo E-Commerce Testing

  Background:
    Given the user navigates to the SauceDemo login page
    Then the login page should be loaded successfully

  @uitest
  Scenario: Complete SauceDemo e-Commerce workflow
    When the user logs in with valid username and password
    Then the inventory page should be loaded
    And the first product should be visible
    When the user adds the first product to the cart
    Then the shopping cart badge should be visible
    And the remove button should be visible
    When the user navigates to the cart page
    Then the cart page titles and buttons should be visible
    When the user clicks on the Checkout button
    Then the checkout information page should be loaded
    When the user fills customer information with random data and continues
    Then the checkout overview page should be loaded
    When the user finishes the order
    Then the order should be completed successfully
    When the user returns to the inventory page
    Then the inventory page should be loaded

@uitest
  Scenario Outline: Verify login error handling
    When the user attempts to sign in with user "<username>" and password "<password>"
    Then the error message should say "<error_message>"

    Examples:

      | username      | password       | error_message                       |
      |               |                | Epic sadface: Username is required |
      | invalid_user  | secret_sauce   | Epic sadface: Username and password do not match any user in this service |
      | standard_user | wrong_password | Epic sadface: Username and password do not match any user in this service |
 
  @uitest
  Scenario: Verify incorrect locator for Loggin button
    Then the alternative login page check should pass successfully

  @uitest
  Scenario: Verify expected element not present on inventory page
    When the user logs in with valid username and password
    Then the inventory page should confirm that it is not on URL "Incorrect URL"