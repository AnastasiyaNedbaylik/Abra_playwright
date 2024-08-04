const { expect } = require('@playwright/test')
import { generateRandomEmail, generateRandomPassword } from '../data';
import { urls } from '../settings';
import { RegisterPage } from '../../pages/register_page';

/**
 * Registers a user with a unique email and returns that email.
 * @param {object} page - The Playwright page object.
 * @returns {Promise<string>} - The email used for registration.
 */
export async function registerUser(page) {
    const register = new RegisterPage(page);

    // Generate a unique email and password
    const uniqueEmail = generateRandomEmail();
    const password = generateRandomPassword();

    await register.open_registration_page();
    await register.click_sign_up_supplier();
    await register.fill_email(uniqueEmail);
    await register.fill_password(password);
    await register.create_supplier_account();
    await expect(page).toHaveURL(urls.checkEmailPage);

    // Return the email used for registration
    return uniqueEmail;
};