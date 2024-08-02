const axios = require('axios');

exports.TempMailPage = class TempMailPage {
  constructor() {
    this.baseUrl = 'https://www.1secmail.com/api/v1/';
    this.emailAddress = null;
    this.emailUser = null;
    this.emailDomain = null;
  }

  async createTemporaryEmail() {
    try {
      console.log('Creating temporary email...');
      const response = await axios.get(`${this.baseUrl}?action=genRandomMailbox&count=1`);
      const email = response.data[0];
      console.log('Generated email:', email);
      
      [this.emailUser, this.emailDomain] = email.split('@');
      this.emailAddress = email;
      return this.emailAddress;
    } catch (error) {
      console.error('Error in createTemporaryEmail:', error.message);
      throw new Error('Failed to create temporary email');
    }
  }

  async waitForEmail(timeout = 60000, pollInterval = 5000) {
    if (!this.emailUser || !this.emailDomain) {
      throw new Error('Email address is not defined. Ensure createTemporaryEmail() was called successfully.');
    }

    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      console.log('Polling for emails...');
      await new Promise(res => setTimeout(res, pollInterval));

      try {
        console.log(`Requesting email list for user: ${this.emailUser}, domain: ${this.emailDomain}`);
        const response = await axios.get(`${this.baseUrl}?action=getMessages&login=${this.emailUser}&domain=${this.emailDomain}`);
        
        if (response.data && response.data.length > 0) {
          const emailList = response.data;

          const latestEmailId = emailList[0].id;

          console.log(`Fetching email details for email ID: ${latestEmailId}`);
          const emailDetailsResponse = await axios.get(`${this.baseUrl}?action=readMessage&login=${this.emailUser}&domain=${this.emailDomain}&id=${latestEmailId}`);
          const emailDetails = emailDetailsResponse.data;

          return emailDetails.body;
        } else {
          console.log('No emails received yet.');
        }
      } catch (error) {
        console.error('Error retrieving email list:', error.message);
        throw new Error('Failed to retrieve email list');
      }
    }

    throw new Error('Email was not received in time');
  }

  parseRegistrationLink(emailBody) {
    // Функция для извлечения URL из HTML
    const urlRegex = /href="([^"]*)"/;
    const match = emailBody.match(urlRegex);
    if (match) {
      // Вернуть URL без лишнего HTML-кода
      return match[1].split('">')[0];
    }
    throw new Error('Registration link was not found in the email');
  }
}





