import { test, expect } from '@playwright/test';

test('login-dept: load page', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/logindept');
  await expect(page.getByText('LOGIN AS DEPARTMENT')).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText('LOGIN AS DEPARTMENT');
});

test('login-dept: fill forms', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/logindept');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('username1234');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('password5678');
  await expect(page.getByPlaceholder('Username')).toHaveValue('username1234');
  await expect(page.getByPlaceholder('Password')).toHaveValue('password5678');
});

test('login-dept: click login', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/logindept');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('username1234');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('password5678');
  await page.getByRole('link', { name: 'LOGIN' }).click();
  await expect(page.getByText('Home Page')).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText('Home Page');
});