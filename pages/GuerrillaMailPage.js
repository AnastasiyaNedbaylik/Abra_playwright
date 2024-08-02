const axios = require('axios');

exports.GuerrillaMailPage = class GuerrillaMailPage {
//   constructor() {
//     this.baseUrl = 'http://api.guerrillamail.com/ajax.php';
//     this.cookies = {};
//   }

//   async createTemporaryEmail() {
//     try {
//       console.log('Creating temporary email...');
//       const response = await axios.get(`${this.baseUrl}?f=get_email_address&ip=127.0.0.1&agent=Mozilla_Foo_Bar`, {
//         headers: { 'Cookie': this.getCookies() }
//       });

//       console.log('Response data:', response.data);

//       // Save cookies
//       this.saveCookies(response.headers['set-cookie']);

//       this.emailData = response.data;
//       this.emailAddress = this.emailData.email_addr;
//       this.emailUser = this.emailData.email_user;
//       return this.emailAddress;
//     } catch (error) {
//       console.error('Error:', error.message);
//       throw new Error('Failed to create temporary email');
//     }
//   }

//   async waitForEmail(timeout = 60000, pollInterval = 5000) {
//     const startTime = Date.now();

//     while (Date.now() - startTime < timeout) {
//       console.log('Polling for emails...');
//       await new Promise(res => setTimeout(res, pollInterval));

//       try {
//         console.log(`Requesting email list for user: ${this.emailUser}`);
//         const response = await axios.get(`${this.baseUrl}?f=get_email_list&offset=0&seq=0`, {
//           headers: { 'Cookie': this.getCookies() }
//         });
//         console.log('Email list response:', response.data);

//         const emailList = response.data.list;
//         if (emailList && emailList.length > 0) {
//           const latestEmailId = emailList[0].mail_id;

//           try {
//             console.log(`Fetching email details for email ID: ${latestEmailId}`);
//             const emailDetailsResponse = await axios.get(`${this.baseUrl}?f=fetch_email&email_id=${latestEmailId}`, {
//               headers: { 'Cookie': this.getCookies() }
//             });
//             console.log('Email details response:', emailDetailsResponse.data);

//             const emailDetails = emailDetailsResponse.data;
//             return emailDetails.mail_body;
//           } catch (error) {
//             console.error('Error fetching email details:', error.message);
//             throw new Error('Failed to fetch email details');
//           }
//         }
//       } catch (error) {
//         console.error('Error retrieving email list:', error.message);
//         throw new Error('Failed to retrieve email list');
//       }
//     }

//     throw new Error('Email was not received in time');
//   }

//   parseRegistrationLink(emailBody) {
//     const registrationLinkRegex = /https?:\/\/[^\s]+/;
//     const match = emailBody.match(registrationLinkRegex);
//     if (match) {
//       return match[0];
//     }
//     throw new Error('Registration link was not found in the email');
//   }

//   getCookies() {
//     return Object.entries(this.cookies).map(([key, value]) => `${key}=${value}`).join('; ');
//   }

//   saveCookies(cookies) {
//     cookies.forEach(cookie => {
//       const [key, value] = cookie.split(';')[0].split('=');
//       this.cookies[key] = value;
//     });
//   }
// }




//   constructor() {
//     this.baseUrl = 'http://api.guerrillamail.com/ajax.php';
//     this.cookies = {};
//   }

//   async createTemporaryEmail() {
//     try {
//       console.log('Creating temporary email...');
//       const response = await axios.get(`${this.baseUrl}?f=get_email_address&ip=127.0.0.1&agent=Mozilla_Foo_Bar`, {
//         headers: { 'Cookie': this.getCookies() }
//       });

//       console.log('Response data:', response.data);

//       // Save cookies
//       this.saveCookies(response.headers['set-cookie']);

//       this.emailData = response.data;
//       this.emailAddress = this.emailData.email_addr;
//       this.emailUser = this.emailData.email_user;
//       return this.emailAddress;
//     } catch (error) {
//       console.error('Error:', error.message);
//       throw new Error('Failed to create temporary email');
//     }
//   }

//   async waitForEmail(timeout = 60000, pollInterval = 5000) {
//     const startTime = Date.now();

//     while (Date.now() - startTime < timeout) {
//       console.log('Polling for emails...');
//       await new Promise(res => setTimeout(res, pollInterval));

//       try {
//         console.log(`Requesting email list for user: ${this.emailAddress}`);
//         const response = await axios.get(`${this.baseUrl}?f=get_email_list&offset=0&email_addr=${encodeURIComponent(this.emailAddress)}`, {
//           headers: { 'Cookie': this.getCookies() }
//         });
//         console.log('Email list response:', response.data);

//         const emailList = response.data.list;
//         if (emailList && emailList.length > 0) {
//           const latestEmailId = emailList[0].mail_id;

//           try {
//             console.log(`Fetching email details for email ID: ${latestEmailId}`);
//             const emailDetailsResponse = await axios.get(`${this.baseUrl}?f=fetch_email&email_id=${latestEmailId}`, {
//               headers: { 'Cookie': this.getCookies() }
//             });
//             console.log('Email details response:', emailDetailsResponse.data);

//             const emailDetails = emailDetailsResponse.data;
//             return emailDetails.mail_body;
//           } catch (error) {
//             console.error('Error fetching email details:', error.message);
//             throw new Error('Failed to fetch email details');
//           }
//         }
//       } catch (error) {
//         console.error('Error retrieving email list:', error.message);
//         throw new Error('Failed to retrieve email list');
//       }
//     }

//     throw new Error('Email was not received in time');
//   }

//   parseRegistrationLink(emailBody) {
//     const registrationLinkRegex = /https?:\/\/[^\s]+/;
//     const match = emailBody.match(registrationLinkRegex);
//     if (match) {
//       return match[0];
//     }
//     throw new Error('Registration link was not found in the email');
//   }

//   getCookies() {
//     return Object.entries(this.cookies).map(([key, value]) => `${key}=${value}`).join('; ');
//   }

//   saveCookies(cookies) {
//     cookies.forEach(cookie => {
//       const [key, value] = cookie.split(';')[0].split('=');
//       this.cookies[key] = value;
//     });
//   }
// }





// constructor() {
//     this.baseUrl = 'http://api.guerrillamail.com/ajax.php';
//     this.cookies = {};
//   }

//   async createTemporaryEmail() {
//     try {
//       console.log('Creating temporary email...');
//       const response = await axios.get(`${this.baseUrl}?f=get_email_address&ip=127.0.0.1&agent=Mozilla_Foo_Bar`, {
//         headers: { 'Cookie': this.getCookies() }
//       });

//       console.log('Response data:', response.data);

//       // Save cookies
//       this.saveCookies(response.headers['set-cookie']);

//       this.emailData = response.data;
//       this.emailAddress = this.emailData.email_addr;
//       this.emailUser = this.emailData.email_user;
      
//       if (!this.emailAddress || !this.emailUser) {
//         throw new Error('Email address or user not defined');
//       }
      
//       return this.emailAddress;
//     } catch (error) {
//       console.error('Error:', error.message);
//       throw new Error('Failed to create temporary email');
//     }
//   }

//   async waitForEmail(timeout = 60000, pollInterval = 5000) {
//     const startTime = Date.now();

//     while (Date.now() - startTime < timeout) {
//       console.log('Polling for emails...');
//       await new Promise(res => setTimeout(res, pollInterval));

//       try {
//         console.log(`Requesting email list for user: ${this.emailUser}`);
//         const response = await axios.get(`${this.baseUrl}?f=get_email_list&offset=0&seq=0`, {
//           headers: { 'Cookie': this.getCookies() }
//         });
//         console.log('Email list response:', response.data);

//         // Печатаем весь ответ, чтобы увидеть, что именно возвращается
//         console.log('Full response data:', JSON.stringify(response.data, null, 2));

//         // Проверяем структуру ответа
//         if (response.data && response.data.list && response.data.list.length > 0) {
//           const latestEmailId = response.data.list[0].mail_id;

//           try {
//             console.log(`Fetching email details for email ID: ${latestEmailId}`);
//             const emailDetailsResponse = await axios.get(`${this.baseUrl}?f=fetch_email&email_id=${latestEmailId}`, {
//               headers: { 'Cookie': this.getCookies() }
//             });
//             console.log('Email details response:', emailDetailsResponse.data);

//             const emailDetails = emailDetailsResponse.data;
//             return emailDetails.mail_body;
//           } catch (error) {
//             console.error('Error fetching email details:', error.message);
//             throw new Error('Failed to fetch email details');
//           }
//         } else {
//           console.log('No emails found in the list');
//         }
//       } catch (error) {
//         console.error('Error retrieving email list:', error.message);
//         throw new Error('Failed to retrieve email list');
//       }
//     }

//     throw new Error('Email was not received in time');
//   }

//   parseRegistrationLink(emailBody) {
//     const registrationLinkRegex = /https?:\/\/[^\s]+/;
//     const match = emailBody.match(registrationLinkRegex);
//     if (match) {
//       return match[0];
//     }
//     throw new Error('Registration link was not found in the email');
//   }

//   getCookies() {
//     return Object.entries(this.cookies).map(([key, value]) => `${key}=${value}`).join('; ');
//   }

//   saveCookies(cookies) {
//     cookies.forEach(cookie => {
//       const [key, value] = cookie.split(';')[0].split('=');
//       this.cookies[key] = value;
//     });
//   }
// }



// constructor() {
//     this.baseUrl = 'http://api.guerrillamail.com/ajax.php';
//     this.cookies = {};
//   }

//   async createTemporaryEmail() {
//     try {
//       console.log('Creating temporary email...');
//       const response = await axios.get(`${this.baseUrl}?f=get_email_address&ip=127.0.0.1&agent=Mozilla_Foo_Bar`, {
//         headers: { 'Cookie': this.getCookies() }
//       });

//       console.log('Response data:', response.data);

//       // Save cookies
//       this.saveCookies(response.headers['set-cookie']);

//       this.emailData = response.data;
//       this.emailAddress = this.emailData.email_addr;
//       this.emailUser = this.emailData.email_user;

//       // Логируем значение переменных
//       console.log('Email Address:', this.emailAddress);
//       console.log('Email User:', this.emailUser);
      
//       if (!this.emailAddress || !this.emailUser) {
//         throw new Error('Email address or user not defined');
//       }
      
//       return this.emailAddress;
//     } catch (error) {
//       console.error('Error:', error.message);
//       throw new Error('Failed to create temporary email');
//     }
//   }

//   async waitForEmail(timeout = 60000, pollInterval = 5000) {
//     const startTime = Date.now();

//     while (Date.now() - startTime < timeout) {
//       console.log('Polling for emails...');
//       await new Promise(res => setTimeout(res, pollInterval));

//       try {
//         console.log(`Requesting email list for user: ${this.emailUser}`);
//         const response = await axios.get(`${this.baseUrl}?f=get_email_list&offset=0&seq=0`, {
//           headers: { 'Cookie': this.getCookies() }
//         });
//         console.log('Email list response:', response.data);

//         // Печатаем весь ответ, чтобы увидеть, что именно возвращается
//         console.log('Full response data:', JSON.stringify(response.data, null, 2));

//         // Проверяем структуру ответа
//         if (response.data && response.data.list && response.data.list.length > 0) {
//           const latestEmailId = response.data.list[0].mail_id;

//           try {
//             console.log(`Fetching email details for email ID: ${latestEmailId}`);
//             const emailDetailsResponse = await axios.get(`${this.baseUrl}?f=fetch_email&email_id=${latestEmailId}`, {
//               headers: { 'Cookie': this.getCookies() }
//             });
//             console.log('Email details response:', emailDetailsResponse.data);

//             const emailDetails = emailDetailsResponse.data;
//             return emailDetails.mail_body;
//           } catch (error) {
//             console.error('Error fetching email details:', error.message);
//             throw new Error('Failed to fetch email details');
//           }
//         } else {
//           console.log('No emails found in the list');
//         }
//       } catch (error) {
//         console.error('Error retrieving email list:', error.message);
//         throw new Error('Failed to retrieve email list');
//       }
//     }

//     throw new Error('Email was not received in time');
//   }

//   parseRegistrationLink(emailBody) {
//     const registrationLinkRegex = /https?:\/\/[^\s]+/;
//     const match = emailBody.match(registrationLinkRegex);
//     if (match) {
//       return match[0];
//     }
//     throw new Error('Registration link was not found in the email');
//   }

//   getCookies() {
//     return Object.entries(this.cookies).map(([key, value]) => `${key}=${value}`).join('; ');
//   }

//   saveCookies(cookies) {
//     cookies.forEach(cookie => {
//       const [key, value] = cookie.split(';')[0].split('=');
//       this.cookies[key] = value;
//     });
//   }
// }



// constructor() {
//     this.baseUrl = 'http://api.guerrillamail.com/ajax.php';
//     this.cookies = {};
//   }

//   async createTemporaryEmail() {
//     try {
//       console.log('Creating temporary email...');
//       const response = await axios.get(`${this.baseUrl}?f=get_email_address&ip=127.0.0.1&agent=Mozilla_Foo_Bar`, {
//         headers: { 'Cookie': this.getCookies() }
//       });

//       console.log('Response data:', response.data);

//       // Проверяем, что email создан успешно
//       if (response.data.email_addr) {
//         this.emailData = response.data;
//         this.emailAddress = this.emailData.email_addr;
//         this.emailUser = this.emailData.email_user;

//         // Сохраняем cookies
//         this.saveCookies(response.headers['set-cookie']);
//         return this.emailAddress;
//       } else {
//         throw new Error('Failed to create temporary email address');
//       }
//     } catch (error) {
//       console.error('Error in createTemporaryEmail:', error.message);
//       throw new Error('Failed to create temporary email');
//     }
//   }

//   async waitForEmail(timeout = 60000, pollInterval = 5000) {
//     const startTime = Date.now();

//     while (Date.now() - startTime < timeout) {
//       console.log('Polling for emails...');
//       await new Promise(res => setTimeout(res, pollInterval));

//       try {
//         if (!this.emailUser) {
//           throw new Error('Email user is not defined');
//         }
        
//         console.log(`Requesting email list for user: ${this.emailUser}`);
//         const response = await axios.get(`${this.baseUrl}?f=get_email_list&offset=0&seq=0`, {
//           headers: { 'Cookie': this.getCookies() }
//         });
//         console.log('Email list response:', response.data);

//         const emailList = response.data.list;
//         if (emailList && emailList.length > 0) {
//           const latestEmailId = emailList[0].mail_id;

//           try {
//             console.log(`Fetching email details for email ID: ${latestEmailId}`);
//             const emailDetailsResponse = await axios.get(`${this.baseUrl}?f=fetch_email&email_id=${latestEmailId}`, {
//               headers: { 'Cookie': this.getCookies() }
//             });
//             console.log('Email details response:', emailDetailsResponse.data);

//             const emailDetails = emailDetailsResponse.data;
//             return emailDetails.mail_body;
//           } catch (error) {
//             console.error('Error fetching email details:', error.message);
//             throw new Error('Failed to fetch email details');
//           }
//         }
//       } catch (error) {
//         console.error('Error retrieving email list:', error.message);
//         throw new Error('Failed to retrieve email list');
//       }
//     }

//     throw new Error('Email was not received in time');
//   }

//   parseRegistrationLink(emailBody) {
//     const registrationLinkRegex = /https?:\/\/[^\s]+/;
//     const match = emailBody.match(registrationLinkRegex);
//     if (match) {
//       return match[0];
//     }
//     throw new Error('Registration link was not found in the email');
//   }

//   getCookies() {
//     return Object.entries(this.cookies).map(([key, value]) => `${key}=${value}`).join('; ');
//   }

//   saveCookies(cookies) {
//     cookies.forEach(cookie => {
//       const [key, value] = cookie.split(';')[0].split('=');
//       this.cookies[key] = value;
//     });
//   }
// }



constructor() {
    this.baseUrl = 'http://api.guerrillamail.com/ajax.php';
    this.cookies = {};
    this.emailUser = null; // Инициализация
  }

  async createTemporaryEmail() {
    try {
      console.log('Creating temporary email...');
      const response = await axios.get(`${this.baseUrl}?f=get_email_address&ip=127.0.0.1&agent=Mozilla_Foo_Bar`, {
        headers: { 'Cookie': this.getCookies() }
      });

      console.log('Response data:', response.data);

      // Проверяем, что email создан успешно
      if (response.data.email_addr) {
        this.emailData = response.data;
        this.emailAddress = this.emailData.email_addr;
        this.emailUser = this.emailData.email_user;

        // Сохраняем cookies
        this.saveCookies(response.headers['set-cookie']);
        return this.emailAddress;
      } else {
        throw new Error('Failed to create temporary email address');
      }
    } catch (error) {
      console.error('Error in createTemporaryEmail:', error.message);
      throw new Error('Failed to create temporary email');
    }
  }

  async waitForEmail(timeout = 60000, pollInterval = 5000) {
    if (!this.emailUser) {
      throw new Error('Email user is not defined');
    }

    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      console.log('Polling for emails...');
      await new Promise(res => setTimeout(res, pollInterval));

      try {
        console.log(`Requesting email list for user: ${this.emailUser}`);
        const response = await axios.get(`${this.baseUrl}?f=get_email_list&offset=0&seq=0`, {
          headers: { 'Cookie': this.getCookies() }
        });
        console.log('Email list response:', response.data);

        const emailList = response.data.list;
        if (emailList && emailList.length > 0) {
          const latestEmailId = emailList[0].mail_id;

          try {
            console.log(`Fetching email details for email ID: ${latestEmailId}`);
            const emailDetailsResponse = await axios.get(`${this.baseUrl}?f=fetch_email&email_id=${latestEmailId}`, {
              headers: { 'Cookie': this.getCookies() }
            });
            console.log('Email details response:', emailDetailsResponse.data);

            const emailDetails = emailDetailsResponse.data;
            return emailDetails.mail_body;
          } catch (error) {
            console.error('Error fetching email details:', error.message);
            throw new Error('Failed to fetch email details');
          }
        }
      } catch (error) {
        console.error('Error retrieving email list:', error.message);
        throw new Error('Failed to retrieve email list');
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

  getCookies() {
    return Object.entries(this.cookies).map(([key, value]) => `${key}=${value}`).join('; ');
  }

  saveCookies(cookies) {
    cookies.forEach(cookie => {
      const [key, value] = cookie.split(';')[0].split('=');
      this.cookies[key] = value;
    });
  }
}