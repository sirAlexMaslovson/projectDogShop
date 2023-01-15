class Api {
  constructor(api) {
    this.baseUrl = api.baseUrl
    this.token = api.token
  }

  setNewToken(newToken) {
    this.token = newToken
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
          console.log('Всё ОК')
          // eslint-disable-next-line no-underscore-dangle
          localStorage.setItem('myId', datas.data._id)
          localStorage.setItem('myToken', datas.token)
          localStorage.setItem('myGroup', datas.data.group)
          localStorage.setItem('myName', datas.data.name)
          if (localStorage.getItem('myToken') === 'undefined') {
            localStorage.removeItem('myToken')
          }
          return datas
        }
        throw new Error(datas.message)
      })
      .catch(alert)
  }

  getAllProducts = () => fetch(`${this.baseUrl}/products`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('myToken')}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => data.products)

  getUserInfo = () => fetch(`${this.baseUrl}/v2/${localStorage.getItem('myGroup')}/users/${localStorage.getItem('myId')}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('myToken')}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => data)

  // eslint-disable-next-line class-methods-use-this
  getProductsByIds(ids) {
    return Promise.all(ids.map((id) => fetch(`https://api.react-learning.ru/products/${id}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('myToken')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => data)))
  }

  getProductsSearchQuery = (value) => fetch(`${this.baseUrl}/products/search?query=${value}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('myToken')}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => data)
}

export const api = new Api({
  baseUrl: 'https://api.react-learning.ru',
})
