exports.AppointmentConfirmation = class AppointmentConfirmation {
  constructor(page,expect) {
    this.page = page;
    this.expect = expect;
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
    await this.expect(this.facility).toContainText(facility);
    await this.expect(this.readmission).toHaveText("Yes");
    await this.expect(this.program).toHaveText(program);
    await this.expect(this.date).toHaveText(visitDate);
    await this.expect(this.comment).toHaveText(comment);
  }
};

