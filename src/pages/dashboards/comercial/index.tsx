// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import BoasVindas from 'src/views/dashboards/comercial/BoasVindas'
import ClientesContratosNumerosChart from 'src/views/dashboards/comercial/ClientesContratosNumerosChart'
import ClientesContratosValoresChart from 'src/views/dashboards/comercial/ClientesContratosValoresChart'
import ClientesContratosTicketMedioGlobalChart from 'src/views/dashboards/comercial/ClientesContratosTicketMedioGlobalChart'
import ClientesContratosTicketMedioMensalChart from 'src/views/dashboards/comercial/ClientesContratosTicketMedioMensalChart'
import ClientesContratosTicketMedioAnualChart from 'src/views/dashboards/comercial/ClientesContratosTicketMedioAnualChart'

const DashboardComercial = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12} sx={{ order: 0, alignSelf: 'flex-end' }}>
          <BoasVindas />
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ order: 0 }}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ClientesContratosTicketMedioGlobalChart />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ order: 0 }}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ClientesContratosTicketMedioMensalChart />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={4} sx={{ order: 0 }}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ClientesContratosTicketMedioAnualChart />
            </Grid>
          </Grid>
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

DashboardComercial.acl = {
  action: 'list',
  subject: 'ac-dashboardComercial-page'
}

export default DashboardComercial