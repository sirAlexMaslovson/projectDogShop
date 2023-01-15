import { initialState } from '../../initState'
import { NULL_SEARCH, SET_SEARCH } from '../../types/searchTypes'

// eslint-disable-next-line default-param-last
export const searchReducer = (state = initialState.search, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return action.payload
    case NULL_SEARCH:
      return ''
    default:
      return state
  }
}
