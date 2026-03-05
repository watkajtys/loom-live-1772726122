import { test, expect } from '@playwright/test';

// test('App initializes correctly', async ({ page }) => {
//   await page.goto('/');
//   await expect(page.locator('text=Loom Initialized')).toBeVisible();
// });

test('Advoloom Command Center shell and primary views from the design load correctly', async ({ page }) => {
  await page.goto('/');

  // Check top bar and dashboard view
  await expect(page.locator('text=Root::Command_Center')).toBeVisible();
  await expect(page.locator('text=Autonomous Activity Visualize')).toBeVisible();
  
  // Navigate to queue
  await page.click('nav a[href="/queue"]');
  await expect(page.locator('text=Root::Community_Queue')).toBeVisible();
  await expect(page.locator('h1', { hasText: 'Community Queue' })).toBeVisible();

  // Navigate back to root
  await page.goto('/');

  await page.screenshot({ path: 'evidence.png', fullPage: true });
});
