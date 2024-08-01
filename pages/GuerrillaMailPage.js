const axios = require('axios');

exports.GuerrillaMailPage =  class GuerrillaMailPage {
  constructor() {
    this.baseUrl = 'https://api.guerrillamail.com/ajax.php';
  }

  async createTemporaryEmail() {
    const response = await axios.get(`${this.baseUrl}?f=get_email_address`);
    this.emailData = response.data;
    this.emailAddress = this.emailData.email_addr;
    this.emailUser = this.emailData.email_user;
    return this.emailAddress;
  }

  async waitForEmail(timeout = 60000, pollInterval = 5000) {
    const startTime = new Date().getTime();

    while (new Date().getTime() - startTime < timeout) {
      await new Promise(res => setTimeout(res, pollInterval));

      const response = await axios.get(`${this.baseUrl}?f=get_email_list&email_user=${this.emailUser}`);
      const emailList = response.data.list;

      if (emailList.length > 0) {
        const latestEmailId = emailList[0].mail_id;
        const emailDetailsResponse = await axios.get(`${this.baseUrl}?f=fetch_email&email_id=${latestEmailId}`);
        const emailDetails = emailDetailsResponse.data;
        return emailDetails.mail_body;
      }
    }

    throw new Error('Email was not received in time');
  }

  parseRegistrationLink(emailBody) {
    const registrationLinkRegex = /https?:\/\/[^\s]+/;
    const match = emailBody.match(registrationLinkRegex);
    if (match) {
      return match[0];
    }
    throw new Error('Registration link was not found in the email');
  }
}
