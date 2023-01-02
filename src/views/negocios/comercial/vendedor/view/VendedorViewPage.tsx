// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import VendedorViewLeft from 'src/views/negocios/comercial/vendedor/view/VendedorViewLeft'
import VendedorViewRight from 'src/views/negocios/comercial/vendedor/view/VendedorViewRight'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

interface Props {
    vendedorId: string
}

const VendedorViewPage = ({ vendedorId }: Props) => {
  // ** Hooks
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)
  
  if (vendedorId) {
    return (    
      <Grid container spacing={6}>
        {ability?.can('read', 'ac-vendedor-page') ? (
          <Grid item xs={12} md={5} lg={4}>
            <VendedorViewLeft id={vendedorId} />
          </Grid>
        ) : <>{t("You do not have permission to view this resource.")}</>}

        {ability?.can('read', 'ac-vendedor-page') ? (
          <Grid item xs={12} md={7} lg={8}>
            <VendedorViewRight id={vendedorId} />
          </Grid>
        ) : <>{t("You do not have permission to view this resource.")}</>}
      </Grid>
    )
  } else {
    return null
  }
}

VendedorViewPage.acl = {
  action: 'read',
  subject: 'ac-vendedor-page'
}

export default VendedorViewPage