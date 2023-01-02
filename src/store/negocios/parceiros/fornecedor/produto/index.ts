// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import fornecedorProdutoApiService from 'src/@api-center/negocios/parceiros/fornecedor/produto/fornecedorProdutoApiService'

// ** Types
import { FornecedorProdutoType, FornecedorProdutoAddType } from 'src/types/negocios/parceiros/fornecedor/produto/fornecedorProdutoTypes'

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

// ** Fetch Fornecedor Produtos
export const fetchData = createAsyncThunk('appFornecedorProdutos/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(fornecedorProdutoApiService.storageTokenKeyName)!
  const response = await axios
                            .get(fornecedorProdutoApiService.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })

  return response.data
})

// ** Add Fornecedor Produtos
export const addFornecedorProduto = createAsyncThunk(
  'appFornecedorProdutos/addFornecedorProduto',
  async (data: FornecedorProdutoAddType, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(fornecedorProdutoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.post(fornecedorProdutoApiService.addAsync, data, config).then((resp) => {
      dispatch(fetchData({fornecedorId: resp.data.fornecedorId }))
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

// ** Update Fornecedor Produtos
export const editFornecedorProduto = createAsyncThunk(
  'appFornecedorProdutos/editFornecedorProduto',
  async (data : FornecedorProdutoType, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(fornecedorProdutoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(fornecedorProdutoApiService.updateAsync, data, config).then((resp) => {
      dispatch(fetchData({fornecedorId: resp.data.fornecedorId }))
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

// ** Delete Fornecedor Produtos
export const deleteFornecedorProduto = createAsyncThunk(
  'appFornecedorProdutos/ClienteProduto',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(fornecedorProdutoApiService.storageTokenKeyName)!
    
    const headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(fornecedorProdutoApiService.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().fornecedorProduto.params))
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

// ** Alter Status Fornecedor Produto
export const alterStatusFornecedorProduto = createAsyncThunk(
  'appFornecedorProdutos/alterStatusFornecedorProduto',
  async (id: number | string, { dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(fornecedorProdutoApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(`${fornecedorProdutoApiService.alterStatusAsync}/${id}`, null, config).then((resp) => {
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

export const appFornecedorProdutosSlice = createSlice({
  name: 'appFornecedorProdutos',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.fornecedorProdutos
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})
  
export default appFornecedorProdutosSlice.reducer