const { expect } = require('@playwright/test');
import { setup_account_page } from '../locators/setup_account_page';
import { urls } from '../utilities/settings';
import { generateRandomFirstName, generateRandomLastName, generateRandomPhoneNumber } from '../utilities/data';



exports.SetupAccountPage = class SetUpAccountPage{
    constructor(page) {
        this.page = page;
        this.first_name_field = page.locator(setup_account_page.first_name_field);
        this.last_name_field = page.locator(setup_account_page.last_name_field);
        this.phone_country_drop_down = page.locator(setup_account_page.phone_country_drop_down);
        this.phone_number_field = page.locator(setup_account_page.phone_number_field);
        this.continue_btn = page.locator(setup_account_page.continue_btn);
        this.company_or_store_name_field = page.locator(setup_account_page.company_or_store_name_field);
      }

    async fill_first_name_field() {
        const firstName = generateRandomFirstName();
        console.log('Generated first name:', firstName);
        this.first_name_field.focus();
        this.first_name_field.fill(firstName);
        console.log(`Filled first name: ${firstName}`);
        await this.page.waitForTimeout(300);
    }

    async fill_last_name_field() {
        const lastName = generateRandomLastName();
        console.log('Generated last name:', lastName);
        this.last_name_field.focus();
        this.last_name_field.fill(lastName);
        console.log(`Filled last name: ${lastName}`);
        await this.page.waitForTimeout(300);
    }

    async fill_phone_number_field() {
        const phoneNumber = generateRandomPhoneNumber();
        console.log('Generated phone number:', phoneNumber);
        this.phone_number_field.focus();
        // await this.phone_number_field.fill(phoneNumber);
        await this.phone_number_field.type(phoneNumber);
        console.log(`Filled phone number: ${phoneNumber}`);
        await this.page.waitForTimeout(300);
        await expect(this.phone_number_field).toHaveValue(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/);
    }

    async click_continue_btn() {
        await this.continue_btn.click();
        try {
            await this.page.waitForURL(urls.setup_personal_info_page, { timeout: 20000 });
            await this.page.waitForSelector(this.company_or_store_name_field, { timeout: 20000 });
        } catch (e) {
            console.log('Set up account on the 1st step failed or expectations were not met within the allotted time:', e);
        }
    }

}