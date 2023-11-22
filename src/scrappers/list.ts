import { getHeadlessDriver } from './driver'
import { By } from 'selenium-webdriver'

const LOAD_TIME: number = 5000 as const

export const extractProducts = async (category: string, page: number): Promise<string[]> => {
  const products: string[] = []
  const url = `https://www.digikala.com/search/${category}/?has_selling_stock=1&sort=29&page=${page}`

  try {
    const driver = await getHeadlessDriver()
    await driver.get(url)
    await driver.sleep(LOAD_TIME)

    const containers = await driver.findElements(By.className('product-list_ProductList__item__LiiNI'))

    console.log('found', containers.length, 'products')

    for (const container of containers) {
      const product = await container.findElement(By.xpath('a'))
      const link = await product.getAttribute('href')
      products.push(link)
    }

    await driver.close()
  } catch (error) {
    console.log(error)
  }

  return products
}
