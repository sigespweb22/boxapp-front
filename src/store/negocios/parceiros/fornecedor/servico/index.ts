// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import fornecedorServicoApiService from 'src/@api-center/negocios/parceiros/fornecedor/servico/fornecedorServicoApiService'

// ** Types
import { FornecedorServicoType, FornecedorServicoAddType } from 'src/types/negocios/parceiros/fornecedor/servico/fornecedorServicoTypes'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface DataParams {
  fornecedorId: string | string[] | undefined
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Fornecedor Serviços
export const fetchData = createAsyncThunk('appFornecedorServicos/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(fornecedorServicoApiService.storageTokenKeyName)!
  const response = await axios
                            .get(fornecedorServicoApiService.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })

  return response.data
})

// ** Add Fornecedor Serviços
export const addFornecedorServico = createAsyncThunk(
  'appFornecedorServicos/addFornecedorServico',
  async (data: FornecedorServicoAddType, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(fornecedorServicoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.post(fornecedorServicoApiService.addAsync, data, config).then((resp) => {
      dispatch(fetchData({fornecedorId: resp.data.fornecedorId }))
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message)
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

// ** Update Fornecedor Serviços
export const editFornecedorServico = createAsyncThunk(
  'appFornecedorServicos/editFornecedorServico',
  async (data : FornecedorServicoType, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(fornecedorServicoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(fornecedorServicoApiService.updateAsync, data, config).then((resp) => {
      dispatch(fetchData({fornecedorId: resp.data.fornecedorId }))
      if (resp.status === 200) return toast.success("Serviço atualizado com sucesso.")
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

// ** Delete Fornecedor Serviços
export const deleteFornecedorServico = createAsyncThunk(
  'appFornecedorServicos/ClienteServico',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(fornecedorServicoApiService.storageTokenKeyName)!
    
    const headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(fornecedorServicoApiService.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().fornecedorServico.params))
      if (resp.status === 204) return toast.success("Serviço deletado com sucesso.")
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

// ** Alter Status Fornecedor Serviço
export const alterStatusFornecedorServico = createAsyncThunk(
  'appFornecedorServicos/alterStatusFornecedorServico',
  async (id: number | string, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(fornecedorServicoApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(fornecedorServicoApiService.alterStatusAsync+id, null, config).then((resp) => {
      dispatch(fetchData({fornecedorId: resp.data.fornecedorId }))
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

export const appFornecedorServicosSlice = createSlice({
  name: 'appFornecedorServicos',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.fornecedorServicos
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})
  
export default appFornecedorServicosSlice.reducer