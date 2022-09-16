// ** Next Import
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { PipelineType } from 'src/types/bussiness/processos/pipeline/pipelineTypes'

// ** Demo Components Imports
import PipelineManagerPage from 'src/views/bussiness/processos/pipelines/manager/PipelineManagerPage'

const PipelineManager = ({ pipelineData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <PipelineManagerPage id='1' pipelineData={pipelineData} />
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('http://localhost:5000/pipelines/list')
  const pipelineData: PipelineType[] = res.data.allData

  return {
    props: {
      pipelineData
    }
  }
}

export default PipelineManager
