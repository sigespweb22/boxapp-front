// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import groupApiService from 'src/@api-center/group/groupApiService'

// ** Toast
import toast, { Toaster } from 'react-hot-toast'

// ** Types
import { GroupsType } from 'src/types/apps/groupTypes'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Groups
export const fetchData = createAsyncThunk('appGroups/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(groupApiService.storageTokenKeyName)!
  const response = await axios
                            .get(groupApiService.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })
  return response.data
})

// ** Add Groups
export const addGroup = createAsyncThunk(
  'appGroups/addGroup',
  async (data: GroupsType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(groupApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    const data2 = {
      name: data.name,
      applicationRoleGroups: data.applicationRoleGroups
    }

    axios.post(groupApiService.addAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().group.params))
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message, { duration: 12000, icon: '⚠️',})
      if (resp.status === 201) return toast.success("Grupo permissões criado com sucesso.")
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
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

// ** Delete User
export const deleteGroup = createAsyncThunk(
  'appGroups/deleteGroup',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(groupApiService.storageTokenKeyName)!
    
    let headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(groupApiService.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().group.params))
      if (resp.status === 204) return toast.success("Grupo permissão deletado com sucesso.")
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
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

// ** Alter Status Group
export const alterStatusGroup = createAsyncThunk(
  'appGroups/alterStatusGroup',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(groupApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(groupApiService.alterStatusAsync+id, null, config).then((resp) => {
      dispatch(fetchData(getState().group.params))
      toast.success(resp.data.message)
      return resp.data.data
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
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

export const appGroupsSlice = createSlice({
  name: 'appGroups',
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

export default appGroupsSlice.reducer