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

  await expect(page.getByRole('button', { name: 'College of Engineering' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'College of Arts and Letters' })).toBeVisible();
});

test('reg-helper: navigation', async ({ page }) => {
  await testLoginStudent(page);

  await page.goto('http://localhost:3000/reghelper');
  
  await page.getByRole('button', { name: 'College of Engineering' }).click();
  await page.getByRole('button', { name: 'Department of Computer Science' }).click();

  await page.getByRole('button', { name: 'CS 11 Computer Programming I' }).click();
  await expect(page.getByText('Description: Computer Programming I')).toBeVisible();
  await page.getByRole('link', { name: 'Go back' }).click();

  await page.getByRole('button', { name: 'CS 12 Computer Programming II' }).click();
  await expect(page.getByText('Description: Computer Programming II')).toBeVisible();
  await page.getByRole('link', { name: 'Go back' }).click();

  await page.getByRole('link', { name: 'Go back' }).click();
  await page.getByRole('link', { name: 'Go back' }).click();

  await page.getByRole('button', { name: 'College of Arts and Letters' }).click();
  await page.getByRole('button', { name: 'Department of Art Studies' }).click();

  await page.getByRole('button', { name: 'Art Stud 1 The Field of Art' }).click();
  await expect(page.getByText('Description: The Field of Art Studies')).toBeVisible();
  await page.getByRole('link', { name: 'Go back' }).click();

  await page.getByRole('link', { name: 'Go back' }).click();
  await page.getByRole('link', { name: 'Go back' }).click();

  await expect(page.getByRole('button', { name: 'College of Engineering' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'College of Arts and Letters' })).toBeVisible();
});

test('reg-helper: visit embedded Facebook post', async ({ page }) => {
  await testLoginStudent(page);
  await page.goto('http://localhost:3000/reghelper');
  
  await page.getByRole('button', { name: 'College of Engineering' }).click();
  await page.getByRole('button', { name: 'Department of Computer Science' }).click();

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
  async function navToDCS() {
    await page.goto('http://localhost:3000/reghelper');
    await page.getByRole('button', { name: 'College of Engineering' }).click();
    await page.getByRole('button', { name: 'Department of Computer Science' }).click();
  }
  
  await testLoginStudent(page);
  await navToDCS();

  // CS 11 & simulates class with slots
  await page.getByRole('button', { name: 'CS 11 Computer Programming I' }).click();
  await expect(page.getByText('Make Appeal')).not.toBeVisible();
  await expect(page.locator('body')).not.toContainText('students appealing for additional slots.');

  // CS 12 simulates class that has NO MORE SLOTS
  await page.getByRole('link', { name: 'Go back' }).click();
  await page.getByRole('button', { name: 'CS 12 Computer Programming II' }).click();

  await expect(page.locator('body')).toContainText('students appealing for additional slots.');
  await expect(page.getByRole('button', { name: 'Make Appeal' })).toBeVisible();
  await page.getByRole('button', { name: 'Make Appeal' }).click();
  await expect(page.getByRole('button', { name: 'Unsubmit Appeal' })).toBeVisible();
  await page.getByRole('button', { name: 'Logout' }).click();

  await testLoginStudent(page);
  await navToDCS();
  await page.getByRole('button', { name: 'CS 12 Computer Programming II' }).click();
  await expect(page.getByRole('button', { name: 'Unsubmit Appeal' })).toBeVisible();
  await page.getByRole('button', { name: 'Unsubmit Appeal' }).click();
  await expect(page.getByRole('button', { name: 'Make Appeal' })).toBeVisible();
});

test('reg-helper: favorite-ui', async ({ page }) => {
  await testLoginStudent(page);
  await page.goto('http://localhost:3000/reghelper');
  // await page.getByRole('img').nth(1).click();

  await page.getByRole('button', { name: 'College of Engineering' }).click();
  // await page.getByRole('img').nth(1).click();

  await page.getByRole('button', { name: 'Department of Computer Science' }).click();
  // await page.getByRole('img').nth(1).click();

  await page.getByRole('button', { name: 'CS 11 Computer Programming I' }).click();
  await page.getByRole('button', { name: 'Favorite' }).click();
  await expect(page.getByRole('button', { name: 'Favorited' })).toBeVisible();
  await page.getByRole('button', { name: 'Favorited' }).click();
  await expect(page.getByRole('button', { name: 'Favorite' })).toBeVisible();
});