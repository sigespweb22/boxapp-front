import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import rotinaEventHistoryApiService from 'src/@api-center/sistema/rotinas/rotinasEventsHistories/rotinaEventHistoryApiService'

interface DataParams {
  rotinaId: string | undefined
}

// ** Fetch RotinasEventsHistories
export const fetchData = createAsyncThunk('appRotinasEventsHistories/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(rotinaEventHistoryApiService.storageTokenKeyName)!
  const response = await axios
                            .get(rotinaEventHistoryApiService.listAsync, {
                                  headers: {
                                    Authorization: `Bearer ${storedToken}`
                                  },
                                  params
                            })

  return response.data
})

export const appRotinasEventsHistoriesSlice = createSlice({
  name: 'appRotinasEventsHistories',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.rotinasEventsHistories
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})
  
export default appRotinasEventsHistoriesSlice.reducer