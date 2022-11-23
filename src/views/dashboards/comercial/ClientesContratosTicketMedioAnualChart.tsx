import { SetStateAction, useEffect, useState, useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// ** Icons Imports
import ChartTimelineVariant from 'mdi-material-ui/ChartTimelineVariant'
import Cash from 'mdi-material-ui/Cash'
import FormatAlignMiddle from 'mdi-material-ui/FormatAlignMiddle'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Importss
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Import Api services
import dashboardApiServices from 'src/@api-center/dashboards/comercial/dashboardComercialApiService'

// ** Import Axios
import axios from 'axios'

// ** Toast
import toast from 'react-hot-toast'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import Divider from '@mui/material/Divider'

interface ClienteContratoValor {
  totalEmReaisTodosOsContratos: number
  totalEmReaisContratosMensais: number
  totalEmReaisContratosAnuais: number
}

const clientesContratosValoresDefaultValues: ClienteContratoValor = {
  totalEmReaisTodosOsContratos: 0,
  totalEmReaisContratosMensais: 0,
  totalEmReaisContratosAnuais: 0
}

const calcularPercentualValorMensalEmRelacaoAoValorTotal = (data: ClienteContratoValor) => {
  if (data.totalEmReaisContratosMensais > 0 && data.totalEmReaisTodosOsContratos > 0) {
    const calculo = (data.totalEmReaisContratosMensais / data.totalEmReaisTodosOsContratos) * 100
    return calculo
  } else return 0
}

const calcularPercentualValorAnualEmRelacaoAoValorTotal = (data: ClienteContratoValor) => {
  if (data.totalEmReaisContratosAnuais > 0 && data.totalEmReaisTodosOsContratos > 0) {
    const calculo = (data.totalEmReaisContratosAnuais / data.totalEmReaisTodosOsContratos) * 100
    return calculo
  } else return 0
}

const formatToCurrency = (value: number) => {
  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

const ClientesContratosTicketMedioAnualChart = () => {
  // ** Hook
  const theme = useTheme()
  const ability = useContext(AbilityContext)

  // ** State
  const [clientesContratosValores, setClientesContratosValores] = useState<ClienteContratoValor>(
    clientesContratosValoresDefaultValues
  )
  const [percentualValorMensalEmRelacaoAoValorTotal, setPercentualValorMensalEmRelacaoAoValorTotal] = useState(0)
  const [percentualValorAnualEmRelacaoAoValorTotal, setPercentualValorAnualEmRelacaoAoValorTotal] = useState(0)

  const accessToken = window.localStorage.getItem(dashboardApiServices.storageTokenKeyName)
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  useEffect(() => {
    const response = axios.get(dashboardApiServices.clientesContratosValoresAsync, config)

    response
      .then((response: { data: ClienteContratoValor }): void => {
        setPercentualValorMensalEmRelacaoAoValorTotal(calcularPercentualValorMensalEmRelacaoAoValorTotal(response.data))
        setPercentualValorAnualEmRelacaoAoValorTotal(calcularPercentualValorAnualEmRelacaoAoValorTotal(response.data))
        setClientesContratosValores(response.data)
      })
      .catch((error: { response: { data: { errors: { [s: string]: unknown } | ArrayLike<unknown> } } }): void => {
        const returnObj = Object.entries(error.response.data.errors)
        returnObj.forEach((err: any) => {
          toast.error(err)
        })
      })
  }, [])

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    grid: {
      show: false,
      padding: {
        top: -5,
        left: -10,
        right: -7,
        bottom: -12
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        columnWidth: '60%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: [
      hexToRGBA(theme.palette.success.main, 0.1),
      theme.palette.success.main,
      hexToRGBA(theme.palette.success.main, 0.1),
      hexToRGBA(theme.palette.success.main, 0.1),
      hexToRGBA(theme.palette.success.main, 0.1),
      hexToRGBA(theme.palette.success.main, 0.1)
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      tickPlacement: 'OF',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['S', 'M', 'T', 'W', 'T', 'F']
    },
    yaxis: { show: false }
  }

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
                    <Typography variant='h5' sx={{ fontWeight: 600 }}>
                      Ticket Médio (R$) | Anual
                    </Typography>
                  </Box>
                  <CustomAvatar skin='light' sx={{ mr: 4, width: 42, height: 42 }} variant='rounded' color='error'>
                    <FormatAlignMiddle sx={{ fontSize: '1.875rem', color: 'error.main' }} />
                  </CustomAvatar>
                </Box>
                <Typography component='p' variant='caption' sx={{ mt: 12 }}>
                  Valor total dos contratos mensais ativos - em real -
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='h6'>
                    {formatToCurrency(clientesContratosValores.totalEmReaisContratosMensais)}
                  </Typography>
                  <ChartTimelineVariant sx={{ color: 'error.main', ml: 2, mr: 2 }} />
                  <Typography variant='caption' sx={{ color: 'error.main' }}>
                    {Math.round(percentualValorMensalEmRelacaoAoValorTotal)}% em relação ao total dos contratos
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
