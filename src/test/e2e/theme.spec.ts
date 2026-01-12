import { test, expect } from '@playwright/test';

test.describe('Theme Switching', () => {
  test('should default to light mode if no preference is set', async ({
    page,
  }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).not.toHaveClass(/dark/);
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  test('should toggle theme when button is clicked', async ({ page }) => {
    await page.goto('/');
    const themeToggle = page.locator('button[aria-label^="Switch to"]');

    // Initial state: light
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Toggle to dark
    await themeToggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // Toggle back to light
    await themeToggle.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('should respect system preference (dark)', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('should persist theme preference across reloads', async ({ page }) => {
    await page.goto('/');
    const themeToggle = page.locator('button[aria-label^="Switch to"]');

    // Toggle to dark
    await themeToggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Reload
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('should have sufficient contrast in dark mode', async ({ page }) => {
    await page.goto('/');
    const themeToggle = page.locator('button[aria-label^="Switch to"]');
    await themeToggle.click();

    // Check background and text colors in dark mode
    const body = page.locator('body');
    const backgroundColor = await body.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor
    );
    const textColor = await body.evaluate(
      (el) => window.getComputedStyle(el).color
    );

    // #0a0a0b is approx rgb(10, 10, 11)
    expect(backgroundColor).toBe('rgb(10, 10, 11)');
    // #f9fafb is approx rgb(249, 250, 251)
    expect(textColor).toBe('rgb(249, 250, 251)');
  });
});
