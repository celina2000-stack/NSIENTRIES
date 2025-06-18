import { expect } from "@playwright/test";

class EmployeegpaPage {
  constructor(page) {
    this.page = page;
    this.entries = page.getByRole('menuitem', { name: ' Entries ' });
    this.hr=page.getByRole('menuitem', { name: ' HR ' });
    this.Employeinsurances = page.locator("//a[@href='/App/EmployeeInsurances']");
    this.create = page.getByRole('button', { name: '  Create new employee insurance' });
    this.insurance=page.locator('#EmployeeInsurance_InsuranceId');
    this.selectall=page.getByRole('checkbox', { name: 'Select all rows' })
    this.remarksinput = page.getByRole('textbox', { name: 'Remarks' });
    this.saveasdraft = page.getByRole('button', { name: ' Save As Draft' });
    this.cancelbutton = page.locator("//button[normalize-space()='Cancel']");
    this.emailtemplatebtn=page.getByRole('link', { name: 'Email Template' })
    this.email=page.getByRole('textbox', { name: 'To Email Address:' })
    this.subject=page.getByRole('textbox', { name: 'Subject:' })
    this.name=page.getByRole('textbox', { name: 'Receiver Name:' })
    this.sendmailbtn=page.getByRole('button', { name: 'Send Email' })
    this.editbtn=page.getByRole('link', { name: 'Edit' })
    this.viewbtn=page.getByRole('link', { name: 'View' })
    this.gpabtn=page.locator("#addGPAPolicy");
    this.savegpa=page.locator("//div[@class='modal-dialog modal-lg']//div[@class='modal-footer']//button[@type='button']")
    this.savebtn=page.locator("(//button[@id='draft'])[1]")
    this.exportto=page.getByRole('link', { name: 'Export to excel' })
    this.deletebutton = page.getByRole('link', { name: 'Delete' });
    this.filterbtn=page.getByRole('button', { name: 'Filter' });
    this.Employeinsurancesrefund = page.locator("//a[@href='/App/EmployeeInsurancesRefund']");
    this.createrefund = page.getByRole('button', { name: '  Create new employee insurance refund' });
    this.insurancerefund=page.locator('#EmployeeInsuranceRefund_InsuranceId');
    
    
}
  async navigateToEmployeinsurances() {
    await this.entries.click();
    await this.hr.click();
    await this.Employeinsurances.click();
    await expect(this.page).toHaveURL('https://mnev2qa.exolutus.com/App/EmployeeInsurances');
    await this.page.waitForTimeout(4000);
  }
  async createnewinsurance(){
    await this.create.click();
    await this.page.waitForTimeout(2000);
  }
  async fillinsurance(insurance){
    await this.insurance.selectOption({ label: insurance });
  }
  async filterbydate(filtertype,options,date){
    await this.page.getByTitle(`${filtertype} filter`).click();
    await this.page.waitForTimeout(1000)
    await this.page.getByRole('combobox', { name: 'Operator', exact: true }).locator('span').nth(1).click();
    await this.page.waitForTimeout(1000)
    await this.page.getByRole('option', { name: options, exact: true }).click();
    await this.page.waitForTimeout(1000)
    await this.page.getByRole('combobox', { name: 'Value', exact: true }).fill(date);
    await this.page.waitForTimeout(3000)
    await this.filterbtn.click();
  }
  async verify(column, date, condition) {
  const firstColumnTdElements = await this.page.locator(`.modal-body tr td:nth-child(${column})`);
  const tdTexts = await firstColumnTdElements.allTextContents();

  const thresholdDate = this.parseMMDDYYYY(date);
  console.log(`Parsed thresholdDate for input "${date}": ${thresholdDate.toISOString()}`);
  if (isNaN(thresholdDate)) {
    throw new Error(`Invalid input date format: ${date}`);
  }

  for (let index = 0; index < tdTexts.length; index++) {
    const text = tdTexts[index].trim();

    if (condition === 'Is null') {
      if (text !== '') {
        throw new Error(`Row ${index + 1}: Date ${text} is NOT null`);
      }
      continue;
    }

    const extractedDate = this.parseMMDDYYYY(text);

    if (isNaN(extractedDate)) {
      console.log(`Row ${index + 1}: Invalid date format: "${text}"`);
      continue;
    }

    // Debug logs to check date parsing and comparison
    // console.log(`Row ${index + 1}: raw text = "${text}"`);
    // console.log(`Row ${index + 1}: extractedDate = ${extractedDate.toISOString()}`);
    // console.log(`ThresholdDate = ${thresholdDate.toISOString()}`);
    // console.log(`Comparison: extractedDate < thresholdDate? ${extractedDate < thresholdDate}`);
    // console.log(`Comparison: extractedDate > thresholdDate? ${extractedDate > thresholdDate}`);
    // console.log(`Comparison: extractedDate.getTime() === thresholdDate.getTime()? ${extractedDate.getTime() === thresholdDate.getTime()}`);

    switch (condition) {
      case 'Is equal to':
        if (extractedDate.getTime() !== thresholdDate.getTime()) {
          throw new Error(`Row ${index + 1}: Date ${text} is NOT equal to ${date}`);
        }
        break;

      case 'Is not equal to':
        if (extractedDate.getTime() === thresholdDate.getTime()) {
          throw new Error(`Row ${index + 1}: Date ${text} is equal to ${date}, but should not be.`);
        }
        break;

      case 'Is before or equal to':
        if (extractedDate > thresholdDate) {
          throw new Error(`Row ${index + 1}: Date ${text} is NOT before or equal to ${date}`);
        }
        break;

      case 'Is after or equal to':
        if (extractedDate < thresholdDate) {
          throw new Error(`Row ${index + 1}: Date ${text} is NOT after or equal to ${date}`);
        }
        break;

      default:
        throw new Error(`Row ${index + 1}: Invalid condition "${condition}"`);
    }
  }
}

// Helper function inside your class (no 'function' keyword)
parseMMDDYYYY(dateStr) {
  const parts = dateStr.split('/');
  if (parts.length !== 3) return NaN;
  const [month, day, year] = parts.map(Number);
  if (!month || !day || !year) return NaN;
  return new Date(year, month - 1, day);
}

  
  async verifyallchecked(choice){
    await this.selectall.check();
  // Get all the checkboxes
  const checkboxes = await this.page.$$('//tbody/tr/td[1]/input[1]');
  // Verify each checkbox is checked
  for (const checkbox of checkboxes) {
    const isChecked = await checkbox.isChecked();
    expect(isChecked).toBe(true)
    }
 }
    async fillremarks(remarks){
        await this.remarksinput.fill(remarks);
    }
    async actionclick(num){
        await this.page.locator(`(//button[@data-toggle='dropdown'][normalize-space()='Actions'])[${num}]`).click();
    }
    async sendemail(email, subject, name, symbol){
        await this.emailtemplatebtn.click();
        await this.page.waitForTimeout(2000);
        const emailString = Array.isArray(email) ? email.join(symbol) : email;
        await this.email.fill(emailString);
        await this.subject.fill(subject);
        await this.name.fill(name);
        await this.sendmailbtn.click();
    }

    async verifygpabtn(){
      await expect(this.gpabtn).toBeVisible();
    }
    async addgpa(employename,number, startdate, enddate){
     
      for (const name of employename) {
        await this.page.getByRole('row', { name: `Select row ${name}` }).getByLabel('Select row').check();
      }
      await this.page.waitForTimeout(2000);
      await this.gpabtn.click();
      await this.page.waitForTimeout(2000);
      await this.page.locator("//input[@id='EmployeeInsurance_GPAPolicyNo']").fill(number)
      await this.page.getByRole('combobox', { name: 'Insurance Start Date (A.D.)' }).fill(startdate);
      await this.page.getByRole('combobox', { name: 'Insurance End Date (A.D.)' }).fill(enddate);
      await this.page.waitForTimeout(2000);
      await this.savegpa.click();
      await this.page.waitForTimeout(2000);
    }
    async verifygpa(employeename, expectedValue) {
      for (const name of employeename) {
        const row = await this.page.locator(`tr:has(td:nth-child(2):text-is("${name}"))`);
        const columnValue = await row.locator('td:nth-child(8)').textContent();
        if (columnValue.trim() !== expectedValue) {
            throw new Error(`Expected value "${expectedValue}" in 7th column for employee "${name}", but found "${columnValue.trim()}"`);
        }
      }
    }
    async viewverify(expectedNames, expectedValue) {
      // Use table:nth-of-type(2) if you mean to get the second table
      const rows = await this.page.locator('#EmployeeInsuranceInformationsTab table:nth-of-type(1) tr');
      
      // Get text from the 4th column cells
      const namesInColumn = await rows.locator('td:nth-child(4)').allTextContents();
      
      // Normalize whitespace in the actual column values
      const normalizedActuals = namesInColumn.map(n => n.replace(/\s+/g, ' ').trim());
  
      //console.log(normalizedActuals);
  
      // Compare normalized expected names to normalized actual names
      for (const name of expectedNames) {
          const normalizedExpected = name.replace(/\s+/g, ' ').trim();
          if (!normalizedActuals.includes(normalizedExpected)) {
              throw new Error(`Expected name "${name}" not found in the 4th column of the second table.`);
          }
      }

      for (const name of expectedNames) {
        const row = await this.page.locator(`#EmployeeInsuranceInformationsTab table:nth-of-type(1) tr:has(td:nth-child(4):text-is("${name}"))`);
        const columnValue = await row.locator('td:nth-child(7)').textContent();
        if (columnValue.trim() !== expectedValue) {
            throw new Error(`Expected value "${expectedValue}" in 7th column for employee "${name}", but found "${columnValue.trim()}"`);
        }
      }
  }
  
  async navigatetoinsurancerefund(){
    await this.entries.click();
    await this.hr.click();
    await this.Employeinsurancesrefund.click();
    await expect(this.page).toHaveURL('https://mnev2qa.exolutus.com/App/EmployeeInsurancesRefund');
    await this.page.waitForTimeout(4000);
  }
  async createnewrefund(){
    await this.createrefund.click();
    await this.page.waitForTimeout(2000);
  }
  async fillinsurancerefund(insurance){
    await this.insurancerefund.selectOption({ label: insurance });
  }
  async verifyemployeeinrefund(employeeName, employeeCode) {
    //  const rows = await this.page.locator('#EmployeeInsuranceInformationsTab table:nth-of-type(1) tr');
    //   const namesInColumn = await rows.locator('td:nth-child(3)').allTextContents();
    //   const normalizedActuals = namesInColumn.map(n => n.replace(/\s+/g, ' ').trim());
    //   console.log(namesInColumn);
    //   console.log(normalizedActuals);
    const row = await this.page.locator(`#EmployeeInsuranceInformationsTab table:nth-of-type(1) tr:has(td:nth-child(3):text-is("${employeeName}"))`);
    const codeInColumn = await row.locator('td:nth-child(5)').textContent();

    if (codeInColumn.trim() !== employeeCode) {
      throw new Error(`Expected code "${employeeCode}" in 4th column for employee "${employeeName}", but found "${codeInColumn.trim()}"`);
    }
  }
  async saverefund(){
    await this.selectall.check();
    await this.page.locator("(//button[@class='btn btn-primary save-button'])[1]").click();
  }
  async verifyviewrefund(employeeName, employeeCode){
    const row = await this.page.locator(`#EmployeeInsuranceInformationsTab table:nth-of-type(1) tr:has(td:nth-child(1):text-is("${employeeName}"))`);
    const codeInColumn = await row.locator('td:nth-child(2)').textContent();

    if (codeInColumn.trim() !== employeeCode) {
      throw new Error(`Expected code "${employeeCode}" in 4th column for employee "${employeeName}", but found "${codeInColumn.trim()}"`);
    }
  }
}
export default EmployeegpaPage;
