// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import clienteApiService from 'src/@api-center/negocios/comercial/cliente/clienteApiService'

// ** Types
import { ClienteType } from 'src/types/negocios/comercial/cliente/clienteTypes'

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

// ** Fetch Cliente
export const fetchData = createAsyncThunk('appCliente/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(clienteApiService.storageTokenKeyName)!
  const response = await axios
                            .get(`${clienteApiService.listOneAsync}${params.id}`, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  }
                            })

  return response.data
})

// ** Update Cliente
export const editCliente = createAsyncThunk(
  'appCliente/updateCliente',
  async (data : ClienteType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(clienteApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(clienteApiService.updateAsync, data, config).then((resp) => {
      dispatch(fetchData(getState().clienteView.data))
      
      if (resp.status === 204) return toast.success("Cliente atualizado com sucesso.")
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

const defaultValues: ClienteType = {
  id: '',
  nomeFantasia: '',
  razaoSocial: '',
  inscricaoEstadual: '',
  cnpj: '',
  telefonePrincipal: '',
  emailPrincipal: '',
  observacao: '',
  tipoPessoa:  '',
  dataFundacao: '',
  codigoMunicipio: 0,
  cpf: '',
  rua: '',
  numero: '',
  complemento: '',
  cidade: '',
  estado: '',
  cep: '',
  status: '',
  avatarColor: 'primary'
}

export const appClienteSlice = createSlice({
  name: 'appCliente',
  initialState: {
    data: defaultValues,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.cliente
      state.params = action.payload.params
    })
  }
})

export default appClienteSlice.reducer