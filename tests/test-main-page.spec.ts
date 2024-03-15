import { test, expect } from '@playwright/test';

test('main: load page', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');
  await expect(page.getByText('IskoInfo is a comprehensive online platform')).toBeVisible();
});

test('main: click dept-login', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');
  await page.getByRole('link', { name: 'Log in as Department' }).click();
  await expect(page.getByText('Log in as Department')).toBeVisible();
});

test('main: click student-login', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');
  await page.getByRole('link', { name: 'Log in as Student' }).click();
  await expect(page.getByText('Log in as Student')).toBeVisible();
});

test('main: click student-signup', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');
  await page.getByRole('link', { name: 'No account yet? Sign up here' }).click();
});