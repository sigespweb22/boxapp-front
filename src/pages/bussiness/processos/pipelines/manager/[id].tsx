// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Api Services
import pipelineApiService from 'src/@api-center/pipeline/pipelineApiService'

// ** Types
import { PipelineType } from 'src/types/bussiness/processos/pipeline/pipelineTypes'

// ** Demo Components Imports
import PipelineManagerPage from 'src/views/bussiness/processos/pipelines/manager/PipelineManagerPage'

const PipelineManager = ({ id, pipelineData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <PipelineManagerPage id={id} pipelineData={pipelineData} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  debugger
  const storedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4ZTQ0NTg2NS1hMjRkLTQ1NDMtYTZjNi05NDQzZDA0OGNkYjkiLCJuYW1lIjoiYWxhbi5yZXplbmRlQGJveHRlY25vbG9naWEuY29tLmJyIiwicm9sZSI6Ik1hc3RlciIsIm5iZiI6MTY2MzU4NTI2OSwiZXhwIjoxNjY0MTkwMDY5LCJpYXQiOjE2NjM1ODUyNjl9.G1KiidYgtQfu0yg6lVss3rbIOhHB0bKTlxHgFtHkTqI"
  const res = await axios
                        .get(pipelineApiService.listAsync, {
                              headers: {
                                Authorization: "Bearer " + storedToken
                              }
                        })

  const pipelineData: PipelineType[] = await res.data.allData
  
  const paths = pipelineData.map((item: PipelineType) => ({
    params: { id: `${item.id}` }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const storedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4ZTQ0NTg2NS1hMjRkLTQ1NDMtYTZjNi05NDQzZDA0OGNkYjkiLCJuYW1lIjoiYWxhbi5yZXplbmRlQGJveHRlY25vbG9naWEuY29tLmJyIiwicm9sZSI6Ik1hc3RlciIsIm5iZiI6MTY2MzMzNTM5MSwiZXhwIjoxNjYzOTQwMTkxLCJpYXQiOjE2NjMzMzUzOTF9.sJKbryVTqnjKovJZd8o3ihEjXxYg5-fFVx0MajglOEY"
  const res = await axios
                        .get(pipelineApiService.listAsync, {
                              headers: {
                                Authorization: "Bearer " + storedToken
                              },
                              params
                        })

  const pipelineData: PipelineType[] = res.data.allData

  return {
    props: {
      pipelineData,
      id: params?.id
    }
  }
}

export default PipelineManager
