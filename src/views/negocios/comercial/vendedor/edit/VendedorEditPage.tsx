// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import VendedorEditLeft from 'src/views/negocios/comercial/vendedor/edit/VendedorEditLeft'
import VendedorEditRight from 'src/views/negocios/comercial/vendedor/edit/VendedorEditRight'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

interface Props {
  vendedorId: string
}

const VendedorEditPage = ({ vendedorId }: Props) => {
  // ** Hooks
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)

  if (vendedorId) {
    return (
        <Grid container spacing={6}>
          {ability?.can('update', 'ac-vendedor-page') ? (
            <Grid item xs={12} md={5} lg={4}>
                <VendedorEditLeft id={vendedorId} />
            </Grid>
          ) : <>{t("You do not have permission to view this resource.")}</>}  
          {ability?.can('update', 'ac-cliente-page') ? (
            <Grid item xs={12} md={7} lg={8}>
              <VendedorEditRight id={vendedorId} />
            </Grid>
          ) : <>{t("You do not have permission to view this resource.")}</>}              
        </Grid>
    )
  } else {
    return null
  }
}

export default VendedorEditPage