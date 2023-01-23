// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import RelatorioComissaoVendedor from '../comissao-vendedor/relatorio-comissao-vendedor/RelatorioComissaoVendedor'
import RelatorioBotoes from './RelatorioBotoes'

interface RelatorioComissaoType {
  id: string
}

const RelatorioComissao = ({ id }: RelatorioComissaoType) => {
  const split = id.split('&')

  return (
    <Grid container spacing={6}>
      <Grid item xl={9} md={8} xs={12}>
        <RelatorioComissaoVendedor id={split[0]} dataInicio={new Date(split[1]) || null} dataFim={new Date(split[2]) || null} />
      </Grid>
      <Grid item xl={3} md={4} xs={12}>
        <RelatorioBotoes id={split[0]} dataInicio={new Date(split[1]) || null} dataFim={new Date(split[2]) || null}/> 
      </Grid>
    </Grid>
  )
}

export default RelatorioComissao