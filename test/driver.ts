import { getHeadlessDriver } from '../src/scrappers/driver'

const run = async () => {
  const driver = await getHeadlessDriver()
  await driver.get('https://digikala.com')
  await driver.sleep(1000)

  const title = await driver.getTitle()
  console.log(title)

  await driver.close()
}

void run()
