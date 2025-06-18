import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import EmployeeDetailPage from '../pages/EmployeeDetailPage';
const logindata= require('../fixtures/Login.fixture.json');
const data= require('../fixtures/Employee.fixture.json');
const employeedata=data.createemployee;
const servicedata=data.servicerecord;
const servicedata1=data.servicerecord1;
const servicedata2=data.servicerecord2;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(logindata.validUser.username, logindata.validUser.password);
    await page.waitForTimeout(3000);
    await loginPage.checkUser(logindata.validUser.username);
    await page.waitForTimeout(6000);
  });
test.skip('Validating Employee Details', async ({ page }) => {
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
    // await details.deleteinsurance();https://mnev2qa.exolutus.com/App/CadreSetups
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
test.skip('Validating service record to have only one active contract', async ({ page }) => {
    const details= new EmployeeDetailPage(page);
    await details.navigateToemployedetail();
    await page.waitForTimeout(2000);
    await details.editemployee(employeedata.firstname+" "+employeedata.lastname+" "+employeedata.dobBS);
    await details.gotoservicerecords();
    await details.fillservice(
        servicedata.recruittype,
        servicedata.contachtype,
        servicedata.cadregroup,
        servicedata.cadre,
        servicedata.designation,
        servicedata.province,
        servicedata.district,
        servicedata.hospitalname,
        servicedata.programtype,
        servicedata.department,
        servicedata.contractno,
        servicedata.startdate,
        servicedata.enddate,
        servicedata.endstatus
    
      );
      await page.waitForTimeout(2000);
      await details.fillservice(
        servicedata1.recruittype,
        servicedata1.contachtype,
        servicedata1.cadregroup,
        servicedata1.cadre,
        servicedata1.designation,
        servicedata1.province,
        servicedata1.district,
        servicedata1.hospitalname,
        servicedata1.programtype,
        servicedata1.department,
        servicedata1.contractno,
        servicedata1.startdate,
        servicedata1.enddate,
        servicedata1.endstatus
    
      );
    await details.verifyactivestatus();
    await page.waitForTimeout(2000);
});
test('Validating contract mustbe atleast 30 days', async ({ page }) => {
    const details= new EmployeeDetailPage(page);
    await details.navigateToemployedetail();
    await page.waitForTimeout(2000);
    await details.editemployee(employeedata.firstname+" "+employeedata.lastname+" "+employeedata.dobBS);
    await details.gotoservicerecords();
    await details.fillservice(
        servicedata2.recruittype,
        servicedata2.contachtype,
        servicedata2.cadregroup,
        servicedata2.cadre,
        servicedata2.designation,
        servicedata2.province,
        servicedata2.district,
        servicedata2.hospitalname,
        servicedata2.programtype,
        servicedata2.department,
        servicedata2.contractno,
        servicedata2.startdate,
        servicedata2.enddate,
        servicedata2.endstatus
    
      );
    await details.verify30dayserror();
});
test.skip('Validating service record already exist in date', async ({ page }) => {
  const details= new EmployeeDetailPage(page);
  await details.navigateToemployedetail();
  await page.waitForTimeout(2000);
  await details.editemployee(employeedata.firstname+" "+employeedata.lastname+" "+employeedata.dobBS);
  await details.gotoservicerecords();
  await details.fillservice(
    servicedata1.recruittype,
    servicedata1.contachtype,
    servicedata1.cadregroup,
    servicedata1.cadre,
    servicedata1.designation,
    servicedata1.province,
    servicedata1.district,
    servicedata1.hospitalname,
    servicedata1.programtype,
    servicedata1.department,
    servicedata1.contractno,
    servicedata1.startdate,
    servicedata1.enddate,
    servicedata1.endstatus
    );

    await details.fillservice(
      servicedata2.recruittype,
      servicedata2.contachtype,
      servicedata2.cadregroup,
      servicedata2.cadre,
      servicedata2.designation,
      servicedata2.province,
      servicedata2.district,
      servicedata2.hospitalname,
      servicedata2.programtype,
      servicedata2.department,
      servicedata2.contractno,
      servicedata2.startdate,
      servicedata2.enddate,
      servicedata2.endstatus
      );
  await details.verifyalreadyexist();
});
test('Validating contract date not betn affilation start', async ({ page }) => {
  const details= new EmployeeDetailPage(page);
  await details.navigateToemployedetail();
  await page.waitForTimeout(2000);
  await details.editemployee(employeedata.firstname+" "+employeedata.lastname+" "+employeedata.dobBS);
  await details.gotoservicerecords();
  await details.fillservice(
    servicedata1.recruittype,
    servicedata1.contachtype,
    servicedata1.cadregroup,
    servicedata1.cadre,
    servicedata1.designation,
    servicedata1.province,
    servicedata1.district,
    servicedata1.hospitalname,
    servicedata1.programtype,
    servicedata1.department,
    servicedata1.contractno,
    servicedata1.startdate,
    servicedata1.enddate,
    servicedata1.endstatus
    );
    await details.verifycontractdate();
});
test('Validating End date must be greater than or equal to contract status end date', async ({ page }) => {
  const details= new EmployeeDetailPage(page);
  await details.navigateToemployedetail();
  await page.waitForTimeout(2000);
  await details.editemployee(employeedata.firstname+" "+employeedata.lastname+" "+employeedata.dobBS);
  await details.gotoservicerecords();
  await details.fillservice(
    servicedata1.recruittype,
    servicedata1.contachtype,
    servicedata1.cadregroup,
    servicedata1.cadre,
    servicedata1.designation,
    servicedata1.province,
    servicedata1.district,
    servicedata1.hospitalname,
    servicedata1.programtype,
    servicedata1.department,
    servicedata1.contractno,
    servicedata1.startdate,
    servicedata1.enddate,
    servicedata1.endstatus
    );
    await details.verifycontractdate();
});//End date must be greater than or equal to contract status end date.
test.only('Validating status', async ({ page }) => {
  const details= new EmployeeDetailPage(page);
  const today = new Date();
  const current = new Date(today.toDateString()); // Strips time

  await details.navigateToemployedetail();
  await page.waitForTimeout(2000);
  await details.editemployee(employeedata.firstname+" "+employeedata.lastname+" "+employeedata.dobBS);
  await details.gotoservicerecords();
  await details.fillservice(
      servicedata.recruittype,
      servicedata.contachtype,
      servicedata.cadregroup,
      servicedata.cadre,
      servicedata.designation,
      servicedata.province,
      servicedata.district,
      servicedata.hospitalname,
      servicedata.programtype,
      servicedata.department,
      servicedata1.contractno,
      servicedata1.startdate,
      servicedata1.enddate,
      servicedata.endstatus
    );
    await page.waitForTimeout(2000);
  const start = new Date(servicedata1.startdate);
  const end = new Date(servicedata1.enddate);
  console.log("Today's date:", current);
  console.log("Start date:", start);
  console.log("End date:", end);

  if (current >= start && current <= end) {
    await details.verifystatus('Active');
  } else {
    await details.verifystatus('In Active');
  }
});
