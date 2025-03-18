import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import TrainingregPage from '../pages/TrainingregPage';

test('Validating setup Trainingregistration', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const training= new TrainingregPage(page);
    await loginPage.navigateToLogin();
    await page.screenshot({ path: 'Trainingreg/'+Date.now()+'.png' });
    await loginPage.login('admin', 'Apple1$#');
    await loginPage.checkUser('admin');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'Trainingreg/'+Date.now()+'.png' });
    await training.navigateToTrainingreg();
    await page.screenshot({ path: 'Trainingreg/'+Date.now()+'.png' });
    await training.createTrainingreg();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'Trainingreg/'+Date.now()+'.png' });
    await training.fillform();
    await page.screenshot({ path: 'Trainingreg/'+Date.now()+'.png' });
    await training.editTrainingreg();
    await training.deleteTrainingreg();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'Trainingreg/'+Date.now()+'.png' });
    await loginPage.logout();
    await page.screenshot({ path: 'Trainingreg/'+Date.now()+'.png' });
    await page.waitForTimeout(2000);
    
});