// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import servicoApiService from 'src/@api-center/negocios/comercial/servico/servicoApiService'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ServicoType } from 'src/types/negocios/comercial/servico/servicoTypes'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Servico
export const fetchData = createAsyncThunk('appServico/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(servicoApiService.storageTokenKeyName)!
  const response = await axios
                            .get(servicoApiService.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })

  return response.data
})

// ** Add Serviço
export const addServico = createAsyncThunk(
  'appServico/addServico',
  async (data: ServicoType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(servicoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    const data2 = {
      nome: data.nome,
      codigoUnico: data.codigoUnico,
      tipo: data.tipo,
      valorCusto: data.valorCusto,
      unidadeMedida: data.unidadeMedida,
      fornecedorServico: data.fornecedorServico,
      caracteristicas: data.caracteristicas,
    }

    axios.post(servicoApiService.addAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().servico.params))
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message)
      if (resp.status === 201) return toast.success("Serviço criado com sucesso.")
    }).catch((resp) => {
      // ** generic connection error admitted for now as 401
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")

      // ** check to length undefined
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined' &&
          typeof resp.response.data.errors.length == 'undefined')
      {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          err[1].forEach(function (ie: any) {
            toast.error(ie.toString())        
          })
        });
      } else if (typeof resp.response.data != 'undefined' && 
                 typeof resp.response.data.errors != 'undefined' &&
                 typeof resp.response.data.errors.length != 'undefined') 
      {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          toast.error(err.toString())
        });
      }
    })
  }
)

// ** Update Serviço
export const editServico = createAsyncThunk(
  'appServico/updateServico',
  async (data : ServicoType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(servicoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    const data2 = {
      id: data.id,
      nome: data.nome,
      codigoUnico: data.codigoUnico,
      tipo: data.tipo,
      valorCusto: data.valorCusto,
      unidadeMedida: data.unidadeMedida,
      fornecedorServico: data.fornecedorServico,
      caracteristicas: data.caracteristicas,
    }

    axios.put(servicoApiService.updateAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().servico.params))
      if (resp.status === 204) return toast.success("Serviço atualizado com sucesso.")
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        resp.response.data.errors.forEach((err: any) => {
          toast.error(err[1].toString())
        });
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach(function(err: any) {
          err[1].forEach((ie: any) => {
            toast.error(ie.toString())        
          })
        });
      }
    })
  }
)

// ** Delete Serviço
export const deleteservico = createAsyncThunk(
  'appServico/deleteServico',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(servicoApiService.storageTokenKeyName)!
    
    const headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(servicoApiService.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().servico.params))
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

// ** Alter Status Serviço
export const alterStatusServico = createAsyncThunk(
  'appServico/alterStatusServico',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(servicoApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(servicoApiService.alterStatusAsync+id, null, config).then((resp) => {
      dispatch(fetchData(getState().servico.params))
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
          err[1].forEach((ie:any) => {
            toast.error(ie.toString())        
          })
        });
      }
    })
  }
)

export const appServicoSlice = createSlice({
  name: 'appServico',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.servicos
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appServicoSlice.reducer