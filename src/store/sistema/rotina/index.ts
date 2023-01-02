// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import rotinaApiServices from 'src/@api-center/sistema/rotinas/rotinaApiService'

// ** Toast Imports
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// ** Types Imports
import { RotinaType } from 'src/types/sistema/rotinas/rotinaType'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Rotina
export const fetchData = createAsyncThunk('appRotinas/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(rotinaApiServices.storageTokenKeyName)!
  const response = await axios
                            .get(rotinaApiServices.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })
                            
  return response.data
})

// ** Update Rotina
export const updateRotina = createAsyncThunk(
  'appRotinas/updateRotina',
  async (data: RotinaType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(rotinaApiServices.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(rotinaApiServices.updateAsync, data, config).then((resp) => {
      dispatch(fetchData(getState().rotina.params))
      if (resp.status === 204) return toast.success("Rotina atualizada com sucesso.")
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

// ** Alter Status Rotina
export const alterStatusRotina = createAsyncThunk(
  'appRotinas/alterStatusChaveApi',
  async (id: string | undefined, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(rotinaApiServices.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(`${rotinaApiServices.alterStatusAsync}/${id}`, null, config).then((resp) => {
      dispatch(fetchData(getState().rotina.params))
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

export const appRotinasApiSlice = createSlice({
  name: 'appRotinas',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.rotinas
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appRotinasApiSlice.reducer