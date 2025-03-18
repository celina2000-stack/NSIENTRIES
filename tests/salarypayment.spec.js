import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import SalarypaymentPage from '../pages/SalarypaymentPage';

test('Validating salary payment', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const salary=new SalarypaymentPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('admin', 'Apple1$#');
    await loginPage.checkUser('admin');
    await page.waitForTimeout(5000);
    await salary.gotosalarypayment()
    const months = ['Kartik', 'Mangsir','Poush','Magh','Falgun'];
    //await salary.newbatch(months.length, months)
    await page.waitForTimeout(5000)
    //await salary.select()
    await salary.actionbutton();
    await page.waitForTimeout(10000);
    
});