const { test, expect } = require('@playwright/test')
const { RegisterPage } = require('../pages/register_page')
const { TempMailPage } = require('../pages/temp_mail')

test('registration_positive', async ({page}) => {
    const Register = new RegisterPage(page);

    await Register.open_registration_page();
    await Register.click_sign_up_supplier();
    await Register.fill_email();
    await Register.fill_password();
    await Register.create_supplier_account2();
    // await expect(page).toHaveURL('/check_email$/');
    await expect(page).toHaveURL('https://dev.abra-market.com/register/check_email');
    // await expect(page).getByText('A link for sign up has been sent to your email address.').toBeVisible();
})


test('open temporary email and parse registration link', async ({ page }) => {
    // Создаем экземпляр страницы временной почты
    const tempMail = new TempMailPage();
  
    // Создаем временную почту
    const emailAddress = await tempMail.createTemporaryEmail();
    console.log('Temporary email address:', emailAddress);
  
    // Создаем экземпляр страницы регистрации
    const registration = new RegisterPage(page);
  
    // Открыть сайт и зарегистрироваться
    await registration.open_registration_page();
    await registration.click_sign_up_supplier();
    await registration.fill_email2(emailAddress);
    await registration.fill_password();
    await registration.create_supplier_account2();
    await expect(page).toHaveURL('https://dev.abra-market.com/register/check_email');
  
    // Ожидание письма в почтовом ящике
    const emailBody = await tempMail.waitForEmail();
    console.log('Email body:', emailBody);
  
    // Найти ссылку на регистрацию в теле письма
    const registrationLink = tempMail.parseRegistrationLink(emailBody);
    console.log('Registration link:', registrationLink);
  
    // Перейти по ссылке на регистрацию
    await page.goto(registrationLink);
  
    // Продолжить тестирование на странице регистрации...
    await page.waitForTimeout(5000); // Уменьшено время ожидания до 5 секунд
    await expect(page.locator('text=Email confirmed.')).toBeVisible();

    // Сообщение в консоль после успешного теста
    console.log('Test completed: Email confirmed.');
});
