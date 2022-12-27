// ** React Imports
import { useState, useContext, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import TabPanel from '@mui/lab/TabPanel'
import TabList from '@mui/lab/TabList'
import MuiTab, { TabProps } from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'


// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import PackageVariantClosed from 'mdi-material-ui/PackageVariantClosed'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Custom Components Imports
import FornecedorServicoTableList from 'src/views/negocios/parceiros/fornecedor/servico/list/FornecedorServicoTableList'
import FornecedorProdutoTableList from 'src/views/negocios/parceiros/fornecedor/produto/list/FornecedorProdutoTableList'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

interface Props {
  id: string | undefined
}

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(3)
  }
}))

const FornecedorEditRight = ({ id }: Props) => {
  // ** Hooks
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)

  // ** State
  const [value, setValue] = useState<string>('servicos')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value='servicos' label='SERVIÇOS' icon={<CogOutline />} />
        <Tab value='produtos' label='PRODUTOS' icon={<PackageVariantClosed />} />
      </TabList>
      <Box sx={{ mt: 6 }}>
        {ability?.can('list', 'ac-fornecedor-servico-page') ? (
          <TabPanel sx={{ p: 0 }} value='servicos'>
            <FornecedorServicoTableList id={id} />
          </TabPanel>
        ) : <>{t("You do not have permission to view this resource.")}</>}  
      </Box>
      <Box sx={{ mt: 6 }}>
        {ability?.can('list', 'ac-fornecedor-produto-page') ? (
          <TabPanel sx={{ p: 0 }} value='produtos'>
            <FornecedorProdutoTableList id={id} />
          </TabPanel>
        ) : <>{t("You do not have permission to view this resource.")}</>}  
      </Box>
    </TabContext>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
FornecedorEditRight.acl = {
  action: 'update',
  subject: 'ac-fornecedor-page'
}

export default FornecedorEditRight