import { useRouter } from 'next/router'
import ClienteEdit from 'src/pages/negocios/comercial/cliente/edit'

const ClienteEditRoute = () => {
  const router = useRouter()
  const { id } = router.query

  return <ClienteEdit id={id}/>
}

export default ClienteEditRoute