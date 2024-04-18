import { test, expect } from '@playwright/test';

const USERNAME = "usertest";
const EMAIL = "user@test.com";
const PASSWORD = "password1234";

async function testLoginStudent(page) {
  await page.goto('http://localhost:3000/loginstudent');

  await page.getByPlaceholder('Email or username').click();
  await page.getByPlaceholder('Email or username').fill(USERNAME); // Existing user in database used in test cases
  await page.getByPlaceholder('Email or username').press('Enter');
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByPlaceholder('Password').press('Enter');
}

test('reg-helper: view reg-helper', async ({ page }) => {
  await testLoginStudent(page);
  await page.goto('http://localhost:3000/reghelper');

  await expect(page.getByRole('button', { name: 'Department of Computer Science' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Department of Art Studies' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Department of Filipino and' })).toBeVisible();
});

test('reg-helper: navigation', async ({ page }) => {
  await testLoginStudent(page);

  await page.goto('http://localhost:3000/home');
  await page.getByRole('link', { name: 'Registration Helper' }).click();

  await page.getByRole('button', { name: 'Department of Computer Science' }).click();

  await page.getByRole('button', { name: 'CS11 - 4.0 UNITS' }).click();
  await expect(page.getByText('Computer Programming I')).toBeVisible();
  await page.getByRole('link', { name: 'Go back' }).click();

  await page.getByRole('button', { name: 'CS12 - 4.0 UNITS' }).click();
  await expect(page.getByText('Computer Programming II')).toBeVisible();
  await page.getByRole('link', { name: 'Go back' }).click();
  
  await page.getByRole('link', { name: 'Go back' }).click();

  await page.getByRole('button', { name: 'Department of Art Studies' }).click();
  await page.getByRole('button', { name: 'AS50 - 3.0 UNITS The Field of' }).click();
  await expect(page.getByText('The Field of Art Studies')).toBeVisible();
  await page.getByRole('link', { name: 'Go back' }).click();
  await page.getByRole('link', { name: 'Go back' }).click();

  await expect(page.getByRole('button', { name: 'Department of Art Studies' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Department of Filipino and' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Department of Computer Science' })).toBeVisible();
});

test('reg-helper: visit embedded Facebook post', async ({ page }) => {
  await testLoginStudent(page);
  await page.goto('http://localhost:3000/deptcs');

  await expect(page.frameLocator('iframe').getByText('UP Diliman Department of Computer Science')).toBeVisible();
  await expect(page.frameLocator('iframe').getByText('The Department of Computer Science is proud to announce')).toBeVisible();
  
  const fbPagePromise = page.waitForEvent('popup');
  await page.frameLocator('iframe').getByText('UP Diliman Department of Computer Science').click();
  const fbPage = await fbPagePromise;
  await expect(fbPage.getByText('See more on Facebook').first()).toBeVisible();
  await fbPage.getByLabel('Close').click();
  await expect(fbPage.getByText('The Department of Computer Science is proud to announce')).toBeVisible();
});

test('reg-helper: appeal', async ({ page }) => {
  await testLoginStudent(page);

  // CS 11 & AS 50 simulates class that has NO MORE SLOTS
  await page.goto('http://localhost:3000/CS11');
  await page.getByRole('button', { name: 'Request for Appeal' }).click();
  await expect(page.getByText('for the course CS 11')).toBeVisible();

  await page.goto('http://localhost:3000/AS50');
  await page.getByRole('button', { name: 'Request for Appeal' }).click();
  await expect(page.getByText('for the course AS 50')).toBeVisible();

  // CS 12 simulates class that STILL HAS SLOTS
  await page.goto('http://localhost:3000/CS12');
  await expect(page.getByText('5 out of 115 slots')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Request for Appeal' })).toBeDisabled();
});