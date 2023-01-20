import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const myUserSlice = createSlice({
  name: 'myUser',
  initialState: getInitialState().myUser,
  reducers: {
    addUserInfo(_, action) {
      return action.payload
    },
    deleteUserInfo() {
      return {}
    },
  },
})

export const { addUserInfo, deleteUserInfo } = myUserSlice.actions

export const myUserReducer = myUserSlice.reducer
