const BASE_URL = 'https://vue-moire.skillbox.cc/api';

class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
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
    }).then(({ items }) => items);
  }

  getProduct(id) {
    const path = `/products/${id}`;

    return this.makeRequest({
      path,
    });
  }
}

export default new Api(BASE_URL, {
  'Content-Type': 'application/json',
});
