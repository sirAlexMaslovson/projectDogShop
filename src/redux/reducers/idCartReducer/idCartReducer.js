import { api } from '../../../components/helpers/Api'
import { initialState } from '../../initState'
import { ADD_ID_CARD, DELETE_ID_CARD } from '../../types/idDetailCardTypes'

// eslint-disable-next-line default-param-last
export const idForDetailReducer = (state = initialState.idForDetailCard, action) => {
  switch (action.type) {
    case ADD_ID_CARD:
    {
      api.setNewIdCard(action.payload)
      return action.payload
    }
    case DELETE_ID_CARD:
      return ''
    default:
      return state
  }
}
