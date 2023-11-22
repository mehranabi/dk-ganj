import * as minimist from 'minimist'
import { exportKey } from './src/image/ocr'
import { findTarget } from './src/image/similar'
import { extractProducts } from './src/scrappers/list'
import { extractPhotos } from './src/scrappers/product'

interface Arguments {
  category: string
  page: number
  ximilar: string
  ocr: string
  target: string
}

const args = minimist<Arguments>(process.argv.slice(2))

if (!args.category) throw new Error('Category is mandatory!')
if (!args.ximilar) throw new Error('Ximilar API key is mandatory!')
if (!args.ocr) throw new Error('OCR Space API key is mandatory!')
if (!args.page) throw new Error('Page is mandatory!')
if (!args.target) throw new Error('Target image link is mandatory!')

const CATEGORY: string = args.category
const PAGE: number = args.page
const XIMILAR_TOKEN: string = args.ximilar
const OCR_TOKEN: string = args.ocr
const TARGET: string = args.target

const processFunc = async (currentPage: number): Promise<void> => {
  const products = await extractProducts(CATEGORY, currentPage)

  for (const product of products) {
    const photos = await extractPhotos(product)
    if (photos.length === 0) continue

    let key = 'EMPTY'
    if (photos.length === 1) {
      key = await exportKey(photos[0], OCR_TOKEN)
    } else {
      const target = await findTarget(photos, TARGET, XIMILAR_TOKEN)
      if (target) {
        key = await exportKey(target, OCR_TOKEN)
      }
    }

    console.log('KEY: ', key)
  }
}

const run = async (): Promise<void> => {
  await processFunc(PAGE)
  await processFunc(PAGE + 1)
  await processFunc(PAGE + 2)
  await processFunc(PAGE + 3)
  await processFunc(PAGE + 4)
}

void run()
