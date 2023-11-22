import { Options } from 'selenium-webdriver/chrome'
import { Builder } from 'selenium-webdriver'

const run = async () => {
  const options = new Options()
  options.addArguments('--disable-dev-shm-usage')
  options.addArguments('--no-sandbox')
  options.addArguments('--start-maximized')
  options.addArguments('--headless')

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()
  await driver.get('https://digikala.com')

  await driver.sleep(5000)
  await driver.close()
}

void run()
