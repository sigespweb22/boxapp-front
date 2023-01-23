// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import FornecedorEditLeft from 'src/views/negocios/parceiros/fornecedor/edit/FornecedorEditLeft'
import FornecedorEditRight from 'src/views/negocios/parceiros/fornecedor/edit/FornecedorEditRight'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Third Party Import
import { useTranslation } from 'react-i18next'


interface Props {
  fornecedorId: string | undefined
}

const FornecedorEditPage = ({ fornecedorId }: Props) => {
  // ** Hooks
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)

  if (fornecedorId) {
    return (
        <Grid container spacing={6}>
          {ability?.can('update', 'ac-fornecedor-page') ? (
            <Grid item xs={12} md={5} lg={4}>
                <FornecedorEditLeft id={fornecedorId} />
            </Grid>
          ) : <>{t("You do not have permission to view this resource.")}</>}  
          {ability?.can('update', 'ac-fornecedor-page') ? (
            <Grid item xs={12} md={7} lg={8}>
              <FornecedorEditRight id={fornecedorId} />
            </Grid>
          ) : <>{t("You do not have permission to view this resource.")}</>}              
        </Grid>
    )
  } else {
    return null
  }
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
FornecedorEditPage.acl = {
  action: 'update',
  subject: 'ac-fornecedor-page'
}

export default FornecedorEditPage