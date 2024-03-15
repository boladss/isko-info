import { test, expect } from '@playwright/test';

const NAME_LEN = 8;
const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";
const PASSWORD = "password1234"; // test password can be constant

function randomUsername() {
  let username = 'user';
  for (let i = 0; i < NAME_LEN; i++) username += CHARS[Math.floor(Math.random() * CHARS.length)];
  return username;
}

test('signup: fill forms', async ({ page }) => {
  let username = randomUsername();
  let email = username + "@email.com";

  await page.goto('http://127.0.0.1:3000/signup');
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill(username);
  await page.getByPlaceholder('Name').press('Enter');
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Email').press('Enter');
  await page.getByPlaceholder('Password', { exact: true }).fill(PASSWORD);
  await page.getByPlaceholder('Password', { exact: true }).press('Enter');
  await page.getByPlaceholder('Re-type Password').fill(PASSWORD);
  await expect(page.getByPlaceholder('Name')).toHaveValue(username);
  await expect(page.getByPlaceholder('Email')).toHaveValue(email);
  await expect(page.getByPlaceholder('Password', { exact: true })).toHaveValue(PASSWORD);
  await expect(page.getByPlaceholder('Re-type Password')).toHaveValue(PASSWORD);
});

test('signup: click signup', async ({ page }) => {
  let username = randomUsername();
  let email = username + "@email.com";

  await page.goto('http://127.0.0.1:3000/signup');
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill(username);
  await page.getByPlaceholder('Name').press('Enter');
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Email').press('Enter');
  await page.getByPlaceholder('Password', { exact: true }).fill(PASSWORD);
  await page.getByPlaceholder('Password', { exact: true }).press('Enter');
  await page.getByPlaceholder('Re-type Password').fill(PASSWORD);
  await page.getByPlaceholder('Re-type Password').press('Enter');
  await expect(page.getByRole('heading', { name: 'Welcome to IskoInfo!' })).toBeVisible();
  await expect(page.locator('#profile')).toContainText(email);
});

test('signup: username too short', async ({ page }) => {
  let username = "short";
  let email = username + "@email.com";

  await page.goto('http://127.0.0.1:3000/signup');
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill(username);
  await page.getByPlaceholder('Name').press('Enter');
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Email').press('Enter');
  await page.getByPlaceholder('Password', { exact: true }).fill(PASSWORD);
  await page.getByPlaceholder('Password', { exact: true }).press('Enter');
  await page.getByPlaceholder('Re-type Password').fill(PASSWORD);
  await page.getByPlaceholder('Re-type Password').press('Enter');

  await expect(page.getByText('Username should be at least 8 characters')).toBeVisible();

  await expect(page.getByPlaceholder('Name')).toBeEmpty(); // Resets form
  await expect(page.getByPlaceholder('Email')).toBeEmpty();
  await expect(page.getByPlaceholder('Password', { exact: true })).toBeEmpty();
  await expect(page.getByPlaceholder('Re-type Password')).toBeEmpty();
});

test('signup: invalid username characters', async ({ page }) => {
  let username = "!@#$%!@#$";
  let email = "usertest4@email.com";

  await page.goto('http://127.0.0.1:3000/signup');
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill(username);
  await page.getByPlaceholder('Name').press('Enter');
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Email').press('Enter');
  await page.getByPlaceholder('Password', { exact: true }).fill(PASSWORD);
  await page.getByPlaceholder('Password', { exact: true }).press('Enter');
  await page.getByPlaceholder('Re-type Password').fill(PASSWORD);
  await page.getByPlaceholder('Re-type Password').press('Enter');

  await expect(page.getByText('alphanumeric')).toBeVisible();

  await expect(page.getByPlaceholder('Name')).toBeEmpty(); // Resets form
  await expect(page.getByPlaceholder('Email')).toBeEmpty();
  await expect(page.getByPlaceholder('Password', { exact: true })).toBeEmpty();
  await expect(page.getByPlaceholder('Re-type Password')).toBeEmpty();
});

test('signup: password too short', async ({ page }) => {
  let username = "usertest3";
  let email = username + "@email.com";

  await page.goto('http://127.0.0.1:3000/signup');
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill(username);
  await page.getByPlaceholder('Name').press('Enter');
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Email').press('Enter');
  await page.getByPlaceholder('Password', { exact: true }).fill("1234");
  await page.getByPlaceholder('Password', { exact: true }).press('Enter');
  await page.getByPlaceholder('Re-type Password').fill("1234");
  await page.getByPlaceholder('Re-type Password').press('Enter');

  await expect(page.getByText('Password should be at least 8 characters')).toBeVisible();

  await expect(page.getByPlaceholder('Name')).toBeEmpty(); // Resets form
  await expect(page.getByPlaceholder('Email')).toBeEmpty();
  await expect(page.getByPlaceholder('Password', { exact: true })).toBeEmpty();
  await expect(page.getByPlaceholder('Re-type Password')).toBeEmpty();
});