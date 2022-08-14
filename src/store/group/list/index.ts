// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import groupApi from 'src/services/group/groupServices'

interface DataParams {
  q: string
  status: string
}

// ** Fetch Group List To Select
export const fetchData = createAsyncThunk('appGroups/fetchData', async () => {
  debugger;
  const storedToken = window.localStorage.getItem(groupApi.storageTokenKeyName)!
  const response = await axios
                            .get(groupApi.listToSelectAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  }
                            })
  return response.data
})


export const appGroupsSlice = createSlice({
  name: 'appGroups',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appGroupsSlice.reducer