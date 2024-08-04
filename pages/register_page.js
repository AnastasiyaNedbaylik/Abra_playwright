const { expect } = require('@playwright/test')
import { generateRandomEmail, generateRandomPassword } from '../utilities/data';
import { register_page } from '../locators/register_page';
import { urls } from '../utilities/settings';


exports.RegisterPage = class RegisterPage{
    constructor(page) {
        this.page = page;
        this.sign_up_supplier = page.locator(register_page.signUpSupplierButton);
        this.email_field = page.locator(register_page.emailField);
        this.password_field = page.locator(register_page.passwordField);
        this.create_account_btn = page.locator(register_page.createAccountButton);
        this.successMessageSelector = register_page.successMessageSelector;
      }

      async open_registration_page() {
        await this.page.goto(urls.registrationPage);
        // Ожидание, пока страница полностью загрузится
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(300);
      }
    
      async click_sign_up_supplier() {
        await this.sign_up_supplier.click();
        await this.page.waitForTimeout(300);
      }
    
      async fill_email(email) {
        await this.email_field.focus();
        await this.email_field.fill(email);
        await this.page.waitForTimeout(300);
      }

      // Использование рандомного email
      async fill_email_valid() {
        const randomEmail = generateRandomEmail();
        console.log('Generated email address:', randomEmail);
        await this.email_field.focus();
        await this.email_field.fill(randomEmail);
        await this.page.waitForTimeout(300);
      }
    
      async fill_email_to_get_invite_link(email) {
        await this.email_field.focus();
        await this.email_field.fill(email);
        await this.page.waitForTimeout(100);
      }
    
      //Использование рандомного валидного пароля
      async fill_password() {
        const randomPassword = generateRandomPassword();
        console.log('Generated password:', randomPassword);
        await this.password_field.focus();
        await this.password_field.fill(randomPassword);
        await this.page.waitForTimeout(200);
      }
        
      async fill_email_with_invalid_emails(invalidEmails) {
        for (const email of invalidEmails) {
            console.log(`Testing with email: ${email}`);
            await this.email_field.focus();
            await this.email_field.fill(email);
            await this.page.waitForTimeout(300);
            await this.fill_password();
            await expect(this.page.getByText('Invalid email')).toBeVisible();
            await this.expectCreateAccountButtonDisabled();
            await expect(this.page).toHaveURL(urls.registrationPage);
            await this.page.waitForTimeout(300); 
        }
      }
    
      async fill_password_invalid(invalidPasswords) {
        for (const password of invalidPasswords) {
            await this.fill_email_valid();
            console.log(`Testing with password: ${password}`);
            await this.password_field.focus();
            await this.password_field.fill(password);
            await this.page.waitForTimeout(300);
            await expect(this.page.getByText('Password must match the next requirements')).toBeVisible();
            await this.expectCreateAccountButtonDisabled();
            await expect(this.page).toHaveURL(urls.registrationPage);
            await this.page.waitForTimeout(300);
        }
      }

      async create_supplier_account() {
        await this.create_account_btn.click();
        await this.page.waitForTimeout(500);
      }
    
      async create_supplier_account2() {
        await this.create_account_btn.click();
        try {
          await this.page.waitForURL(urls.checkEmailPage, { timeout: 10000 });
          await this.page.waitForSelector(this.successMessageSelector, { timeout: 10000 });
        } catch (e) {
          console.log('Registration failed or expectations were not met within the allotted time:', e);
        }
      }
    
      async expectCreateAccountButtonDisabled() {
        await expect(this.create_account_btn).toBeDisabled();
      }

    async register_with_existing_email(existingEmail) {
        console.log(`Attempting to register with existing email: ${existingEmail}`);
        await this.open_registration_page();
        await this.click_sign_up_supplier();
        await this.email_field.focus();
        await this.email_field.fill(existingEmail);
        await this.fill_password(generateRandomPassword());
        await this.create_supplier_account();
        await expect(this.page.getByText('Email is already registered')).toBeVisible();
      }
    }
