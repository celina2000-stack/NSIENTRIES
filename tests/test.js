// This is a placeholder test file created in the tests folder.
// Add your test cases here as needed.

import { test, expect } from '@playwright/test';

test('Sample Test', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toBe('Example Domain');
});
