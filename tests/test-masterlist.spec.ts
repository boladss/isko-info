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

test('masterlist: view masterlist', async ({ page }) => {
  await testLoginStudent(page);
  await page.goto('http://localhost:3000/masterlist');

  await expect(page.getByRole('heading', { name: 'UP Diliman Website Master List' })).toBeVisible();
  await page.getByRole('heading', { name: 'Campus-wide Directory' }).click();
  await page.getByRole('heading', { name: 'College-wide Directory' }).click();
  await page.getByRole('heading', { name: 'College of Engineering' }).click();
  await page.getByRole('cell', { name: 'upengg@coe.upd.edu.ph' }).click();
  await page.getByRole('heading', { name: 'Constituent Departments' }).click();
  await page.getByRole('cell', { name: 'Department of Computer Science' }).click();
  await page.getByRole('cell', { name: 'info@dcs.upd.edu.ph' }).click();
});

test('masterlist: redirects', async ({ page }) => {
  await testLoginStudent(page);
  await page.goto('http://localhost:3000/masterlist');
  
  await page.getByRole('row', { name: 'Office of the University Registrar' }).getByRole('link').click();
  await expect(page.getByRole('heading', { name: 'Office of the University Registrar' })).toBeVisible();

  await page.goto('http://localhost:3000/masterlist');
  await page.getByRole('link', { name: 'Facebook' }).nth(3).click();
  await expect(page.getByText('See more on Facebook').first()).toBeVisible();
  await page.getByLabel('Close').click();
  await expect(page.getByText('The Department of Computer Science is one of the eight departments')).toBeVisible();
});
