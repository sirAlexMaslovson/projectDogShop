import { ADD_ID_CARD, DELETE_ID_CARD } from '../types/idDetailCardTypes'

export const addIdForDetail = (value) => ({
  type: ADD_ID_CARD,
  payload: value,
})

export const deleteIdForDetail = () => ({
  type: DELETE_ID_CARD,
})
