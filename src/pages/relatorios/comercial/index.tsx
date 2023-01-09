// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import BoasVindas from 'src/views/relatorios/comercial/BoasVindas'
import ComissaoVendedoresGenerator from 'src/views/relatorios/comercial/comissao-vendedor/ComissaoVendedoresGenerator'

const RelatorioComercial = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12} sx={{ order: 0, alignSelf: 'flex-end' }}>
          <BoasVindas />
        </Grid>
        <Grid item xs={12} md={12} sx={{ order: 1, alignSelf: 'flex-end' }}>
          <ComissaoVendedoresGenerator />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

RelatorioComercial.acl = {
  action: 'list',
  subject: 'ac-relatorioComercial-page'
}

export default RelatorioComercial