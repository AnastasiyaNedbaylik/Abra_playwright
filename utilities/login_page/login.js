const { expect } = require('@playwright/test');
const { RegisterPage } = require('../../pages/register_page');
const { LoginPage } = require('../../pages/login_page');
import { generateRandomPassword } from '../data';
const { urls } = require('../settings');
const { TempMailPage } = require('../temp_mail');
const { Mailinator } = require('../temp_mail2');

/**
 * Registers a user and logs in with the same credentials.
 * @param {object} page - The Playwright page object.
 * @returns {Promise<{ email: string, password: string }>} - The email and password used for registration.
 */
export async function register_and_login(page) {
    // Create a temporary email
    const tempMail = new TempMailPage();
    const emailAddress = await tempMail.createTemporaryEmail();
    console.log('Temporary email address:', emailAddress);

    // Generate a random password
    const password = generateRandomPassword();
    console.log('Generated password:', password);

    // Register the user
    const registration = new RegisterPage(page);
    await registration.open_registration_page();
    await registration.click_sign_up_supplier();
    await registration.fill_email_to_get_invite_link(emailAddress);
    await registration.fill_password(password);
    await registration.create_supplier_account2();
    await expect(page).toHaveURL(urls.checkEmailPage);

    // Wait for the confirmation email
    const emailBody = await tempMail.waitForEmail();
    console.log('Email body:', emailBody);

    // Find and follow the registration link in the email
    const registrationLink = tempMail.parseRegistrationLink(emailBody);
    console.log('Registration link:', registrationLink);
    await page.goto(registrationLink);

    // Confirm email
    await page.waitForTimeout(5000);
    await expect(page.locator('text=Email confirmed.')).toBeVisible();

    await registration.click_login_link_confirm_page();

    // Login with the same credentials
    const login = new LoginPage(page);
    // await login.open_login_page();
    await login.fill_login_email(emailAddress);
    await login.fill_login_password(password);
    await login.click_login_btn_to_open_setup_page();
    await expect(page).toHaveURL(urls.setup_personal_info_page);

    // Return the email and password used for registration
    return { email: emailAddress, password };
}


/**
 * Version2 Registers a user and logs in with the same credentials. Version2
 * @param {object} page - The Playwright page object.
 * @returns {Promise<{ email: string, password: string }>} - The email and password used for registration.
 */
export async function register_and_login2(page) {
    // Create a temporary email
    const tempMail = new Mailinator('3f0ed6586c524d9ba675def8acd3940b', 'anastasiyateam.testinator.com', 'testinbox'); // Ваш API токен и настройки
  
    // Создаем временную почту
    const emailAddress = await tempMail.createTemporaryEmail();
    console.log('Temporary email address:', emailAddress);

    // Generate a random password
    const password = generateRandomPassword();
    console.log('Generated password:', password);
  
    // Регистрация на сайте
    const registration = new RegisterPage(page);
  
    await registration.open_registration_page();
    await registration.click_sign_up_supplier();
    await registration.fill_email_to_get_invite_link(emailAddress);
    await registration.fill_password(password);
    await registration.create_supplier_account2();
    await expect(page).toHaveURL(urls.checkEmailPage);
  
    // Ожидание письма в почтовом ящике
    const emailDetails = await tempMail.waitForEmail();
    console.log('Email details:', emailDetails);
  
    // Найти ссылку на регистрацию в письме
    const registrationLink = tempMail.parseRegistrationLink(emailDetails);
    console.log('Registration link:', registrationLink);
  
    // Перейти по ссылке на регистрацию
    await page.goto(registrationLink);
  
    // Продолжить тестирование на странице регистрации...
    await page.waitForTimeout(5000);
    await expect(page.locator('text=Email confirmed.')).toBeVisible();
    console.log('Test completed: Email confirmed.');

    await registration.click_login_link_confirm_page();

    // Login with the same credentials
    const login = new LoginPage(page);
    // await login.open_login_page();
    await login.fill_login_email(emailAddress);
    await login.fill_login_password(password);
    await login.click_login_btn_to_open_setup_page();
    await expect(page).toHaveURL(urls.setup_personal_info_page);

    // Return the email and password used for registration
    return { email: emailAddress, password };
}
