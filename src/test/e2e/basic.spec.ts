import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/MasuRii/);
});

test('hero section is visible', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('#hero');
  await expect(hero).toBeVisible();

  const name = page.getByText("I'm MasuRii");
  await expect(name).toBeVisible();
});

test('navigation works', async ({ page }) => {
  await page.goto('/');

  // Test smooth scroll to About (specifically in the header)
  const aboutLink = page
    .locator('#main-header')
    .getByRole('link', { name: 'About' });
  await aboutLink.click();

  // Wait for scroll
  await page.waitForTimeout(1000);

  const aboutSection = page.locator('#about');
  await expect(aboutSection).toBeInViewport();
});

test('about section content is visible', async ({ page }) => {
  await page.goto('/');
  const aboutSection = page.locator('#about');
  await expect(aboutSection).toBeVisible();

  const heading = aboutSection.getByRole('heading', { name: /About Me/i });
  await expect(heading).toBeVisible();

  // Verify bio content is present
  const bio = page.getByText(/I am a passionate Full Stack Developer/i);
  await expect(bio).toBeVisible();
});

test('theme toggle works', async ({ page }) => {
  await page.goto('/');

  const html = page.locator('html');
  const initialTheme = await html.getAttribute('class');

  const toggle = page.getByLabel(/Switch to (light|dark) mode/i);
  await toggle.click();

  const newTheme = await html.getAttribute('class');
  expect(newTheme).not.toBe(initialTheme);
});
