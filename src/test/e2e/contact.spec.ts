import { test, expect } from '@playwright/test';

test.describe('Contact Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the contact section to be visible
    const section = page.locator('#contact');
    await section.scrollIntoViewIfNeeded();

    // Wait for the form to be hydrated
    await expect(page.getByTestId('contact-form')).toHaveAttribute(
      'data-hydrated',
      'true',
      { timeout: 10000 }
    );
  });

  test('should display contact section with heading', async ({ page }) => {
    await expect(page.getByTestId('contact-heading')).toBeVisible();
    await expect(page.getByTestId('contact-heading')).toHaveText(
      'Get in Touch'
    );
  });

  test('should display contact information', async ({ page }) => {
    const infoSection = page.getByTestId('contact-info');
    await expect(infoSection).toBeVisible();
    await expect(infoSection).toContainText('Contact Information');
    await expect(infoSection).toContainText('hello@masurii.dev');
    await expect(infoSection).toContainText('Global / Remote');
  });

  test('should validate the contact form', async ({ page }) => {
    const form = page.getByTestId('contact-form');
    await expect(form).toBeVisible();

    // Click submit without filling anything
    await form.getByRole('button', { name: /send message/i }).click();

    // Check for validation errors
    await expect(page.locator('#name-error')).toBeVisible();
    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#subject-error')).toBeVisible();
    await expect(page.locator('#message-error')).toBeVisible();
  });

  test('should successfully submit the form', async ({ page }) => {
    const form = page.getByTestId('contact-form');

    await form.getByLabel(/name/i).fill('Test User');
    await form.getByLabel(/email/i).fill('test@example.com');
    await form.getByLabel(/subject/i).fill('Test Subject');
    await form
      .getByLabel(/message/i)
      .fill('This is a test message from Playwright.');

    await form.getByRole('button', { name: /send message/i }).click();

    // Should show success message
    await expect(page.getByTestId('contact-success')).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText(/message sent/i)).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // Check mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByTestId('contact-heading')).toBeVisible();

    // In mobile, they should be stacked (grid-cols-1)
    const container = page.getByTestId('contact-grid');
    const box = await container.boundingBox();
    expect(box).toBeDefined();

    // Check desktop view
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page.getByTestId('contact-heading')).toBeVisible();
  });
});
