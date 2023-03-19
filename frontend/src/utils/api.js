import parseItem from '@/helpers/parseItem';
import parseCartItem from '@/helpers/parseCartItem';
import parseOrder from '@/helpers/parseOrder';

const BASE_URL = 'https://vue-moire.skillbox.cc/api';

class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.accessKeyPromise = this.getAccessKey();
  }

  async makeRequest({ path, body, method = 'GET' }) {
    const config = {
      headers: this.headers,
      method,
      body: JSON.stringify(body),
    };

    return fetch(`${this.baseUrl}${path}`, config).then(async res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(await res.json());
    })
  }

  deleteAccessKey() {
    delete this.accessKey;
    localStorage.removeItem('accessKey');
  }

  async getAccessKey() {
    if (localStorage.getItem('accessKey')) {
      this.accessKey = localStorage.getItem('accessKey')
      return this.accessKey
    }

    const path = '/users/accessKey';

    return this.makeRequest({
      path,
    }).then(({ accessKey }) => {
      this.accessKey = accessKey;

      localStorage.setItem('accessKey', accessKey);

      return this.accessKey
    });
  }

  getProducts() {
    const path = '/products';

    return this.makeRequest({
      path,
    }).then(({ items }) => items.map(parseItem));
  }

  getProduct(id) {
    const path = `/products/${id}`;

    return this.makeRequest({
      path,
    }).then(parseItem);
  }

  getCart() {
    return this.accessKeyPromise.then((key) => {
      const path = `/baskets?userAccessKey=${key}`

      return this.makeRequest({ path })
        .then(res => res.items.map(parseCartItem))
    })
  }

  /** @returns new cart items */
  postCartItem({ productId, colorId, sizeId, quantity }) {
    return this.accessKeyPromise.then((key) => {
      const path = `/baskets/products?userAccessKey=${key}`

      return this.makeRequest({
        path,
        method: 'POST',
        body: {
          productId, colorId, sizeId, quantity
        }
      }).then(res => res.items.map(parseCartItem))
    })
  }

  /** @returns new cart items */
  putCartItemQuantity({ basketItemId, quantity }) {
    return this.accessKeyPromise.then((key) => {
      const path = `/baskets/products?userAccessKey=${key}`

      return this.makeRequest({
        path,
        method: 'PUT',
        body: {
          quantity, basketItemId
        }
      }).then(res => res.items.map(parseCartItem))
    })
  }

  /** @returns new cart items */
  deleteCartItem(basketItemId) {
    return this.accessKeyPromise.then((key) => {
      const path = `/baskets/products?userAccessKey=${key}`

      return this.makeRequest({
        path,
        method: 'DELETE',
        body: {
          basketItemId
        }
      }).then(res => res.items.map(parseCartItem))
    })
  }

  postOrder({ name, address, phone, email, deliveryTypeId, paymentTypeId, comment }) {
    return this.accessKeyPromise.then((key) => {
      const path = `/orders?userAccessKey=${key}`

      return this.makeRequest({
        path,
        method: 'POST',
        body: {
          name, address, phone, email, deliveryTypeId, paymentTypeId, comment
        }
      })
    })
  }

  getDeliveryOptions() {
    const path = '/deliveries'

    return this.makeRequest({ path })
  }

  getPaymentOptions(deliveryTypeId) {
    const path = `/payments?deliveryTypeId=${deliveryTypeId}`

    return this.makeRequest({ path })
  }

  getOrderConfirmation(orderId) {
    return this.accessKeyPromise.then((key) => {
      const path = `/orders/${orderId}?userAccessKey=${key}`

      return this.makeRequest({ path }).then(parseOrder)
    })
  }
}

export default new Api(BASE_URL, {
  'Content-Type': 'application/json',
});
