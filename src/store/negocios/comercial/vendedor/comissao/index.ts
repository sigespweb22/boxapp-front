// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import vendedorComissaoApiService from 'src/@api-center/negocios/comercial/vendedor/comissao/vendedorComissaoApiService'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface DataParams {
  vendedorId: string | null
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Vendedores Comissoes
export const fetchData = createAsyncThunk('appVendedoresComissoes/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(vendedorComissaoApiService.storageTokenKeyName)!
  const response = await axios
                            .get(vendedorComissaoApiService.listAsync, {
                                  headers: {
                                    Authorization: `Bearer ${storedToken}`
                                  },
                                  params
                            })

  return response.data
})

// ** Fetch Comissões Vendedor
export const fetchDataByVendedor = createAsyncThunk('appVendedoresComissoes/fetchDataByVendedor', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(vendedorComissaoApiService.storageTokenKeyName)!
  const response = await axios
                            .get(`${vendedorComissaoApiService.listByVendedorAsync}${params.vendedorId}`, {
                                  headers: {
                                    Authorization: `Bearer ${storedToken}`
                                  }
                            })

  return response.data
})

// ** Alter Status Vendedor Contrato
export const alterStatusVendedorComissao = createAsyncThunk(
  'appVendedoresComissoes/alterStatusVendedorComissao',
  async (id: number | string, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(vendedorComissaoApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }

    axios.put(vendedorComissaoApiService.alterStatusAsync+id, null, config).then((resp) => {
      dispatch(fetchData({vendedorId: resp.data.vendedorId }))
      toast.success(resp.data.message)

      return resp.data.data
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          toast.error(err[1].toString())
        });
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          err[1].forEach((ie: any) => {
            toast.error(ie.toString())        
          })
        });
      }
    })
  }
)

export const appVendedoresComissoesSlice = createSlice({
  name: 'appVendedoresComissoes',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.vendedoresComissoes
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    }),
    builder.addCase(fetchDataByVendedor.fulfilled, (state, action) => {
      state.data = action.payload.vendedoresComissoes
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})
  
export default appVendedoresComissoesSlice.reducer