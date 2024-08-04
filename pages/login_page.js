const { expect } = require('@playwright/test')
import { login_page } from '../locators/login_page';
import { setup_account_page } from '../locators/setup_account_page';
import { urls } from '../utilities/settings';

exports.LoginPage = class LoginPage{
    constructor(page) {
        this.page = page;
        this.email_field = page.locator(login_page.email_field);
        this.password_field = page.locator(login_page.password_field);
        this.login_btn = page.locator(login_page.login_btn);
        // this.first_name_field = page.locator(setup_account_page.first_name_field);
      }
    
      async open_login_page() {
        await this.page.goto(urls.login_page);
        // Ожидание, пока страница полностью загрузится
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(300);
      }

      async fill_login_email(email) {
        await this.email_field.focus();
        await this.email_field.fill(email);
        await this.page.waitForTimeout(300);
      }

      async fill_login_password(password) {
        await this.password_field.focus();
        await this.password_field.fill(password);
        await this.page.waitForTimeout(300);
      }

      async click_login_btn_to_open_setup_page() {
        await this.login_btn.click();
        try {
            await this.page.waitForURL(urls.setup_personal_info_page, { timeout: 10000 });
            await this.page.waitForSelector(setup_account_page.first_name_field, { timeout: 10000 });
          } catch (e) {
            console.log('Login failed or expectations were not met within the allotted time:', e);
          }
        }
      }
