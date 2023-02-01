import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'
import {
  SORT_BY_ABC,
  SORT_BY_COST,
  SORT_BY_DISCOUNT,
  SORT_BY_MY_PRODUCT,
} from './methodSortConstants'

const methodSortSlice = createSlice({
  name: 'myMethodSearch',
  initialState: getInitialState().methodSorting,
  reducers: {
    sortByCost() { return SORT_BY_COST },

    sortByABC() { return SORT_BY_ABC },

    deleteSort() { return '' },

    sortByDiscount() { return SORT_BY_DISCOUNT },

    sortByMyProduct() { return SORT_BY_MY_PRODUCT },
  },
})

export const {
  sortByCost,
  sortByABC,
  deleteSort,
  sortByDiscount,
  sortByMyProduct,
} = methodSortSlice.actions

export const myMethodSearchReducer = methodSortSlice.reducer
