import { useRouter } from 'next/router'
import UsuarioPerfilPage from 'src/views/sistema/controle-acesso/usuario/profile/UsuarioPerfilPage'

const UsuarioPerfilRoute = () => {
  const router = useRouter()
  const { id } = router.query

  debugger

  return <UsuarioPerfilPage id={String(id)}/>
}

export default UsuarioPerfilRoute