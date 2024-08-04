const { expect } = require('@playwright/test')
import { setup_account_page } from '../locators/setup_account_page';
import { urls } from '../utilities/settings';
const { generateRandomFirstName } = require('./utils/generators');



exports.SetupAccountPage = class SetUpAccountPage{
    constructor(page) {
        this.page = page;
        this.first_name_field = page.locator(setup_account_page.first_name_field);
        this.last_name_field = page.locator(setup_account_page.last_name_field);
        this.phone_country_drop_down = page.locator(setup_account_page.phone_country_drop_down);
        this.phone_number_field = page.locator(setup_account_page.phone_number_field);
        this.continue_btn = page.locator(setup_account_page.continue_btn)
      }

    // Метод для генерации случайного имени
    getRandomFirstName() {
        return generateRandomFirstName();
    }

    async fill_first_name_page() {
        const firstName = this.getRandomFirstName();
        this.first_name_field.focus(firstName);
        this.first_name_field.fill()
        console.log(`Filled first name: ${firstName}`);
    }
}