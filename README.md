# FrontEnd Automation

## Automation framework with Playwright

## The automation framework contains: 
 >**- 5+ test Playwright POM suite against SauceDemo.**
 
 >**- 5 Screenshots + trace on failure for invalid scenarios.**

## To run the automation tool:
   >### 1. Clone the repository
   >### 2. install dependencies with npm install
   >### 3. Install Playwright Test for VSCode
   >### 4. Click on the testing explorer
   >### 5. Open the file usePageObjects.spec.ts
   >### 6. Click on the play button on test.describe suite  
   >### 7. Or you can run the test by the following command:
       npx playwright test --project=Chromium

<img width="2612" height="1800" alt="image" src="https://github.com/user-attachments/assets/50241318-1610-48fa-b2c6-7b7910b41e5f" />
<img width="1061" height="469" alt="image" src="https://github.com/user-attachments/assets/d92cbf10-37ce-4509-bf56-25714e6c3f9e" />

## To run the automation UI tool:
   >### 1. Clone the repository
   >### 2. install dependencies with npm install
   >### 3. Install Playwright Test for VSCode
   >### 4. Open the terminal
   >### 5. Run the UI Tests with the following command: 
        npx playwright test --grep '@uitest' --project=chromium    

## To run the automation UI tool with Cucumber:
   >### 1. Clone the repository
   >### 2. install dependencies with npm install
   >### 3. Install Playwright Test for VSCode
   >### 4. Open the terminal
   >### 5. Run the UI Tests with the following command: 
        npm run test:cucumber:tags
   >### 6. Open the cucumber-report.html file to see a complete report.

# API Automation

## Automation framework with API Playwright

## The API automation framework contains: 

## 5+ API suite against Github API.
   >### 1. 5+ tests.
   >### 2. OAuth token retrieval.
   >### 3. Schema validation.
   >### 4. Parameterized from CSV/JSON.

## To run the API automation tool:
   >### 1. To run all the framework: 
   > npx playwright test
   >### 2. To run only regression tests: 
   > npx playwright test --grep @regression --project=chromium
   >### 3. To run only smoke tests: 
   > npx playwright test --grep @smoke --project=chromium

<img width="1905" height="999" alt="image" src="https://github.com/user-attachments/assets/e7d9a984-a34d-4fa9-9ff5-62b6fc6a0651" />
<img width="1868" height="977" alt="{1410E4A8-50A1-4EE0-85B3-95D9FEC8FD47}" src="https://github.com/user-attachments/assets/b49b751c-ae0e-4d28-93cd-e1d18ffbe32a" />


    
