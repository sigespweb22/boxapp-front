// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import clienteApiService from 'src/@api-center/negocios/comercial/cliente/clienteApiService'

// ** Types
import { ClienteType } from 'src/types/negocios/comercial/cliente/clienteTypes'

// ** Toast
import toast from 'react-hot-toast'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Clientes
export const fetchData = createAsyncThunk('appClients/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(clienteApiService.storageTokenKeyName)!
  const response = await axios
                            .get(clienteApiService.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })

  return response.data
})

// ** Add Client
export const addClient = createAsyncThunk(
  'appClients/addClient',
  async (data: ClienteType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.post(clienteApiService.addAsync, data, config).then((resp) => {
      dispatch(fetchData(getState().cliente.params))
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message, { duration: 12000, icon: '⚠️',})
      if (resp.status === 201) return toast.success("Cliente criado com sucesso.")
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
            toast.error(err)
          });
        } else {
          const returnObj = Object.entries(resp.response.data.errors);
          returnObj.forEach((err: any) => {
            toast.error(err)
          });
        }
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          err[1].forEach((ie: any) => {
            toast.error(ie)        
          })
        });
      }
    })
  }
)

// ** Update Client
export const editCliente = createAsyncThunk(
  'appClients/updateClient',
  async (data : ClienteType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(clienteApiService.updateAsync, data, config).then((resp) => {
      dispatch(fetchData(getState().cliente.params))
      if (resp.status === 204) return toast.success("Cliente atualizado com sucesso.")
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
            toast.error(err)
          });
        } else {
          resp.response.data.errors.forEach((err: any) => {
            toast.error(err)
          });
        }
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          err[1].forEach((ie: any) => {
            toast.error(ie)        
          })
        });
      }
    })
  }
)

// ** Delete Client
export const deleteClient = createAsyncThunk(
  'appClients/deleteClient',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteApiService.storageTokenKeyName)!
    
    const headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(clienteApiService.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().cliente.params))
      if (resp.status === 204) return toast.success("Cliente deletado com sucesso.")
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          toast.error(err)
        });
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          err[1].forEach((ie: any) => {
            toast.error(ie)        
          })
        });
      }
    })
  }
)

// ** Alter Status Client
export const alterStatusClient = createAsyncThunk(
  'appClients/alterStatusClient',
  async (id: number | string | undefined, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(clienteApiService.alterStatusAsync+id, null, config).then((resp) => {
      dispatch(fetchData(getState().cliente.params))
      toast.success(resp.data.message)
      
      return resp.data.data
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          toast.error(err)
        });
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          err[1].forEach((ie: any) => {
            toast.error(ie)        
          })
        });
      }
    })
  }
)

export const appClientsSlice = createSlice({
  name: 'appClients',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.clientes
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appClientsSlice.reducer