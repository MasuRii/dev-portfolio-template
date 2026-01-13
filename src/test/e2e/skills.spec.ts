import { test, expect } from '@playwright/test';

test.describe('Skills Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the skills section to be visible
    await page.locator('#skills').scrollIntoViewIfNeeded();
  });

  test('should display skills section with heading', async ({ page }) => {
    const section = page.locator('#skills');
    await expect(section).toBeVisible();

    const heading = section.getByRole('heading', {
      name: /Technical Expertise/i,
    });
    await expect(heading).toBeVisible();
  });

  test('should display all skill categories by default', async ({ page }) => {
    const categories = page.locator('[data-skill-category]');
    const count = await categories.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter skills by category', async ({ page }) => {
    // Get first category name that isn't 'all'
    const filterButtons = page.locator('#skills-filters button');
    const firstCategoryButton = filterButtons.nth(1); // 0 is 'All'
    const categoryName = await firstCategoryButton.getAttribute('data-filter');

    await firstCategoryButton.click();
    await expect(firstCategoryButton).toHaveAttribute('aria-pressed', 'true');

    // Wait for animation (500ms delay in script)
    await page.waitForTimeout(600);

    // Check that only the selected category is visible
    const visibleCategories = page.locator('[data-skill-category]:visible');
    const visibleCount = await visibleCategories.count();
    expect(visibleCount).toBe(1);
    await expect(visibleCategories).toHaveAttribute(
      'data-skill-category',
      categoryName!
    );
  });

  test('should search skills by name', async ({ page }) => {
    const searchInput = page.getByLabel('Search skills');
    await searchInput.fill('React');

    // Wait for animation (300ms delay in script)
    await page.waitForTimeout(500);

    const visibleSkillCards = page.locator('[data-skill-name]:visible');
    const count = await visibleSkillCards.count();

    // Check that visible cards contain 'React' (case insensitive)
    for (let i = 0; i < count; i++) {
      const name = await visibleSkillCards
        .nth(i)
        .getAttribute('data-skill-name');
      expect(name?.toLowerCase()).toContain('react');
    }
  });

  test('should show no results message implicitly by hiding all categories', async ({
    page,
  }) => {
    const searchInput = page.getByLabel('Search skills');
    await searchInput.fill('NonExistentSkillXYZ');

    // Wait for animation (500ms delay in script)
    await page.waitForTimeout(1000);

    const visibleCategories = page.locator('[data-skill-category]:visible');
    await expect(visibleCategories).toHaveCount(0);
  });

  test('should be responsive', async ({ page }) => {
    // Check desktop layout (grid should be 2 columns on lg)
    await page.setViewportSize({ width: 1280, height: 800 });
    const grid = page.locator('#skills-grid');
    await expect(grid).toHaveClass(/lg:grid-cols-2/);

    // Check mobile layout (grid should be 1 column)
    await page.setViewportSize({ width: 375, height: 667 });
    // In Tailwind 4, it's grid-cols-1 by default
    await expect(grid).toHaveClass(/grid-cols-1/);
  });
});
