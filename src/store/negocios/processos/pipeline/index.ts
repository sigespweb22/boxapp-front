// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import pipelineApiService from 'src/@api-center/negocios/processos/pipeline/pipelineApiService'

// ** Types
import { PipelineType } from 'src/types/negocios/processos/pipeline/pipelineTypes'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Pipelines
export const fetchData = createAsyncThunk('appPipelines/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(pipelineApiService.storageTokenKeyName)!
  const response = await axios
                            .get(pipelineApiService.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })

  return response.data
})

// ** Add Pipeline
export const addPipeline = createAsyncThunk(
  'appPipelines/addPipeline',
  async (data: PipelineType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(pipelineApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    const data2 = {
      nome: data.nome,
      posicao: data.posicao,
      pipelineAssinantes: data.pipelineAssinantes
    }

    axios.post(pipelineApiService.addAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().pipeline.params))
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message)
      if (resp.status === 201) return toast.success("Pipeline criado com sucesso.")
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
          const returnObj = Object.entries(resp.response.data.errors);
          returnObj.forEach((err: any) => {
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

// ** Update Pipeline
export const editPipeline = createAsyncThunk(
  'appPipelines/updatePipeline',
  async (data : PipelineType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(pipelineApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    const data2 = {
      id: data.id,
      posicao: data.posicao,
      nome: data.nome,
      pipelineAssinantes: data.pipelineAssinantes
    }

    axios.put(pipelineApiService.updateAsync, data2, config).then((resp) => {
      dispatch(fetchData(getState().pipeline.params))
      if (resp.status === 204) return toast.success("Pipeline atualizado com sucesso.")
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

// ** Delete Pipeline
export const deletePipeline = createAsyncThunk(
  'appPipelines/deletePipeline',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(pipelineApiService.storageTokenKeyName)!
    
    const headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(pipelineApiService.deleteAsync+id, { headers }).then((resp) => {
      dispatch(fetchData(getState().pipeline.params))
      if (resp.status === 204) return toast.success("Pipeline deletado com sucesso.")
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

export const appPipelinesSlice = createSlice({
  name: 'appPipelines',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.pipelines
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appPipelinesSlice.reducer