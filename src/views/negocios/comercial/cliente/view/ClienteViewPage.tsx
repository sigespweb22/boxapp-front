// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import ClienteViewLeft from 'src/views/negocios/comercial/cliente/view/ClienteViewLeft'
import ClienteViewRight from 'src/views/negocios/comercial/cliente/view/ClienteViewRight'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

interface Props {
    clienteId: string
}

const ClienteViewPage = ({ clienteId }: Props) => {
  // ** Hooks
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)
  
  if (clienteId) {
    return (    
      <Grid container spacing={6}>
        {ability?.can('read', 'ac-cliente-page') ? (
          <Grid item xs={12} md={5} lg={4}>
            <ClienteViewLeft id={clienteId} />
          </Grid>
        ) : <>{t("You do not have permission to view this resource.")}</>}

        {ability?.can('read', 'ac-cliente-page') ? (
          <Grid item xs={12} md={7} lg={8}>
            <ClienteViewRight id={clienteId} />
          </Grid>
        ) : <>{t("You do not have permission to view this resource.")}</>}
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