const { test, expect } = require("@playwright/test");
import { LoginPage } from "../pages/login.page";
import { AppointmentPage } from "../pages/appointment.page";
test.describe("Log in", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://katalon-demo-cura.herokuapp.com/profile.php#login"
    );
  });
  test("Correct username and password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    await loginPage.login("John Doe", "ThisIsNotAPassword");
    await page.waitForURL(
      "https://katalon-demo-cura.herokuapp.com/#appointment"
    );
    await expect(appointmentPage.makeAppointmentButton).toBeVisible();
  });
  test("Incorrect username and password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("John", "ThisIsNot");
    await expect(page.locator(".text-danger")).toHaveText(
      "Login failed! Please ensure the username and password are valid."
    );
  });
  test("Incorrect username and correct password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("John", "ThisIsNotAPassword");
    await expect(page.locator(".text-danger")).toHaveText(
      "Login failed! Please ensure the username and password are valid."
    );
  });
  test("Correct username and incorrect password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("John Doe", "ThisIsNot");
    await expect(page.locator(".text-danger")).toHaveText(
      "Login failed! Please ensure the username and password are valid."
    );
  });
});
