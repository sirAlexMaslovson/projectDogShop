import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const searchSlice = createSlice({
  name: 'mySearch',
  initialState: getInitialState().search,
  reducers: {
    setSearch(_, action) {
      return action.payload
    },
    nullSearch() { return '' },
  },
})

export const { setSearch, nullSearch } = searchSlice.actions

export const mySearchReducer = searchSlice.reducer
