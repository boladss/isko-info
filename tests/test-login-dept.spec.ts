import { test, expect } from '@playwright/test';

const USERNAME = "usertest";
const EMAIL = "dcs@gmail.com";
const PASSWORD = "SuperMage1";

test('login-dept: load page', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/logindept');
  await expect(page.getByText('Log in as Department')).toBeVisible();
});

test('login-dept: fill forms', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/logindept');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(EMAIL);
  await page.getByPlaceholder('Email').press('Enter');
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await expect(page.getByPlaceholder('Email')).toHaveValue(EMAIL);
  await expect(page.getByPlaceholder('Password')).toHaveValue(PASSWORD);
});

test('login-dept: click login', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/logindept');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(EMAIL); // Existing user in database used in test cases
  await page.getByPlaceholder('Email').press('Enter');
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByPlaceholder('Password').press('Enter');
  await expect(page.getByText('Welcome to IskoInfo!')).toBeVisible();
  await expect(page.locator('#profile')).toContainText(EMAIL);
  await page.getByRole('link', { name: 'Profile' }).click();
  await expect(page.locator('#name')).toContainText(EMAIL);
  await expect(page.getByText('Dashboard')).toBeVisible();
});

test('login-department: invalid password', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/logindept');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(EMAIL); // Existing user in database used in test cases
  await page.getByPlaceholder('Email').press('Enter');
  await page.getByPlaceholder('Password').fill("password5678"); // Incorrect password
  await page.getByPlaceholder('Password').press('Enter');
  await expect(page.getByText('Invalid email or password')).toBeVisible();
  await expect(page.getByPlaceholder('Email')).toBeEmpty(); // Resets form
  await expect(page.getByPlaceholder('Password')).toBeEmpty();
});

test('login-department: invalid email', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/logindept');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill("user2@test.com"); // Does not exist
  await page.getByPlaceholder('Email').press('Enter');
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByPlaceholder('Password').press('Enter');
  await expect(page.getByText('Invalid email or password')).toBeVisible();
  await expect(page.getByPlaceholder('Email')).toBeEmpty(); // Resets form
  await expect(page.getByPlaceholder('Password')).toBeEmpty();
});

test('login-department: unregistered username', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/logindept');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill("dcsfake@gmail.com"); // Does not exist
  await page.getByPlaceholder('Email').press('Enter');
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByPlaceholder('Password').press('Enter');
  await expect(page.getByText('Invalid email or password')).toBeVisible();
  await expect(page.getByPlaceholder('Email')).toBeEmpty(); // Resets form
  await expect(page.getByPlaceholder('Password')).toBeEmpty();
});

test('login-department: empty fields', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/logindept');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByText('Invalid email or password')).toBeVisible();
  await expect(page.getByPlaceholder('Email')).toBeEmpty(); // Resets form
  await expect(page.getByPlaceholder('Password')).toBeEmpty();
});
