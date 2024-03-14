import { test, expect } from '@playwright/test';

const USERNAME = "usertest";
const EMAIL = "user@test.com";
const PASSWORD = "password1234";

test('login-student: load page', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/loginstudent');
  await expect(page.getByText('Log in as Student')).toBeVisible();
  await expect(page.getByRole('heading')).toContainText('Log in as Student');
});

test('login-student: fill forms', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/loginstudent');
  await page.getByPlaceholder('Email or username').click();
  await page.getByPlaceholder('Email or username').fill(USERNAME);
  await page.getByPlaceholder('Email or username').press('Enter');
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await expect(page.getByPlaceholder('Username')).toHaveValue(USERNAME);
  await expect(page.getByPlaceholder('Password')).toHaveValue(PASSWORD);
});

test('login-student: click login', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/loginstudent');
  await page.getByPlaceholder('Email or username').click();
  await page.getByPlaceholder('Email or username').fill(USERNAME); // Existing user in database used in test cases
  await page.getByPlaceholder('Email or username').press('Enter');
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByPlaceholder('Password').press('Enter');
  await expect(page.getByRole('heading', { name: 'Welcome to IskoInfo!' })).toBeVisible();
  await expect(page.locator('#profile')).toContainText(EMAIL);
  await page.getByRole('button', { name: 'Home' }).click();
  await expect(page.locator('#name')).toContainText(EMAIL);
  await expect(page.getByText('Dashboard')).toBeVisible();
});
