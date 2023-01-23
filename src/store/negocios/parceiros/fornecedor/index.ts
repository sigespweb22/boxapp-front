// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import fornecedorApiService from 'src/@api-center/negocios/parceiros/fornecedor/fornecedorApiService'

// ** Types
import { FornecedorType } from 'src/types/negocios/parceiros/fornecedor/fornecedorTypes'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface DataParams {
  id: string | string[] | undefined
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Fornecedor
export const fetchData = createAsyncThunk('appFornecedores/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(fornecedorApiService.storageTokenKeyName)!
  const response = await axios
                            .get(fornecedorApiService.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })

  return response.data
})

// ** Add Fornecedor
export const addFornecedor = createAsyncThunk(
  'appFornecedores/addFornecedor',
  async (data: FornecedorType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(fornecedorApiService.storageTokenKeyName)!
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
      codigoMunicipio: data.codigoMunicipio,
      rua: data.rua,
      numero: data.numero,
      complemento: data.complemento,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
      status: data.status
    }

    axios.post(fornecedorApiService.addAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().fornecedor.params))
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message)
      if (resp.status === 201) return toast.success("Fornecedore criado com sucesso.")
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

// ** Update Fornecedor
export const editFornecedor = createAsyncThunk(
  'appFornecedor/updateFornecedor',
  async (data : FornecedorType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(fornecedorApiService.storageTokenKeyName)!
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
      codigoMunicipio: data.codigoMunicipio,
      rua: data.rua,
      numero: data.numero,
      complemento: data.complemento,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
      status: data.status
    }

    axios.put(fornecedorApiService.updateAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().fornecedor.params))
      if (resp.status === 204) return toast.success("Fornecedore atualizado com sucesso.")
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

// ** Delete Fornecedor
export const deleteFornecedor = createAsyncThunk(
  'appFornecedores/deleteFornecedor',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(fornecedorApiService.storageTokenKeyName)!
    
    const headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(fornecedorApiService.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().fornecedor.params))
      if (resp.status === 204) return toast.success("Fornecedore deletado com sucesso.")
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

// ** Alter Status Fornecedor
export const alterStatusFornecedor = createAsyncThunk(
  'appFornecedores/alterStatusFornecedor',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(fornecedorApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(fornecedorApiService.alterStatusAsync+id, null, config).then((resp) => {
      dispatch(fetchData(getState().fornecedor.params))
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

export const appFornecedoresSlice = createSlice({
  name: 'appFornecedores',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.fornecedores
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appFornecedoresSlice.reducer