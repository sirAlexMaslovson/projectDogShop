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
  getProductsByIds = (ids) => Promise.all(ids.map((id) => fetch(`${this.baseUrl}/products/${id}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())))

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

  doCommentById = (id, value) => fetch(`${this.baseUrl}/products/review/${id}`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  })

  getProductReviews = (id) => fetch(`${this.baseUrl}/products/review/${id}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())

  doLikeIn = (id) => fetch(`${this.baseUrl}/products/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
  })

  doLikeOff = (id) => fetch(`${this.baseUrl}/products/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
  })

  deleteCommentById = (idProduct, commentId) => fetch(`${this.baseUrl}/products/review/${idProduct}/${commentId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
  })

  editUserInfo = (values) => fetch(`${this.baseUrl}/v2/${this.group}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  }).then((response) => response.json())
    .then((data) => {
      if (data.name) {
        return data
      }
      throw new Error(data.message)
    }).catch(alert)

  editUserAvatar = (value) => fetch(`${this.baseUrl}/v2/${this.group}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ avatar: value }),
  }).then((response) => response.json())
    .then((data) => {
      if (data.name) {
        return data
      }
      throw new Error(data.message)
    }).catch(alert)
}

export const api = new Api({
  baseUrl: 'https://api.react-learning.ru',
})
