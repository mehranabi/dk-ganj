import { getHeadlessDriver } from './driver'
import { By } from 'selenium-webdriver'

const LOAD_TIME: number = 3000 as const

const extractPhotos = async (link: string): Promise<string[]> => {
  const images: string[] = []

  console.log(link)

  try {
    const driver = await getHeadlessDriver()
    await driver.get(`${link}#gallery`)
    await driver.sleep(LOAD_TIME)

    const containers = await driver.findElements(By.className('styles_ProductImagesModal__productImage__fzbFF'))

    console.log('found', containers.length, 'images')

    for (const container of containers) {
      const image = await container.findElement(By.xpath('img'))
      const source = await image.getAttribute('src')
      images.push(source)
    }

    await driver.close()
  } catch (error) {
    console.error(error)
  }

  return images
}

export default { extractPhotos }
