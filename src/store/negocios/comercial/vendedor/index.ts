// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import vendedorApiService from 'src/@api-center/negocios/comercial/vendedor/vendedorApiService'

// ** Types
import { VendedorType } from 'src/types/negocios/comercial/vendedor/vendedorTypes'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Vendedores
export const fetchData = createAsyncThunk('appVendedores/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(vendedorApiService.storageTokenKeyName)!
  const response = await axios
                            .get(vendedorApiService.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })

  return response.data
})

// ** Add Vendedor
export const addVendedor = createAsyncThunk(
  'appVendedores/addVendedor',
  async (data: VendedorType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(vendedorApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.post(vendedorApiService.addAsync, data, config).then((resp) => {
      dispatch(fetchData(getState().vendedor.params))
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message)
      if (resp.status === 201) return toast.success("Vendedor criado com sucesso.")
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        if (typeof resp.response.data.title != 'undefined' &&
            resp.response.data.title === "One or more validation errors occurred.")
        {
          const returnObj = Object.entries(resp.response.data.errors);
          returnObj.forEach((err: any) => {
            toast.error(err[1].toString())
          });
        } else {
          const returnObj = Object.entries(resp.response.data.errors);
          returnObj.forEach((err: any) => {
            toast.error(err.toString())
          });
        }
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

// ** Update Vendedor
export const editVendedor = createAsyncThunk(
  'appVendedores/updateVendedor',
  async (data : VendedorType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(vendedorApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(vendedorApiService.updateAsync, data, config).then((resp) => {
      dispatch(fetchData(getState().vendedor.params))
      if (resp.status === 204) return toast.success("Vendedor atualizado com sucesso.")
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        if (typeof resp.response.data.title != 'undefined' &&
            resp.response.data.title === "One or more validation errors occurred.")
        {
          const returnObj = Object.entries(resp.response.data.errors);
          returnObj.forEach((err: any) => {
            toast.error(err[1].toString())
          });
        } else {
          resp.response.data.errors.forEach((err: any) => {
            toast.error(err.toString())
          });
        }
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

// ** Delete Vendedor
export const deleteVendedor = createAsyncThunk(
  'appVendedores/deleteVendedor',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(vendedorApiService.storageTokenKeyName)!
    
    const headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(vendedorApiService.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().vendedor.params))
      if (resp.status === 204) return toast.success("Vendedor deletado com sucesso.")
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

// ** Alter Status Vendedor
export const alterStatusVendedor = createAsyncThunk(
  'appVendedores/alterStatusVendedor',
  async (id: number | string | undefined, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(vendedorApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(vendedorApiService.alterStatusAsync+id, null, config).then((resp) => {
      dispatch(fetchData(getState().vendedor.params))
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

export const appVendedoresSlice = createSlice({
  name: 'appVendedores',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.vendedores
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appVendedoresSlice.reducer