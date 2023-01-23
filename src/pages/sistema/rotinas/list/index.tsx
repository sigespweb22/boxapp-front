// ** Custom Components Imports
import RotinaList from 'src/views/sistema/rotinas/list/RotinaList'

const RotinaPage = () => {
  return <RotinaList />
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
RotinaPage.acl = {
  action: 'list',
  subject: 'ac-rotina-page'
}

export default RotinaPage