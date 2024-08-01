const { test, expect } = require('@playwright/test')
const { RegisterPage } = require('../pages/register_page')
const { GuerrillaMailPage } = require('../pages/GuerrillaMailPage');

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

test('open temporary email and parse registration link', async ({ page }) => {
    // Создаем экземпляр страницы временной почты
    const guerrillaMail = new GuerrillaMailPage();
  
    // Создаем временную почту
    const emailAddress = await guerrillaMail.createTemporaryEmail();
    console.log('Temporary email address:', emailAddress);
  
    // Создаем экземпляр страницы регистрации
    const Registration = new RegisterPage(page);
  
    // Открыть сайт и зарегистрироваться
    await Registration.open_registration_page();
    await Registration.click_sign_up_supplier();
    await Registration.fill_email2(emailAddress);
    await Registration.fill_password();
    await Registration.create_supplier_account2();
    await expect(page).toHaveURL('https://dev.abra-market.com/register/check_email');
  
    // Ожидание письма в почтовом ящике
    const emailBody = await guerrillaMail.waitForEmail();
  
    // Найти ссылку на регистрацию в теле письма
    const registrationLink = guerrillaMail.parseRegistrationLink(emailBody);
    console.log('Registration link:', registrationLink);
  
    // Перейти по ссылке на регистрацию
    await page.goto(registrationLink);
  
    // Продолжить тестирование на странице регистрации...
  })
