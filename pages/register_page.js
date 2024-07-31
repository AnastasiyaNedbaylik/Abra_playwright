exports.RegisterPage = class RegisterPage{
    constructor(page) {
        this.page = page;
        this.sign_up_supplier = page.locator('//*[@id="root"]/div/div/div/form/div[1]/button[2]')
        this.email_field = page.locator('//*[@id="root"]/div/div/div/form/div[2]/input');
        this.password_field = page.locator('//*[@id="root"]/div/div/div/form/div[3]/input');
        this.create_account_btn = page.locator('//*[@id="root"]/div/div/div/form/button');

    }

    async open_registration_page() {
        this.page.goto('https://dev.abra-market.com/register');
        // Ожидание, пока страница полностью загрузится
        await page.waitForLoadState('load');
        // await this.page.waitForTimeout(timeOut);
        // await page.getByText("I'm here to sell").toBeVisible();
    }

    async sign_up_supplier() {
        this.sign_up_supplier.click();
    }

    async fill_email() {
        this.email_field.focus();
        this.email_field.fill('anast@gmail.com');
    }

    async fil_email_with_invalid_email() {
        this.login_field.focus();
        this.login_field.fill('testgmail.com');
    }

    async fill_password() {
        this.password_field.focus();
        this.password_field.fill('Bobo123456!');
    }
    
    async fill_password_invalid() {
        this.password_field.focus();
        this.password_field.fill('qwerty');
    }

    async create_supplier_account() {
        this.create_account_btn.click();
    }

}
