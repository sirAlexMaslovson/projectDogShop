import { initialState } from '../../initState'
import {
  ADD_BAY_ALL_PRODUCTS,
  ADD_BAY_PRODUCT,
  ADD_IN_CART, CLEAR_CART,
  DECREMENT_PRODUCT,
  DELETE_BAY_ALL_PRODUCTS,
  DELETE_BAY_PRODUCT,
  DELETE_PRODUCT_FROM_CART,
  INCREMENT_PRODUCT,
} from '../../types/cartTypes'

// eslint-disable-next-line default-param-last
export const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case ADD_IN_CART:
      return [action.payload, ...state]

    case DELETE_PRODUCT_FROM_CART:
      return state.filter((card) => card.id !== action.payload)

    case INCREMENT_PRODUCT:
      return state.map((card) => {
        if (card.id === action.payload) {
          return {
            ...card,
            count: card.count + 1,
          }
        }
        return card
      })

    case DECREMENT_PRODUCT:
      return state.map((card) => {
        if (card.id === action.payload) {
          return {
            ...card,
            count: card.count - 1,
          }
        }
        return card
      })

    case CLEAR_CART:
      return []

    case ADD_BAY_PRODUCT:
      return state.map((card) => {
        if (card.id === action.payload) {
          return {
            ...card,
            inBay: true,
          }
        }
        return card
      })

    case DELETE_BAY_PRODUCT:
      return state.map((card) => {
        if (card.id === action.payload) {
          return {
            ...card,
            inBay: false,
          }
        }
        return card
      })

    case ADD_BAY_ALL_PRODUCTS:
      return state.map((card) => ({
        ...card,
        inBay: true,
      }))

    case DELETE_BAY_ALL_PRODUCTS:
      return state.map((card) => ({
        ...card,
        inBay: false,
      }))

    default:
      return state
  }
}
