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
import FileDocumentEditOutline from 'mdi-material-ui/FileDocumentEditOutline'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Custom Components Imports
import ClienteServicoListTable from 'src/views/negocios/comercial/cliente/servico/list/ClienteServicoTableList'
import ClienteProdutoListTable from 'src/views/negocios/comercial/cliente/produto/list/ClienteProdutoTableList'
import ClienteContratoListTable from 'src/views/negocios/comercial/cliente/contrato/list/ClienteContratoTableList'

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

const ClienteEditRight = ({ id }: Props) => {
  // ** Hooks
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
        <Tab value='contratos' label='CONTRATOS' icon={<FileDocumentEditOutline />} />
      </TabList>
      <Box sx={{ mt: 6 }}>
        {ability?.can('list', 'ac-cliente-servico-page') ? (
          <TabPanel sx={{ p: 0 }} value='servicos'>
            <ClienteServicoListTable id={id} />
          </TabPanel>
        ) : "Você não tem permissão para ver este recurso."}  
      </Box>
      <Box sx={{ mt: 6 }}>
        {ability?.can('list', 'ac-cliente-produto-page') ? (
          <TabPanel sx={{ p: 0 }} value='produtos'>
            <ClienteProdutoListTable id={id} />
          </TabPanel>
        ) : "Você não tem permissão para ver este recurso."}  
      </Box>
      <Box sx={{ mt: 6 }}>
        {ability?.can('list', 'ac-cliente-contrato-page') ? (
          <TabPanel sx={{ p: 0 }} value='contratos'>
            <ClienteContratoListTable id={id} />
          </TabPanel>
        ) : "Você não tem permissão para ver este recurso."}  
      </Box>
    </TabContext>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ClienteEditRight.acl = {
  action: 'update',
  subject: 'ac-cliente-page'
}

export default ClienteEditRight