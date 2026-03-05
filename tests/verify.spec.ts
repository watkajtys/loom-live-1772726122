import { test, expect } from '@playwright/test';

test('App routing and architecture initializes correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Root::Command_Center')).toBeVisible();

  // Navigate to Community Queue
  await page.click('a[href="/community-queue"]');
  await expect(page.getByRole('heading', { name: 'Community Queue' })).toBeVisible();

  // Navigate to Content Pipeline
  await page.click('a[href="/content-pipeline"]');
  await expect(page.getByRole('heading', { name: 'Content Pipeline' })).toBeVisible();

  // Navigate to AX Reports
  await page.click('a[href="/ax-reports"]');
  await expect(page.getByRole('heading', { name: 'AX Reports' })).toBeVisible();

  // Navigate to Knowledge Base
  await page.click('a[href="/knowledge-base"]');
  await expect(page.getByRole('heading', { name: 'Knowledge Base' })).toBeVisible();

  // Take screenshot evidence of active feature as required
  await page.screenshot({ path: 'evidence.png' });
});
