import { test, expect } from '@playwright/test';

test.describe('Blog Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the blog section to be visible
    await page.locator('#blog').scrollIntoViewIfNeeded();
  });

  test('should display blog section with heading', async ({ page }) => {
    const section = page.getByTestId('blog-section');
    await expect(section).toBeVisible();

    const heading = section.getByRole('heading', {
      name: /Latest Insights/i,
    });
    await expect(heading).toBeVisible();
  });

  test('should display blog post cards', async ({ page }) => {
    const cards = page.getByTestId('blog-card');
    const count = await cards.count();
    expect(count).toBe(3); // Based on blog.json

    // Verify first card details
    const firstCard = cards.first();
    await expect(firstCard.locator('h3')).not.toBeEmpty();
    await expect(firstCard.locator('p')).not.toBeEmpty();
    await expect(firstCard.locator('time')).not.toBeEmpty();
    await expect(firstCard.locator('img')).toBeVisible();

    // Check tags
    const tags = firstCard.locator('span');
    expect(await tags.count()).toBeGreaterThan(0);
  });

  test('should be responsive', async ({ page }) => {
    const grid = page.locator('#blog .grid');

    // Check desktop layout (grid with 3 columns)
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(grid).toHaveClass(/lg:grid-cols-3/);

    // Check mobile layout (grid with 1 column)
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(grid).toHaveClass(/grid-cols-1/);
  });

  test('should have accessible links', async ({ page }) => {
    const cards = page.getByTestId('blog-card');
    const firstCardLink = cards.first().locator('a');

    // Check if the link has an absolute inset overlay for whole-card clicking
    await expect(firstCardLink.locator('span.absolute.inset-0')).toBeAttached();

    // "View All Articles" link
    const viewAllLink = page.getByRole('link', { name: /View All Articles/i });
    await expect(viewAllLink).toBeVisible();
  });
});
