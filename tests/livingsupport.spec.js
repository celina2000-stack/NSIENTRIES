import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import VenuePage from '../pages/VenuePage';
import LivingsupportPage from '../pages/LivingsupportPage';

test('Validating Living Support', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const venue= new VenuePage(page);
    const living=new LivingsupportPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('admin', 'Apple1$#');
    await loginPage.checkUser('admin');
    await page.waitForTimeout(5000);
    await venue.navigateTovenue();
    await venue.createvenue();
    const modules = ['HR', 'Training'];
    await living.fillform('test',modules.length, modules);
    if (modules.includes('Training')) {
        await living.checktraining('test')
    }
    if (modules.includes('CSSP')) {
       await living.checkcssp('test')
 }
    await venue.navigateTovenue();
    await venue.deletevenue();
    await page.waitForTimeout(2000);
    
});