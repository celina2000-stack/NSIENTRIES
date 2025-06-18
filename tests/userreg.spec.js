import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import UserregPage from '../pages/UserregPage';

test('Validating setup User registration', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const userreg= new UserregPage(page);
    await loginPage.navigateToLogin();
    await page.screenshot({ path: 'Userreg/'+Date.now()+'.png' });
    await loginPage.login('admin', 'Apple1$#');
    await loginPage.checkUser('admin');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'Userreg/'+Date.now()+'.png' });
    await userreg.navigateToUserreg();
    await page.screenshot({ path: 'Userreg/'+Date.now()+'.png' });
    await userreg.createUserreg();
   
    await userreg.fillform();
    // await loginPage.logout();
    await page.screenshot({ path: 'Userreg/'+Date.now()+'.png' });
    await userreg.viewUserreg();
    await page.waitForTimeout(4000);
    
});