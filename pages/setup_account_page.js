const { expect } = require('@playwright/test')
import { setup_account_page } from '../locators/setup_account_page';
import { urls } from '../utilities/settings';


exports.SetupAccountPage = class SetUpAccountPage{
    constructor(page) {
        this.page = page;
        this.first_name_field = page.locator(setup_account_page.first_name_field);
        this.last_name_field = page.locator(setup_account_page.last_name_field);
        this.phone_country_drop_down = page.locator(setup_account_page.phone_country_drop_down);
        this.phone_number_field = page.locator(setup_account_page.phone_number_field);
        this.continue_btn = page.locator(setup_account_page.continue_btn)
      }
}