// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import RelatorioComissaoVendedorImprimir from '../relatorio-comissao-vendedor/impressao/RelatorioComissaoVendedorImprimir'

interface RelatorioComissaoType {
  id: string
}

const RelatorioComissaoImprimir = ({ id }: RelatorioComissaoType) => {
  // ** State
  const split = id.split('&')

  return (
    <Grid>
      <RelatorioComissaoVendedorImprimir
        id={split[0]}
        dataInicio={new Date(split[1]) || null}
        dataFim={new Date(split[2]) || null}
      />
    </Grid>
  )
}

export default RelatorioComissaoImprimir