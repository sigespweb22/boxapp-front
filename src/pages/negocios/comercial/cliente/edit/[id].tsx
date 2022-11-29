import { useRouter } from 'next/router'
import ClienteEditPage from 'src/views/negocios/comercial/cliente/edit/ClienteEditPage'

const ClienteEditRoute = () => {
  const router = useRouter()
  const { id } = router.query

  return <ClienteEditPage clienteId={String(id)}/>
}

export default ClienteEditRoute