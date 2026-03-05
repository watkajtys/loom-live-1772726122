import { test, expect } from '@playwright/test';

test('App initializes correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Command::Live_Log')).toBeVisible();
});

test('App navigates to all views and renders correctly', async ({ page }) => {
  await page.goto('/');

  // Verify home view content
  await expect(page.locator('text=Autonomous Activity Visualize')).toBeVisible();

  // Navigate to Community Queue
  await page.locator('nav a[href="/community-queue"]').click();
  await expect(page.locator('h2', { hasText: /Community Queue/i })).toBeVisible();

  // Navigate to Content Pipeline
  await page.locator('nav a[href="/content-pipeline"]').click();
  await expect(page.locator('h2', { hasText: /Content Pipeline/i })).toBeVisible();

  // Navigate to AX Reports
  await page.locator('nav a[href="/ax-reports"]').click();
  await expect(page.locator('h2', { hasText: /AX Reports/i })).toBeVisible();

  // Navigate to Knowledge Base
  await page.locator('nav a[href="/knowledge-base"]').click();
  await expect(page.locator('h2', { hasText: /Knowledge Base/i })).toBeVisible();

  // Take screenshot
  await page.screenshot({ path: 'evidence.png' });
});