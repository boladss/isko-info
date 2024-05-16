import { test, expect } from '@playwright/test';

// IMPORTANT NOTE:
// These features rely on a LOCAL course policy database.
// These tests may fail depending on the contents of the database.

// const USERNAME = "dcs";
const EMAIL = "dcs@gmail.com";
const PASSWORD = "SuperMage1"; // thank u fadri

async function testLoginDepartment(page) {
  await page.goto('http://localhost:3000/logindept');

  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(EMAIL); // Existing user in database used in test cases
  await page.getByPlaceholder('Email').press('Enter');
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByPlaceholder('Password').press('Enter');
}

test('dept-profile: view courses', async ({ page }) => {
  await testLoginDepartment(page);

  await page.getByRole('link', { name: 'Profile' }).click();
  await page.getByRole('link', { name: 'View Courses' }).click();

  await page.getByRole('link', { name: 'CS 192' }).click();
  await expect(page.getByText('Software Engineering II')).toBeVisible();
  await expect(page.getByText('students appealing for additional slots.')).toBeVisible();

  await page.getByRole('link', { name: 'Return to courses' }).click();
  await page.getByRole('link', { name: 'CS 145' }).click();
  await expect(page.getByText('Computer Networks')).toBeVisible();
  await expect(page.getByText('students appealing for additional slots.')).not.toBeVisible();
});

test('dept-profile: edit profiles', async ({ page }) => {
  await testLoginDepartment(page);
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.getByRole('link', { name: 'View Courses' }).click();
  await page.getByRole('link', { name: 'CS 192' }).click();
  await page.getByRole('link', { name: 'Edit Course', exact: true }).click();
  await page.locator('#course_policy_prerogative_policy').click();
  await page.locator('#course_policy_prerogative_policy').press('Control+a');
  await page.locator('#course_policy_prerogative_policy').fill('Inputting test prerogative policy...');
  await page.getByRole('button', { name: 'Update Course policy' }).click();
  await expect(page.getByText('Inputting test prerogative')).toBeVisible();

  await page.getByRole('link', { name: 'Edit Course', exact: true }).click();
  await page.getByText('Inputting test prerogative').click();
  await page.locator('#course_policy_prerogative_policy').press('Control+a');
  await page.locator('#course_policy_prerogative_policy').fill('\n');
  await page.locator('#trix-toolbar-1').getByRole('button', { name: 'Italic' }).click();
  await page.locator('#course_policy_prerogative_policy').fill('Test prerog policy');
  await page.getByRole('button', { name: 'Update Course policy' }).click();
  await expect(page.getByText('Test prerog policy')).toBeVisible();
});

test('dept-profile: discard edits', async ({ page }) => {
  await testLoginDepartment(page);
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.getByRole('link', { name: 'View Courses' }).click();
  await page.getByRole('link', { name: 'CS 145' }).click();
  await page.getByRole('link', { name: 'Edit Course', exact: true }).click();
  await page.locator('#course_policy_other_information').click();
  await page.locator('#course_policy_other_information').press('Control+a');
  await page.locator('#course_policy_other_information').fill('The quick brown fox jumps over the lazy dog.');
  await page.getByRole('link', { name: 'Discard changes' }).click();
  await expect(page.getByText('Test other info')).toBeVisible();
});

test('dept-profile: update and discard department policy', async ({ page }) => {
  await testLoginDepartment(page);
  await page.getByRole('link', { name: 'Profile' }).click();
  // Update
  await page.getByRole('link', { name: 'Edit Department Policies' }).click();
  await page.locator('#department_department_policy').click();
  await page.locator('#department_department_policy').press('Control+a');
  await page.locator('#department_department_policy').fill('Inputting test department policy...');
  await page.getByRole('button', { name: 'Update Department' }).click();
  await expect(page.getByText('Inputting test department')).toBeVisible();

  await page.getByRole('link', { name: 'Edit Department Policies' }).click();
  await page.locator('#department_department_policy').click();
  await page.locator('#department_department_policy').press('Control+a');
  await page.locator('#department_department_policy').fill('Strictly no teacher\'s prerogative. Kindly waitlist and email your respective registration emails for registration matters. Please observe proper email etiquette. Non-compliant emails will not be entertained.\n\nBatch 2020: batch2020reg@gmail.com | Adviser: Sir Zuniga \nBatch 2021: batch2021reg@gmail.com | Adviser: Maam Ordanel \nBatch 2022: batch2022reg@gmail.com | Adviser: Maam Juayong \nBatch 2023: batch2023reg@gmail.com | Adviser: Sir Beltran');
  await page.getByRole('button', { name: 'Update Department' }).click();
  await expect(page.getByText('Strictly no teacher\'s')).toBeVisible();

  // Discard changes
  await page.getByRole('link', { name: 'Edit Department Policies' }).click();
  await page.locator('#department_department_policy').click();
  await page.locator('#department_department_policy').press('Control+a');
  await page.locator('#department_department_policy').fill('This should not be visible.');
  await page.getByRole('link', { name: 'Discard changes' }).click();
  await expect(page.getByText('Strictly no teacher\'s')).toBeVisible();
});

test('dept-profile: add and delete courses', async ({ page }) => {
  await testLoginDepartment(page);
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.getByRole('link', { name: 'View Courses' }).click();
  await page.getByRole('link', { name: 'New Course' }).click();
  await page.locator('#course_policy_course_title').click();
  await page.locator('#course_policy_course_title').fill('TEST');
  await page.locator('#course_policy_course_description').click();
  await page.locator('#course_policy_course_description').fill('Test');
  await page.locator('#course_policy_prerogative_policy').click();
  await page.locator('#course_policy_prerogative_policy').fill('a');
  await page.locator('#course_policy_waitlisting_schedule').click();
  await page.locator('#course_policy_waitlisting_schedule').fill('b');
  await page.locator('#course_policy_cancellation_procedure').click();
  await page.locator('#course_policy_cancellation_procedure').fill('c');
  await page.locator('#course_policy_other_information').click();
  await page.locator('#course_policy_other_information').fill('d');
  await page.getByRole('button', { name: 'Create Course policy' }).click();
  await page.getByRole('link', { name: 'Return to courses' }).click();
  await expect(page.getByRole('heading', { name: 'Edit Courses' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'TEST' })).toBeVisible();

  await page.getByRole('link', { name: 'TEST' }).click();
  await page.getByRole('button', { name: 'Delete Course' }).click();
  await expect(page.getByText('Are you sure you want to')).toBeVisible();
  await page.getByText('Cancel', { exact: true }).click();
  await expect(page.getByText('Course Title: TEST')).toBeVisible();

  await page.getByRole('button', { name: 'Delete Course' }).click();
  await page.locator('#confirmDelete').getByRole('button', { name: 'Delete Course' }).click();
  await expect(page.getByRole('link', { name: 'TEST' })).toBeHidden();
});