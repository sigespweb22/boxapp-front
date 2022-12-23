// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import vendedorContratoApiService from 'src/@api-center/negocios/comercial/vendedor/contrato/vendedorContratoApiService'

// ** Types
import { VendedorContratoType } from 'src/types/negocios/comercial/vendedor/contrato/vendedorContratoTypes'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface DataParams {
  vendedorId: string | string[] | undefined
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Vendedor Contratos
export const fetchData = createAsyncThunk('appVendedorContratos/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(vendedorContratoApiService.storageTokenKeyName)!
  const response = await axios
                            .get(vendedorContratoApiService.listAsync, {
                                  headers: {
                                    Authorization: `Bearer ${storedToken}`
                                  },
                                  params
                            })

  return response.data
})

// ** Add Vendedor Contratos
export const addVendedorContrato = createAsyncThunk(
  'appVendedorContratos/addVendedorContrato',
  async (data: VendedorContratoType, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(vendedorContratoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: `Bearer ${storedToken}` 
      }
    }

    axios.post(vendedorContratoApiService.addAsync, data, config).then((resp) => {
      dispatch(fetchData({vendedorId: resp.data.vendedorId }))
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message)
      if (resp.status === 201) return toast.success("Contrato vinculado ao vendedor com sucesso.")
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

// ** Add without state update Vendedor Contratos
export const addVendedorContratoWithoutUpdateState = createAsyncThunk(
  'appVendedorContratos/addVendedorContratoWithoutUpdateState',
  async (data: VendedorContratoType) => {
    const storedToken = window.localStorage.getItem(vendedorContratoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: `Bearer ${storedToken}` 
      }
    }

    axios.post(vendedorContratoApiService.addAsync, data, config).then((resp) => {
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message)
      if (resp.status === 201) return toast.success("Contrato vinculado ao vendedor com sucesso.")
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
            toast.error(err[1].toString().replace("0,", ""))
          });
        } else {
          const returnObj = Object.entries(resp.response.data.errors);
          returnObj.forEach((err: any) => {
            toast.error(err.toString().replace("0,", ""))
          });
        }
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          err[1].forEach((ie: any) => {
            toast.error(ie.toString().replace("0,", ""))
          })
        });
      }
    })
  }
)

// ** Update Vendedor Contratos
export const editVendedorContrato = createAsyncThunk(
  'appVendedorContratos/updateVendedorContrato',
  async (data : VendedorContratoType, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(vendedorContratoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }

    axios.put(vendedorContratoApiService.updateAsync, data, config).then((resp) => {
      dispatch(fetchData({vendedorId: resp.data.vendedorId }))
      if (resp.status === 200) return toast.success("Contrato vendedor atualizado com sucesso.")
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

// ** Delete Vendedor Contrato
export const deleteVendedorContrato = createAsyncThunk(
  'appVendedorContratos/VendedorContrato',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(vendedorContratoApiService.storageTokenKeyName)!
    
    const headers = {
      Authorization: `Bearer ${storedToken}`
    }

    axios.delete(vendedorContratoApiService.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().VendedorContrato.params))
      if (resp.status === 204) return toast.success("Contrato deletado com sucesso.")
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

// ** Alter Status Vendedor Contrato
export const alterStatusVendedorContrato = createAsyncThunk(
  'appClienteContratos/alterStatusClienteContrato',
  async (id: number | string, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(vendedorContratoApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }

    axios.put(vendedorContratoApiService.alterStatusAsync+id, null, config).then((resp) => {
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

export const appVendedorContratosSlice = createSlice({
  name: 'appVendedorContratos',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.vendedorContratos
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})
  
export default appVendedorContratosSlice.reducer