const axios = require('axios');
const cheerio = require('cheerio'); // Для парсинга HTML

exports.Mailinator = class TempMailPage {
  constructor(apiToken, domain, inbox) {
    this.baseUrl = 'https://mailinator.com/api/v2'; // URL для Mailinator API
    this.apiToken = apiToken; // API токен
    this.domain = domain; // Ваш домен
    this.inbox = inbox; // Ваш почтовый ящик
    this.emailAddress = null;
  }

  async createTemporaryEmail() {
    try {
      console.log('Creating temporary email...');
      const randomSuffix = Math.random().toString(36).substring(2, 15);
      this.emailAddress = `${randomSuffix}@${this.domain}`;
      console.log('Generated email:', this.emailAddress);
      return this.emailAddress;
    } catch (error) {
      console.error('Error in createTemporaryEmail:', error.message);
      throw new Error('Failed to create temporary email');
    }
  }

  async waitForEmail(timeout = 60000, pollInterval = 5000) {
    if (!this.emailAddress) {
      throw new Error('Email address is not defined. Ensure createTemporaryEmail() was called successfully.');
    }

    const inbox = this.emailAddress.split('@')[0];
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      console.log('Polling for emails...');
      await new Promise(res => setTimeout(res, pollInterval));

      try {
        console.log(`Requesting email list for inbox: ${inbox}`);
        const response = await axios.get(`${this.baseUrl}/domains/private/inboxes/${inbox}?limit=1&sort=descending`, {
          headers: {
            'Authorization': `Bearer ${this.apiToken}`
          }
        });

        if (response.status === 200 && response.data && response.data.msgs && response.data.msgs.length > 0) {
          const emailList = response.data.msgs;
          const latestEmailId = emailList[0].id;
          console.log(`Fetching email details for email ID: ${latestEmailId}`);
          const emailDetailsResponse = await axios.get(`${this.baseUrl}/domains/private/inboxes/${inbox}/messages/${latestEmailId}`, {
            headers: {
              'Authorization': `Bearer ${this.apiToken}`
            }
          });
          const emailDetails = emailDetailsResponse.data;
          return emailDetails;
        } else {
          console.log('No emails received yet.');
        }
      } catch (error) {
        console.error('Error retrieving email list:', error.message);
      }
    }

    throw new Error('Email was not received in time');
  }

  parseRegistrationLink(emailDetails) {
    // Проверка наличия частей письма
    if (!emailDetails || !emailDetails.parts || emailDetails.parts.length === 0) {
      throw new Error('No email parts found');
    }

    // Извлечение HTML части
    const htmlPart = emailDetails.parts.find(part => part.headers['content-type'] && part.headers['content-type'].includes('text/html'));

    if (htmlPart) {
      // Используем cheerio для парсинга HTML
      const $ = cheerio.load(htmlPart.body);
      const registrationLink = $('a').attr('href');
      if (registrationLink) {
        return registrationLink;
      } else {
        throw new Error('Registration link was not found in the email HTML');
      }
    } else {
      throw new Error('No HTML part found in the email');
    }
  }
}
