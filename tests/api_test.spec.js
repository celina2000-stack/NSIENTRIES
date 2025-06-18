const { test, expect } = require('@playwright/test');

test.describe('API Testing for Login', () => {
  test('Login API Test', async ({ request }) => {
    const response = await request.post('https://mnev2qa.exolutus.com/Account/Login', {
      data: {
        username: 'admin', // Replace with valid username
        password: 'Apple1$3' // Replace with valid password
      }
    });

    // Validate response status
    expect(response.status()).toBe(200);

    // Validate response body
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody).toHaveProperty('success', true); // Adjust based on actual API response
  });
});
