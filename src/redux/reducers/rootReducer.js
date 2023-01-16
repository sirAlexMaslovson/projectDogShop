import { combineReducers } from 'redux'
import { cartReducer } from './cartReducer/cartReducer'
import { methodSortReducer } from './methodSortReducer/methodSortReducer'
import { searchReducer } from './searhReducer/searhReducer'
import { tokenReducer } from './tokenReducer/tokenReducer'

export const rootReducer = combineReducers({
  TOKEN: tokenReducer,
  search: searchReducer,
  cart: cartReducer,
  methodSorting: methodSortReducer,
})
