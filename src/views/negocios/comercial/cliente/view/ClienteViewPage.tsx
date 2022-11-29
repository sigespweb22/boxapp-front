// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import ClienteViewLeft from 'src/views/negocios/comercial/cliente/view/ClienteViewLeft'
import ClienteViewRight from 'src/views/negocios/comercial/cliente/view/ClienteViewRight'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface Props {
    clienteId: string
}

const ClienteViewPage = ({ clienteId }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  
  if (clienteId) {
    return (    
      <Grid container spacing={6}>
        {ability?.can('read', 'ac-cliente-page') ? (
          <Grid item xs={12} md={5} lg={4}>
            <ClienteViewLeft id={clienteId} />
          </Grid>
        ) : "Você não tem permissão para ver este recurso."}

        {ability?.can('read', 'ac-cliente-page') ? (
          <Grid item xs={12} md={7} lg={8}>
            <ClienteViewRight id={clienteId} />
          </Grid>
        ) : "Você não tem permissão para ver este recurso."}
      </Grid>
    )
  } else {
    return null
  }
}

ClienteViewPage.acl = {
  action: 'read',
  subject: 'ac-cliente-page'
}

export default ClienteViewPage