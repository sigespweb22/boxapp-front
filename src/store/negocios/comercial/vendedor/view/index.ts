// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import vendedorApiService from 'src/@api-center/negocios/comercial/vendedor/vendedorApiService'

// ** Types
import { VendedorType } from 'src/types/negocios/comercial/vendedor/vendedorTypes'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface DataParams {
  id: string | string[] | undefined
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Vendedor
export const fetchData = createAsyncThunk('appVendedor/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(vendedorApiService.storageTokenKeyName)!
  const response = await axios
                            .get(`${vendedorApiService.listOneAsync}${params.id}`, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  }
                            })

  return response.data
})

// ** Update Vendedor
export const editVendedor = createAsyncThunk(
  'appVendedor/updateVendedor',
  async (data : VendedorType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(vendedorApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(vendedorApiService.updateAsync, data, config).then((resp) => {
      dispatch(fetchData(getState().vendedorView.data))

      if (resp.status === 204) return toast.success("Vendedor atualizado com sucesso.")
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

const defaultValues: VendedorType = {
  id: '',
  nome: '',
  userId: '',
  applicationUser: null,
  status: '',
  avatarColor: 'primary'
}

export const appVendedorSlice = createSlice({
  name: 'appVendedor',
  initialState: {
    data: defaultValues,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.vendedor
      state.params = action.payload.params
    })
  }
})

export default appVendedorSlice.reducer
