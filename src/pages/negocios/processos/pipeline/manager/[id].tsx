import { useRouter } from 'next/router'
import PipelineManagerPage from 'src/views/negocios/processos/pipeline/manager/PipelineManagerPage'

const PipelineManagerRoute = () => {
  const router = useRouter()
  const { id } = router.query

  return <PipelineManagerPage id={String(id)}/>
}

export default PipelineManagerRoute