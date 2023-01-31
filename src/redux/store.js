import { configureStore } from '@reduxjs/toolkit'
import { REDUX_LOCAL_STORAGE_KEY_DOG_FOOD } from './initState'
import { cartReducer } from './slices/cartSlice/cartSlice'
import { favouriteReducer } from './slices/favouriteSlice/favouriteSlice'
import { myMethodSearchReducer } from './slices/methodSortSlice/methodSortSlice'
import { myUserReducer } from './slices/myUserSlice/myUserSlice'
import { mySearchReducer } from './slices/searchSlice/searchSlice'
import { tokenReducer } from './slices/tokenSlice/tokenSlice'

export const store = configureStore({
  reducer: {
    TOKEN: tokenReducer,
    myUser: myUserReducer,
    search: mySearchReducer,
    methodSorting: myMethodSearchReducer,
    cart: cartReducer,
    favourite: favouriteReducer,
  },
})

store.subscribe(() => {
  localStorage.setItem(REDUX_LOCAL_STORAGE_KEY_DOG_FOOD, JSON.stringify(store.getState()))
})
