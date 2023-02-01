/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState: getInitialState().favourite,
  reducers: {

    addFavourite(state, action) {
      state.push(action.payload)
    },

    deleteFavourite(state, action) {
      return state.filter((card) => card !== action.payload)
    },

  },
})

export const { addFavourite, deleteFavourite } = favouriteSlice.actions

export const favouriteReducer = favouriteSlice.reducer
