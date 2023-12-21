const { test, expect } = require("@playwright/test");
import { LoginPage } from "../pages/login.page";
import { AppointmentPage } from "../pages/appointment.page";
test.describe("Make appointment", () => {
  let loginPage;
  let appointmentPage;
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://katalon-demo-cura.herokuapp.com/profile.php#login"
    );
    loginPage = new LoginPage(page);
    appointmentPage = new AppointmentPage(page);
    await loginPage.login("John Doe", "ThisIsNotAPassword");
    await page.waitForURL(
      "https://katalon-demo-cura.herokuapp.com/#appointment"
    );
    await expect(appointmentPage.makeAppointmentButton).toBeVisible();
  });
  test("Make appointment with by filling in all fields correctly", async ({
    page,
  }) => {
    await appointmentPage.appointment(
      "Tokyo CURA Healthcare Center",
      "Medicaid",
      "18/12/2023",
      "Digestion problems"
    );
    await expect(message.AppointmentPage).toHaveText(
      "Appointment Confirmation"
    );
  });
});
