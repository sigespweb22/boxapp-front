// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import clientApiService from 'src/@api-center/client/clientApiService'

// ** Types
import { ClientsType } from 'src/types/bussiness/commercial/client/clientTypes'

// ** Toast
import toast from 'react-hot-toast'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Clients
export const fetchData = createAsyncThunk('appClients/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(clientApiService.storageTokenKeyName)!
  const response = await axios
                            .get(clientApiService.listAsync, {
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
  async (data: ClientsType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clientApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    const data2 = {
      nomeFantasia: data.nomeFantasia,
      razaoSocial: data.razaoSocial,
      inscricaoEstadual: data.inscricaoEstadual,
      cnpj: data.cnpj,
      telefonePrincipal: data.telefonePrincipal,
      emailPrincipal: data.emailPrincipal,
      observacao: data.observacao,
      dataFundacao: data.dataFundacao,
      codigoMunicipio: data.codigoMunicipio,
      rua: data.rua,
      numero: data.numero,
      complemento: data.complemento,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
      status: data.status
    }

    axios.post(clientApiService.addAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().client.params))
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
export const editClient = createAsyncThunk(
  'appClient/updateClient',
  async (data : ClientsType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clientApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    const data2 = {
      id: data.id,
      nomeFantasia: data.nomeFantasia,
      razaoSocial: data.razaoSocial,
      inscricaoEstadual: data.inscricaoEstadual,
      cnpj: data.cnpj,
      telefonePrincipal: data.telefonePrincipal,
      emailPrincipal: data.emailPrincipal,
      observacao: data.observacao,
      dataFundacao: data.dataFundacao,
      codigoMunicipio: data.codigoMunicipio,
      rua: data.rua,
      numero: data.numero,
      complemento: data.complemento,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
      status: data.status
    }

    axios.put(clientApiService.updateAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().client.params))
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
    const storedToken = window.localStorage.getItem(clientApiService.storageTokenKeyName)!
    
    const headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(clientApiService.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().client.params))
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
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clientApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(clientApiService.alterStatusAsync+id, null, config).then((resp) => {
      dispatch(fetchData(getState().client.params))
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
      state.data = action.payload.clients
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appClientsSlice.reducer