const base = require('@playwright/test');
import { LoginPage } from "../pages/login.page";
import { AppointmentPage } from "../pages/appointment.page";
const expect = base.expect;
const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await use(loginPage);
  },
});
test.describe("Log in", () => {
  test("@my-login-01-Correct username and password", async ({ page, loginPage }) => {
    const appointmentPage = new AppointmentPage(page);
    await loginPage.login("John Doe", "ThisIsNotAPassword");
    await page.waitForURL(
      "https://katalon-demo-cura.herokuapp.com/#appointment"
    );
    await expect(appointmentPage.makeAppointmentButton).toBeVisible();
  });
  test("@my-login-02-Incorrect username and password", async ({ page, loginPage }) => {
    await loginPage.login("John", "ThisIsNot");
    await expect(loginPage.loginError).toHaveText(
      "Login failed! Please ensure the username and password are valid."
    );
  });
  test("@my-login-03-Incorrect username and correct password", async ({ page, loginPage }) => {
    await loginPage.login("John", "ThisIsNotAPassword");
    await expect(loginPage.loginError).toHaveText(
      "Login failed! Please ensure the username and password are valid."
    );
  });
  test("@my-login-04-Correct username and incorrect password", async ({ page, loginPage }) => {
    await loginPage.login("John Doe", "ThisIsNot");
    await expect(loginPage.loginError).toHaveText(
      "Login failed! Please ensure the username and password are valid."
    );
  });
});
