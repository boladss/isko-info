import { test, expect } from '@playwright/test';

// IMPORTANT NOTE:
// These features rely on a LOCAL course policy database.
// These tests may fail depending on the contents of the database.

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

test('dept-profile: view editable profiles', async ({ page }) => {

  await testLoginStudent(page);
  await page.goto('http://localhost:3000/dept_profile');
  await expect(page.getByRole('link', { name: 'CS 192' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'CS 145' })).toBeVisible();

  await page.getByRole('link', { name: 'CS 192' }).click();
  await expect(page.getByText('Software Engineering II')).toBeVisible();

  await page.goto('http://localhost:3000/dept_profile');
  await page.getByRole('link', { name: 'CS 145' }).click();
  await expect(page.getByText('Computer Networks')).toBeVisible();
});

test('dept-profile: edit profiles', async ({ page }) => {
  await testLoginStudent(page);
  await page.goto('http://localhost:3000/dept_profile');
  await page.getByRole('link', { name: 'CS 192' }).click();
  await page.getByRole('link', { name: 'Edit Profile', exact: true }).click();
  await page.locator('#course_policy_prerogative_policy').click();
  await page.locator('#course_policy_prerogative_policy').press('Control+a');
  await page.locator('#course_policy_prerogative_policy').fill('Inputting test prerogative policy...');
  await page.getByRole('button', { name: 'Update Course policy' }).click();
  await expect(page.getByText('Inputting test prerogative')).toBeVisible();


  await page.getByRole('link', { name: 'Edit Profile', exact: true }).click();
  await page.getByText('Inputting test prerogative').click();
  await page.locator('#course_policy_prerogative_policy').press('Control+a');
  await page.locator('#course_policy_prerogative_policy').fill('\n');
  await page.locator('#trix-toolbar-1').getByRole('button', { name: 'Italic' }).click();
  await page.locator('#course_policy_prerogative_policy').fill('Test prerog policy');
  await page.getByRole('button', { name: 'Update Course policy' }).click();
  await expect(page.getByText('Test prerog policy')).toBeVisible();
});

test('dept-profile: discard edits', async ({ page }) => {
  await testLoginStudent(page);
  await page.goto('http://localhost:3000/dept_profile');
  await page.getByRole('link', { name: 'CS 145' }).click();
  await page.getByRole('link', { name: 'Edit Profile', exact: true }).click();
  await page.locator('#course_policy_other_information').click();
  await page.locator('#course_policy_other_information').press('Control+a');
  await page.locator('#course_policy_other_information').fill('The quick brown fox jumps over the lazy dog.');
  await page.getByRole('link', { name: 'Discard changes' }).click();
  await expect(page.getByText('Test other info')).toBeVisible();
});