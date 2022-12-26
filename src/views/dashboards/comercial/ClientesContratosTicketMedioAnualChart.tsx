import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// ** Icons Imports
import FormatAlignMiddle from 'mdi-material-ui/FormatAlignMiddle'

// ** Custom Components Importss
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Import Api services
import dashboardApiServices from 'src/@api-center/dashboards/comercial/dashboardComercialApiService'

// ** Import Axios
import axios from 'axios'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// ** Context Imports
import Divider from '@mui/material/Divider'

// Import Translate
import { useTranslation } from 'react-i18next'

interface ClienteContratoTicketMedio {
  valorTicketMedioMensal: number
  valorTicketMedioAnual: number
}

const clientesContratosTicketMedioDefaultValues: ClienteContratoTicketMedio = {
  valorTicketMedioMensal: 0,
  valorTicketMedioAnual: 0,
}

const formatToCurrency = (value: number) => {
  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

const ClientesContratosTicketMedioAnualChart = () => {
  // ** State
  const { t } = useTranslation()
  const [clientesContratosTicketMedio, setClientesContratosTicketMedio] = useState<ClienteContratoTicketMedio>(clientesContratosTicketMedioDefaultValues)

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(dashboardApiServices.storageTokenKeyName)}`
    }
  }

  useEffect(() => {
    const response = axios.get(dashboardApiServices.clientesContratosTicketMedioAsync, config)
    
    response.then((response: { data: ClienteContratoTicketMedio }): void => {
      setClientesContratosTicketMedio(response.data)
    }).catch((error: { response: { data: { errors: { [s: string]: unknown } | ArrayLike<unknown> } } }): void => {
      const returnObj = Object.entries(error.response.data.errors);
      returnObj.forEach((err: any) => {
        toast.error(err[1].toString())
      })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card>
      <Divider />
      <Grid container spacing={12}>
        <Grid item xs={12} md={12} lg={12} sx={{ order: 0 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ mr: 0, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' sx={{ mr: 4, width: 42, height: 42 }} variant='rounded' color='error'>
                    <FormatAlignMiddle sx={{ fontSize: '1.875rem', color: 'error.main' }} />
                  </CustomAvatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column', mr: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>{t("Average ticket")} (R$) | {t("Annual")}</Typography>
                  </Box>
                  <CustomAvatar skin='light' sx={{ mr: 4, width: 42, height: 42 }} variant='rounded' color='error'>
                    <FormatAlignMiddle sx={{ fontSize: '1.875rem', color: 'error.main' }} />
                  </CustomAvatar>
                </Box>
                <Typography component='p' variant='caption' sx={{ mt: 12 }}>
                  {t("Average ticket value")} | {t("Contracts Annual Periodicity")} |
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='h6'>
                    {formatToCurrency(clientesContratosTicketMedio.valorTicketMedioAnual)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Grid>
        <Divider />
      </Grid>
      <Divider />
    </Card>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ClientesContratosTicketMedioAnualChart.acl = {
  action: 'read',
  subject: 'ac-dashboardComercial-page'
}

export default ClientesContratosTicketMedioAnualChart
