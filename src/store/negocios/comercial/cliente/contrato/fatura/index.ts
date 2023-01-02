// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import clienteContratoFaturaApiService from 'src/@api-center/negocios/comercial/cliente/contrato/fatura/clienteContratoFaturaApiService'

interface DataParams {
  clienteContratoId: string | undefined
}

// ** Fetch Cliente Contrato Faturas
export const fetchData = createAsyncThunk('appClienteContratoFaturas/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(clienteContratoFaturaApiService.storageTokenKeyName)!
  const response = await axios
                            .get(clienteContratoFaturaApiService.listAsync, {
                                  headers: {
                                    Authorization: `Bearer ${storedToken}`
                                  },
                                  params
                            })

  return response.data
})

export const appClienteContratoFaturasSlice = createSlice({
  name: 'appClienteContratoFaturas',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.clienteContratoFaturas
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})
  
export default appClienteContratoFaturasSlice.reducer