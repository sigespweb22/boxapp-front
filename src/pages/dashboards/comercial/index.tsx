// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Check from 'mdi-material-ui/Check'
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import TruckOutline from 'mdi-material-ui/TruckOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import ClientesContratosNumerosChart from 'src/views/dashboards/comercial/ClientesContratosNumerosChart'
import ClientesContratosValoresChart from 'src/views/dashboards/comercial/ClientesContratosValoresChart'
import BoasVindas from 'src/views/dashboards/comercial/BoasVindas'

const EcommerceDashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12} sx={{ order: 0, alignSelf: 'flex-end' }}>
          <BoasVindas />
        </Grid>
        <Grid item xs={12} md={6} lg={6} sx={{ order: 0 }}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ClientesContratosNumerosChart />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={6} sx={{ order: 0 }}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ClientesContratosValoresChart />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default EcommerceDashboard
