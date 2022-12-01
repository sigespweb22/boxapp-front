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
import toast from 'react-hot-toast'

// ** Context Imports
import Divider from '@mui/material/Divider'

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
        toast.error(err)
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
                  <CustomAvatar skin='light' sx={{ mr: 4, width: 42, height: 42 }} variant='rounded' color='secondary'>
                    <FormatAlignMiddle sx={{ fontSize: '1.875rem', color: 'secondary.main' }} />
                  </CustomAvatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column', mr: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>Ticket Médio (R$) | Global</Typography>
                  </Box>
                  <CustomAvatar skin='light' sx={{ mr: 4, width: 42, height: 42 }} variant='rounded' color='secondary'>
                    <FormatAlignMiddle sx={{ fontSize: '1.875rem', color: 'secondary.main' }} />
                  </CustomAvatar>
                </Box>
                <Typography component='p' variant='caption' sx={{ mt: 12 }}>
                  Valor do ticket | Todos os contratos |
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='h6'>
                    {formatToCurrency(clientesContratosTicketMedio.valorTicketMedioMensal + clientesContratosTicketMedio.valorTicketMedioAnual)}
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
  subject: 'ac-dashboard-comercial-page'
}

export default ClientesContratosTicketMedioAnualChart
