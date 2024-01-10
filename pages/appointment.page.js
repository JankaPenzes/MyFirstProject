exports.AppointmentPage = class AppointmentPage {
  constructor(page) {
    this.page = page;
    this.makeAppointmentButton = page.locator("#btn-make-appointment");
    this.facility = page.locator("#combo_facility");
    this.readmission = page.locator("#chk_hospital_readmission");
    this.program = page.locator("[name='programs']");
    this.calendar = page.locator("#txt_visit_date");
    this.comment = page.locator("#txt_comment");
    this.bookAppointmentButton = page.locator("#btn-book-appointment");
  }
  async waitFor (){
    this.page.waitForURL(
      "https://katalon-demo-cura.herokuapp.com/#appointment"
    )
  }
  async appointment(facility, program, visitDate, comment) {
    await this.facility.select_option(facility);
    await this.readmission.click();
    await this.program.getByText(program).click();
    await this.calendar(click);
    await this.calendar.fill(visitDate);
    await this.comment.fill(comment);
    await this.bookAppointmentButton.click();
  }
};
