// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import userApi from 'src/@api-center/user/userServices'

// ** Toast
import toast, { Toaster } from 'react-hot-toast'

interface DataParams {
  q: string
  role: string
  status: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(userApi.storageTokenKeyName)!
  const response = await axios
                            .get(userApi.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })
  return response.data
})

// ** Add User
export const addUser = createAsyncThunk(
  'appUsers/addUser',
  async (data: { [key: string[]]: number | string }, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(userApi.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    const data2 = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      applicationUserGroups: data.applicationUserGroups
    }

    axios.post(userApi.addAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().user.params))
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message, { duration: 12000, icon: '⚠️',})
      if (resp.status === 201) return toast.success("Usuário criado com sucesso.")
    }).catch((resp) => {
      if (typeof resp.response.data != 'undefined' && 
         typeof resp.response.data.errors != 'undefined')
      {
        resp.response.data.errors.forEach(err => {
          toast.error(err)
        });
      } else if (typeof resp.response.data != 'undefined' && typeof resp.response.data.errors == 'undefined')
      {
        resp.response.data.forEach(err => {
          toast.error(err.description)
        });
      } else if (typeof resp.response.data.errors != 'undefined')
      {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach(function(err) {
          err[1].forEach(function (ie) {
            toast.error(ie)
          })
        });
      } 
      else if (resp.response.data.status != null && resp.response.data.status == 500) toast.error(resp.response.data.title)
      else toast.error(resp.response.data)
    })
  }
)

// ** Delete User
export const deleteUser = createAsyncThunk(
  'appUsers/deleteUser',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(userApi.storageTokenKeyName)!
    
    let headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(userApi.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().user.params))
      if (resp.status === 204) return toast.success("Usuário deletado com sucesso.")
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response != 'undefined' && resp.response.status === 500) return toast.error(resp.response.data.detail)
      if (typeof resp.response.data != 'undefined' && 
         typeof resp.response.data.errors != 'undefined')
      {
        if (typeof resp.response.data == 'object') return toast.error(resp.response.data)
        resp.response.data.errors.forEach(err => {
          toast.error(err)
        });
      } else if (typeof resp.response.data != 'undefined' && typeof resp.response.data.errors == 'undefined')
      {
        resp.response.data.forEach(err => {
          toast.error(err.description)
        });
      } else if (typeof resp.response.data.errors != 'undefined')
      {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach(function(err) {
          err[1].forEach(function (ie) {
            toast.error(ie)
          })
        });
      } 
      else if (resp.response.data.status != null && resp.response.data.status == 500) toast.error(resp.response.data.title)
      else toast.error(resp.response.data)
    })
  }
)

// ** Alter Status User
export const alterStatusUser = createAsyncThunk(
  'appUsers/alterStatusUser',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(userApi.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }
    debugger;

    axios.put(userApi.alterStatusAsync+id, null, config).then((resp) => {
      dispatch(fetchData(getState().user.params))
      toast.success(resp.data.message)
      return resp.data.data
    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response != 'undefined' && resp.response.status === 500) return toast.error(resp.response.data.detail)
      if (typeof resp.response.data != 'undefined' && 
         typeof resp.response.data.errors != 'undefined')
      {
        if (typeof resp.response.data == 'object') return toast.error(resp.response.data)
        resp.response.data.errors.forEach(err => {
          toast.error(err)
        });
      } else if (typeof resp.response.data != 'undefined' && typeof resp.response.data.errors == 'undefined')
      {
        resp.response.data.forEach(err => {
          toast.error(err.description)
        });
      } else if (typeof resp.response.data.errors != 'undefined')
      {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach(function(err) {
          err[1].forEach(function (ie) {
            toast.error(ie)
          })
        });
      } 
      else if (resp.response.data.status != null && resp.response.data.status == 500) toast.error(resp.response.data.title)
      else toast.error(resp.response.data)
    })
  }
)

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      debugger;
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appUsersSlice.reducer