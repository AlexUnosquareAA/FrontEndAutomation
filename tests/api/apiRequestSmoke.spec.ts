import { test, expect } from '@playwright/test' 
import fs from 'fs';  
import path from 'path';
import { parse } from 'csv-parse/sync';

const csvFilePath = path.resolve(process.cwd(), 'tests/data/features.csv');
const csvContent = fs.readFileSync(csvFilePath, 'utf-8');

const records = parse(csvContent, {
  columns: true,          // Automatically uses the first row (headers) as keys
  skip_empty_lines: true  // Ignores blank lines in your CSV file
}); 


// ==========================================
// SMOKE TEST SUITE 
// (Parameterized Loop over each CSV row to generate separate tests) 
// - Parameterized data from csv/json
// ==========================================

test.describe('Github Workflow - Smoke Suite', { tag: '@smoke' }, () => {
    
    const REPO = "RepoAA-Smoke"
    const USER = 'AlexUnosquareAA';

    // Isolated repository lifecycle for the standalone smoke execution
    test.beforeAll(async ({ request }) => {
        const response = await request.post('/user/repos', {
            data: { name: REPO }
        });
        expect(response.status()).toBe(201); 
    });

    test.afterAll(async ({ request }) => {
        const response = await request.delete(`/repos/${USER}/${REPO}`);
        expect(response.ok()).toBeTruthy();
    });


    for (const record of records as any[]) {
    
    // Inject the specific title into the test name to avoid duplicate title errors
    test(`Should create a feature request: ${record.title}`, async ({ request }) => {
        
        const newFeature = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: record.title,
            body: record.body,
        }
        });
        
    expect(newFeature.ok()).toBeTruthy();
    
    const featureData = await newFeature.json();

    // Verify the response data matches the current CSV row data
    expect(featureData).toMatchObject({
      title: record.title,
      body: record.body, 
    });
  });
}

})