import parseItem from '@/helpers/parseItem';
import parseCartItem from '@/helpers/parseCartItem';

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

    const res = await fetch(`${this.baseUrl}${path}`, config);

    if (res.ok) {
      return res.json();
    }

    return Promise.reject(
      new Error(`promise rejected with status ${res.status}
      ${this.baseUrl}${path}`)
    );
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
}

export default new Api(BASE_URL, {
  'Content-Type': 'application/json',
});
