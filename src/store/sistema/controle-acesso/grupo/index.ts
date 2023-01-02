// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import grupoApiService from 'src/@api-center/sistema/grupo/grupoApiService'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// ** Types
import { GrupoType, GrupoEditType } from 'src/types/sistema/controle-acesso/grupoTypes'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Grupo
export const fetchData = createAsyncThunk('appGrupos/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(grupoApiService.storageTokenKeyName)!
  const response = await axios
                            .get(grupoApiService.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })

  return response.data
})

// ** Add Grupo
export const addGroup = createAsyncThunk(
  'appGrupos/addGroup',
  async (data: GrupoType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(grupoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    const data2 = {
      name: data.name,
      applicationRoleGroups: data.applicationRoleGroups
    }

    axios.post(grupoApiService.addAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().grupo.params))
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message)
      if (resp.status === 201) return toast.success("Grupo permissões criado com sucesso.")
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

// ** Update Grupo
export const editGroup = createAsyncThunk(
  'appGrupos/editGroup',
  async (data : GrupoEditType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(grupoApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    const data2 = {
      id: data.id,
      name: data.name,
      applicationRoleGroups: data.applicationRoleGroups
    }

    axios.put(grupoApiService.updateAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().grupo.params))
      if (resp.status === 204) return toast.success("Grupo de permissões atualizado com sucesso.")
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

// ** Delete Grupo
export const deleteGroup = createAsyncThunk(
  'appGrupos/deleteGroup',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(grupoApiService.storageTokenKeyName)!
    
    const headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(grupoApiService.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().grupo.params))
      if (resp.status === 204) return toast.success("Grupo permissão deletado com sucesso.")
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

// ** Alter Status Grupo
export const alterStatusGrupo = createAsyncThunk(
  'appGrupos/alterStatusGrupo',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(grupoApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(grupoApiService.alterStatusAsync+id, null, config).then((resp) => {
      dispatch(fetchData(getState().grupo.params))
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

export const appGruposSlice = createSlice({
  name: 'appGrupos',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.groups
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appGruposSlice.reducer