import { SetStateAction, useEffect, useState, useContext } from 'react'

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
import toast from 'react-hot-toast'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import Divider from '@mui/material/Divider'

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

const ClientesContratosValoresChart = () => {
  // ** Hook
  const theme = useTheme()
  const ability = useContext(AbilityContext)

  // ** State
  const [clientesContratos, setClientesContratos] = useState<ClienteContrato>(clientesContratosDefaultValues)
  const [percentualClienteComContratosEmRelacaoAoTotalClientesAtivos, setPercentualClienteComContratosEmRelacaoAoTotalClientesAtivos] = useState(0)
  const [percentualClienteSemContratosEmRelacaoAoTotalClientesAtivos, setPercentualClienteSemContratosEmRelacaoAoTotalClientesAtivos] = useState(0)

  const accessToken = window.localStorage.getItem(dashboardApiServices.storageTokenKeyName);
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  useEffect(() => {
    const response = axios.get(dashboardApiServices.clientesContratosValoresAsync, config)
    
    response.then((response: { data: ClienteContrato }): void => {
      // setPercentualClienteComContratosEmRelacaoAoTotalClientesAtivos(calcularPercentualClienteComContratosEmRelacaoAoTotalClientesAtivos(response.data))
      // setPercentualClienteSemContratosEmRelacaoAoTotalClientesAtivos(calcularPercentualClienteSemContratosEmRelacaoAoTotalClientesAtivos(response.data))
      // setClientesContratos(response.data)
    }).catch((error: { response: { data: { errors: { [s: string]: unknown } | ArrayLike<unknown> } } }): void => {
      const returnObj = Object.entries(error.response.data.errors);
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
          <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' sx={{ mr: 4, width: 42, height: 42 }} variant='rounded' color='success'>
                <Cash sx={{ fontSize: '1.875rem', color: 'success.main' }} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5"  sx={{ fontWeight: 600 }}>Contratos mensais (R$)</Typography>
              </Box>
            </Box>
            <Typography component='p' variant='caption' sx={{ mt: 12 }}>
              Valor total dos contratos mensais ativos - em real - 
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6'>
                {clientesContratos.totalClientesComContrato}
              </Typography>
              <ChartTimelineVariant sx={{ color: 'secondary.main', ml: 2, mr: 2 }} />
              <Typography variant='caption' sx={{ color: 'success.main' }}>
                {Math.round(percentualClienteComContratosEmRelacaoAoTotalClientesAtivos)}% em relação ao total de todos os contratos ativos
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
                <Typography variant="h5"  sx={{ fontWeight: 600 }}>Contratos anuais (R$)</Typography>
              </Box>
            </Box>
            <Typography component='p' variant='caption' sx={{ mt: 12 }}>
              Valor total dos contratos anuais ativos - em real - 
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6'>
                {clientesContratos.totalClientesSemContrato}
              </Typography>
              <ChartTimelineVariant sx={{ color: 'secondary.main', ml: 2, mr: 2 }} />
              <Typography variant='caption' sx={{ color: 'success.main' }}>
                {Math.round(percentualClienteSemContratosEmRelacaoAoTotalClientesAtivos)}% em relação ao total dos clientes ativos
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
  subject: 'ac-dashboard-comercial-page'
}

export default ClientesContratosValoresChart
