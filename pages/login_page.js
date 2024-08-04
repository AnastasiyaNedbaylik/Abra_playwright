const { expect } = require('@playwright/test')
import { login_page } from '../locators/login_page';
import { urls } from '../utilities/settings';

exports.LoginPage = class LoginPage{
    constructor(page) {
        this.page = page;
        this.email_field = page.locator(login_page.email_field);
        this.password_field = page.locator(login_page.password_field);
        this.login_btn = page.locator(login_page.login_btn);
        this.first_name_field = setup_account_page.first_name_field;
      }
}