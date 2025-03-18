import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import QitoolPage from '../pages/QitoolPage';

test('Validating Qi tool setup', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const qitools=new QitoolPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('admin', 'Apple1$#');
    await loginPage.checkUser('admin');
    await page.waitForTimeout(4000);
    //await qitools.gototoolversion();
    //await qitools.newversion('2');
    // await qitools.gototooltemplates();
    // await qitools.newtemplate('2', 'MLP');
    // await qitools.servicedetail('Infection Prevention','12','1')
    // await qitools.servicedetail('Focused ANC','12','2')
    // await qitools.servicedetail('Complication during pregnancy','13','3')
    // await qitools.close.click();
    await qitools.gotosite();
    // await qitools.newsite('MLP','Rapti Provincial Hospital','2','3/5/2025','3/4/2025');
    // await qitools.verifyservices('1','Infection Prevention','12')
    // await qitools.verifyservices('2','Focused ANC','12')
    // await qitools.verifyservices('3','Complication during pregnancy','13')
    // await qitools.baseline()
    // await qitools.savefunction();
    
    await qitools.edit('12/11/2024','10/9/2024')
    await qitools.accreditated()
    await qitools.Assessment()
    await page.waitForTimeout(5000)
    
});