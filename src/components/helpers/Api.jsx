class Api {
  constructor(api) {
    this.baseUrl = api.baseUrl
    this.token = undefined
    this.group = undefined
    this.idCard = undefined
  }

  setNewToken(newToken) {
    this.token = newToken
  }

  setNewGroup(newGroup) {
    this.group = newGroup
  }

  setNewIdCard(newIdCard) {
    this.idCard = newIdCard
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
  getProductsByIds = (ids) => Promise.all(ids.map((id) => fetch(`https://api.react-learning.ru/products/${id}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())))

  getUsersById = (ids) => Promise.all(ids.map((id) => fetch(`https://api.react-learning.ru/v2/${this.group}/users/${id}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => data.name)))

  getProductsSearchQuery = (value) => fetch(`${this.baseUrl}/products/search?query=${value}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())

  getCardById = () => fetch(`${this.baseUrl}/products/${this.idCard}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())

  doCommentById = (id, value) => fetch(`https://api.react-learning.ru/products/review/${id}`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  })
    .then((response) => response.json())
    .then((datas) => {
      console.log(datas)
      if (datas.discount) {
        return datas
      }
      console.log(datas.message)
      throw new Error(datas.message)
    })
    .catch(alert)
}

export const api = new Api({
  baseUrl: 'https://api.react-learning.ru',
})
