const { test, expect } = require("@playwright/test");
import { LoginPage } from "../pages/login.page";
import { AppointmentPage } from "../pages/appointment.page";
test.describe("Log in", () => {
  test("Correct username and password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    await page.goto(
      "https://katalon-demo-cura.herokuapp.com/profile.php#login"
    );
    await loginPage.login("John Doe", "ThisIsNotAPassword");
    await page.waitForURL(
      "https://katalon-demo-cura.herokuapp.com/#appointment"
    );
    await expect(appointmentPage.makeAppointmentButton).toBeVisible();
  });
  test("Incorrect username and password", async ({ page }) => {
    const loginPage2 = new LoginPage(page);
    await page.goto(
      "https://katalon-demo-cura.herokuapp.com/profile.php#login"
    );
    await loginPage2.login("John", "ThisIsNot");
    await expect(page.locator(".text-danger")).toHaveText(
      "Login failed! Please ensure the username and password are valid."
    );
  });
});
