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
    let config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    let data2 = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      applicationUserGroups: data.applicationUserGroups
    }

    axios.post(userApi.addAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().user.params))
      toast.success(resp.data.message)
      return resp.data.data
    }).catch((resp) => {
      
      debugger;
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