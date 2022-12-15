import { useRouter } from 'next/router'
import ClienteEditPage from 'src/views/negocios/comercial/cliente/edit/ClienteEditPage'

const ClienteEditRoute = () => {
  const router = useRouter()
  const { id } = router.query

  return <ClienteEditPage clienteId={String(id)}/>
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ClienteEditRoute.acl = {
  action: 'update',
  subject: 'ac-cliente-page'
}

export default ClienteEditRoute