import { test, expect } from '@playwright/test';

test.describe('Experience Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the experience section to be visible
    await page.locator('#experience').scrollIntoViewIfNeeded();
  });

  test('should display experience section with heading', async ({ page }) => {
    const section = page.locator('#experience');
    await expect(section).toBeVisible();

    const heading = section.getByRole('heading', {
      name: /Professional Experience/i,
    });
    await expect(heading).toBeVisible();
  });

  test('should display experience entries', async ({ page }) => {
    const section = page.locator('#experience');
    // Each ExperienceEntry has a card with border-border bg-surface
    const entries = section.locator('.bg-surface');
    const count = await entries.count();
    expect(count).toBeGreaterThan(0);

    // Verify first entry details
    const firstEntry = entries.first();
    await expect(firstEntry.locator('h3')).not.toBeEmpty(); // Role
    await expect(firstEntry.locator('.text-lg')).not.toBeEmpty(); // Company
    await expect(firstEntry.locator('.text-sm.font-semibold')).not.toBeEmpty(); // Period
  });

  test('should be responsive', async ({ page }) => {
    // Check desktop layout (timeline line should be visible)
    await page.setViewportSize({ width: 1280, height: 800 });
    const timelineLine = page.getByTestId('timeline-line');
    await expect(timelineLine).toBeVisible();

    // Check mobile layout (timeline line should be hidden)
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(timelineLine).not.toBeVisible();
  });

  test('should have accessible structure', async ({ page }) => {
    const section = page.locator('#experience');

    // Check for semantic list for description items
    const descriptionList = section.locator('ul').first();
    await expect(descriptionList).toBeVisible();

    const listItems = descriptionList.locator('li');
    expect(await listItems.count()).toBeGreaterThan(0);

    // Check for skill tags
    const skillTags = section.locator('span.font-mono').first();
    await expect(skillTags).toBeVisible();
  });
});
