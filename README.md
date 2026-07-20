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

<img width="975" height="439" alt="image" src="https://github.com/user-attachments/assets/ed6a4767-d5b7-4d21-a79c-630ee33ff2c8" />
<img width="974" height="524" alt="image" src="https://github.com/user-attachments/assets/57c918ef-7e65-4ab4-9755-f41e84bbd7bc" />
<img width="975" height="518" alt="image" src="https://github.com/user-attachments/assets/aa151c15-ea53-4ef4-9597-c030091f614a" />


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


    
