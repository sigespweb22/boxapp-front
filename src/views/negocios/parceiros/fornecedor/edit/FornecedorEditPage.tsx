// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import FornecedorEditLeft from 'src/views/negocios/parceiros/fornecedor/edit/FornecedorEditLeft'
import FornecedorEditRight from 'src/views/negocios/parceiros/fornecedor/edit/FornecedorEditRight'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface Props {
  fornecedorId: string | undefined
}

const FornecedorEditPage = ({ fornecedorId }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)

  if (fornecedorId) {
    return (
        <Grid container spacing={6}>
          {ability?.can('update', 'ac-fornecedor-page') ? (
            <Grid item xs={12} md={5} lg={4}>
                <FornecedorEditLeft id={fornecedorId} />
            </Grid>
          ) : "Você não tem permissão para ver este recurso."}  
          {ability?.can('update', 'ac-fornecedor-page') ? (
            <Grid item xs={12} md={7} lg={8}>
              <FornecedorEditRight id={fornecedorId} />
            </Grid>
          ) : "Você não tem permissão para ver este recurso."}              
        </Grid>
    )
  } else {
    return null
  }
}

export default FornecedorEditPage