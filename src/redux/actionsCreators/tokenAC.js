import { ADD_TOKEN, DELETE_TOKEN } from '../types/tokenTypes'

export const addToken = (token) => ({
  type: ADD_TOKEN,
  payload: token,
})

export const deleteToken = () => ({
  type: DELETE_TOKEN,
})
