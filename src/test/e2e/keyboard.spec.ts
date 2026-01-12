import { test, expect, type Page } from '@playwright/test';

async function waitForLoader(page: Page) {
  // Wait for loader to be hidden or removed
  const loader = page.locator('#loader');
  await expect(loader).not.toBeVisible({ timeout: 10000 });
}

test.describe('Keyboard Navigation', () => {
  test('should be able to navigate via skip link', async ({ page }) => {
    await page.goto('/');
    await waitForLoader(page);

    // Press Tab to focus skip link
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: /Skip to main content/i });
    await expect(skipLink).toBeFocused();

    // Press Enter and check if URL hash updated
    await page.keyboard.press('Enter');
    expect(page.url()).toContain('#main-content');
  });

  test('should be able to navigate through main navigation links', async ({
    page,
  }) => {
    await page.goto('/');
    await waitForLoader(page);

    // Tab through header elements
    // 1. Skip link
    await page.keyboard.press('Tab');

    // 2. Logo
    await page.keyboard.press('Tab');
    const focusedLogo = await page.evaluate(
      () => document.activeElement?.textContent
    );
    console.log('Focused element after 2 tabs:', focusedLogo);
    const logo = page
      .locator('#main-header')
      .getByRole('link', { name: 'MasuRii.' });
    await expect(logo).toBeFocused();

    // 3. Nav links (Desktop)
    await page.keyboard.press('Tab'); // Work
    await page.waitForTimeout(200);
    const focused3 = await page.evaluate(
      () => document.activeElement?.textContent
    );
    console.log('Focused element after 3 tabs:', focused3);
    const firstNavLink = page
      .locator('#main-header')
      .getByRole('link', { name: /Work/i });
    await expect(firstNavLink).toBeFocused();

    await page.keyboard.press('Tab'); // Skills
    await page.keyboard.press('Tab'); // Experience
    await page.keyboard.press('Tab'); // Blog
    await page.keyboard.press('Tab'); // About
    await page.keyboard.press('Tab'); // Contact

    // 4. Theme Toggle
    await page.keyboard.press('Tab');
    const themeToggle = page.getByRole('button', {
      name: /Switch to (light|dark) mode/i,
    });
    await expect(themeToggle).toBeFocused();
  });

  test('mobile menu should trap focus when open', async ({ page }) => {
    // Set viewport to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await waitForLoader(page);

    const menuToggle = page.getByLabel('Toggle mobile menu');
    await menuToggle.click();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');

    // Give it time for our JS focus logic to run
    await page.waitForTimeout(500);

    // After clicking toggle, focus should move to first link in mobile menu (per our fix)
    const firstMobileLink = page
      .locator('#mobile-menu')
      .getByRole('link', { name: /Work/i });
    await expect(firstMobileLink).toBeFocused();

    // Verify background elements are inert
    const main = page.locator('main');
    await expect(main).toHaveAttribute('inert', '');

    const footer = page.locator('footer');
    await expect(footer).toHaveAttribute('inert', '');

    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toHaveAttribute('inert', '');

    // Close menu
    await page.keyboard.press('Escape'); // Wait, does Escape work?
    // We didn't implement Escape explicitly but let's check if clicking toggle again works
    await menuToggle.click();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

    // Verify inert is removed
    await expect(main).not.toHaveAttribute('inert', '');
    await expect(footer).not.toHaveAttribute('inert', '');
  });
});
