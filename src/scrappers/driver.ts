import { Browser, Builder, WebDriver } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'

export const getHeadlessDriver = async (): Promise<WebDriver> => {
  const options = new Options()
  options.addArguments('--disable-dev-shm-usage')
  options.addArguments('--no-sandbox')
  options.addArguments('--start-maximized')
  options.addArguments('--headless')

  return new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build()
}
