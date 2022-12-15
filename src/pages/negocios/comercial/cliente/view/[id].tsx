import { useRouter } from 'next/router'
import ClienteViewPage from 'src/views/negocios/comercial/cliente/view/ClienteViewPage'

const ClienteViewRoute = () => {
  const router = useRouter()
  const { id } = router.query

  return <ClienteViewPage clienteId={String(id)}/>
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ClienteViewRoute.acl = {
  action: 'read',
  subject: 'ac-cliente-page'
}

export default ClienteViewRoute