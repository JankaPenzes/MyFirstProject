exports.AppointmentConfirmation = class AppointmentConfirmation {
  constructor(page) {
    this.page = page;
    this.message = page.locator(".bg-primary");
  }
  async waitFor (){
    this.page.waitForURL(
      "https://katalon-demo-cura.herokuapp.com/appointment.php#summary"
    )
  }
  async confirmation(text){
    await this.message.toBeVisible();
  }
};
