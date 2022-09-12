// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import roleApi from 'src/@api-center/role/roleApiService'

// ** Toast
import toast, { Toaster } from 'react-hot-toast'
import { RolesType } from 'src/types/apps/roleTypes'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Role
export const fetchData = createAsyncThunk('appRoles/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(roleApi.storageTokenKeyName)!
  const response = await axios
                            .get(roleApi.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })
                            
  return response.data
})

// ** Add Role
export const addRole = createAsyncThunk(
  'appRoles/addRole',
  async (data: RolesType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(roleApi.storageTokenKeyName)!
    let config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    let data2 = {
      name: data.name,
      description: data.description
    }

    axios.post(roleApi.addAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().role.params))
      if (resp.status === 201) return toast.success("Permissão criada com sucesso.")
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        resp.response.data.errors.forEach((err: any) => {
          toast.error(err)
        });
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          err[1].forEach((ie: any) => {
            toast.error(ie)        
          })
        });
      }
    })
  }
)

// ** Update Role
export const updateRole = createAsyncThunk(
  'appRoles/updateRole',
  async (data: RolesType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(roleApi.storageTokenKeyName)!
    let config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    let data2 = {
      id: data.id,
      name: data.name,
      description: data.description
    }

    axios.put(roleApi.updateAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().role.params))
      if (resp.status === 204) return toast.success("Permissão atualizada com sucesso.")
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        resp.response.data.errors.forEach((err: any) => {
          toast.error(err)
        });
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          err[1].forEach((ie: any) => {
            toast.error(ie)        
          })
        });
      }
    })
  }
)

// ** Delete Role
export const deleteRole = createAsyncThunk(
  'appRoles/deleteRole',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(roleApi.storageTokenKeyName)!
    
    let headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(roleApi.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().role.params))
      if (resp.status === 204) return toast.success("Permissão deletada com sucesso.")
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        resp.response.data.errors.forEach((err: any) => {
          toast.error(err)
        });
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          err[1].forEach((ie: any) => {
            toast.error(ie)        
          })
        });
      }
    })
  }
)

export const appRolesSlice = createSlice({
  name: 'appRoles',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.roles
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appRolesSlice.reducer