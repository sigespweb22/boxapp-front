import { useRouter } from 'next/router'
import PipelineManagerPage from 'src/views/bussiness/processos/pipelines/manager/PipelineManagerPage'

const PipelineManagerRoute = () => {
  const router = useRouter()
  const { id } = router.query

  return <PipelineManagerPage id={id}/>
}

export default PipelineManagerRoute