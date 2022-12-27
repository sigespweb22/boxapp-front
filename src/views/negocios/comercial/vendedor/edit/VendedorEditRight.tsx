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
// import CogOutline from 'mdi-material-ui/CogOutline'
// import PackageVariantClosed from 'mdi-material-ui/PackageVariantClosed'
import FileDocumentEditOutline from 'mdi-material-ui/FileDocumentEditOutline'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Custom Components Imports
import VendedorContratoListTable from 'src/views/negocios/comercial/vendedor/contrato/list/VendedorContratoTableList'

// ** Third Party Import
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

const VendedorEditRight = ({ id }: Props) => {
  // ** Hooks
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)

  // ** State
  const [value, setValue] = useState<string>('contratos')

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
        <Tab value='contratos' label={t("CONTRACTS")} icon={<FileDocumentEditOutline />} />
      </TabList>
      <Box sx={{ mt: 6 }}>
        {ability?.can('list', 'ac-vendedorContrato-page') ? (
          <TabPanel sx={{ p: 0 }} value='contratos'>
            <VendedorContratoListTable id={id} />
          </TabPanel>
        ) : <>{t("You do not have permission to view this resource.")}</>}  
      </Box>
    </TabContext>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
VendedorEditRight.acl = {
  action: 'update',
  subject: 'ac-vendedor-page'
}

export default VendedorEditRight