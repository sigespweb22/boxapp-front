// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import ClienteEditLeft from 'src/views/negocios/comercial/cliente/edit/ClienteEditLeft'
import ClienteEditRight from 'src/views/negocios/comercial/cliente/edit/ClienteEditRight'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface Props {
  clienteId: string
}

const ClienteEditPage = ({ clienteId }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)

  if (clienteId) {
    return (
        <Grid container spacing={6}>
          {ability?.can('update', 'ac-cliente-page') ? (
            <Grid item xs={12} md={5} lg={4}>
                <ClienteEditLeft id={clienteId} />
            </Grid>
          ) : "Você não tem permissão para ver este recurso."}  
          {ability?.can('update', 'ac-cliente-page') ? (
            <Grid item xs={12} md={7} lg={8}>
              <ClienteEditRight id={clienteId} />
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
ClienteEditPage.acl = {
  action: 'update',
  subject: 'ac-cliente-page'
}

export default ClienteEditPage