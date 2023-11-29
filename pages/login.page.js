exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameTextbox = page.locator("#txt-username");
    this.passwordTextbox = page.locator("#txt-password");
    this.loginButton = page.locator("#btn-login");
    this.loginError = page.locator(".text-danger");
  }

  async login(username, password) {
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginButton.click();
  }
};
