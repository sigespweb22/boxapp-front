import { useRouter } from 'next/router'
import VendedorViewPage from 'src/views/negocios/comercial/vendedor/view/VendedorViewPage'

const VendedorViewRoute = () => {
  const router = useRouter()
  const { id } = router.query

  return <VendedorViewPage vendedorId={String(id)}/>
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
VendedorViewRoute.acl = {
  action: 'read',
  subject: 'ac-vendedor-page'
}

export default VendedorViewRoute