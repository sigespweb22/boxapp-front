import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ChartTimelineVariant from 'mdi-material-ui/ChartTimelineVariant'
import Cash from 'mdi-material-ui/Cash'
import CashMultiple from 'mdi-material-ui/CashMultiple'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Importss
import CustomAvatar from 'src/@core/components/mui/avatar'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

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
  if (data.totalEmReaisContratosMensais > 0 && data.totalEmReaisTodosOsContratos > 0)
  {
    const calculo = (data.totalEmReaisContratosMensais / data.totalEmReaisTodosOsContratos) * 100

    return calculo

  } else return 0
}

const calcularPercentualValorAnualEmRelacaoAoValorTotal = (data: ClienteContratoValor) => {
  if (data.totalEmReaisContratosAnuais > 0 && data.totalEmReaisTodosOsContratos > 0)
  {
    const calculo = (data.totalEmReaisContratosAnuais / data.totalEmReaisTodosOsContratos) * 100

    return calculo

  } else return 0
}

const formatToCurrency = (value: number) => {
  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

const ClientesContratosValoresChart = () => {
  // ** Hook
  const theme = useTheme()
  const { t } = useTranslation()

  // ** State
  const [clientesContratosValores, setClientesContratosValores] = useState<ClienteContratoValor>(clientesContratosValoresDefaultValues)
  const [percentualValorMensalEmRelacaoAoValorTotal, setPercentualValorMensalEmRelacaoAoValorTotal] = useState(0)
  const [percentualValorAnualEmRelacaoAoValorTotal, setPercentualValorAnualEmRelacaoAoValorTotal] = useState(0)

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(dashboardApiServices.storageTokenKeyName)}`
    }
  }

  useEffect(() => {
    const response = axios.get(dashboardApiServices.clientesContratosValoresAsync, config)
    
    response.then((response: { data: ClienteContratoValor }): void => {
      setPercentualValorMensalEmRelacaoAoValorTotal(calcularPercentualValorMensalEmRelacaoAoValorTotal(response.data))
      setPercentualValorAnualEmRelacaoAoValorTotal(calcularPercentualValorAnualEmRelacaoAoValorTotal(response.data))
      setClientesContratosValores(response.data)
    }).catch((error: { response: { data: { errors: { [s: string]: unknown } | ArrayLike<unknown> } } }): void => {
      const returnObj = Object.entries(error.response.data.errors);
      returnObj.forEach((err: any) => {
        toast.error(err[1].toString())
      })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      hexToRGBA(theme.palette.success.main, 0.1),
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
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <ReactApexcharts
            type='bar'
            width={144}
            height={144}
            options={options}
            series={[{ data: [40, 90, 50, 60, 40, 40] }]}
          />
          <Box sx={{ mr: 0, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' sx={{ mr: 4, width: 42, height: 42 }} variant='rounded' color='success'>
                <Cash sx={{ fontSize: '1.875rem', color: 'success.main' }} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{t("Monthly contracts")} (R$)</Typography>
              </Box>
            </Box>
            <Typography component='p' variant='caption' sx={{ mt: 12 }}>
              {t("Total value of active monthly contracts")} - {t("in real")} - 
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6'>
                {formatToCurrency(clientesContratosValores.totalEmReaisContratosMensais)}
              </Typography>
              <ChartTimelineVariant sx={{ color: 'secondary.main', ml: 2, mr: 2 }} />
              <Typography variant='caption' sx={{ color: 'success.main' }}>
                {Math.round(percentualValorMensalEmRelacaoAoValorTotal)}% {t("in relation to the total number of contracts")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
      <Divider />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <ReactApexcharts
            type='bar'
            width={144}
            height={144}
            options={options}
            series={[{ data: [40, 90, 50, 60, 40, 40] }]}
          />
          <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' sx={{ mr: 4, width: 42, height: 42 }} variant='rounded' color='success'>
                <CashMultiple sx={{ fontSize: '1.875rem', color: 'success.main' }} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5"  sx={{ fontWeight: 600 }}>{t("Annual contracts")} (R$)</Typography>
              </Box>
            </Box>
            <Typography component='p' variant='caption' sx={{ mt: 12 }}>
              {t("Total value of active annual contracts")} - {t("in real")} - 
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6'>
                {formatToCurrency(clientesContratosValores.totalEmReaisContratosAnuais)}
              </Typography>
              <ChartTimelineVariant sx={{ color: 'secondary.main', ml: 2, mr: 2 }} />
              <Typography variant='caption' sx={{ color: 'success.main' }}>
                {Math.round(percentualValorAnualEmRelacaoAoValorTotal)}% {t("in relation to the total number of contracts")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ClientesContratosValoresChart.acl = {
  action: 'read',
  subject: 'ac-dashboardComercial-page'
}

export default ClientesContratosValoresChart
