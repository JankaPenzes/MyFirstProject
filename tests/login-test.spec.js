const { test, expect } = require("@playwright/test");
import { LoginPage } from "../pages/login.page";
import { AppointmentPage } from "../pages/appointment.page";
public async goTo( "https://katalon-demo-cura.herokuapp.com/profile.php#login"){
  await page.goto()
};
const loadPage =
  base.loadPage.extend({
    loginPage: async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      await loginPage.goTo();
      await use(loginPage);
    },
  });
test.describe("Log in", () => {
  let loginPage;
  // test.beforeEach(async ({ page }) => {
  //   await page.goto(
  //     "https://katalon-demo-cura.herokuapp.com/profile.php#login"
  //   );
  //   loginPage = new LoginPage(page);
  // });
  test("Correct username and password", async ({ page }) => {
    const appointmentPage = new AppointmentPage(page);
    await loginPage.login("John Doe", "ThisIsNotAPassword");
    await page.waitForURL(
      "https://katalon-demo-cura.herokuapp.com/#appointment"
    );
    await expect(appointmentPage.makeAppointmentButton).toBeVisible();
  });
  test("Incorrect username and password", async ({ page }) => {
    await loginPage.login("John", "ThisIsNot");
    await expect(loginPage.loginError).toHaveText(
      "Login failed! Please ensure the username and password are valid."
    );
  });
  test("Incorrect username and correct password", async ({ page }) => {
    await loginPage.login("John", "ThisIsNotAPassword");
    await expect(loginPage.loginError).toHaveText(
      "Login failed! Please ensure the username and password are valid."
    );
  });
  test("Correct username and incorrect password", async ({ page }) => {
    await loginPage.login("John Doe", "ThisIsNot");
    await expect(loginPage.loginError).toHaveText(
      "Login failed! Please ensure the username and password are valid."
    );
  });
});
