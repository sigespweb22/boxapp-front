// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import produtoApiService from 'src/@api-center/negocios/comercial/produto/produtoApiService'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ProdutoType } from 'src/types/negocios/comercial/produto/produtoTypes'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Servico
export const fetchData = createAsyncThunk('appProduto/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(produtoApiService.storageTokenKeyName)!
  const response = await axios
                            .get(produtoApiService.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })

  return response.data
})

// ** Add Serviço
export const addProduto = createAsyncThunk(
  'appProduto/addProduto',
  async (data: ProdutoType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(produtoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.post(produtoApiService.addAsync, data, config).then((resp) => {
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
export const editProduto = createAsyncThunk(
  'appProduto/updateProduto',
  async (data : ProdutoType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(produtoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(produtoApiService.updateAsync, data, config).then((resp) => {
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
export const deleteProduto = createAsyncThunk(
  'appProduto/deleteProduto',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(produtoApiService.storageTokenKeyName)!
    
    const headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(produtoApiService.deleteAsync+id, { headers }).then((resp) => {
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
export const alterStatusProduto = createAsyncThunk(
  'appProduto/alterStatusProduto',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(produtoApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(produtoApiService.alterStatusAsync+id, null, config).then((resp) => {
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

export const appProdutoSlice = createSlice({
  name: 'appProduto',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.produtos
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appProdutoSlice.reducer