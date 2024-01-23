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
  }
});

test.describe("Make appointment", () => {
  test("@my-appointment-01-Make appointment by filling in all fields correctly", async ({appointmentPage, loginPage, page, appointmentConfirmation}) => {
    await test.step ('Launch appointment page', async()=> {
      await expect(appointmentPage.makeAppointmentButton).toBeVisible();
    });
    await test.step ('Make appointment', async()=> {
      await appointmentPage.appointment(
        "Tokyo CURA Healthcare Center",
        "Medicaid",
        {visitDate:"18/12/2024",  
        comment:"Digestion problems"}
      );
    });
    await test.step ('Check appointment confirmation', async()=> {
    await expect(appointmentConfirmation.message).toBeVisible();
    await expect(appointmentConfirmation.message).toHaveText("Please be informed that your appointment has been booked as following:");
    await appointmentConfirmation.confirmation(
      "Tokyo CURA Healthcare Center",
        "Medicaid",
        {visitDate:"18/12/2024",
        comment:"Digestion problems"}
    );
    });
  });

  test("@my-appointment-02-Make appointment by filling in all fields correctly 2", async ({appointmentPage, loginPage, page, appointmentConfirmation}) => {
    await test.step ('Launch appointment page', async()=> {
      await expect(appointmentPage.makeAppointmentButton).toBeVisible();
    });
    await test.step ('Make appointment', async()=> {
      await appointmentPage.appointment(
        "Hongkong CURA Healthcare Center",
        "Medicare",
        {visitDate:"18/12/2024",
        comment:"Digestion problems"}
      );
    });
    await test.step ('Check appointment confirmation', async()=> {
    await expect(appointmentConfirmation.message).toBeVisible();
    await expect(appointmentConfirmation.message).toHaveText("Please be informed that your appointment has been booked as following:");
    await appointmentConfirmation.confirmation(
      "Hongkong CURA Healthcare Center",
        "Medicare",
        {visitDate:"18/12/2024",
        comment:"Digestion problems"}
    );
    });
  });

  test("@my-appointment-03-Make appointment by filling in all fields correctly 3", async ({appointmentPage, loginPage, page, appointmentConfirmation}) => {
    await test.step ('Launch appointment page', async()=> {
      await expect(appointmentPage.makeAppointmentButton).toBeVisible();
    });
    await test.step ('Make appointment', async()=> {
      await appointmentPage.appointment(
        "Seoul CURA Healthcare Center",
        "None",
        {visitDate:"18/12/2024",
        comment:"Digestion problems"}
      );
    });
    await test.step ('Check appointment confirmation', async()=> {
    await expect(appointmentConfirmation.message).toBeVisible();
    await expect(appointmentConfirmation.message).toHaveText("Please be informed that your appointment has been booked as following:");
    await appointmentConfirmation.confirmation(
      "Seoul CURA Healthcare Center",
        "None",
        {visitDate:"18/12/2024",
        comment:"Digestion problems"}
    );
    });
  });

  test("@my-appointment-04-Make appointment without filling the comment section", async ({appointmentPage, loginPage, page, appointmentConfirmation}) => {
    await test.step ('Launch appointment page', async()=> {
      await expect(appointmentPage.makeAppointmentButton).toBeVisible();
    });
    await test.step ('Make appointment', async()=> {
      await appointmentPage.appointment(
        "Seoul CURA Healthcare Center",
        "None",
        {visitDate:"18/12/2024"}
      );
    });
    await test.step ('Check appointment confirmation', async()=> {
    await expect(appointmentConfirmation.message).toBeVisible();
    await expect(appointmentConfirmation.message).toHaveText("Please be informed that your appointment has been booked as following:");
    await appointmentConfirmation.confirmation(
      "Seoul CURA Healthcare Center",
        "None",
        {visitDate:"18/12/2024"}
    );
    });
  });

  test("@my-appointment-05-Make appointment without filling the date", async ({appointmentPage, loginPage, page, appointmentConfirmation}) => {
    await test.step ('Launch appointment page', async()=> {
      await expect(appointmentPage.makeAppointmentButton).toBeVisible();
    });
    await test.step ('Make appointment', async()=> {
      await appointmentPage.appointment(
        "Seoul CURA Healthcare Center",
        "None",
        {comment:"Digestion problems"}
      );
    });
    await test.step ('Check appointment confirmation', async()=> {
    await expect(appointmentConfirmation.message).not.toBeVisible();
    });
  });
});