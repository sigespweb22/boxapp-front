import { useRouter } from 'next/router'
import EditClientePage from 'src/views/negocios/comercial/cliente/edit/EditClientePage'

const EditClientePageRoute = () => {
  const router = useRouter()
  const { id } = router.query

  return <EditClientePage id={id}/>
}

export default EditClientePageRoute