import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import VenuePage from '../pages/VenuePage';

test('Validating setup venue', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const venue= new VenuePage(page);
    await loginPage.navigateToLogin();
    //await page.screenshot({ path: 'Venue/'+Date.now()+'.png' });
    await loginPage.login('admin', 'Apple1$#');
    await loginPage.checkUser('admin');
    await page.waitForTimeout(5000);
    //await page.screenshot({ path: 'Venue/'+Date.now()+'.png' });
    await venue.navigateTovenue();
    //await page.screenshot({ path: 'Venue/'+Date.now()+'.png' });
    await venue.createvenue();
    //await page.screenshot({ path: 'Venue/'+Date.now()+'.png' });
    await venue.fillform();
    //await page.screenshot({ path: 'Venue/'+Date.now()+'.png' });
    await venue.deletevenue();
    await page.waitForTimeout(2000);
    // await loginPage.logout();
    //await page.screenshot({ path: 'Venue/'+Date.now()+'.png' });
    
});