import { useRouter } from 'next/router'
import FornecedorViewPage from 'src/views/negocios/parceiros/fornecedor/view/FornecedorViewPage'

const FornecedorViewRoute = () => {
  const router = useRouter()
  const { id } = router.query

  return <FornecedorViewPage fornecedorId={id}/>
}

export default FornecedorViewRoute