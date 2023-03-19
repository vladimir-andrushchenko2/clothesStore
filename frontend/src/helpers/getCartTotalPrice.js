export default function getCartTotalPrice(items) {
  return items.map((item) => item.quantity * item.item.price)
    .reduce((prev, curr) => prev + curr, 0)
}
