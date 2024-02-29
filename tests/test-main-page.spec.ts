import { test, expect } from '@playwright/test';

test('main: load page', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');
  await expect(page.getByText('IskoInfo is a comprehensive')).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText('IskoInfo is a comprehensive online platform that aims to streamline information from all University of the Philippines Diliman units. It features a collation of all social media posts, a UPD website masterlist and registration information dissemination.');
});

test('main: click dept-login', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');
  await page.getByRole('link', { name: 'Login as Department' }).click();
  await expect(page.getByText('LOGIN AS DEPARTMENT')).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText('LOGIN AS DEPARTMENT');
});

test('main: click student-login', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');
  await page.getByRole('link', { name: 'Login as Student' }).click();
  await expect(page.getByText('LOGIN AS STUDENT')).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText('LOGIN AS STUDENT');
});

test('main: click student-signup', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');
  await page.getByRole('link', { name: 'No account yet? Sign up here' }).click();
  await expect(page.getByRole('paragraph')).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText('SIGNUP');
});