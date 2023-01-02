// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import ClienteEditLeft from 'src/views/negocios/comercial/cliente/edit/ClienteEditLeft'
import ClienteEditRight from 'src/views/negocios/comercial/cliente/edit/ClienteEditRight'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

interface Props {
  clienteId: string
}

const ClienteEditPage = ({ clienteId }: Props) => {
  // ** Hooks
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)

  if (clienteId) {
    return (
        <Grid container spacing={6}>
          {ability?.can('update', 'ac-cliente-page') ? (
            <Grid item xs={12} md={5} lg={4}>
                <ClienteEditLeft id={clienteId} />
            </Grid>
          ) : <>{t("You do not have permission to view this resource.")}</>}  
          {ability?.can('update', 'ac-cliente-page') ? (
            <Grid item xs={12} md={7} lg={8}>
              <ClienteEditRight id={clienteId} />
            </Grid>
          ) : <>{t("You do not have permission to view this resource.")}</>}              
        </Grid>
    )
  } else {
    return null
  }
}

export default ClienteEditPage