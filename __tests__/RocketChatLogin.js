const timeout = 5000

describe(
  '/ (Home Page)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.goto('http://tranebaerkaeret.dk:3000/home', {waitUntil : "networkidle0"})
    }, timeout)
    
    afterAll(async () => {
      await page.close()
    })
    
    it('Can log in', async () => {
      await page.type("#emailOrUsername", "Administrator")
      await page.type("#pass", "EaaaP2ssw0rd")
      await page.click(".login")
      await page.waitForSelector("#rocket-chat")
      let text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain('Welcome to Rocket.Chat!')
    })
  },
  timeout
)
