import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import EmployeinsurancesPage from '../pages/EmployeeinsurancePage';

test('Validating employee insurance', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const employee=new EmployeinsurancesPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('admin', 'Apple1$#');
    await loginPage.checkUser('admin');
    await page.waitForTimeout(5000);
    await employee.navigateToEmployeinsurances();
    await employee.createnewinsurance();
    // await employee.saveasdraft('1');
    // await employee.emailtemplate('1')
    // await employee.edit('1');
    // await employee.export('1');
    // await employee.delete('1');
    //await employee.verifyallchecked('1');
    // await employee.filterby('Contract Number','1','Ends with','24')
    // await page.waitForTimeout(3000)
    // await employee.verifycontent('6','24', 'Ends with')
    await employee.filterbydate1('1','Contract End Date')
    await employee.verify1('8')
    // await page.waitForTimeout(3000)
    // await employee.verify('8','2025-06-30', 'Is after or equal to')
    //await employee.filter('1','4');
    await page.waitForTimeout(5000);
    
});