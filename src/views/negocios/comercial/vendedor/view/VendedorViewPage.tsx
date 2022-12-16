// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import VendedorViewLeft from 'src/views/negocios/comercial/vendedor/view/VendedorViewLeft'
import VendedorViewRight from 'src/views/negocios/comercial/vendedor/view/VendedorViewRight'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface Props {
    vendedorId: string
}

const VendedorViewPage = ({ vendedorId }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  
  if (vendedorId) {
    return (    
      <Grid container spacing={6}>
        {ability?.can('read', 'ac-vendedor-page') ? (
          <Grid item xs={12} md={5} lg={4}>
            <VendedorViewLeft id={vendedorId} />
          </Grid>
        ) : "Você não tem permissão para ver este recurso."}

        {ability?.can('read', 'ac-vendedor-page') ? (
          <Grid item xs={12} md={7} lg={8}>
            <VendedorViewRight id={vendedorId} />
          </Grid>
        ) : "Você não tem permissão para ver este recurso."}
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