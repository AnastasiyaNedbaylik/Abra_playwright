import { generateRandomEmail, generateRandomPassword } from '../utils/utils';

exports.RegisterPage = class RegisterPage{
    constructor(page) {
        this.page = page;
        this.sign_up_supplier = page.locator('//*[@id="root"]/div/div/div/form/div[1]/button[2]');
        this.email_field = page.locator('//*[@id="root"]/div/div/div/form/div[2]/input');
        this.password_field = page.locator('//*[@id="root"]/div/div/div/form/div[3]/input');
        this.create_account_btn = page.locator('//*[@id="root"]/div/div/div/form/button');

    }

    async open_registration_page() {
        this.page.goto('https://dev.abra-market.com/register');
        // Ожидание, пока страница полностью загрузится
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(300);
    }

    async click_sign_up_supplier() {
        this.sign_up_supplier.click();
        await this.page.waitForTimeout(300);
    }

    async fill_email() {
        const randomEmail = generateRandomEmail();
        console.log('Generated email address:', randomEmail);
        this.email_field.focus();
        this.email_field.fill(randomEmail);
        await this.page.waitForTimeout(300);
    }

    async fill_email2(email) {
        this.email_field.focus();
        this.email_field.fill(email);
        await this.page.waitForTimeout(100);
    }

    async fil_email_with_invalid_email() {
        this.login_field.focus();
        this.login_field.fill('testgmail.com');
        await this.page.waitForTimeout(300);
    }

    async fill_password() {
        const randomPassword = generateRandomPassword();
        console.log('Generated password:', randomPassword);
        this.password_field.focus();
        this.password_field.fill(randomPassword);
        await this.page.waitForTimeout(300);
    }
    
    async fill_password_invalid() {
        this.password_field.focus();
        this.password_field.fill('qwerty');
    }

    async create_supplier_account() {
        this.create_account_btn.click();
        await this.page.waitForTimeout(500);
    }

    async create_supplier_account2() {
        this.create_account_btn.click();
        await this.page.waitForTimeout(1000);
    }

}

