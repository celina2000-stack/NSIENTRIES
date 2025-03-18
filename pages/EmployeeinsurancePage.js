import { expect } from "@playwright/test";

class EmployeinsurancesPage {
  constructor(page) {
    this.page = page;
    this.entries = page.getByRole('menuitem', { name: ' Entries ' });
    this.hr=page.getByRole('menuitem', { name: ' HR ' });
    this.Employeinsurances = page.locator("//a[@href='/App/EmployeeInsurances']");
    this.create = page.getByRole('button', { name: '  Create new employee insurance' });
    this.insurance=page.locator('#EmployeeInsurance_InsuranceId');
    this.selectall=page.getByRole('checkbox', { name: 'Select all rows' })
    this.remarks = page.getByRole('textbox', { name: 'Remarks' });
    this.savebutton = page.getByRole('button', { name: ' Save As Draft' });
    this.cancelbutton = page.locator("//button[normalize-space()='Cancel']");
    this.emailtemplatebtn=page.getByRole('link', { name: 'Email Template' })
    this.email=page.getByRole('textbox', { name: 'To Email Address:' })
    this.subject=page.getByRole('textbox', { name: 'Subject:' })
    this.name=page.getByRole('textbox', { name: 'Receiver Name:' })
    this.sendmailbtn=page.getByRole('button', { name: 'Send Email' })
    this.editbtn=page.getByRole('link', { name: 'Edit' })
    this.submitbtn=page.getByRole('button', { name: 'Submit' })
    this.exportto=page.getByRole('link', { name: 'Export to excel' })
    this.deletebutton = page.getByRole('link', { name: 'Delete' });
    this.filterbtn=page.getByRole('button', { name: 'Filter' });
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
  }
  async verifyallchecked(choice){
    await this.insurance.selectOption(choice);
    await this.page.waitForTimeout(4000)
    await this.selectall.check();
  // Get all the checkboxes
  const checkboxes = await this.page.$$('//tbody/tr/td[1]/input[1]');
  // Verify each checkbox is checked
  for (const checkbox of checkboxes) {
    const isChecked = await checkbox.isChecked();
    expect(isChecked).toBe(true)
  }
}
async saveasdraft(choice){
    await this.insurance.selectOption(choice);
    await this.page.waitForTimeout(3000)
    await this.page.locator('//tbody/tr[1]/td[1]/input[1]').check();
    await this.page.locator('//tbody/tr[2]/td[1]/input[1]').check();
    await this.page.locator('//tbody/tr[3]/td[1]/input[1]').check();
    await this.remarks.fill('test');
    await this.savebutton.click();
    
}
async emailtemplate(num) {
    await this.page.locator(`(//button[@data-toggle='dropdown'][normalize-space()='Actions'])[${num}]`).click();
    await this.emailtemplatebtn.click()
    await this.page.screenshot({ path: 'empinsurance/'+Date.now()+'.png' });
    await this.email.fill("maharjancelina9@gmail.com")
    await this.subject.fill("test")
    await this.name.fill("Celina")
    await this.sendmailbtn.click();
}
async edit(num){
    await this.page.locator(`(//button[@data-toggle='dropdown'][normalize-space()='Actions'])[${num}]`).click();
    await this.editbtn.click();
    await this.page.waitForTimeout(2000)
    await this.page.getByRole('textbox', { name: 'GPA Policy No.' }).fill('233')
    await this.page.getByRole('textbox', { name: 'Insurance Start Date (B.S.)' }).fill('27/11/2081');
    await this.page.getByRole('combobox', { name: 'Insurance start Date (A.D.)' }).fill('11/03/2025');
    await this.page.getByRole('textbox', { name: 'Insurance End Date (B.S.)' }).fill('27/11/2082');
    await this.page.getByRole('combobox', { name: 'Insurance End Date (A.D.)' }).fill('11/03/2026');
    await this.submitbtn.click();
}
async export(num){
  await this.page.locator(`(//button[@data-toggle='dropdown'][normalize-space()='Actions'])[${num}]`).click();
  await this.page.waitForTimeout(3000)
  await this.exportto.click()
}
async delete(num){
  await this.page.locator(`(//button[@data-toggle='dropdown'][normalize-space()='Actions'])[${num}]`).click();
  await this.deletebutton.click()
  await this.page.getByRole('button', { name: 'Yes' }).click();
}
async filter(choice,column){
  await this.insurance.selectOption(choice);
  await this.page.waitForTimeout(3000)
  await this.page.locator('//*[@id="hideExisting"]').uncheck()
  await this.page.waitForTimeout(5000)
  const cells = await this.page.locator(`.modal-body tr td:nth-child(${column})`);
  const count = await cells.count();
  for (let i = 0; i < count; i++) {
    const cell = cells.nth(i);
    const text = await cell.innerText();
    const color = await cell.evaluate(el => getComputedStyle(el).color);
    if (color === 'rgb(246, 78, 96)') { // Check if text color is red
      console.log(` ${text.trim()}`); // Print text only if it is red
    }
  }
}
async filterby(filtertype, choice, options, containt){
  await this.insurance.selectOption(choice);
  await this.page.waitForTimeout(4000)
  await this.page.getByTitle(`${filtertype} filter column`).click();
  await this.page.waitForTimeout(1000)
  await this.page.getByRole('combobox', { name: 'Operator', exact: true }).locator('span').nth(1).click();
  await this.page.waitForTimeout(1000)
  await this.page.getByRole('option', { name: options}).click();
  await this.page.waitForTimeout(1000)
  await this.page.getByRole('textbox', { name: 'Value', exact: true }).fill(containt);
  await this.page.waitForTimeout(1000)
  await this.filterbtn.click();
 
}
async verifycontent(column, content, condition) {
  const firstColumnTdElements = await this.page.locator(`.modal-body tr td:nth-child(${column})`);
  const tdTexts = await firstColumnTdElements.allTextContents();

  for (let index = 0; index < tdTexts.length; index++) {
    const text = tdTexts[index].trim().toLowerCase();
    const lowerContent = content.toLowerCase();

    switch (condition) {
      case 'Is equal to':
        expect(text).toBe(lowerContent);
        break;

      case 'Is not equal to':
        expect(text).not.toBe(lowerContent);
        break;

      case 'Starts with':
        expect(text.startsWith(lowerContent)).toBe(true);
        break;

      case 'Contains':
        expect(text).toContain(lowerContent);
        break;

      case 'Does not contain':
        expect(text).not.toContain(lowerContent);
        break;

      case 'Ends with':
        expect(text.endsWith(lowerContent)).toBe(true);
        break;

      case 'Is null':
        expect(text).toBe('');
        break;

      default:
        throw new Error(`Invalid condition "${condition}" provided.`);
    }
  }
}



async filterbydate(choice,filtertype,date,options){
  await this.insurance.selectOption(choice);
  await this.page.waitForTimeout(4000)
  await this.page.getByTitle(`${filtertype} filter`).click();
  await this.page.waitForTimeout(1000)
  await this.page.getByRole('combobox', { name: 'Operator', exact: true }).locator('span').nth(1).click();
  await this.page.waitForTimeout(1000)
  await this.page.getByRole('option', { name: options}).click();
  await this.page.waitForTimeout(1000)
  await this.page.getByRole('combobox', { name: 'Value', exact: true }).fill(date);
  await this.page.waitForTimeout(3000)
  await this.filterbtn.click();
}
async verify(column, date, condition) {
  const firstColumnTdElements = await this.page.locator(`.modal-body tr td:nth-child(${column})`);
  const tdTexts = await firstColumnTdElements.allTextContents();
  const thresholdDate = new Date(date);

  for (let index = 0; index < tdTexts.length; index++) {
    const text = tdTexts[index].trim();
    const dateParts = text.split('/');

    // If dateParts is not in dd/mm/yyyy format, log an error and skip this row
    if (dateParts.length !== 3) {
      console.log(`Row ${index + 1}: Invalid date format`);
      continue;
    }

    // Reformat the date from dd/mm/yyyy to yyyy-mm-dd format
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    const extractedDate = new Date(formattedDate); // Create Date object

    // Check if the extracted date is valid
    if (isNaN(extractedDate)) {
      console.log(`Row ${index + 1}: Invalid date`);
      continue;
    }

    // Apply the condition dynamically
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
          throw new Error(`Row ${index + 1}: Date ${text} is NOT before ${date}`);
        }
        break;

      case 'Is after or equal to':
        if (extractedDate < thresholdDate) {
          throw new Error(`Row ${index + 1}: Date ${text} is NOT after ${date}`);
        }
        break;

      case 'Is null':
        if (text !== '') {
          throw new Error(`Row ${index + 1}: Date ${text} is NOT null`);
        }
        break;

      default:
        throw new Error(`Row ${index + 1}: Invalid condition ${condition}`);
    }
  }
}

async filterbydate1(choice,filtertype){
  await this.insurance.selectOption(choice);
  await this.page.waitForTimeout(4000)
  await this.page.getByTitle(`${filtertype} filter`).click();
  await this.page.waitForTimeout(1000)
  await this.page.getByRole('combobox', { name: 'Operator', exact: true }).locator('span').nth(1).click();
  await this.page.waitForTimeout(1000)
  await this.page.getByRole('option', { name: 'Is after or equal to'}).click();
  await this.page.waitForTimeout(1000)
  await this.page.getByRole('combobox', { name: 'Value', exact: true }).fill('5/1/2025');
  await this.page.waitForTimeout(1000)
  await this.page.getByRole('combobox', { name: 'Filters logic' }).getByLabel('select').click();
  await this.page.waitForTimeout(1000)
  await this.page.getByRole('option', { name: '​And' }).click();
  await this.page.waitForTimeout(1000)
  await this.page.getByRole('combobox', { name: 'Additional operator', exact: true }).locator('span').nth(1).click();
  await this.page.waitForTimeout(1000)
  await this.page.getByRole('option', { name: 'Is before or equal to'}).click();
  await this.page.waitForTimeout(1000)
  await this.page.getByRole('combobox', { name: 'Additional value', exact: true }).fill('8/1/2025');
  await this.page.waitForTimeout(1000)
  await this.filterbtn.click();
}
async verify1(column){
  const firstColumnTdElements = await this.page.locator(`.modal-body tr td:nth-child(${column})`);
  const tdTexts = await firstColumnTdElements.allTextContents();
  const thresholdDate1 = new Date('2025-5-1');
const thresholdDate2 = new Date('2025-8-1');

for (let index = 0; index < tdTexts.length; index++) {
  const text = tdTexts[index].trim();
  const dateParts = text.split('/');

  // If dateParts is not in dd/mm/yyyy format, log an error and skip this row
  if (dateParts.length !== 3) {
    console.log(`Row ${index + 1}: Invalid date format`);
    continue;
  }

  // Reformat the date from dd/mm/yyyy to yyyy-mm-dd format
  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  const extractedDate = new Date(formattedDate); // Create Date object

  // Check if the extracted date is valid
  if (isNaN(extractedDate)) {
    console.log(`Row ${index + 1}: Invalid date`);
    continue;
  }

  // Check if the date is NOT between thresholdDate1 and thresholdDate2 (exclusive)
  if (extractedDate <= thresholdDate1 || extractedDate >= thresholdDate2) {
    throw new Error(`Row ${index + 1}: Date ${text} is NOT strictly between ${thresholdDate1.toDateString()} and ${thresholdDate2.toDateString()}`);
  }
}

  
  }
}
export default EmployeinsurancesPage;