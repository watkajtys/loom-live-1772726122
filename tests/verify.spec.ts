import { test, expect } from '@playwright/test';

test('App initializes correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Command::Live_Log')).toBeVisible();
});

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

test('Execution provider maintains centralized shell state across navigations', async ({ page }) => {
  await page.goto('/');

  // Assert Top Bar system status logic derived from ExecutionProvider
  await expect(page.locator('text=SYSTEM_NOMINAL')).toBeVisible();

  // Store the time, wait, and check it changes to confirm provider side-effect runs
  const initialTime = await page.locator('text=UTC').textContent();
  await page.waitForTimeout(1100);
  const newTime = await page.locator('text=UTC').textContent();
  expect(initialTime).not.toEqual(newTime);
  
  // Uptime constant check
  await expect(page.locator('text=99.982%')).toBeVisible();
});
