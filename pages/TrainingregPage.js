import { expect } from "@playwright/test";

class TrainingregPage {
  constructor(page) {
    this.page = page;
    this.entries = page.getByRole('menuitem', { name: ' Entries ' });
    this.training=page.getByRole('menuitem', { name: ' Training ' });
    this.Trainingreg = page.getByRole('menuitem', { name: ' Training Registration' });
    this.create = page.getByRole('button', { name: ' Create new training' });
    this.address = page.locator("(//div[@class='wizard-label'])[2]");
    this.savebutton = page.getByRole('button', { name: ' Save' });
    this.cancelbutton = page.locator("//button[normalize-space()='Cancel']");
   
    this.deletebutton = page.getByRole('link', { name: ' Delete' });
  }

  async navigateToTrainingreg() {
    await this.entries.click();
    await this.training.click();
    await this.Trainingreg.click();
    await expect(this.page).toHaveURL('https://mnev2qa.exolutus.com/App/Training');
    await this.page.waitForTimeout(4000);
  }
  async createTrainingreg() {
    await this.create.click();
    await this.page.waitForTimeout(2000);
  }
  async fillform(){
    await this.page.getByLabel('Training Name', { exact: true }).selectOption('213');
    await this.page.getByLabel('Trainng Type').selectOption('2606');
    await this.page.getByLabel('Sponsor').selectOption('249');
    await this.page.getByLabel('Status').selectOption('385');
    await this.page.getByRole('combobox', { name: 'Training Site' }).locator('span').nth(1).click();
    await this.page.getByRole('option', { name: 'United Mission Hospital,' }).click();
    await this.page.getByRole('spinbutton', { name: 'Batch Number' }).fill('8');
    await this.page.getByRole('combobox', { name: 'Start Date' }).fill('3/8/2025');
    await this.page.getByRole('combobox', { name: 'End Date' }).fill('3/9/2025');
    await this.savebutton.click();
    await this.page.waitForTimeout(2000);
  }
  async editTrainingreg(){
    await this.page.locator("//tbody/tr[1]/td[2]/div[1]/button[1]").click();
    await this.page.locator("(//a[@class='dropdown-item'][normalize-space()='Edit'])[1]").click();
    await this.savebutton.click();
  }
  async deleteTrainingreg(){
    await this.page.locator("//tbody/tr[1]/td[2]/div[1]/button[1]").click();
    await this.deletebutton.click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }
}
export default TrainingregPage;