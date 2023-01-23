// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import chaveApiApiServices from 'src/@api-center/sistema/configuracoes/chave-api/chaveApiTerceiroApiService'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ChaveApiType } from 'src/types/sistema/configuracoes/chave-api/chaveApiTypes'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Chave Api
export const fetchData = createAsyncThunk('appChavesApi/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(chaveApiApiServices.storageTokenKeyName)!
  const response = await axios
                            .get(chaveApiApiServices.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })
                            
  return response.data
})

// ** Add Chave Api
export const addChaveApi = createAsyncThunk(
  'appChavesApi/addChaveApi',
  async (data: ChaveApiType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(chaveApiApiServices.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.post(chaveApiApiServices.addAsync, data, config).then((resp) => {
      dispatch(fetchData(getState().chaveApi.params))
      if (resp.status === 201) return toast.success("Chave Api criada com sucesso.")
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

// ** Update Chave Api
export const updateChaveApi = createAsyncThunk(
  'appChavesApi/updateChaveApi',
  async (data: ChaveApiType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(chaveApiApiServices.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(chaveApiApiServices.updateAsync, data, config).then((resp) => {
      dispatch(fetchData(getState().chaveApi.params))
      if (resp.status === 204) return toast.success("Chave de api atualizada com sucesso.")
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

// ** Delete Chave Api
export const deleteChaveApi = createAsyncThunk(
  'appChavesApi/deleteChaveApi',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(chaveApiApiServices.storageTokenKeyName)!
    
    const headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(`${chaveApiApiServices.deleteAsync}/${id}`, { headers }).then((resp) => {
      dispatch(fetchData(getState().role.params))
      if (resp.status === 204) return toast.success("Chave Api deletada com sucesso.")
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

// ** Alter Status Chave Api
export const alterStatusChaveApi = createAsyncThunk(
  'appChavesApi/alterStatusChaveApi',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(chaveApiApiServices.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(`${chaveApiApiServices.alterStatusAsync}/${id}`, null, config).then((resp) => {
      dispatch(fetchData(getState().chaveApi.params))
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


export const appChavesApiSlice = createSlice({
  name: 'appChavesApi',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.chavesApi
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appChavesApiSlice.reducer