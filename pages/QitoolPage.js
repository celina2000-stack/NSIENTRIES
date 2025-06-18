import { expect } from "@playwright/test";

class QitoolPage {
  constructor(page) {
    this.page = page;
    this.setup=page.getByRole('menuitem', { name: ' Setup ' });
    this.qitoolsetup=page.getByRole('menuitem', { name: ' QI Tool Setup ' });
    this.qitoolversion=page.getByRole('menuitem', { name: ' QI Tool Versions' });
    this.qitooltemplates=page.getByRole('menuitem', { name: ' QI Tool Templates' });
    this.newqitoolversion=page.getByRole('button', { name: '  Create QI Tool Versions' });
    this.newqitooltemplate=page.getByRole('button', { name: '  Create QI Tool Template' });
    this.create=page.getByRole('button', { name: '  Create' });
    this.version=page.getByRole('textbox', { name: 'QI Versions' });
    this.save=page.getByRole('button', { name: ' Save' });
    this.close=page.getByRole('button', { name: 'close' });
    this.tick=page.locator("button[class='k-grid-update k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-icon-button']")
    this.cross=page.locator("button[class='k-grid-cancel k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button']")

    this.entries = page.getByRole('menuitem', { name: ' Entries ' });
    this.training=page.getByRole('menuitem', { name: ' Training ' });
    this.site = page.getByRole('menuitem', { name: ' Site Development' });
  }
  async gototoolversion(){
    await this.setup.click();
    await this.qitoolsetup.click()
    await this.qitoolversion.click()
    await expect(this.page).toHaveURL("https://mnev2qa.exolutus.com/App/QIToolVersions")
    await this.page.waitForTimeout(1000)
    
  }
  async newversion(version){
    await this.newqitoolversion.click()
    await this.version.fill(version)
    await this.save.click()
  }
  async gototooltemplates(){
    await this.qitooltemplates.click()
    await expect(this.page).toHaveURL("https://mnev2qa.exolutus.com/App/QIToolTemplates")
    await this.page.waitForTimeout(2000)
  }
  async newtemplate(version, event){
    await this.newqitooltemplate.click();
    await this.page.waitForTimeout(3000)
    await this.page.getByLabel('QI Tool Versions', { exact: true }).selectOption({ label: version });
    await this.page.getByLabel('Events').selectOption({ label: event });
  }
  async servicedetail(service, score, order){
    await this.page.waitForTimeout(2000)
    await this.page.getByRole('button', { name: ' QI Tool Services Detail' }).click();
    await this.page.getByRole('button', { name: 'select' }).click();
    await this.page.getByRole('option', { name: service }).click();
    await this.page.waitForTimeout(2000)
    await this.page.getByRole('spinbutton').first().click();
    await this.page.locator('input[name="ReferenceScore"]').fill(score);
    await this.page.getByRole('spinbutton').nth(1).click();
    await this.page.locator('input[name="DisplayOrder"]').fill(order);
    await this.tick.click()
  }
  async closetemplate(){
    await this.close.click()
  }
  async gotosite(){
    await this.entries.click()
    await this.training.click()
    await this.site.click()
    await expect(this.page).toHaveURL("https://mnev2qa.exolutus.com/App/SiteDevelopments")
    await this.page.waitForTimeout(2000)
  }
  async newsite(type, name, version, baseline, first){
    await this.create.click()
    await this.page.waitForTimeout(2000)
    await this.page.getByLabel('Training Type', { exact: true }).selectOption({ label: type});
    await this.page.waitForTimeout(2000)
    await this.page.getByRole('combobox', { name: 'Hospital Name' }).getByLabel('select').click();
    await this.page.getByText(name).click();
    await this.page.getByLabel('Versions', { exact: true }).selectOption({ label: version});
    await this.page.getByRole('combobox', { name: 'Baseline Score Date' }).fill(baseline);
    await this.page.getByRole('combobox', { name: 'First MoU Date' }).fill(first);
    
  }
  
  async verifyservices( index, detail, score){
    const cell = this.page.locator('#SiteDevelopmentEntryGrid table').nth(2) // 3rd table (index starts from 0)
    .locator(`tr:nth-child(${index}) td:nth-child(1)`);
    await expect(cell).toHaveText(detail)
    const cell1 = this.page.locator('#SiteDevelopmentEntryGrid table').nth(3) // 3rd table (index starts from 0)
    .locator(`tr:nth-child(${index}) td:nth-child(3)`);
    await expect(cell1).toHaveText(score)
  }
  async baseline(){
    const cell=this.page.locator('#SiteDevelopmentEntryGrid table').nth(3) // 3rd table (index starts from 0)
    .locator(`tr:nth-child(1) td:nth-child(4)`)
    await cell.click();
    await cell.type("2")
    const cell1=this.page.locator('#SiteDevelopmentEntryGrid table').nth(3) // 3rd table (index starts from 0)
    .locator(`tr:nth-child(2) td:nth-child(4)`)
    await cell1.click();
    await cell1.type("6")
    const cell2=this.page.locator('#SiteDevelopmentEntryGrid table').nth(3) // 3rd table (index starts from 0)
    .locator(`tr:nth-child(3) td:nth-child(4)`)
    await cell2.click();
    await cell2.type("3")
  }
  async savefunction(){
    await this.save.click()
  }
  async edit(Accreditated,Assessment){
    await this.page.getByRole('row', { name: ' Actions  Rapti Provincial Hospital' }).getByRole('button').click();
    await this.page.getByRole('link', { name: ' Edit' }).click();
    await this.page.getByRole('combobox', { name: 'Accreditated Date' }).fill(Accreditated);
    await this.page.locator('#SiteDevelopments_AssessmentScoreDate').fill(Assessment);
    

  }
  async accreditated(){
    const cell=this.page.locator('#SiteDevelopmentEntryGrid table').nth(3) // 3rd table (index starts from 0)
    .locator(`tr:nth-child(1) td:nth-child(5)`)
    await cell.click();
    await cell.type("4")
    const cell1=this.page.locator('#SiteDevelopmentEntryGrid table').nth(3) // 3rd table (index starts from 0)
    .locator(`tr:nth-child(2) td:nth-child(5)`)
    await cell1.click();
    await cell1.type("5")
    const cell2=this.page.locator('#SiteDevelopmentEntryGrid table').nth(3) // 3rd table (index starts from 0)
    .locator(`tr:nth-child(3) td:nth-child(5)`)
    await cell2.click();
    await cell2.type("8")
  }
  async Assessment(){
    const cell=this.page.locator('#SiteDevelopmentEntryGrid table').nth(3) // 3rd table (index starts from 0)
    .locator(`tr:nth-child(1) td:nth-child(6)`)
    await cell.click();
    await cell.type("6")
    const cell1=this.page.locator('#SiteDevelopmentEntryGrid table').nth(3) // 3rd table (index starts from 0)
    .locator(`tr:nth-child(2) td:nth-child(6)`)
    await cell1.click();
    await cell1.type("2")
    const cell2=this.page.locator('#SiteDevelopmentEntryGrid table').nth(3) // 3rd table (index starts from 0)
    .locator(`tr:nth-child(3) td:nth-child(6)`)
    await cell2.click();
    await cell2.type("3")
    await this.save.click()
  }
}
export default QitoolPage;