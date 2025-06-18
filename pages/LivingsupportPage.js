import { expect } from "@playwright/test";

class LivingsupportPage {
  constructor(page) {
    this.page = page;
    this.setup = page.getByRole('menuitem', { name: ' Setup ' });
    this.Livingsupport = page.locator("(//a[@href='/App/Livingsupport'])[1]");
    this.create = page.getByRole('button', { name: ' Create' });
    this.savebutton = page.getByRole('button', { name: ' Save' });
    this.deletebutton = page.getByRole('link', { name: ' Delete' });
    this.entries = page.getByRole('menuitem', { name: ' Entries ' });
    this.training=page.getByRole('menuitem', { name: ' Training ' });
    this.Trainingliving = page.getByRole('menuitem', { name: ' Training Living Support' });
    this.cssp=page.getByRole('menuitem', { name: ' CSSP ' });
    this.cssplivingsupport=page.getByRole('menuitem', { name: ' Living Support' });
  }

  async fillform(venuename,n, module){
    await this.page.getByRole('textbox', { name: 'Venue' }).fill(venuename);
    await this.page.locator('#provinceId').selectOption('3');
    await this.page.locator('.k-input-value-text').first().click();
    await this.page.getByRole('option', { name: 'Kathmandu' }).locator('span').click();
    await this.page.getByRole('textbox', { name: 'Address' }).fill('test');
    await this.page.locator('#configChoice_IsActive').selectOption('385');
    await this.page.getByRole('textbox', { name: 'Contact No.' }).fill('9011111');
    await this.page.getByRole('button', { name: 'select' }).nth(1).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('option', { name: 'Difficulty Factor 0%' }).click();
    await this.page.getByRole('button', { name: 'select' }).nth(2).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('option', { name: 'Bonus 1' }).click();
    await this.page.locator('#Venue_EmailAddress').fill('ram@gmail.com');
    await this.page.getByRole('textbox', { name: 'Hospital Committee Name' }).click();
    await this.page.getByRole('textbox', { name: 'Hospital Committee Name' }).fill('abc');
    await this.page.getByRole('textbox', { name: 'Bank Name' }).fill('NIC');
    await this.page.getByRole('textbox', { name: 'Bank Account Name' }).fill('Ram');
    await this.page.getByRole('textbox', { name: 'Bank Account Number' }).fill('123');
    await this.page.getByRole('textbox', { name: 'Pan Vat No' }).fill('134');
    await this.page.locator('#Venue_AffiliationCheckbox').check();
    
    await this.page.getByRole('button', { name: ' Program Affiliation Date' }).click();
    await this.page.getByRole('combobox', { name: 'Affiliation Start Date' }).fill('04/07/2024');
    //await this.page.getByRole('gridcell', { name: '/07/2025' }).click();
    await this.page.locator("(//td[@role='gridcell'])[3]").click()
    await this.page.getByRole('combobox', { name: 'Affiliation End Date' }).fill('12/8/2025');
    await this.page.getByRole('button', { name: 'Add' }).click();
    await this.page.waitForTimeout(500)
    
    await this.page.getByLabel('Program Type', { exact: true }).selectOption('369');
    for (let i = 0; i < n; i++) {
        await this.page.waitForTimeout(1000)
        await this.page.locator('#configChoiceModule_taglist').getByRole('combobox').click();
        await this.page.getByRole('option', { name: module[i] }).locator('span').click();
    }
    if (module.includes('Training')) {
        await this.page.waitForTimeout(1000)
        await this.page.locator('#trainingTypeId_taglist').getByRole('combobox').click();
        await this.page.getByRole('option', { name: 'ASBA' }).click();
    }
    await this.page.locator('#configChoiceHospitalTypeId').selectOption('452');
    await this.page.getByRole('spinbutton', { name: 'No of sanction beds' }).fill('4');
    await this.page.getByRole('spinbutton', { name: 'No of available beds' }).fill('2');
    await this.page.locator('#myModal').getByRole('button', { name: ' Save' }).click();
    await this.page.waitForTimeout(500)
    
    await this.page.locator("(//button[@class='btn btn-primary save-button'])[1]").click();
    await this.page.waitForTimeout(2000);
  }
  async checktraining(name){
    await this.entries.click();
    await this.training.click();
    await this.Trainingliving.click();
    await this.page.waitForTimeout(2000)
    await this.create.click();
    await this.page.locator('#FiscalYearId').selectOption('23');
    await this.page.waitForTimeout(3000)
    await this.page.locator('.k-input-value-text').first().click()
    await this.page.waitForTimeout(5000)
    const listItems = await this.page.locator('//*[@id="TrainingSiteId_listbox"]/li').allTextContents();
    await expect(listItems).toContain(name);
    await this.page.locator("(//button[normalize-space()='Close'])[1]").click(); 
    await this.entries.click();
    await this.page.waitForTimeout(1000)
  }
  async checkcssp(name){
    await this.entries.click();
    await this.cssp.click();
    await this.cssplivingsupport.click();
    await this.page.waitForTimeout(2000)
    await this.create.click();
    await this.page.locator('#FiscalYearId').selectOption('23');
    await this.page.waitForTimeout(1000)
    await this.page.locator('.k-input-value-text').first().click()
    await this.page.waitForTimeout(5000)
    const listItems = await this.page.locator('//*[@id="TrainingSiteId_listbox"]/li').allTextContents();
    await expect(listItems).toContain(name)
    await this.page.locator("(//button[normalize-space()='Close'])[1]").click(); 
  }
}
export default LivingsupportPage;