import parseItem from '@/helpers/parseItem';

const BASE_URL = 'https://vue-moire.skillbox.cc/api';

class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.getAccessKey();
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

  getAccessKey() {
    if (localStorage.getItem('accessKey')) {
      this.accessKey = localStorage.getItem('accessKey')
      return { ok: true }
    }

    const path = '/users/accessKey';

    return this.makeRequest({
      path,
    }).then(({ accessKey }) => {
      this.accessKey = accessKey;

      localStorage.setItem('accessKey', accessKey);

      return { ok: true };
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
}

export default new Api(BASE_URL, {
  'Content-Type': 'application/json',
});
