import { getHeadlessDriver } from '../src/scrappers/driver'

const run = async () => {
  const driver = await getHeadlessDriver()
  await driver.get('https://digikala.com')
  await driver.sleep(5000)
  await driver.close()
}

void run()
