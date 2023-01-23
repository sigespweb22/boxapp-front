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
import FileDocumentEditOutline from 'mdi-material-ui/FileDocumentEditOutline'
import PointOfSale from 'mdi-material-ui/PointOfSale'

// ** Custom Components Imports
import VendedorContratoTableListToView from 'src/views/negocios/comercial/vendedor/contrato/list/VendedorContratoTableListToView'
import VendedorComissaoTableListToView from 'src/views/negocios/comercial/vendedor/contrato/list/VendedorComissaoTableListToView'

// ** Language & Translation Utilities
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

const VendedorViewRight = ({ id }: Props) => {
  // ** State
  const { t } = useTranslation()

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
        <Tab value='comissoes' label={t("COMMISSIONS")} icon={<PointOfSale />} />
      </TabList>
      <Box sx={{ mt: 6 }}>
        <TabPanel sx={{ p: 0 }} value='contratos'>
          <VendedorContratoTableListToView id={id} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='comissoes'>
          <VendedorComissaoTableListToView id={id} />
        </TabPanel>
      </Box>
    </TabContext>
  )
}

VendedorViewRight.acl = {
  action: 'read',
  subject: 'ac-vendedor-page'
}

export default VendedorViewRight