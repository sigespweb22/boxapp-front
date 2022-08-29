// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import assetApiService from 'src/@api-center/asset/assetApiService'

// ** Toast
import toast, { Toaster } from 'react-hot-toast'
import { AssetsType } from 'src/types/apps/assetTypes'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Assets
export const fetchData = createAsyncThunk('appAssets/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(assetApiService.storageTokenKeyName)!
  const response = await axios
                            .get(assetApiService.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })
  return response.data
})

// ** Add Assets
export const addAsset = createAsyncThunk(
  'appAssets/addAsset',
  async (data: { [key: string[]]: number | string }, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(assetApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    const data2 = {
      nome: data.nome,
      referencia: data.referencia,
      codigoUnico: data.codigoUnico,
      tipo: data.tipo,
      valorCusto: data.valorCusto,
      valorVenda: data.valorVenda,
      unidadeMedida: data.unidadeMedida,
      clienteAtivoTipoServicoTipo: data.clienteAtivoTipoServicoTipo,
      caracteristica: data.caracteristica,
      observacao: data.observacao
    }

    axios.post(assetApiService.addAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().user.params))
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message, { duration: 12000, icon: '⚠️',})
      if (resp.status === 201) return toast.success("Ativo criado com sucesso.")
    }).catch((resp) => {
      // ** generic connection error admitted for now as 401
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")

      // ** check to length undefined
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined' &&
          typeof resp.response.data.errors.length == 'undefined')
      {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach(function(err) {
          err[1].forEach(function (ie) {
            toast.error(ie)        
          })
        });
      } else if (typeof resp.response.data != 'undefined' && 
                 typeof resp.response.data.errors != 'undefined' &&
                 typeof resp.response.data.errors.length != 'undefined') 
      {
        resp.response.data.errors.forEach(err => {
          toast.error(err)
        });
      }
    })
  }
)

// ** Update Assets
export const editAsset = createAsyncThunk(
  'appAsset/updateAsset',
  async (data : AssetsType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(assetApiService.storageTokenKeyName)!
    let config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    const data2 = {
      id: data.id,
      nome: data.nome,
      referencia: data.referencia,
      codigoUnico: data.codigoUnico,
      tipo: data.tipo,
      valorCusto: data.valorCusto,
      valorVenda: data.valorVenda,
      unidadeMedida: data.unidadeMedida,
      clienteAtivoTipoServicoTipo: data.clienteAtivoTipoServicoTipo,
      caracteristica: data.caracteristica,
      observacao: data.observacao
    }

    axios.put(assetApiService.updateAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().role.params))
      if (resp.status === 204) return toast.success("Ativo atualizado com sucesso.")
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        resp.response.data.errors.forEach(err => {
          toast.error(err)
        });
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach(function(err) {
          err[1].forEach(function (ie) {
            toast.error(ie)        
          })
        });
      }
    })
  }
)

// ** Delete Assets
export const deleteAsset = createAsyncThunk(
  'appAssets/deleteAsset',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(assetApiService.storageTokenKeyName)!
    
    let headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(assetApiService.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().user.params))
      if (resp.status === 204) return toast.success("Ativo deletado com sucesso.")
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        resp.response.data.errors.forEach(err => {
          toast.error(err)
        });
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach(function(err) {
          err[1].forEach(function (ie) {
            toast.error(ie)        
          })
        });
      }
    })
  }
)

// ** Alter Status Assets
export const alterStatusAsset = createAsyncThunk(
  'appAssets/alterStatusAsset',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(assetApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(assetApiService.alterStatusAsync+id, null, config).then((resp) => {
      dispatch(fetchData(getState().user.params))
      toast.success(resp.data.message)
      return resp.data.data
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        resp.response.data.errors.forEach(err => {
          toast.error(err)
        });
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach(function(err) {
          err[1].forEach(function (ie) {
            toast.error(ie)        
          })
        });
      }
    })
  }
)

export const appAssetsSlice = createSlice({
  name: 'appAssets',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.assets
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appAssetsSlice.reducer