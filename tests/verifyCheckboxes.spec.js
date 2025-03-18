const { test, expect } = require('@playwright/test');

test('Verify all checkboxes are checked', async ({ page }) => {
  // Navigate to the page containing the table
  await page.goto('URL_OF_YOUR_PAGE');

  // Get all the checkboxes
  const checkboxes = await page.$$('//tbody/tr/td[1]/input[1]');

  // Verify the number of checkboxes
  expect(checkboxes.length).toBe(175);

  // Verify each checkbox is checked
  for (const checkbox of checkboxes) {
    const isChecked = await checkbox.isChecked();
    expect(isChecked).toBe(true);
  }
});