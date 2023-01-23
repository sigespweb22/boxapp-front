// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import clienteProdutoApiService from 'src/@api-center/negocios/comercial/cliente/produto/clienteProdutoApiService'

// ** Types
import { ClienteProdutoType, ClienteProdutoAddType } from 'src/types/negocios/comercial/cliente/produto/clienteProdutoTypes'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface DataParams {
  clienteId: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Cliente Produtos
export const fetchData = createAsyncThunk('appClienteProdutos/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(clienteProdutoApiService.storageTokenKeyName)!
  const response = await axios
                            .get(clienteProdutoApiService.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })

  return response.data
})

// ** Add Cliente Produtos
export const addClienteProduto = createAsyncThunk(
  'appClienteProdutos/addClienteProduto',
  async (data: ClienteProdutoAddType, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteProdutoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.post(clienteProdutoApiService.addAsync, data, config).then((resp) => {
      dispatch(fetchData({clienteId: resp.data.clienteId }))
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message)
      if (resp.status === 201) return toast.success("Produto adicionado com sucesso.")
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

// ** Update Cliente Produtos
export const editClienteProduto = createAsyncThunk(
  'appClienteProdutos/updateClienteProduto',
  async (data : ClienteProdutoType, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteProdutoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(clienteProdutoApiService.updateAsync, data, config).then((resp) => {
      dispatch(fetchData({clienteId: resp.data.clienteId }))
      if (resp.status === 200) return toast.success("Produto atualizado com sucesso.")
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

// ** Delete Cliente Produtos
export const deleteClienteProduto = createAsyncThunk(
  'appClienteProdutos/ClienteProduto',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteProdutoApiService.storageTokenKeyName)!
    
    const headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(clienteProdutoApiService.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().ClienteProduto.params))
      if (resp.status === 204) return toast.success("Produto deletado com sucesso.")
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

// ** Alter Status Cliente Produto
export const alterStatusClienteProduto = createAsyncThunk(
  'appClienteProdutos/alterStatusClienteProduto',
  async (id: number | string, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteProdutoApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(clienteProdutoApiService.alterStatusAsync+id, null, config).then((resp) => {
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

export const appClienteProdutosSlice = createSlice({
  name: 'appClienteProdutos',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.clienteProdutos
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})
  
export default appClienteProdutosSlice.reducer