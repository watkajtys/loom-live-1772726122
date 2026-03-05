import { test, expect } from '@playwright/test';

test('App initializes correctly and switches views', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Root::HOME')).toBeVisible();

  // Switch to Community Queue
  await page.click('a[href="/community-queue"]');
  await expect(page.locator('text=Root::COMMUNITY_QUEUE')).toBeVisible();
  // It might show loading or error depending on PocketBase
  await expect(page.locator('text=Community Queue').first()).toBeVisible();

  // Switch to Content Pipeline
  await page.click('a[href="/content-pipeline"]');
  await expect(page.locator('text=Root::CONTENT_PIPELINE')).toBeVisible();
  await expect(page.locator('text=Content Pipeline').first()).toBeVisible();

  // Switch to AX Reports
  await page.click('a[href="/ax-reports"]');
  await expect(page.locator('text=Root::AX_REPORTS')).toBeVisible();
  await expect(page.locator('text=AX Reports').first()).toBeVisible();

  // Switch to Knowledge Base
  await page.click('a[href="/knowledge-base"]');
  await expect(page.locator('text=Root::KNOWLEDGE_BASE')).toBeVisible();
  await expect(page.locator('text=Knowledge Base').first()).toBeVisible();

  // Capture evidence of completed tests
  await page.screenshot({ path: 'evidence.png' });
});
