import { useRouter } from 'next/router'
import UsuarioPerfilPage from 'src/views/sistema/controle-acesso/usuario/perfil/UsuarioPerfilPage'

const UsuarioPerfilRoute = () => {
  const router = useRouter()
  const { id } = router.query

  return <UsuarioPerfilPage id={String(id)}/>
}

UsuarioPerfilRoute.acl = {
  action: 'read',
  subject: 'ac-user-page'
}

export default UsuarioPerfilRoute