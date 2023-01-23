// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import clienteContratoApiService from 'src/@api-center/negocios/comercial/cliente/contrato/clienteContratoApiService'

// ** Types
import { ClienteContratoViewModelType, ClienteContratoAddType } from 'src/types/negocios/comercial/cliente/contrato/clienteContratoTypes'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface DataParams {
  clienteId: string | string[] | undefined
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Cliente Contratos
export const fetchData = createAsyncThunk('appClienteContratos/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(clienteContratoApiService.storageTokenKeyName)!
  const response = await axios
                            .get(clienteContratoApiService.listAsync, {
                                  headers: {
                                    Authorization: `Bearer ${storedToken}`
                                  },
                                  params
                            })

  return response.data
})

// ** Add Cliente Contratos
export const addClienteContrato = createAsyncThunk(
  'appClienteContratos/addClienteContrato',
  async (data: ClienteContratoAddType, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteContratoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: `Bearer ${storedToken}` 
      }
    }

    axios.post(clienteContratoApiService.addAsync, data, config).then((resp) => {
      dispatch(fetchData({clienteId: resp.data.clienteId }))
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message)
      if (resp.status === 201) return toast.success("Contrato adicionado com sucesso.")
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

// ** Update Cliente Contratos
export const editClienteContrato = createAsyncThunk(
  'appClienteContratos/updateClienteContrato',
  async (data : ClienteContratoViewModelType, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteContratoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }

    axios.put(clienteContratoApiService.updateAsync, data, config).then((resp) => {
      dispatch(fetchData({clienteId: resp.data.clienteId }))
      if (resp.status === 200) return toast.success("Contrato atualizado com sucesso.")
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

// ** Delete Cliente Contrato
export const deleteClienteContrato = createAsyncThunk(
  'appClienteContratos/ClienteContrato',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteContratoApiService.storageTokenKeyName)!
    
    const headers = {
      Authorization: `Bearer ${storedToken}`
    }

    axios.delete(clienteContratoApiService.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().ClienteContrato.params))
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

// ** Alter Status Cliente Contrato
export const alterStatusClienteContrato = createAsyncThunk(
  'appClienteContratos/alterStatusClienteContrato',
  async (id: number | string, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteContratoApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }

    axios.put(clienteContratoApiService.alterStatusAsync+id, null, config).then((resp) => {
      dispatch(fetchData({clienteId: resp.data.clienteId }))
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

export const appClienteContratosSlice = createSlice({
  name: 'appClienteContratos',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.clienteContratos
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})
  
export default appClienteContratosSlice.reducer