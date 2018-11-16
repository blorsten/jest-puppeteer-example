const timeout = 5000

describe(
  'Test login functionality',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.goto('http://tranebaerkaeret.dk:3000/home', {waitUntil : "networkidle0"})
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    it('Login with valid input', async () => {
      await page.type("#emailOrUsername", "Administrator")
      await page.type("#pass", "EaaaP2ssw0rd")
      await page.click(".login")
      await page.waitForSelector("#rocket-chat")
      let text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain('Welcome to Rocket.Chat!')
    })
    it('Logout', exports.logout = async () => {
      await page.click('.sidebar > .sidebar__header > .sidebar__header-thumb > .avatar > .avatar-image')
      await page.waitFor(1000)
      await page.click('.rc-popover__content > .rc-popover__column > .rc-popover__list:nth-child(4) > .rc-popover__item:nth-child(2) > .rc-popover__item-text')
      await page.waitForSelector('.login');
      let text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain('Login')
    })

    it('Login with invalid password', async () => {
      await page.type("#emailOrUsername", "Administrator")
      await page.type("#pass", "WhatCouldThisBe")
      await page.click(".login")
      await page.waitForSelector(".toast-message")
      let text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain('User not found or incorrect password')
    })
  },
  timeout
)
