// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import clienteServicoApiService from 'src/@api-center/negocios/comercial/cliente/servico/clienteServicoApiService'

// ** Types
import { ClienteServicoType } from 'src/types/negocios/comercial/cliente/servico/clienteServicoTypes'

// ** Toast
import toast from 'react-hot-toast'

interface DataParams {
  clienteId: string | string[] | undefined
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Cliente Serviços
export const fetchData = createAsyncThunk('appClienteServicos/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(clienteServicoApiService.storageTokenKeyName)!
  const response = await axios
                            .get(clienteServicoApiService.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })

  return response.data
})

// ** Add Cliente Serviços
export const addClienteServico = createAsyncThunk(
  'appClienteServicos/addClienteServico',
  async (data: ClienteServicoType, { getState, dispatch }: Redux) => {
    debugger
    const storedToken = window.localStorage.getItem(clienteServicoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.post(clienteServicoApiService.addAsync, data, config).then((resp) => {
      dispatch(fetchData(getState().clienteServico.params))
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message, { duration: 12000, icon: '⚠️',})
      if (resp.status === 201) return toast.success("Serviço adicionado com sucesso.")
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

// ** Update Cliente Serviços
export const editClienteServico = createAsyncThunk(
  'appClienteServicos/updateClienteServico',
  async (data : ClienteServicoType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteServicoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(clienteServicoApiService.updateAsync, data, config).then((resp) => {
      dispatch(fetchData(getState().clienteServico.params))
      if (resp.status === 204) return toast.success("Serviço atualizado com sucesso.")
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

// ** Delete Cliente Serviços
export const deleteClienteServico = createAsyncThunk(
  'appClienteServicos/ClienteServico',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteServicoApiService.storageTokenKeyName)!
    
    const headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(clienteServicoApiService.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().clienteServico.params))
      if (resp.status === 204) return toast.success("Serviço deletado com sucesso.")
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

// ** Alter Status Cliente Serviços
export const alterStatusClienteServico = createAsyncThunk(
  'appClienteServicos/alterStatusClienteServico',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteServicoApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(clienteServicoApiService.alterStatusAsync+id, null, config).then((resp) => {
      dispatch(fetchData(getState().clienteServico.params))
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

export const appClienteServicosSlice = createSlice({
  name: 'appClienteServicos',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.clienteServicos
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})
  
export default appClienteServicosSlice.reducer