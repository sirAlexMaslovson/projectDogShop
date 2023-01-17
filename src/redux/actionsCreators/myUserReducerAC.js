import { ADD_USER_INFO, DELETE_USER_INFO } from '../types/myUserTypes'

export const addMyUserInfo = (objUser) => ({
  type: ADD_USER_INFO,
  payload: objUser,
})

export const deleteMyUserInfo = () => ({
  type: DELETE_USER_INFO,
})
