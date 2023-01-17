class Api {
  constructor(api) {
    this.baseUrl = api.baseUrl
    this.token = undefined
    this.group = undefined
  }

  setNewToken(newToken) {
    this.token = newToken
  }

  setNewGroup(newGroup) {
    this.group = newGroup
  }

  registration(values) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.name) {
          return data
        }
        throw new Error(data.message)
      })
      .catch(alert)
  }

  authorization(values) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((datas) => {
        if (datas.data) {
          return datas
        }
        throw new Error(datas.message)
      })
      .catch(alert)
  }

  getAllProducts = () => fetch(`${this.baseUrl}/products`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => data.products)

  getUserInfo = () => fetch(`${this.baseUrl}/v2/${this.group}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())

  // eslint-disable-next-line class-methods-use-this
  getProductsByIds(ids) {
    return Promise.all(ids.map((id) => fetch(`https://api.react-learning.ru/products/${id}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())))
  }

  getProductsSearchQuery = (value) => fetch(`${this.baseUrl}/products/search?query=${value}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}

export const api = new Api({
  baseUrl: 'https://api.react-learning.ru',
})
