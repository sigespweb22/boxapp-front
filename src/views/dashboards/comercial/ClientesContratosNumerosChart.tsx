import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ChartTimelineVariant from 'mdi-material-ui/ChartTimelineVariant'
import AccountCheck from 'mdi-material-ui/AccountCheck'
import AccountRemove from 'mdi-material-ui/AccountRemove'

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

interface ClienteContrato {
  totalClientesSemContrato: number
  totalClientesComContrato: number
  totalClientesUltimosMeses: number
}

const clientesContratosDefaultValues: ClienteContrato = {
  totalClientesComContrato: 0,
  totalClientesSemContrato: 0,
  totalClientesUltimosMeses: 0
}

const calcularPercentualClienteComContratosEmRelacaoAoTotalClientesAtivos = (data: ClienteContrato) => {
  if (data.totalClientesSemContrato > 0 && data.totalClientesComContrato > 0)
  {
    const totalClientesAtivos: number = data.totalClientesSemContrato + data.totalClientesComContrato
    const calculo = (data.totalClientesComContrato / totalClientesAtivos) * 100
    
    return calculo

  } else return 0
}

const calcularPercentualClienteSemContratosEmRelacaoAoTotalClientesAtivos = (data: ClienteContrato) => {

  if (data.totalClientesSemContrato > 0 && data.totalClientesComContrato > 0)
  {
    const totalClientesAtivos: number = data.totalClientesSemContrato + data.totalClientesComContrato
    const calculo = (data.totalClientesSemContrato / totalClientesAtivos) * 100

    return calculo

  } else return 0
}

const ClientesContratosNumerosChart = () => {
  // ** Hook
  const { t } = useTranslation()
  const theme = useTheme()

  // ** State
  const [clientesContratos, setClientesContratos] = useState<ClienteContrato>(clientesContratosDefaultValues)
  const [percentualClienteComContratosEmRelacaoAoTotalClientesAtivos, setPercentualClienteComContratosEmRelacaoAoTotalClientesAtivos] = useState(0)
  const [percentualClienteSemContratosEmRelacaoAoTotalClientesAtivos, setPercentualClienteSemContratosEmRelacaoAoTotalClientesAtivos] = useState(0)

  const config = {
    headers: { 
      Authorization: `Bearer ${window.localStorage.getItem(dashboardApiServices.storageTokenKeyName)}`
    }
  }

  useEffect(() => {
    const response = axios.get(dashboardApiServices.clientesContratosNumerosAsync, config)
    
    response.then((response: { data: ClienteContrato }): void => {
      
      setPercentualClienteComContratosEmRelacaoAoTotalClientesAtivos(calcularPercentualClienteComContratosEmRelacaoAoTotalClientesAtivos(response.data))
      setPercentualClienteSemContratosEmRelacaoAoTotalClientesAtivos(calcularPercentualClienteSemContratosEmRelacaoAoTotalClientesAtivos(response.data))
      setClientesContratos(response.data)

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
      hexToRGBA(theme.palette.primary.main, 0.1),
      hexToRGBA(theme.palette.primary.main, 0.1),
      hexToRGBA(theme.palette.primary.main, 0.1),
      hexToRGBA(theme.palette.primary.main, 0.1),
      theme.palette.primary.main,
      hexToRGBA(theme.palette.primary.main, 0.1),
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
          <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' sx={{ mr: 4, width: 42, height: 42 }} variant='rounded' color='primary'>
                <AccountCheck sx={{ fontSize: '1.875rem', color: 'primary.main' }} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5"  sx={{ fontWeight: 600 }}>{t("Clients with contract")}(s)</Typography>
              </Box>
            </Box>
            <Typography component='p' variant='caption' sx={{ mt: 12 }}>
              {t("Total customers with active contract(s)")}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6'>
                {clientesContratos.totalClientesComContrato}
              </Typography>
              <ChartTimelineVariant sx={{ color: 'secondary.main', ml: 2, mr: 2 }} />
              <Typography variant='caption' sx={{ color: 'primary.main' }}>
                {Math.round(percentualClienteComContratosEmRelacaoAoTotalClientesAtivos)}% {t("in relation to total active customers")}
              </Typography>
            </Box>
          </Box>
          <ReactApexcharts
            type='bar'
            width={144}
            height={144}
            options={options}
            series={[{ data: [40, 60, 50, 60, 90, 40] }]}
          />
        </Box>
      </CardContent>
      <Divider />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' sx={{ mr: 4, width: 42, height: 42 }} variant='rounded' color='primary'>
                <AccountRemove sx={{ fontSize: '1.875rem', color: 'primary.main' }} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5"  sx={{ fontWeight: 600 }}>{t("Clients without a contract")}(s)</Typography>
              </Box>
            </Box>
            <Typography component='p' variant='caption' sx={{ mt: 12 }}>
              {t("Total customers without active contract(s)")}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6'>
                {clientesContratos.totalClientesSemContrato}
              </Typography>
              <ChartTimelineVariant sx={{ color: 'secondary.main', ml: 2, mr: 2 }} />
              <Typography variant='caption' sx={{ color: 'primary.main' }}>
                {Math.round(percentualClienteSemContratosEmRelacaoAoTotalClientesAtivos)}% {t("in relation to total active customers")}
              </Typography>
            </Box>
          </Box>
          <ReactApexcharts
            type='bar'
            width={144}
            height={144}
            options={options}
            series={[{ data: [40, 60, 50, 60, 90, 40] }]}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ClientesContratosNumerosChart.acl = {
  action: 'read',
  subject: 'ac-dashboardComercial-page'
}

export default ClientesContratosNumerosChart
