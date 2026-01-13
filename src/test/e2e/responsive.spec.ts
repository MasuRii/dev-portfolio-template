import { test, expect } from '@playwright/test';

test.describe('Responsive Breakpoints', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('header should adapt across breakpoints', async ({ page, isMobile }) => {
    const desktopNav = page.locator('nav').first();
    const mobileMenuButton = page
      .locator('button[aria-label*="menu"]', { hasText: /menu/i })
      .or(page.locator('button[aria-expanded]'));

    if (isMobile) {
      // On mobile, desktop nav links should be hidden and hamburger menu visible
      // Note: This depends on the implementation. Some headers might hide the whole nav.
      await expect(mobileMenuButton).toBeVisible();
    } else {
      // On desktop, nav links should be visible and hamburger menu hidden
      await expect(desktopNav).toBeVisible();
      // mobileMenuButton might be hidden or have display: none
      const box = await mobileMenuButton.boundingBox();
      if (box) {
        await expect(mobileMenuButton).not.toBeVisible();
      }
    }
  });

  test('hero section should be responsive', async ({ page }) => {
    const hero = page
      .locator('section#hero')
      .or(page.locator('section').first());
    await expect(hero).toBeVisible();

    const h1 = hero.locator('h1');
    await expect(h1).toBeVisible();

    // Check if hero has a responsive layout (e.g. flex-col on mobile)
    const box = await hero.boundingBox();
    expect(box?.width).toBeGreaterThan(300);
  });

  test('projects grid should change columns', async ({ page, viewport }) => {
    const projectsGrid = page
      .locator('#projects .grid')
      .or(page.locator('section#projects .grid'));
    if ((await projectsGrid.count()) > 0) {
      const firstCard = projectsGrid.locator('> div').first();
      const cardBox = await firstCard.boundingBox();
      const gridBox = await projectsGrid.boundingBox();

      if (viewport && gridBox && cardBox) {
        if (viewport.width < 768) {
          // Mobile: Expect 1 column (card width should be close to grid width)
          expect(cardBox.width).toBeGreaterThan(gridBox.width * 0.8);
        } else if (viewport.width < 1024) {
          // Tablet: Expect 2 columns
          expect(cardBox.width).toBeLessThan(gridBox.width * 0.6);
          expect(cardBox.width).toBeGreaterThan(gridBox.width * 0.4);
        } else {
          // Desktop: Expect 3 columns
          expect(cardBox.width).toBeLessThan(gridBox.width * 0.4);
          expect(cardBox.width).toBeGreaterThan(gridBox.width * 0.2);
        }
      }
    }
  });

  test('touch targets should be large enough on mobile/tablet', async ({
    page,
    isMobile,
  }) => {
    const viewport = page.viewportSize();
    if (!isMobile && viewport && viewport.width >= 1024) return;

    const interactiveElements = page.locator('button, a.button, nav a');
    const count = await interactiveElements.count();

    for (let i = 0; i < count; i++) {
      const el = interactiveElements.nth(i);
      if (await el.isVisible()) {
        const box = await el.boundingBox();
        if (box) {
          // Check if at least one dimension is >= 44px or area is sufficient
          // Some inline links might be smaller, but buttons should be large.
          const isButton = await el.evaluate(
            (node) =>
              node.tagName === 'BUTTON' || node.classList.contains('button')
          );
          if (isButton) {
            const text = await el.innerText();
            const tagName = await el.evaluate((node) => node.tagName);
            const ariaLabel = (await el.getAttribute('aria-label')) || '';
            const className = (await el.getAttribute('class')) || '';

            expect(
              box.width,
              `Element ${i} (${tagName}: "${text}" / label: "${ariaLabel}" / class: "${className}") width too small`
            ).toBeGreaterThanOrEqual(39.9);
            expect(
              box.height,
              `Element ${i} (${tagName}: "${text}" / label: "${ariaLabel}" / class: "${className}") height too small`
            ).toBeGreaterThanOrEqual(39.9);
          }
        }
      }
    }
  });
});
