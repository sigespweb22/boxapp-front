// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import fornecedorApiService from 'src/@api-center/negocios/parceiros/fornecedor/fornecedorApiService'

// ** Types
import { FornecedorType } from 'src/types/negocios/parceiros/fornecedor/fornecedorTypes'

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

// ** Fetch Fornecedor
export const fetchData = createAsyncThunk('appFornecedor/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(fornecedorApiService.storageTokenKeyName)!
  const response = await axios
                            .get(`${fornecedorApiService.listOneAsync}${params.id}`, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  }
                            })

  return response.data
})

// ** Update Fornecedor
export const editFornecedor = createAsyncThunk(
  'appFornecedor/editCliente',
  async (data : FornecedorType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(fornecedorApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    const data2 = {
      id: data.id,
      nomeFantasia: data.nomeFantasia,
      razaoSocial: data.razaoSocial,
      inscricaoEstadual: data.inscricaoEstadual,
      cnpj: data.cnpj,
      telefonePrincipal: data.telefonePrincipal,
      emailPrincipal: data.emailPrincipal,
      observacao: data.observacao,
      codigoMunicipio: data.codigoMunicipio,
      rua: data.rua,
      numero: data.numero,
      complemento: data.complemento,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
      status: data.status
    }

    axios.put(fornecedorApiService.updateAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().fornecedorView.data))
      
      if (resp.status === 204) return toast.success("Fornecedor atualizado com sucesso.")
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

const defaultValues: FornecedorType = {
  id: '',
  nomeFantasia: '',
  razaoSocial: '',
  inscricaoEstadual: '',
  cnpj: '',
  telefonePrincipal: '',
  emailPrincipal: '',
  observacao: '',
  codigoMunicipio: 0,
  rua: '',
  numero: '',
  complemento: '',
  cidade: '',
  estado: '',
  cep: '',
  status: '',
  fornecedorServicos: {id: '', nome: ''},
  avatarColor: 'primary'
}

export const appFornecedorSlice = createSlice({
  name: 'appFornecedor',
  initialState: {
    data: defaultValues,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.fornecedor
      state.params = action.payload.params
    })
  }
})

export default appFornecedorSlice.reducer