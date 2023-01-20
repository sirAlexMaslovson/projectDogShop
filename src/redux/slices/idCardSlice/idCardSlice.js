import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const idCardSlice = createSlice({
  name: 'myIdCardSlice',
  initialState: getInitialState().idForDetailCard,
  reducers: {
    addIdCard(_, action) {
      return action.payload
    },
    deleteIdCard() { return '' },
  },
})

export const { addIdCard, deleteIdCard } = idCardSlice.actions

export const myIdCardReducer = idCardSlice.reducer
