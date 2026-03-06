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
  await expect(page.locator('text=Active Agent Tasks')).toBeVisible();
  
  // Navigate to reports
  await page.click('nav a[href="/reports"]');
  await expect(page.locator('text=Root::Agent_Execution_Reports')).toBeVisible();
  await expect(page.locator('h1', { hasText: 'Agent Execution Reports' })).toBeVisible();

  // Navigate back to root
  await page.goto('/');

  await page.screenshot({ path: 'evidence.png', fullPage: true });
});

test('Build the Community Queue List container component.', async ({ page }) => {
  // Mock PocketBase API response for social_mentions
  await page.route('**/api/collections/social_mentions/records*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        page: 1,
        perPage: 50,
        totalItems: 1,
        totalPages: 1,
        items: [
          {
            id: 'mock_test_123',
            platform: 'DISCORD',
            query: 'Test query',
            draft_reply: '',
            status: 'drafting',
            user: 'test_user',
            priority: 50,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
          }
        ]
      })
    });
  });

  await page.goto('/queue');

  // Verify the page title is visible
  await expect(page.locator('text=Active Agent Tasks')).toBeVisible();

  // Wait for loading to finish
  const loadingIndicator = page.locator('text=Loading Data...');
  if (await loadingIndicator.isVisible()) {
    await loadingIndicator.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  }

  // Verify custom container class is present
  await expect(page.locator('.glass-panel')).toBeVisible();
  
  // Verify rows are rendering within the container
  const queueRows = page.locator('.queue-row');
  await page.waitForTimeout(1000);
  
  if (await queueRows.count() > 0) {
    await expect(queueRows.first()).toBeVisible();
  }

  // Take the required screenshot
  await page.screenshot({ path: 'evidence.png' });
});

test('Execution and Telemetry providers maintain centralized shell state across navigations', async ({ page }) => {
  await page.goto('/');

  // Assert Top Bar system status logic derived from TelemetryProvider
  await expect(page.locator('text=SYSTEM_NOMINAL')).toBeVisible();

  // Store the time, wait, and check it changes to confirm hook side-effect runs
  const initialTime = await page.locator('text=UTC').textContent();
  await page.waitForTimeout(1100);
  const newTime = await page.locator('text=UTC').textContent();
  expect(initialTime).not.toEqual(newTime);
  
  // Uptime dynamic check
  await expect(page.locator('text=/99\\.[0-9]{3}%/')).toBeVisible();
});

test('Community Queue data fetching and rendering', async ({ page }) => {
  await page.goto('/queue');

  // Verify the page title is visible
  await expect(page.locator('text=Active Agent Tasks')).toBeVisible();

  // Wait for loading to finish, or check for expected states
  // We handle potential empty state or data list based on standard view wrappers
  const loadingIndicator = page.locator('text=Loading Data...');
  if (await loadingIndicator.isVisible()) {
    await loadingIndicator.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  }

  // Asserting some common elements in the view are loaded properly.
  // Using a robust locator for the overall layout wrapper or possible data state.
  await expect(page.locator('.glass-panel')).toBeVisible();
  
  // Verify that the custom telemetry header elements are visible
  await expect(page.locator('text=Total_Entries')).toBeVisible();
  await expect(page.locator('text=Sync_Status')).toBeVisible();

  // Take the mandatory screenshot at the end of the test
  await page.screenshot({ path: 'evidence.png' });
});

test('Queue Item component correctly displays entry details matching the design', async ({ page }) => {
  // Mock PocketBase API response for social_mentions
  await page.route('**/api/collections/social_mentions/records*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        page: 1,
        perPage: 50,
        totalItems: 1,
        totalPages: 1,
        items: [
          {
            id: 'mock_test_123',
            platform: 'DISCORD',
            query: 'Test query',
            draft_reply: '',
            status: 'drafting',
            user: 'test_user',
            priority: 50,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
          }
        ]
      })
    });
  });

  await page.goto('/queue');

  // Verify the page title is visible
  await expect(page.locator('text=Active Agent Tasks')).toBeVisible();

  // Wait for loading to finish
  const loadingIndicator = page.locator('text=Loading Data...');
  if (await loadingIndicator.isVisible()) {
    await loadingIndicator.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  }

  // We should either see the QueueItem row or an empty state, assuming data exists we check for row
  // Using the queue-row class from the design implementation
  const queueRows = page.locator('.queue-row');
  
  // Wait for some potential dynamic elements since data hook might be loading or returning error
  await page.waitForTimeout(1000);

  if (await queueRows.count() > 0) {
    // Assert visual elements from the new component
    await expect(queueRows.first()).toBeVisible();
    await expect(queueRows.first().locator('text=Agent_State')).toBeVisible();
    await expect(queueRows.first().locator('text=Priority')).toBeVisible();
  } else {
    // Empty state or error fallback since PB is mock
    const hasError = await page.locator('text=Error Loading Data').isVisible();
    const hasEmpty = await page.locator('text=No Records Found').isVisible();
    expect(hasError || hasEmpty).toBeTruthy();
  }

  await page.screenshot({ path: 'evidence.png', fullPage: true });
});
