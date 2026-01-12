import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // Pre-accept cookie consent to avoid interception
  await page.evaluate(() => {
    localStorage.setItem('cookie-consent', 'accepted');
  });
  await page.reload(); // Reload to apply consent
});

test('has title', async ({ page }) => {
  // page.goto is already handled in beforeEach
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/MasuRii/);
});

test('hero section is visible', async ({ page }) => {
  const hero = page.locator('#hero');
  await expect(hero).toBeVisible();

  const name = page.getByText("I'm MasuRii");
  await expect(name).toBeVisible();
});

test('navigation works', async ({ page, isMobile }) => {
  if (isMobile) {
    const toggle = page.getByLabel('Toggle mobile menu');
    await expect(toggle).toBeVisible();

    // Click and wait for state change
    await toggle.click();

    // Wait for the menu to be visible (not transparent or translated)
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).not.toHaveClass(/translate-x-full/, {
      timeout: 10000,
    });
    await expect(mobileMenu).not.toHaveClass(/opacity-0/);

    // Check that we can find the link in the menu
    const header = page.locator('#mobile-menu');
    const aboutLink = header.getByRole('link', { name: 'About' });
    await expect(aboutLink).toBeVisible({ timeout: 10000 });
    await aboutLink.click();
  } else {
    // Desktop navigation
    const header = page.locator('#main-header');
    const aboutLink = header
      .getByRole('navigation', { name: 'Desktop navigation' })
      .getByRole('link', { name: 'About' });
    await aboutLink.click();
  }

  // Wait for scroll
  await page.waitForTimeout(1000);

  const aboutSection = page.locator('#about');
  await expect(aboutSection).toBeInViewport();
});

test('about section content is visible', async ({ page }) => {
  const aboutSection = page.locator('#about');
  await expect(aboutSection).toBeVisible();

  const heading = aboutSection.getByRole('heading', { name: /About Me/i });
  await expect(heading).toBeVisible();

  // Verify bio content is present
  const bio = page.getByText(/I am a passionate Full Stack Developer/i);
  await expect(bio).toBeVisible();
});

test('theme toggle works', async ({ page }) => {
  const html = page.locator('html');
  const initialTheme = await html.getAttribute('class');

  const toggle = page.getByLabel(/Switch to (light|dark) mode/i);
  await toggle.click();

  const newTheme = await html.getAttribute('class');
  expect(newTheme).not.toBe(initialTheme);
});
