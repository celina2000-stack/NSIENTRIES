import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import EmployeegpaPage from '../pages/EmployeegpaPage';
const logindata= require('../fixtures/Login.fixture.json');
const gpadata= require('../fixtures/Employeegpa.fixture.json');

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login .navigateToLogin();
  await login .login(logindata.validUser.username, logindata.validUser.password);
  await page.waitForTimeout(3000);
  await login .checkUser(logindata.validUser.username);
  await page.waitForTimeout(6000);
});
test('Validating create new insurance', async ({ page }) => {
    const employee = new EmployeegpaPage(page);
    await employee.navigateToEmployeinsurances();
    await employee.createnewinsurance();
    await employee.fillinsurance(gpadata.employeeinsurance.insurance);
    await page.waitForTimeout(5000);
    await employee.filterbydate(gpadata.employeeinsurance.filtertype, gpadata.employeeinsurance.options, gpadata.employeeinsurance.date);
    await page.waitForTimeout(3000);
    await employee.verify("5",gpadata.employeeinsurance.date,gpadata.employeeinsurance.options);
    await page.waitForTimeout(3000);
    await employee.verifyallchecked();
    await employee.fillremarks(gpadata.employeeinsurance.remarks);
    await employee.saveasdraft.click();
    await page.waitForTimeout(3000);
});
test('Validating email sent', async ({ page }) => {
    const employee = new EmployeegpaPage(page);
    await employee.navigateToEmployeinsurances();
    await employee.actionclick("1");
    await employee.sendemail(gpadata.emaildata.email, gpadata.emaildata.subject, gpadata.emaildata.name,",");
    await page.waitForTimeout(3000);
});
test('Validating Gpa Policy', async ({ page }) => {
    const employee = new EmployeegpaPage(page);
    await employee.navigateToEmployeinsurances();
    await employee.actionclick("1");
    await employee.editbtn.click();
    await employee.verifygpabtn();
    await employee.addgpa(gpadata.gpa1.employeename, gpadata.gpa1.number, gpadata.gpa1.startdate, gpadata.gpa1.enddate);
    await employee.verifygpa(gpadata.gpa1.employeename, gpadata.gpa1.number);
    await employee.addgpa(gpadata.gpa2.employeename, gpadata.gpa2.number, gpadata.gpa2.startdate, gpadata.gpa2.enddate);
    await employee.verifygpa(gpadata.gpa2.employeename, gpadata.gpa2.number);
    await employee.savebtn.click();
    await page.waitForTimeout(2000);
});
test('Verify employee in view', async ({ page }) => {
    const employee = new EmployeegpaPage(page);
    await employee.navigateToEmployeinsurances();
    await employee.actionclick("1");
    await employee.viewbtn.click();
    await page.waitForTimeout(9000);
    await employee.viewverify(gpadata.gpa1.employeename, gpadata.gpa1.number);
    await employee.viewverify(gpadata.gpa2.employeename, gpadata.gpa2.number);
});
test('Validating employee insurance', async ({ page }) => {
    const employee = new EmployeegpaPage(page);
    await employee.navigateToEmployeinsurances();
    await employee.createnewinsurance();
    await employee.fillinsurance(gpadata.employeeinsurance.insurance);
    await page.waitForTimeout(5000);
    await employee.filterbydate(gpadata.employeeinsurance.filtertype, gpadata.employeeinsurance.options, gpadata.employeeinsurance.date);
    await page.waitForTimeout(3000);
    await employee.verify("5",gpadata.employeeinsurance.date,gpadata.employeeinsurance.options);
    await page.waitForTimeout(3000);
    await employee.verifyallchecked();
    await employee.fillremarks(gpadata.employeeinsurance.remarks);
    await employee.saveasdraft.click();
    await page.waitForTimeout(3000);
    await employee.actionclick("1");
    await employee.sendemail(gpadata.emaildata.email, gpadata.emaildata.subject, gpadata.emaildata.name);
    await page.waitForTimeout(3000);
    await employee.actionclick("1");
    await employee.editbtn.click();
    await page.waitForTimeout(3000);
    await employee.verifygpabtn();
    await employee.addgpa(gpadata.gpa1.employeename, gpadata.gpa1.number, gpadata.gpa1.startdate, gpadata.gpa1.enddate);
    await employee.verifygpa(gpadata.gpa1.employeename, gpadata.gpa1.number);
    await employee.addgpa(gpadata.gpa2.employeename, gpadata.gpa2.number, gpadata.gpa2.startdate, gpadata.gpa2.enddate);
    
    await employee.verifygpa(gpadata.gpa2.employeename, gpadata.gpa2.number);
    await employee.savebtn.click();
    await page.waitForTimeout(4000);
    await employee.actionclick("1");
    await employee.viewbtn.click();
    await page.waitForTimeout(9000);
    await employee.viewverify(gpadata.gpa1.employeename, gpadata.gpa1.number);
    await employee.viewverify(gpadata.gpa2.employeename, gpadata.gpa2.number);
})

test.only('Validating employee insurance refund', async ({ page }) => {
  const employee = new EmployeegpaPage(page);
  await employee.navigatetoinsurancerefund();
  await employee.createnewrefund();
  await employee.fillinsurancerefund(gpadata.employeeinsurance.insurance);
  await page.waitForTimeout(5000);

  // Verify employee details in refund
  const [employeeName1, employeeCode1] = gpadata.employeedetail.employee1;
  await employee.verifyemployeeinrefund(employeeName1, employeeCode1);
  const [employeeName2, employeeCode2] = gpadata.employeedetail.employee2;
  await employee.verifyemployeeinrefund(employeeName2, employeeCode2);
  await employee.saverefund();
  await employee.actionclick("1");
  await employee.viewbtn.click();
  await page.waitForTimeout(3000);
  await employee.verifyviewrefund(employeeName1, employeeCode1);
  await employee.verifyviewrefund(employeeName2, employeeCode2);
});
