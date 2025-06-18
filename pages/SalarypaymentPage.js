import { expect } from "@playwright/test";

class SalarypaymentPage {
  constructor(page) {
    this.page = page;
    this.entries = page.getByRole('menuitem', { name: ' Entries ' });
    this.hr=page.getByRole('menuitem', { name: ' HR ' });
    this.employeesalary = page.getByRole('menuitem', { name: ' Employee Salary Payment' });
    this.create = page.getByRole('button', { name: ' Create' });
    this.savebutton = page.getByRole('button', { name: ' Save' });
  }
  async gotosalarypayment(){
    await this.entries.click()
    await this.hr.click()
    await this.employeesalary.click()
  }
  async newbatch(n,months){
    await this.create.click()
    await this.page.locator('#fiscalYearId').selectOption('23');
    await this.page.waitForTimeout(1000)
    for (let i = 0; i < n; i++) {
        await this.page.waitForTimeout(1000)
        await this.page.locator('#SalaryDetail_Month_taglist').getByRole('combobox').click();
        await this.page.getByRole('option', { name: months[i] }).locator('span').click();
    }
    //await this.page.locator('#oneTimeAdjustment_taglist').getByRole('combobox').click();
    //await this.page.getByRole('option', { name: 'Festival Allowance' }).locator('span').click();
    await this.savebutton.click()
    
  }
  async select(){
    await this.page.getByRole('row', { name: '+  Actions  10 2081/082 (2024' }).getByRole('gridcell').first().click();
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.waitForTimeout(1000)
    
    await this.page.getByRole('row', { name: 'Collapse Baghauda Hospital' }).getByRole('checkbox').check();
    await this.page.waitForTimeout(3000)
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.waitForTimeout(3000)
    const columnSelector = `.k-virtual-scrollable-wrap tr td:nth-child(6)`;
    const columnElements = await this.page.locator(columnSelector);
    const columnValues = await columnElements.allTextContents();
    for (let index = 0; index < columnValues.length; index++) {
        const text = columnValues[index].trim().toLowerCase();
        expect(text).not.toBe('');
    }
    await this.page.waitForTimeout(2000)
    await this.page.getByRole('button', { name: 'Submit' }).click()
    await this.page.getByRole('button', { name: 'Yes' }).click();
}
async actionbutton(){
    await this.page.getByRole('row', { name: ' Actions  10 2081/082 (2024' }).getByRole('button').click();
    await this.page.waitForTimeout(3000)
    await this.page.getByRole('link', { name: 'Export For BMS' }).click()
}

}
export default SalarypaymentPage; 