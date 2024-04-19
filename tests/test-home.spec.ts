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

test('home: view dashboard', async ({ page }) => {
  await testLoginStudent(page);

  await page.goto('http://localhost:3000/home');

  await expect(page.getByText('Dashboard')).toBeVisible();
  await expect(page.locator('#name')).toContainText(EMAIL);
});

test('home: logout successfully', async ({ page }) => {
  await testLoginStudent(page);

  await page.goto('http://localhost:3000/home');
  
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page.getByText('IskoInfo is a comprehensive')).toBeVisible(); // Should be brought back to landing page
});

test('home: access page without logging in', async ({ page }) => {
  await page.goto('http://localhost:3000/home'); // Should redirect to /loginstudent 
  await expect(page.getByText('Log in as Student')).toBeVisible();
  await expect(page.getByText('You must be logged in')).toBeVisible();
});
