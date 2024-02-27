import { test, expect } from '@playwright/test';

test('signup: fill forms', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');
  await page.goto('http://127.0.0.1:3000/signup');
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('name name');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('placeholder@email.com');
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('password1234');
  await page.getByPlaceholder('Re-type Password').click();
  await page.getByPlaceholder('Re-type Password').fill('password1234');
  await expect(page.getByPlaceholder('Name')).toHaveValue('name name');
  await expect(page.getByPlaceholder('Email')).toHaveValue('placeholder@email.com');
  await expect(page.getByPlaceholder('Password', { exact: true })).toHaveValue('password1234');
  await expect(page.getByPlaceholder('Re-type Password')).toHaveValue('password1234');
});

test('signup: click signup', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');
  await page.goto('http://127.0.0.1:3000/signup');
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('name name');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('placeholder@email.com');
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('password1234');
  await page.getByPlaceholder('Re-type Password').click();
  await page.getByPlaceholder('Re-type Password').fill('password1234');
  await page.getByRole('link', { name: 'SIGNUP' }).click();
  await expect(page.getByText('Home Page')).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText('Home Page');
});
