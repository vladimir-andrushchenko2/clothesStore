import parseCartItem from './parseCartItem';

export default function parseOrder(order) {
  const { id, name, address, email, phone, paymentType, deliveryType, basket } = order
  const items = basket.items.map(parseCartItem)
  const quantity = items.reduce((prev, curr) => prev + curr.quantity, 0)

  return {
    orderId: id,
    name,
    address,
    email,
    phone,
    paymentType,
    deliveryPrice: Number(deliveryType.price),
    deliveryTypeId: deliveryType.id,
    items,
    quantity
  }
}
