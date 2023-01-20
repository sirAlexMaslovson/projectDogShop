import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const tokenSlice = createSlice({
  name: 'token',
  initialState: getInitialState().TOKEN,
  reducers: {
    // eslint-disable-next-line default-param-last
    addToken(_, action) {
      return action.payload
    },
    deleteToken() {
      return ''
    },
  },
})

export const { addToken, deleteToken } = tokenSlice.actions

export const tokenReducer = tokenSlice.reducer
