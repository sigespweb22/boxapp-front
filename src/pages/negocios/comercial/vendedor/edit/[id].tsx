import { useRouter } from 'next/router'
import VendedorEditPage from 'src/views/negocios/comercial/vendedor/edit/VendedorEditPage'

const VendedorEditRoute = () => {
  const router = useRouter()
  const { id } = router.query

  return <VendedorEditPage vendedorId={String(id)}/>
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
VendedorEditRoute.acl = {
  action: 'update',
  subject: 'ac-vendedor-page'
}

export default VendedorEditRoute