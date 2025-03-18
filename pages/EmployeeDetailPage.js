import { expect } from "@playwright/test";

class EmployeeDetailPage {
  constructor(page) {
    this.page = page;
    this.entries = page.getByRole('menuitem', { name: ' Entries ' });
    this.hr = page.getByRole('menuitem', { name: ' HR ' });
    this.details = page.getByRole('menuitem', { name: ' Employee Details' });
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

  async navigateToemployedetail() {
    await this.entries.click();
    await this.hr.click();
    await this.details.click();
    await expect(this.page).toHaveURL('https://mnev2qa.exolutus.com/App/EmployeeDetails');
  }

  async createnewemployee() {
    await this.page.getByRole('button', { name: ' Create new employee detail' }).click();
    await this.page.locator('#txtFirstName').fill('Celina');
    await this.page.getByRole('button', { name: ' Search' }).click();
    await this.page.getByRole('textbox', { name: 'First Name' }).fill('Celina');
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill('Celina');
    await this.page.getByRole('button', { name: 'select' }).first().click();
    await this.page.getByRole('combobox', { name: 'Date Of Birth(A.D)' }).fill('12/12/2002');
    await this.page.getByLabel('Gender').selectOption('3');
    await this.page.getByLabel('Marital Status').selectOption('395');
    await this.page.getByLabel('Blood Group').selectOption('396');
    await this.page.getByLabel('Caste/Ethnicity').selectOption('2567');
    await this.page.getByRole('textbox', { name: 'Father\'s Name', exact: true }).fill('ram');
    await this.page.getByRole('textbox', { name: 'Mother\'s Name', exact: true }).fill('sita');
    await this.page.getByRole('textbox', { name: 'Grand Father\'s Name' }).fill('hari');
    await this.page.getByRole('textbox', { name: 'Grand Mother\'s Name' }).fill('gita');
    await this.page.getByRole('textbox', { name: 'Citizenship No. Place Of Issue' }).fill('025645');
    await this.page.locator('#districtId').selectOption('38');
    await this.page.getByRole('combobox', { name: 'Issue Date(A.D) Issue Date(B.' }).fill('3/06/2023');
    await this.page.getByRole('textbox', { name: 'Council Registration No.' }).fill('9600');
    await this.page.getByRole('textbox', { name: 'PAN No.' }).fill('89521');
    await this.page.getByRole('textbox', { name: 'Bank Name' }).fill('2222');
    await this.page.getByRole('textbox', { name: 'Branch' }).fill('gongabu');
    await this.page.getByRole('textbox', { name: 'Acount Name' }).fill('test');
    await this.page.getByRole('textbox', { name: 'Account Number' }).fill('22222');
    await this.next.click();
  }

  async searchemployee(employee) {
    await this.search.fill(employee);
    await this.search.press('Enter');
    await this.page.waitForSelector(`text=${employee}`);
  }

  async editemployee(name) {
    await this.page.getByRole('row', { name: `+  Actions  ${name}` }).getByRole('button').click();
    await this.editbutton.click();
    
    await this.next.click();
  }

  async addnewaddress() {
    await this.create.click();
    await this.page.getByLabel('Address Type', { exact: true }).selectOption('52');
    await this.page.locator('#AddressProvinceId').selectOption('3');
    await this.page.locator('.k-input-value-text').first().click();
    await this.page.getByRole('option', { name: 'Kathmandu' }).locator('span').click();
    await this.page.getByRole('button', { name: 'select' }).nth(1).click();
    await this.page.getByText('Kathmandu Metropolitan City').click();
    await this.page.getByRole('button', { name: 'select' }).nth(2).click();
    await this.page.getByRole('option', { name: '26' }).click();
    await this.page.locator('#EmployeeAddressDetail_ToleStreet').fill('tole1');
    await this.savebutton.click();
  }

  async addnewcontact() {
    await this.page.locator('//*[@id="kt_wizard_v3"]/div[1]/div/div[3]/div/h5[2]').click();
    await this.create.click();
    await this.page.getByLabel('Contact Method', { exact: true }).selectOption('411');
    await this.page.getByRole('spinbutton', { name: 'Contact Address' }).fill('77776756');
    await this.savebutton.click();
  }

  async addnewacademic() {
    await this.page.locator('//*[@id="kt_wizard_v3"]/div[1]/div/div[4]/div/h5[2]').click();
    await this.create.click();
    await this.page.getByRole('textbox', { name: 'Institute' }).fill('nccs');
    await this.page.getByRole('textbox', { name: 'Place' }).fill('thamel');
    await this.page.locator('#AcademicDetail_Qualification').fill('+2');
    await this.page.getByRole('textbox', { name: 'Start Year' }).fill('2022');
    await this.page.getByRole('textbox', { name: 'End Year' }).fill('2025');
    await this.savebutton.click();
  }

  async addnewservicerecord() {
    await this.page.locator('//*[@id="kt_wizard_v3"]/div[1]/div/div[7]/div/h5[2]').click();
    await this.page.waitForTimeout(2000);
    await this.create.click();
    await this.page.locator('#configChoiceServiceStatusId').selectOption('385');
    await this.page.getByLabel('RecruitType').selectOption('2610');
    await this.page.getByLabel('Contract Type', { exact: true }).selectOption('2551');
    await this.page.getByLabel('Cadre Group').selectOption('1');
    await this.page.getByRole('combobox', { name: 'Cadre', exact: true }).locator('span').first().click();
    await this.page.getByRole('option', { name: 'Consultant' }).click();
    await this.page.getByRole('combobox', { name: 'Designation' }).getByLabel('select').click();
    await this.page.getByText('Senior Consultant').click();
    await this.page.locator('#ServiceProvinceID').selectOption('3');
    await this.page.locator('//*[@id="EmployeeServiceDetailInformationsTab"]/form/div[1]/div[8]/div/span[2]/span[2]').click();
    await this.page.getByRole('option', { name: 'Kathmandu' }).locator('span').click();
    await this.page.locator(' //*[@id="EmployeeServiceDetailInformationsTab"]/form/div[1]/div[9]/span[2]/span[2]').click();
    await this.page.getByRole('option', { name: 'National Health Training Center (NHTC)' }).locator('span').click();
    await this.page.getByRole('combobox', { name: 'Program Type' }).locator('span').nth(1).click();
    await this.page.getByText('Non CSSP Hospital').click();
    await this.page.getByRole('combobox', { name: 'Department' }).locator('span').first().click();
    await this.page.getByRole('option', { name: 'MSS' }).click();
    await this.page.getByRole('textbox', { name: 'Contract Number' }).fill('55550');
    await this.page.getByRole('combobox', { name: 'End Date' }).fill('3/4/2026');
    await this.page.getByRole('combobox', { name: 'End Date' }).press('Enter');
  }

  async addnewinsurance() {
    await this.page.locator('//*[@id="kt_wizard_v3"]/div[1]/div/div[8]/div/h5[2]').click();
    await this.page.waitForTimeout(2000);
    await this.create.click();
    await this.page.locator('//*[@id="ctId"]').click();
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
    await this.page.getByLabel('GPA Policy No.', { exact: true }).selectOption('6');
    
    await this.savebutton.click();
  }

  async addnewdocument() {
    await this.page.locator('//*[@id="kt_wizard_v3"]/div[1]/div/div[11]/div/h5[2]').click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('button', { name: ' Create new document' }).click();
    await this.page.getByRole('combobox', { name: 'Document Type' }).locator('span').first().click();
    await this.page.getByRole('option', { name: 'PAN Card' }).click();
    await this.page.locator('input[name="employeeFiles"]').setInputFiles('D:/Users/celina/Downloads/sample.docx');
    await this.savebutton.click();
  }

  async finalsubmit() {
    await this.page.locator('//*[@id="kt_wizard_v3"]/div[1]/div/div[12]/div/h5[2]').click();
    await this.submitbutton.click();
  }

  async deleteservicerecord() {
    await this.page.locator('//*[@id="kt_wizard_v3"]/div[1]/div/div[7]/div/h5[2]').click();
    
    await this.page.getByRole('button', { name: ' Actions ' }).click();
    await this.editbutton.click();
    await this.page.locator('#configChoiceServiceStatusId').selectOption('386');
    await this.page.locator('#configChoiceServiceEndContractStatusId').selectOption('448');
    await this.page.getByRole('combobox', { name: 'End Contract Status Date' }).fill('3/4/2026');
    await this.page.getByRole('combobox', { name: 'End Contract Status Date' }).press('Enter');
    await this.page.getByRole('button', { name: ' Actions ' }).click();
    await this.deletebutton.click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }

  async deleteinsurance() {
    await this.page.locator('//*[@id="kt_wizard_v3"]/div[1]/div/div[8]/div/h5[2]').click();
    
    await this.page.getByRole('button', { name: ' Actions ' }).click();
    await this.page.getByRole('link', { name: 'Delete' }).first().click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }

  async deleteaddress() {
    await this.page.locator('//*[@id="kt_wizard_v3"]/div[1]/div/div[2]/div/h5[2]').click();
    
    await this.page.getByRole('button', { name: ' Actions ' }).click();
    await this.page.getByRole('link', { name: 'Delete' }).first().click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }

  async deletecontact() {
    await this.page.locator('//*[@id="kt_wizard_v3"]/div[1]/div/div[3]/div/h5[2]').click();
   
    await this.page.getByRole('button', { name: ' Actions ' }).click();
    await this.page.getByRole('link', { name: 'Delete' }).first().click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }

  async deleteacademic() {
    await this.page.locator('//*[@id="kt_wizard_v3"]/div[1]/div/div[4]/div/h5[2]').click();
    
    await this.page.getByRole('button', { name: ' Actions ' }).click();
    await this.page.getByRole('link', { name: 'Delete' }).first().click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }

  async deletedocument() {
    await this.page.locator('//*[@id="kt_wizard_v3"]/div[1]/div/div[11]/div/h5[2]').click();
    
    await this.page.getByRole('button', { name: ' Actions ' }).click();
    await this.page.getByRole('link', { name: 'Delete' }).first().click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }
}

export default EmployeeDetailPage;