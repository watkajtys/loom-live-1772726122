import { test, expect } from '@playwright/test';

test('App initializes correctly and switches views', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Root::HOME')).toBeVisible();
  await expect(page.locator('h2:has-text("Community Queue")')).not.toBeVisible();

  // Switch to Community Queue
  await page.click('button:has(span:text("smart_toy"))');
  await expect(page.locator('text=Root::COMMUNITY_QUEUE')).toBeVisible();
  await expect(page.locator('h2:has-text("Community Queue")')).toBeVisible();

  // Switch to Content Pipeline
  await page.click('button:has(span:text("article"))');
  await expect(page.locator('text=Root::CONTENT_PIPELINE')).toBeVisible();
  await expect(page.locator('h2:has-text("Content Pipeline")')).toBeVisible();

  // Switch to AX Reports
  await page.click('button:has(span:text("analytics"))');
  await expect(page.locator('text=Root::AX_REPORTS')).toBeVisible();
  await expect(page.locator('h2:has-text("AX Reports")')).toBeVisible();

  // Switch to Knowledge Base
  await page.click('button:has(span:text("settings_input_component"))');
  await expect(page.locator('text=Root::KNOWLEDGE_BASE')).toBeVisible();
  await expect(page.locator('h2:has-text("Knowledge Base Sources")')).toBeVisible();

  await page.screenshot({ path: 'evidence.png' });
});
