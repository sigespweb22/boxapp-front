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
  debugger
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
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(userApi.storageTokenKeyName)!
    
    debugger;
    axios.post(userApi.addAsync, {
      headers: {
        Authorization: "Bearer " + storedToken
      },
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      applicationUserGroups: data.groups
    }).then((resp) => {
      dispatch(fetchData(getState().user.params))
      toast.success(resp.data.message)
      return resp.data.data
    }).catch((resp) => {
      debugger;
      if (resp.response.data.length >= 1)
      {
        resp.response.data.forEach(element => {
          toast.error(element.description)
        })
      }
      else
      {
        toast.error(resp.response.data)
      }
    })
  }
)

// ** Delete User
export const deleteUser = createAsyncThunk(
  'appUsers/deleteUser',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete('/apps/users/delete', {
      data: id
    })
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appUsersSlice.reducer