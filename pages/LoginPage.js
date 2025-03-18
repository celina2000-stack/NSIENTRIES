import { expect } from "@playwright/test";

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username=page.getByRole('textbox', { name: 'User name or email' });
    this.password=page.getByRole('textbox', { name: 'Password' });
    this.loginButton=page.getByRole('button', { name: 'Log in' })
    this.users=page.locator('//*[@id="kt_quick_user_toggle"]');
    this.setup=page.getByRole('menuitem', { name: ' Setup ' });
    this.hrModuleSetup=page.getByRole('menuitem', { name: ' HR Module Setup ' });
    this.paymentItems=page.getByRole('menuitem', { name: ' Payment Items' });
  }

  async navigateToLogin() {
    await this.page.goto('https://mnev2qa.exolutus.com/Account/Login');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.click();
    await this.password.fill(password);
    await this.page.waitForTimeout(2000);
    await this.loginButton.click(); 
    await expect(this.page).toHaveURL('https://mnev2qa.exolutus.com/App/TenantDashboard'); 
  }
  async checkUser(user) {
    await expect(this.users).toContainText(user);
  }
  async logout() {
    await this.users.click();
    await this.page.getByRole('link', { name: 'Logout' }).click();
  }
}

export default LoginPage;