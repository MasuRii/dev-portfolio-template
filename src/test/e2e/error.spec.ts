import { test, expect } from '@playwright/test';

test.describe('Error Pages', () => {
  test('404 page renders correctly', async ({ page }) => {
    // Navigate to a non-existent page
    await page.goto('/this-page-does-not-exist');

    // Check for 404 heading
    const heading = page.getByRole('heading', { name: '404', exact: true });
    await expect(heading).toBeVisible();

    // Check for friendly message
    const subHeading = page.getByText(/Lost in the Cyber Void/i);
    await expect(subHeading).toBeVisible();

    const description = page.getByText(/unmapped sector of my portfolio/i);
    await expect(description).toBeVisible();

    // Check for "Return to Base" button
    const returnButton = page.getByRole('link', { name: /Return to Base/i });
    await expect(returnButton).toBeVisible();
    await expect(returnButton).toHaveAttribute('href', '/');
  });

  test('navigation from 404 page works', async ({ page }) => {
    // Navigate to a non-existent page
    await page.goto('/some-random-broken-link');

    // Click "Return to Base"
    const returnButton = page.getByRole('link', { name: /Return to Base/i });
    await returnButton.click();

    // Verify navigation to home page
    await expect(page).toHaveURL('/');

    // Verify hero section is visible on home page
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
  });
});
