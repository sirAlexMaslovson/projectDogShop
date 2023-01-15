import {
  ADD_BAY_ALL_PRODUCTS,
  ADD_BAY_PRODUCT,
  ADD_IN_CART,
  CLEAR_CART,
  DECREMENT_PRODUCT,
  DELETE_BAY_ALL_PRODUCTS,
  DELETE_BAY_PRODUCT,
  DELETE_PRODUCT_FROM_CART,
  INCREMENT_PRODUCT,
} from '../types/cartTypes'

export const addProductsInCart = (id, count = 1) => ({
  type: ADD_IN_CART,
  payload: {
    id,
    count,
    inBay: false,
  },
})

export const addProductBay = (id) => ({
  type: ADD_BAY_PRODUCT,
  payload: id,
})

export const deleteProductBay = (id) => ({
  type: DELETE_BAY_PRODUCT,
  payload: id,
})

export const addAllProductsBay = () => ({
  type: ADD_BAY_ALL_PRODUCTS,
})

export const deleteAllProductsBay = () => ({
  type: DELETE_BAY_ALL_PRODUCTS,
})

export const deleteProductsFromCartAC = (id) => ({
  type: DELETE_PRODUCT_FROM_CART,
  payload: id,
})

export const clearCart = () => ({
  type: CLEAR_CART,
})

export const incrementProduct = (id) => ({
  type: INCREMENT_PRODUCT,
  payload: id,
})

export const decrementProduct = (id) => ({
  type: DECREMENT_PRODUCT,
  payload: id,
})
