const { test, expect } = require('@playwright/test')
const { RegisterPage } = require('../pages/register_page')

test('registration_positive', async ({page}) => {
    const Register = new RegisterPage(page);

    await Register.open_registration_page();
    await Register.click_sign_up_supplier();
    await Register.fill_email();
    await Register.fill_password();
    await Register.create_supplier_account();
    // await expect(page).toHaveURL('/check_email$/');
    await expect(page).toHaveURL('https://dev.abra-market.com/register/check_email');
    // await expect(page).getByText('A link for sign up has been sent to your email address.').toBeVisible();
})