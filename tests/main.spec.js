const { test, expect } = require('@playwright/test');

test.beforeAll(async () => {
  // TODO: Start a localtunnel and add as Stripe webhook
});

test.afterAll(async () => {
  // TODO: Stop the localtunnel
});

test('Checkout flow', async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  // Click text=Checkout
  await page.click('text=Checkout');
  await page.waitForNavigation();

  // Click input[name="email"]
  await page.click('input[name="email"]');

  // Fill input[name="email"]
  await page.fill('input[name="email"]', 'a@b.com');

  // Fill [name="cardNumber"]
  await page.fill('[name="cardNumber"]', '4242 4242 4242 4242');

  // Fill [name="cardExpiry"]
  await page.fill('[name="cardExpiry"]', '12 / 23');

  // Fill [name="cardCvc"]
  await page.fill('[name="cardCvc"]', '123');

  // Fill input[name="billingName"]
  await page.fill('input[name="billingName"]', 'ksdljfsdk skdlfj');

  // Fill [name="billingPostalCode"]
  await page.fill('[name="billingPostalCode"]', '121 121');

  // Click button[type="submit"]
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  // Assert success page is shown
  expect(await page.waitForSelector('text=Success')).toBeTruthy();
});
