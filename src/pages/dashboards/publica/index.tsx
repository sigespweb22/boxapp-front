// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import BoasVindas from 'src/views/dashboards/publica/BoasVindas'

const DashboardPublica = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12} sx={{ order: 0, alignSelf: 'flex-end' }}>
          <BoasVindas />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

DashboardPublica.acl = {
  action: 'list',
  subject: 'ac-dashboard-publica-page'
}

export default DashboardPublica