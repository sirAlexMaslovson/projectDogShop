import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState().cart,
  reducers: {

    addInCart: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(id) {
        return {
          payload: {
            id,
            count: 1,
            inBay: true,
          },
        }
      },
    },

    deleteProductFromCart(state, action) {
      return state.filter((card) => card.id !== action.payload)
    },

    incrementProduct(state, action) {
      return state.map((card) => {
        if (card.id === action.payload) {
          return {
            ...card,
            count: card.count + 1,
          }
        }
        return card
      })
    },

    decrementProduct(state, action) {
      return state.map((card) => {
        if (card.id === action.payload) {
          return {
            ...card,
            count: card.count - 1,
          }
        }
        return card
      })
    },

    clearCart() {
      return []
    },

    addBayProduct(state, action) {
      return state.map((card) => {
        if (card.id === action.payload) {
          return {
            ...card,
            inBay: true,
          }
        }
        return card
      })
    },

    deleteBayProduct(state, action) {
      return state.map((card) => {
        if (card.id === action.payload) {
          return {
            ...card,
            inBay: false,
          }
        }
        return card
      })
    },

    addBayAllProduct(state) {
      return state.map((card) => ({
        ...card,
        inBay: true,
      }))
    },

    deleteBayAllProducts(state) {
      return state.map((card) => ({
        ...card,
        inBay: false,
      }))
    },

  },

})

export const {
  addInCart,
  deleteProductFromCart,
  incrementProduct,
  decrementProduct,
  clearCart,
  addBayProduct,
  deleteBayProduct,
  addBayAllProduct,
  deleteBayAllProducts,
} = cartSlice.actions

export const cartReducer = cartSlice.reducer
