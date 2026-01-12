import { test, expect } from '@playwright/test';

test.describe('Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the projects section to be visible
    await page.locator('#projects').scrollIntoViewIfNeeded();
  });

  test('should display projects section with heading', async ({ page }) => {
    const section = page.locator('#projects');
    await expect(section).toBeVisible();

    const heading = section.getByRole('heading', {
      name: /Featured Projects/i,
    });
    await expect(heading).toBeVisible();
  });

  test('should display project cards', async ({ page }) => {
    const cards = page.locator('[data-project-category]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter projects by category', async ({ page }) => {
    const filterButtons = page.locator('#projects-filters button');

    // Get second button (first is 'All')
    const webFilterButton = filterButtons.nth(1);
    const categoryName = await webFilterButton.getAttribute('data-filter');

    await webFilterButton.click();
    await expect(webFilterButton).toHaveAttribute('aria-pressed', 'true');

    // Wait for animation (300ms delay in script + buffer)
    await page.waitForTimeout(500);

    // Check that only selected category projects are visible
    const visibleCards = page.locator('[data-project-category]:visible');
    const count = await visibleCards.count();

    for (let i = 0; i < count; i++) {
      const category = await visibleCards
        .nth(i)
        .getAttribute('data-project-category');
      expect(category).toBe(categoryName);
    }

    // Switch back to All
    const allFilterButton = filterButtons.nth(0);
    await allFilterButton.click();
    await page.waitForTimeout(500);

    const allCards = page.locator('[data-project-category]:visible');
    expect(await allCards.count()).toBeGreaterThan(count);
  });

  test('should open and close project modal', async ({ page }) => {
    const firstCard = page.locator('[data-project-category]').first();

    // Hover to reveal overlay
    await firstCard.hover();

    const viewDetailsButton = firstCard.locator('button[data-project-details]');
    // Force click since it's in a hover overlay
    await viewDetailsButton.click({ force: true });

    // Modal should be visible
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    // Check if title is present in modal
    const modalTitle = modal.locator('#modal-title');
    await expect(modalTitle).not.toBeEmpty();

    // Close modal via button
    const closeButton = modal.getByLabel(/Close modal/i);
    await closeButton.click();

    await expect(modal).not.toBeVisible();

    // Re-open and close via Escape key
    await viewDetailsButton.click();
    await expect(modal).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // Check desktop layout (grid should be 3 columns on lg)
    await page.setViewportSize({ width: 1280, height: 800 });
    const grid = page.locator('#projects-grid');
    await expect(grid).toHaveClass(/lg:grid-cols-3/);

    // Check mobile layout (grid should be 1 column)
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(grid).toHaveClass(/grid-cols-1/);
  });
});
