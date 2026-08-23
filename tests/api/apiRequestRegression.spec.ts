import { test, expect } from '@playwright/test' 
 
import Ajv from 'ajv';
import createIssueSchema from '../../fixtures/schemas/createIssueSchema.json';
import activitySchema from '../../fixtures/schemas/activitySchema.json';


const ajv = new Ajv({ allErrors: true });

// ==========================================
// REGRESSION TEST SUITE
// ========================================== 
 
test.describe('Github Workflow - Regression Suite', { tag: '@regression' },  () => {

    test.describe.configure({ mode: 'serial' });

    const REPO = `RepoAA-${Date.now()}`
    const USER = 'AutomationAlex86';

    let issueNumber: any;
    let repoId: any;

    test.beforeAll(async ({ request }) => {
    // Create a new repository 

        const response = await request.post('/user/repos', {
            data: {
                name: REPO
            }
        });expect(response.status()).toBe(201); 
        expect(response.ok()).toBeTruthy();
        const newRepo = await response.json();
        repoId = newRepo.id
        console.log('The new repo name is:', JSON.stringify(newRepo.name, null, 2));
        });

    test.afterAll(async ({ request }) => {
    // Delete the repository
        const response = await request.delete(`/repos/${USER}/${REPO}`);
        expect(response.ok()).toBeTruthy();
        });


    // Verify that the new repository created is listed:    
    test('Should verify the new repository is listed', async({ request }) => {
        const responseList = await request.get(`/users/${USER}/repos`)

        const responseListData = await responseList.json();
        console.log('All the repositories created:', JSON.stringify(responseListData, null, 2))
        const repoIdCreated = responseListData.find((item: any) => item.id === repoId);
         
        if (repoIdCreated) {
            console.log(`The repo created "${repoIdCreated.name}" was found on the list`);
         } else {
            console.log("Repository ID not found in the list");
}
    })

    // List repository activity

    test('Should display repository activity', async({ request }) => {
        const activityRepo = await request.get(`repos/${USER}/${REPO}/activity`)

        expect(activityRepo.ok()).toBeTruthy();
        const activityRepoData = await activityRepo.json(); 

        if (activityRepoData.length === 0) {
            console.log('No activities are present on this repository');
            expect(activityRepoData).toHaveLength(0);
        } else {
            console.log('The activity of the repo is: ' + JSON.stringify(activityRepoData, null, 2))
            expect(activityRepoData.length).toBeGreaterThan(0);
        }

        // SCHEMA VALIDATION - Validate activity payload against the imported JSON schema
        const validate = ajv.compile(activitySchema)
        const isValid = validate(activityRepoData);

        if (!isValid) {
            console.error('Schema Validation Errors:', JSON.stringify(validate.errors, null, 2));
            }
    
         expect(isValid, `JSON Schema validation failed: ${JSON.stringify(validate.errors)}`).toBe(true);
        
    })

    // Create a bug report
    test('Should create a bug report', async ({ request }) => {
        const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
            data: {
                body: 'Bug description',
                title: '[Bug] report 1'  
            }   
        });
        expect(newIssue.ok()).toBeTruthy();
        const issueData = await newIssue.json(); 

        expect(issueData).toMatchObject({
            body: 'Bug description',
            title: '[Bug] report 1',
            state: 'open'  
        }); 

        issueNumber = issueData.number;
        expect(issueNumber).toBeDefined();

        // SCHEMA VALIDATION - Validate issue created payload against the imported JSON schema
        const validate = ajv.compile(createIssueSchema);
        const isValid = validate(issueData);

        if (!isValid) {
            console.error('Issue Creation Schema Validation Errors:', JSON.stringify(validate.errors, null, 2));
        }

        expect(isValid, `Issue Response contract validation mismatch: ${JSON.stringify(validate.errors)}`).toBe(true);
        
        
    });

    // Get the bug report created

    test('Should get the bug report created', async({ request }) => {
        const issueCreated = await request.get(`/repos/${USER}/${REPO}/issues/${issueNumber}`)

        expect(issueCreated.ok()).toBeTruthy();
        const issueCreatedData = await issueCreated.json()
        console.log('The new issue created is:'+ issueCreatedData.title)
    })

    // Update the bug created

    test('Should Update the bug report created', async({ request }) => {
        const bugCreatedToBeUpdated = await request.patch(`/repos/${USER}/${REPO}/issues/${issueNumber}`, {
            data: {
                "title":"Found a second bug",
                "body":"Having a second problem with this.", 
                "labels":["bug"]
            }
        })

        expect(bugCreatedToBeUpdated.ok()).toBeTruthy();
        const updatedBugData = await bugCreatedToBeUpdated.json();
        expect(updatedBugData.state).toBe('open');

    })

    // Close the bug report

    test('Should close the bug report created', async({ request }) => {
        const updateBugCreated = await request.patch(`/repos/${USER}/${REPO}/issues/${issueNumber}`,{
            data: {
                state: 'closed'
            }
        }); 
        expect(updateBugCreated.ok()).toBeTruthy();
        const updatedBugData = await updateBugCreated.json();
        expect(updatedBugData.state).toBe('closed');
    })

    // Create a feature request
    test('Should create a feature request', async ({ request }) => {
        const newFeature = await request.post(`/repos/${USER}/${REPO}/issues`, {
            data: {
                title: '[Feature] request 1',
                body: 'Feature description',
            }
        });
        expect(newFeature.ok()).toBeTruthy();{}
        const featureData = await newFeature.json();

        expect(featureData).toMatchObject({
            title: '[Feature] request 1',
            body: 'Feature description', 
        }); 
    });  
})
   

