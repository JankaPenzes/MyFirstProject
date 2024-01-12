exports.AppointmentPage = class AppointmentPage {
  constructor(page) {
    this.page = page;
    this.makeAppointmentButton = page.locator("#btn-make-appointment");
    this.facility = page.locator("#combo_facility");
    this.readmission = page.locator("#chk_hospotal_readmission");
    this.program = page.locator(".col-sm-4");
    this.calendar = page.getByPlaceholder("dd/mm/yyyy");
    this.comment = page.locator("#txt_comment");
    this.bookAppointmentButton = page.locator("#btn-book-appointment");
  }
  async waitFor (){
    this.page.waitForURL(
      "https://katalon-demo-cura.herokuapp.com/#appointment"
    )
  }
  async appointment(facility, program, options = {visitDate, comment}) {
    let visitDate = options.visitDate||""
    let comment = options.comment||""
    await this.facility.selectOption({value:facility})
    await this.readmission.click();
    await this.program.getByText(program).check();
    await this.calendar.click();
    await this.calendar.type(visitDate);
    await this.comment.fill(comment);
    await this.bookAppointmentButton.click();
  }
};
