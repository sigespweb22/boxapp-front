// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import UsuarioPerfilConta from 'src/views/sistema/controle-acesso/usuario/perfil/UsuarioPerfilConta'
import UsuarioPerfilSeguranca from 'src/views/sistema/controle-acesso/usuario/perfil/UsuarioPerfilSeguranca'
import UsuarioPerfilInfo from 'src/views/sistema/controle-acesso/usuario/perfil/UsuarioPerfilInfo'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// Import Translate
import { useTranslation } from 'react-i18next'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName: any = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

interface Props {
  id: string | undefined
}

const UsuarioPerfilPage = (props: Props) => {
  // ** State
  const { t } = useTranslation()
  const [value, setValue] = useState<string>('conta')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='conta'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>{t("Account")}</TabName>
              </Box>
            }
          />
          <Tab
            value='seguracao'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>{t("Security")}</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>{t("Personal information")}</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value='conta'>
          <UsuarioPerfilConta id={props.id} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='seguracao'>
          <UsuarioPerfilSeguranca id={props.id} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <UsuarioPerfilInfo id={props.id} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

UsuarioPerfilPage.acl = {
  action: 'update',
  subject: 'ac-user-page'
}


export default UsuarioPerfilPage
