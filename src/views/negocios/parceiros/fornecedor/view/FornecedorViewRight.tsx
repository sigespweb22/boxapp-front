// ** React Imports
import { useState, SyntheticEvent } from 'react'

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

// ** Custom Components Imports
import FornecedorServicoTableListToView from 'src/views/negocios/parceiros/fornecedor/servico/list/FornecedorServicoTableListToView'
import FornecedorProdutoTableListToView from '../produto/list/FornecedorProdutoTableListToView'

interface Props {
  id: string | string[] | undefined
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

const FornecedorViewRight = ({ id }: Props) => {
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
        <TabPanel sx={{ p: 0 }} value='servicos'>
          <FornecedorServicoTableListToView id={id} />
        </TabPanel>
      </Box>
      <Box sx={{ mt: 6 }}>
        <TabPanel sx={{ p: 0 }} value='produtos'> 
          <FornecedorProdutoTableListToView id={id} />
        </TabPanel>
      </Box>
    </TabContext>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
FornecedorViewRight.acl = {
  action: 'read',
  subject: 'ac-fornecedor-page'
}

export default FornecedorViewRight