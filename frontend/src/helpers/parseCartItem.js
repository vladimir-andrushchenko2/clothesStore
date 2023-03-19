import parseItem from './parseItem'

/**
 * @returns  basketItemId, price, colorTitle, colorCode, colorId, quantity, item
 */
export default function parseCartItem(item) {
  const { id, quantity, color, product } = item
  return {
    basketItemId: id,
    colorTitle: color.color.title,
    colorCode: color.color.code,
    colorId: color.color.id,
    quantity,
    item: parseItem(product)
  }
}
