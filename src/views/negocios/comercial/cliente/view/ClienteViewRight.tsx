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
// import CogOutline from 'mdi-material-ui/CogOutline'
// import PackageVariantClosed from 'mdi-material-ui/PackageVariantClosed'
import FileDocumentEditOutline from 'mdi-material-ui/FileDocumentEditOutline'


// ** Custom Components Imports
// import ClienteServicoTableListToView from 'src/views/negocios/comercial/cliente/servico/list/ClienteServicoTableListToView'
// import ClienteProdutoTableListToView from 'src/views/negocios/comercial/cliente/produto/list/ClienteProdutoTableListToView'
import ClienteContratoTableListToView from 'src/views/negocios/comercial/cliente/contrato/list/ClienteContratoTableListToView'
import { useTranslation } from 'react-i18next'

interface Props {
  id: string
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

const ClienteViewRight = ({ id }: Props) => {
  // ** State
  const [value, setValue] = useState<string>('contratos')
  const { t } = useTranslation()

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
        {/* <Tab value='servicos' label='SERVIÇOS' icon={<CogOutline />} />
        <Tab value='produtos' label='PRODUTOS' icon={<PackageVariantClosed />} /> */}
        <Tab value='contratos' label={t('CONTRACTS')} icon={<FileDocumentEditOutline />} />v
      </TabList>
      {/* <Box sx={{ mt: 6 }}>
        <TabPanel sx={{ p: 0 }} value='servicos'>
          <ClienteServicoTableListToView id={id} />
        </TabPanel>
      </Box>
      <Box sx={{ mt: 6 }}>
        <TabPanel sx={{ p: 0 }} value='produtos'>
          <ClienteProdutoTableListToView id={id} />
        </TabPanel>
      </Box> */}
      <Box sx={{ mt: 6 }}>
        <TabPanel sx={{ p: 0 }} value='contratos'>
          <ClienteContratoTableListToView id={id} />
        </TabPanel>
      </Box>
    </TabContext>
  )
}

ClienteViewRight.acl = {
  action: 'read',
  subject: 'ac-cliente-page'
}

export default ClienteViewRight