import { expect } from "@playwright/test";

class VenuePage {
  constructor(page) {
    this.page = page;
    this.setup = page.getByRole('menuitem', { name: ' Setup ' });
    this.venue = page.locator("(//a[@href='/App/Venue'])[1]");
    this.search = page.getByRole('textbox', { name: 'Search' });
    this.next = page.getByRole('button', { name: 'Next' });
    this.create = page.getByRole('button', { name: ' Create' });
    this.address = page.locator("(//div[@class='wizard-label'])[2]");
    this.savebutton = page.getByRole('button', { name: ' Save' });
    this.cancelbutton = page.locator("//button[normalize-space()='Cancel']");
    this.submitbutton = page.getByRole('button', { name: 'Submit' });
    this.editbutton = page.getByRole('link', { name: ' Edit' });
    this.deletebutton = page.getByRole('link', { name: ' Delete' });
  }

  async navigateTovenue() {
    await this.setup.click();
    await this.venue.click();
    await expect(this.page).toHaveURL('https://mnev2qa.exolutus.com/App/Venue');
    await this.page.waitForTimeout(4000);
  }
  async createvenue() {
    await this.create.click();
    await this.page.waitForTimeout(2000);
  }
  async fillform(){
    await this.page.getByRole('textbox', { name: 'Venue' }).fill('test');
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
    await this.page.getByRole('combobox', { name: 'Affiliation Start Date' }).fill('04/07/2026');
    await this.page.getByRole('gridcell', { name: '/07/2025' }).click();
    await this.page.getByRole('combobox', { name: 'Affiliation End Date' }).fill('4/8/2026');
    await this.page.getByRole('button', { name: 'Add' }).click();
    await this.page.waitForTimeout(500)
    
    await this.page.getByLabel('Program Type', { exact: true }).selectOption('369');
    await this.page.locator('#configChoiceModule_taglist').getByRole('combobox').click();
    await this.page.getByRole('option', { name: 'Training' }).locator('span').click();
    await this.page.locator('#trainingTypeId_taglist').getByRole('combobox').click();
    await this.page.getByRole('option', { name: 'ASBA' }).click();
    await this.page.locator('#configChoiceHospitalTypeId').selectOption('452');
    await this.page.getByRole('spinbutton', { name: 'No of sanction beds' }).fill('4');
    await this.page.getByRole('spinbutton', { name: 'No of available beds' }).fill('2');
    await this.page.locator('#myModal').getByRole('button', { name: ' Save' }).click();
    await this.page.waitForTimeout(500)
    
    await this.page.locator("(//button[@class='btn btn-primary save-button'])[1]").click();
    await this.page.waitForTimeout(2000);
  }
  async deletevenue(){
    await this.page.getByRole('row', { name: '+  Actions  test ' }).getByRole('button').click();
    await this.page.getByRole('link', { name: ' Edit' }).click();
    await this.page.getByRole('button', { name: '' }).click();
    await this.page.locator('#Venue_AffiliationCheckbox').uncheck();
    await this.page.getByRole('button', { name: ' Save' }).click();
    await this.page.getByRole('row', { name: '+  Actions  test Bagmati' }).getByRole('button').click();
    await this.page.getByRole('link', { name: ' Delete' }).click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }
}
export default VenuePage;