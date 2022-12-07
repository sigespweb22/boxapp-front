import { useRouter } from 'next/router'
import FornecedorEditPage from 'src/views/negocios/parceiros/fornecedor/edit/FornecedorEditPage'

const FornecedorEditRoute = () => {
  const router = useRouter()
  const { id } = router.query

  return <FornecedorEditPage fornecedorId={String(id)}/>
}

export default FornecedorEditRoute