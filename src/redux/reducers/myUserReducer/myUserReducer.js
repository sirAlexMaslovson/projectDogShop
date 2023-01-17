import { initialState } from '../../initState'
import { ADD_USER_INFO, DELETE_USER_INFO } from '../../types/myUserTypes'

// eslint-disable-next-line default-param-last
export const myUserReducer = (state = initialState.myUser, action) => {
  switch (action.type) {
    case ADD_USER_INFO:
      return action.payload
    case DELETE_USER_INFO:
      return {}
    default:
      return state
  }
}
