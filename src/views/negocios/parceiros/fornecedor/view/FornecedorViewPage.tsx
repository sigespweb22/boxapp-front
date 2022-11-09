// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import FornecedorViewLeft from 'src/views/negocios/parceiros/fornecedor/view/FornecedorViewLeft'
import FornecedorViewRight from 'src/views/negocios/parceiros/fornecedor/view/FornecedorViewRight'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface Props {
    fornecedorId: string | string [] | undefined
}

const FornecedorViewPage = ({ fornecedorId }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  
  if (fornecedorId) {
    return (    
      <Grid container spacing={6}>
        {ability?.can('read', 'ac-cliente-page') ? (
          <Grid item xs={12} md={5} lg={4}>
            <FornecedorViewLeft id={fornecedorId} />
          </Grid>
        ) : "Você não tem permissão para ver este recurso."}

        {ability?.can('read', 'ac-cliente-page') ? (
          <Grid item xs={12} md={7} lg={8}>
            <FornecedorViewRight id={fornecedorId} />
          </Grid>
        ) : "Você não tem permissão para ver este recurso."}
      </Grid>
    )
  } else {
    return null
  }
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
FornecedorViewPage.acl = {
  action: 'read',
  subject: 'ac-fornecedor-page'
}

export default FornecedorViewPage