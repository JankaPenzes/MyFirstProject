exports.AppointmentConfirmation = class AppointmentConfirmation {
  constructor(page) {
    this.page = page;
    this.message = page.locator(".lead");
    this.facility = page.locator("#facility");
    this.readmission = page.locator("#hospital_readmission");
    this.program = page.locator("#program");
    this.date = page.locator("#visit_date");
    this.comment = page.locator("#comment");
  }
  async waitFor (){
    this.page.waitForURL(
      "https://katalon-demo-cura.herokuapp.com/appointment.php#summary"
    )
  }
  async confirmation(facility, program, options = {visitDate, comment}) {
    let visitDate = options.visitDate||""
    let comment = options.comment||""
    await this.facility.toHaveValue(facility);
    await this.readmission.toHaveText("Yes");
    await this.program.toHaveText(program);
    await this.date.toHaveText(visitDate);
    await this.comment.toHaveText(comment);
  }
};

