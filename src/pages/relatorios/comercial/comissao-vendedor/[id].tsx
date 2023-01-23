import { useRouter } from 'next/router'
import RelatorioComissao from 'src/views/relatorios/comercial/comissao-vendedor/RelatorioComissao'

const RelatorioComissaoRoute = () => {
  const router = useRouter()
  const { id } = router.query

  return <RelatorioComissao id={String(id)}/>
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
RelatorioComissaoRoute.acl = {
  action: 'read',
  subject: 'ac-relatorio-comissao-page'
}

export default RelatorioComissaoRoute