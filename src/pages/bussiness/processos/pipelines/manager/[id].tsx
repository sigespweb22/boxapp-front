// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { PipelineType } from 'src/types/bussiness/processos/pipeline/pipelineTypes'

// ** Demo Components Imports
import PipelineManagerPage from 'src/views/bussiness/processos/pipelines/manager/PipelineManagerPage'

const PipelineManager = ({ id, pipelineData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <PipelineManagerPage id={id} pipelineData={pipelineData} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get('http://localhost:5000/pipelines/list')
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
  const res = await axios.get(`http://localhost:5000/pipelines/list/${params}`)
  const pipelineData: PipelineType[] = res.data.allData

  return {
    props: {
      pipelineData,
      id: params?.id
    }
  }
}

export default PipelineManager
