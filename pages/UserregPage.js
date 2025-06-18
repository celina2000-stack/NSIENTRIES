import { expect } from "@playwright/test";

class UserregPage {
  constructor(page) {
    this.page = page;
    this.entries = page.getByRole('menuitem', { name: ' Entries ' });
    this.training=page.getByRole('menuitem', { name: ' Training ' });
    this.Userreg = page.getByRole('menuitem', { name: ' User Registrations' });
    this.create = page.getByRole('button', { name: ' Create' });
    this.address = page.locator("(//div[@class='wizard-label'])[2]");
    this.savebutton = page.getByRole('button', { name: ' Save' });
    this.cancelbutton = page.locator("//button[normalize-space()='Cancel']");
   
    this.deletebutton = page.getByRole('link', { name: ' Delete' });
  }

  async navigateToUserreg() {
    await this.entries.click();
    await this.training.click();
    await this.Userreg.click();
    await expect(this.page).toHaveURL('https://mnev2qa.exolutus.com/App/UserRegistrations');
    await this.page.waitForTimeout(4000);
  }
  async createUserreg() {
    await this.create.click();
    await this.page.locator('#txtFirstName').fill('test');
    await this.page.getByRole('button', { name: ' Search' }).click();   
    await this.page.getByRole('gridcell', { name: 'test' }).first().dblclick();
    await this.page.waitForTimeout(2000);
  }
  async fillform(){
    await this.page.getByRole('button', { name: ' Clear' }).click();
    await this.page.getByLabel('Trainer/Participant').selectOption('75');
    await this.page.getByLabel('Training Name').selectOption('216');
    await this.page.getByRole('combobox', { name: 'Training Site' }).getByLabel('select').click();
    await this.page.getByRole('option', { name: 'Bharatpur Hospital' }).locator('span').click();
    await this.page.getByRole('combobox', { name: 'Batch Number' }).getByLabel('select').click();
    await this.page.getByRole('option', { name: '29' }).click();
    await this.page.getByRole('textbox', { name: 'First Name' }).fill('test');
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill('test');
    await this.page.getByLabel('Gender').selectOption('3');
    await this.page.getByRole('combobox', { name: 'Date Of Birth(A.D) Date Of' }).fill('12/12/2002');
    await this.page.locator('#trainerAddressProvinceId').selectOption('3');
    await this.page.waitForTimeout(2000);
    await this.page.locator("(//span[@aria-label='select'])[3]").click();
    await this.page.waitForTimeout(500);
    await this.page.locator('#trainerAdressDistrictId_listbox').getByRole('option', { name: 'Kathmandu' }).click();
    await this.page.waitForTimeout(500);
    await this.page.locator('.col-sm-4 > .form-group > .k-picker > .k-input-button').first().click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('option', { name: 'Kathmandu Metropolitan City' }).click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('combobox', { name: 'Ward Number' }).getByLabel('select').click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('option', { name: '26', exact: true }).click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('textbox', { name: 'Contact No.' }).fill('1334');
    await this.page.getByRole('textbox', { name: 'Email' }).fill('test@gmail.com');

    await this.page.getByLabel('Caste/Ethnicity').selectOption('2567');
    await this.page.getByLabel('Cadre Group').selectOption('1');
    await this.page.waitForTimeout(500);
    await this.page.getByRole('textbox', { name: 'Qualification' }).fill('12');

    await this.page.locator('.WorkingPlace > .card > .card-body > .row > div > .form-group > .k-picker > .k-input-button').first().click();
    await this.page.getByRole('option', { name: 'Tokha Chandeshowri Hospital' }).locator('span').click();
    await this.page.locator('div:nth-child(5) > .form-group > .k-picker > .k-input-button').click();
    await this.page.waitForTimeout(500);
    await this.page.locator('#UserRegistration_TrainerWorkPlaceVdc-list').getByText('Kathmandu Metropolitan City').click();
    await this.page.getByRole('textbox', { name: 'Contact Number' }).fill('123');
    await this.page.getByRole('combobox', { name: 'Cadre', exact: true }).getByLabel('select').click();
    await this.page.getByText('Dental Surgeon').click();
    await this.page.waitForTimeout(1000)
    await this.page.getByRole('textbox', { name: 'Level' }).fill('2');
    await this.page.getByRole('textbox', { name: 'PIS No' }).fill('2211');
    await this.page.getByRole('textbox', { name: 'Citizenship No.' }).fill('02564511');
    await this.page.getByLabel('Issue District').selectOption('38');
    await this.page.getByRole('textbox', { name: 'Council Registration No.' }).fill('960011');

    await this.page.getByRole('checkbox', { name: 'Would you like to receive' }).check();
    await this.page.getByRole('checkbox', { name: 'Is Dropout?' }).check();
    await this.page.locator('input[name="Image"]').setInputFiles('D:/Users/celina/Documents/celina/nsiEntries/Trainingreg/1741339395721.png');
    await this.savebutton.click();
    
    await this.page.waitForTimeout(2000);
  }
  async viewUserreg(){
    await this.page.getByRole('row', { name: ' Actions  test test 2058/11' }).getByRole('button').click();
    await this.page.getByRole('link', { name: ' View' }).click();
    await this.page.locator("(//button[@class='k-grid-edit k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button'])[1]").click();
  }
  
}
export default UserregPage;