import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'
import {
  SORT_BY_ABC,
  SORT_BY_COST,
  SORT_BY_DISCOUNT,
  SORT_BY_MY_FAVORITE,
} from './methodSortConstants'

const methodSortSlice = createSlice({
  name: 'myMethodSearch',
  initialState: getInitialState().methodSorting,
  reducers: {
    sortByCost() { return SORT_BY_COST },

    sortByABC() { return SORT_BY_ABC },

    deleteSort() { return '' },

    sortByDiscount() { return SORT_BY_DISCOUNT },

    sortByMyFavorite() { return SORT_BY_MY_FAVORITE },
  },
})

export const {
  sortByCost,
  sortByABC,
  deleteSort,
  sortByDiscount,
  sortByMyFavorite,
} = methodSortSlice.actions

export const myMethodSearchReducer = methodSortSlice.reducer
