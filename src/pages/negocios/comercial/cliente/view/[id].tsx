import { useRouter } from 'next/router'
import ClienteViewPage from 'src/views/negocios/comercial/cliente/view/ClienteViewPage'

const ClienteViewRoute = () => {
  const router = useRouter()
  const { id } = router.query

  return <ClienteViewPage clienteId={id}/>
}

export default ClienteViewRoute