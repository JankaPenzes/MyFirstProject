exports.AppointmentConfirmation = class AppointmentConfirmation {
  constructor(page) {
    this.page = page;
    this.message = page.locator(".lead");
  }
  async waitFor (){
    this.page.waitForURL(
      "https://katalon-demo-cura.herokuapp.com/appointment.php#summary"
    )
  }
};
