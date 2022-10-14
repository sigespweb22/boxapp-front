// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Type Import
import { CardStatsCharacterProps } from 'src/@core/components/card-statistics/types'

// ** Custom Components Imports
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import CrmSalesOverview from 'src/views/dashboards/access-control/CrmSalesOverview'

const data: CardStatsCharacterProps[] = [
  {
    stats: '35.7k',
    title: 'Meninas na plataforma',
    trendNumber: '+38%',
    chipColor: 'error',
    chipText: 'Ano de 2022',
    src: '/images/cards/pose_f9.png'
  },
  {
    stats: '24.5k',
    trend: 'positive',
    title: 'Meninos na plataforma',
    trendNumber: '+22%',
    chipText: 'Ano de 2022',
    chipColor: 'info',
    src: '/images/cards/pose_m18.png'
  }
]

const CRMDashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={6} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter data={data[0]} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter data={data[1]} />
        </Grid>
        <Grid item xs={12} md={12}>
          <CrmSalesOverview />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

// **Controle de acesso da página
// **Usuário deve possuir ao menos umas das ações como habilidade para ter acesso 
// **a esta página de subject abaixo
CRMDashboard.acl = {
  action: 'list',
  subject: 'ac-dashboard-controle_acesso-page'
}

export default CRMDashboard
