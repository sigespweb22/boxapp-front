// ** Next Import
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { PipelineType } from 'src/types/bussiness/processos/pipeline/pipelineTypes'

// ** Demo Components Imports
import PipelineManagerPage from 'src/views/bussiness/processos/pipelines/manager/PipelineManagerPage'

// ** Api Services
import pipelineApiService from 'src/@api-center/pipeline/pipelineApiService'

const PipelineManager = ({ id, pipelineData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  debugger
  return <PipelineManagerPage id={id} pipelineData={pipelineData} />
}

export const getStaticProps: GetStaticProps = async () => {
  debugger
  const storedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4ZTQ0NTg2NS1hMjRkLTQ1NDMtYTZjNi05NDQzZDA0OGNkYjkiLCJuYW1lIjoiYWxhbi5yZXplbmRlQGJveHRlY25vbG9naWEuY29tLmJyIiwicm9sZSI6Ik1hc3RlciIsIm5iZiI6MTY2MzU4NTI2OSwiZXhwIjoxNjY0MTkwMDY5LCJpYXQiOjE2NjM1ODUyNjl9.G1KiidYgtQfu0yg6lVss3rbIOhHB0bKTlxHgFtHkTqI"
  const res = await axios
                        .get(pipelineApiService.listAsync, {
                              headers: {
                                Authorization: "Bearer " + storedToken
                              }
                        })
  const pipelineData: PipelineType[] = res.data.allData

  return {
    props: {
      pipelineData
    }
  }
}

export default PipelineManager
