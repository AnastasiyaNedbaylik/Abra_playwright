const { test, expect } = require('@playwright/test')
import { urls } from '../utilities/settings';
const { SetupAccountPage } = require('../pages/setup_account_page')
const { register_and_login } = require('../utilities/login_page/login');


test('set up account on the 1st step', async ({page}) => {
    //Register and login with same credentials
    const { email, password } = await register_and_login(page);
    console.log(`Registered and logged in with email: ${email} and password: ${password}`);

    const SetupAccount = new SetupAccountPage(page);

    await SetupAccount.fill_first_name_field();
    await SetupAccount.fill_last_name_field();
    await SetupAccount.fill_phone_number_field();
    await SetupAccount.click_continue_btn()
    await expect(page).toHaveURL(urls.setup_personal_info_page);
});