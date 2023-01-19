import { combineReducers } from 'redux'
import { cartReducer } from './cartReducer/cartReducer'
import { idForDetailReducer } from './idCartReducer/idCartReducer'
import { methodSortReducer } from './methodSortReducer/methodSortReducer'
import { myUserReducer } from './myUserReducer/myUserReducer'
import { searchReducer } from './searhReducer/searhReducer'
import { tokenReducer } from './tokenReducer/tokenReducer'

export const rootReducer = combineReducers({
  TOKEN: tokenReducer,
  search: searchReducer,
  cart: cartReducer,
  methodSorting: methodSortReducer,
  idForDetailCard: idForDetailReducer,
  myUser: myUserReducer,
})
