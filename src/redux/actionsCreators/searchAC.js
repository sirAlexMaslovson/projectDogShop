import { NULL_SEARCH, SET_SEARCH } from '../types/searchTypes'

export const addSearch = (value) => ({
  type: SET_SEARCH,
  payload: value,
})

export const nullSearch = () => ({
  type: NULL_SEARCH,
})
