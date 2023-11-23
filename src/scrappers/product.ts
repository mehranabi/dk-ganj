import { getHeadlessDriver } from './driver'
import { By } from 'selenium-webdriver'

const LOAD_TIME: number = 5000 as const

export const extractPhotos = async (link: string): Promise<string[]> => {
  const images: string[] = []

  try {
    const driver = await getHeadlessDriver()
    await driver.get(`${link}/#gallery`)
    await driver.sleep(LOAD_TIME)

    const containers = await driver.findElements(By.className('styles_ProductImagesModal__productImage__fzbFF'))

    for (const container of containers) {
      try {
        const image = await container.findElement(By.xpath('img'))
        const source = await image.getAttribute('src')
        images.push(source)
      } catch (error) {
        console.log(error)
      }
    }

    await driver.close()
  } catch (_) {}

  return images
}
