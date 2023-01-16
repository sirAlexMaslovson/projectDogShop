import { initialState } from '../../initState'
import {
  DELETE_SORT,
  SORT_BY_ABC,
  SORT_BY_COST,
  SORT_BY_DISCOUNT,
  SORT_BY_MY_FAVORITE,
} from '../../types/methodSortingTypes'

// eslint-disable-next-line default-param-last
export const methodSortReducer = (state = initialState.methodSorting, action) => {
  switch (action.type) {
    case SORT_BY_COST:
      return 'sort by cost'
    case SORT_BY_ABC:
      return 'sort by ABC'
    case DELETE_SORT:
      return ''
    case SORT_BY_DISCOUNT:
      return 'sort by discount'
    case SORT_BY_MY_FAVORITE:
      return 'sort by favorite'
    default:
      return state
  }
}
