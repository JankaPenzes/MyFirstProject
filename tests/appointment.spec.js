const base = require("@playwright/test");
import { LoginPage } from "../pages/login.page";
import { AppointmentPage } from "../pages/appointment.page";
import { AppointmentConfirmation } from "../pages/appointment-confirmation.page";
const expect = base.expect;
const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login("John Doe", "ThisIsNotAPassword");
    await use(loginPage);
  },
  appointmentPage: async ({ page }, use) => {
    const appointmentPage = new AppointmentPage(page);
    await appointmentPage.waitFor();
    await use(appointmentPage);
  },
  appointmentConfirmation: async ({ page }, use) => {
    const appointmentConfirmation = new AppointmentConfirmation(page);
    await appointmentConfirmation.waitFor();
    await use(appointmentConfirmation);
    await expect(appointmentConfirmation.message).toBeVisible();
    await expect(appointmentConfirmation.message).toHaveText("Please be informed that your appointment has been booked as following:");
  }
});
test.describe("Make appointment", () => {
  test("Make appointment by filling in all fields correctly", async ({appointmentPage, loginPage, page, appointmentConfirmation}) => {
    await expect(appointmentPage.makeAppointmentButton).toBeVisible();
    await appointmentPage.appointment(
      "Tokyo CURA Healthcare Center",
      "Medicaid",
      "18/12/2024",
      "Digestion problems"
    );
  });

  test("Make appointment by filling in all fields correctly 2", async ({appointmentPage, loginPage, page}) => {
    const appointmentConfirmation = new AppointmentConfirmation(page);
    await expect(appointmentPage.makeAppointmentButton).toBeVisible();
    await appointmentPage.appointment(
      "Hongkong CURA Healthcare Center",
      "Medicare",
      "18/12/2024",
      "Digestion problems"
    );
    await expect(appointmentConfirmation.message).toBeVisible();
    await expect(appointmentConfirmation.message).toHaveText("Please be informed that your appointment has been booked as following:");
  });

  test("Make appointment by filling in all fields correctly 3", async ({appointmentPage, loginPage, page}) => {
    const appointmentConfirmation = new AppointmentConfirmation(page);
    await expect(appointmentPage.makeAppointmentButton).toBeVisible();
    await appointmentPage.appointment(
      "Seoul CURA Healthcare Center",
      "None",
      {visitDate:"18/12",
      comment:"fjgj"}
    );
    await expect(appointmentConfirmation.message).toBeVisible();
    await expect(appointmentConfirmation.message).toHaveText("Please be informed that your appointment has been booked as following:");
  });

  test("Make appointment without filling the comment section", async ({appointmentPage, loginPage, page}) => {
    const appointmentConfirmation = new AppointmentConfirmation(page);
    await expect(appointmentPage.makeAppointmentButton).toBeVisible();
    await appointmentPage.appointment(
      "Seoul CURA Healthcare Center",
      "None",
      {visitDate:"18/12"}
    );
    await expect(appointmentConfirmation.message).toBeVisible();
    await expect(appointmentConfirmation.message).toHaveText("Please be informed that your appointment has been booked as following:");
  });

  test("Make appointment without filling the date", async ({appointmentPage, loginPage, page}) => {
    const appointmentConfirmation = new AppointmentConfirmation(page);
    await expect(appointmentPage.makeAppointmentButton).toBeVisible();
    await appointmentPage.bookAppointmentButton.click();
    await page.waitForTimeout(2000);
  });
});