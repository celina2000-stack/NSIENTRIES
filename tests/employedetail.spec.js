import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import EmployeeDetailPage from '../pages/EmployeeDetailPage';

test('Validating Employee Details', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const details= new EmployeeDetailPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('admin', 'Apple1$#');
    await loginPage.checkUser('admin');
    await page.waitForTimeout(4000);
    await details.navigateToemployedetail();
    await page.waitForTimeout(2000);
    await details.searchemployee('Celina');
    await details.editemployee('Celina Celina 2059');
    //await details.createnewemployee();
    await page.waitForTimeout(4000);
    await details.addnewaddress();
    await page.waitForTimeout(3000);
    await details.addnewcontact();
     await details.addnewacademic();

     await details.addnewservicerecord();
    await page.waitForTimeout(3000);
    await details.addnewinsurance();
    await page.waitForTimeout(3000);
    await details.addnewdocument();
     await page.waitForTimeout(3000);
    // await details.deleteinsurance();
    //  await page.waitForTimeout(3000);
    // await details.deleteservicerecord();
    // await details.deleteaddress();
    // await details.deletecontact();
    // await details.deleteacademic();
    // await details.deletedocument();
   
    await page.waitForTimeout(2000);
    await details.finalsubmit();
    await page.waitForTimeout(4000);
    await loginPage.logout();
});