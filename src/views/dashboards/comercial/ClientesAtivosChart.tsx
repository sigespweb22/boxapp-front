import { SetStateAction, useEffect, useState, useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Importss
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

const ClientesAtivosChart = () => {
  // ** Hook
  const theme = useTheme()
  const ability = useContext(AbilityContext)

  // ** State
  const [clientesContratos, setClientesContratos] = useState<ClienteContrato>(clientesContratosDefaultValues)

  const accessToken = window.localStorage.getItem(dashboardApiServices.storageTokenKeyName);
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  useEffect(() => {
    const response = axios.get(dashboardApiServices.clientesContratosAsync, config)
    
    response.then((response: { data: SetStateAction<ClienteContrato> }): void => {
      setClientesContratos(response.data)
    }).catch((error: { response: { data: { errors: { [s: string]: unknown } | ArrayLike<unknown> } } }): void => {
      debugger
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
            <Typography variant='h6' sx={{ mb: 7.5 }}>
              Clientes com contratos
            </Typography>
            <Typography component='p' variant='caption'>
              Total de clientes que possuem contratos ativos
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6'>
                {clientesContratos.totalClientesComContrato}
              </Typography>
              <ChevronUp sx={{ color: 'success.main' }} />
              <Typography variant='caption' sx={{ color: 'success.main' }}>
                48% somente nos últimos 6 meses
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
ClientesAtivosChart.acl = {
  action: 'read',
  subject: 'ac-dashboard-comercial-page'
}

export default ClientesAtivosChart
