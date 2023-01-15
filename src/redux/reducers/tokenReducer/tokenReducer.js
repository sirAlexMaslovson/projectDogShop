import { api } from '../../../components/helpers/Api'
import { initialState } from '../../initState'
import { ADD_TOKEN, DELETE_TOKEN } from '../../types/tokenTypes'

// eslint-disable-next-line default-param-last
export const tokenReducer = (state = initialState.TOKEN, action) => {
  switch (action.type) {
    case ADD_TOKEN:
    {
      api.setNewToken(action.payload)
      return action.payload
    }
    case DELETE_TOKEN:
      return []
    default:
      return state
  }
}
