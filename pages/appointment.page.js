exports.AppointmentPage = class AppointmentPage {
  constructor(page) {
    this.page = page;
    this.makeAppointmentButton = page.locator("#btn-make-appointment")
  }
};
