const { test, expect } = require('@playwright/test')
import { urls } from '../utilities/settings';
const { SetupAccountPage } = require('../pages/setup_account_page')
const { register_and_login, register_and_login2 } = require('../utilities/login_page/login');


test('set up account on the 1st step', async ({page}) => {
    //Register and login with same credentials
    const { email, password } = await register_and_login(page);
    console.log(`Registered and logged in with email: ${email} and password: ${password}`);

    const SetupAccount = new SetupAccountPage(page);

    await SetupAccount.fill_first_name_field();
    await SetupAccount.fill_last_name_field();
    await SetupAccount.fill_phone_number_field();
    await SetupAccount.click_continue_btn();
    await expect(page).toHaveURL(urls.setup_business_info_page);
    await SetupAccount.fill_company_or_store_name_field();
    await SetupAccount.select_business();
    await SetupAccount.check_manufacturer_checkbox();
    await SetupAccount.fill_license_or_entrepreneur_number_field();
});

// Второй вариант теста с использованием Mailinator
test('2set up account on the 1st step', async ({page}) => {
    //Register and login with same credentials
    const { email, password } = await register_and_login2(page);
    console.log(`Registered and logged in with email: ${email} and password: ${password}`);

    const SetupAccount = new SetupAccountPage(page);

    await SetupAccount.fill_first_name_field();
    await SetupAccount.fill_last_name_field();
    await SetupAccount.fill_phone_number_field();
    await SetupAccount.click_continue_btn();
    await expect(page).toHaveURL(urls.setup_business_info_page);
    await SetupAccount.upload_profile_logo();
    await SetupAccount.fill_company_or_store_name_field();
    await SetupAccount.select_business();
    await SetupAccount.check_manufacturer_checkbox();
    await SetupAccount.fill_license_or_entrepreneur_number_field();
    await SetupAccount.fill_year_field();
    await SetupAccount.select_number_of_employees();
    await SetupAccount.select_country_of_company_registration();
    await SetupAccount.fill_about_business_field();
    await SetupAccount.fill_business_phone_number();
    await SetupAccount.fill_business_email_address_field();
    await SetupAccount.fill_company_address_field();
    await SetupAccount.click_business_profile_save_btn();
});