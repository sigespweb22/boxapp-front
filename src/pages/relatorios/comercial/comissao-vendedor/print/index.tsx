// ** React Imports
import { ReactNode } from 'react'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Components Imports
import RelatorioComissaoVendedoresImprimir from 'src/views/relatorios/comercial/comissao-vendedor/relatorio-comissao-vendedor/impressao/RelatorioComissaoVendedorImprimir'

const RelatorioComissaoVendedorImprimir = () => {
  return (
  <RelatorioComissaoVendedoresImprimir id={''} dataInicio={''} dataFim={''} />
  )
}

RelatorioComissaoVendedorImprimir.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

RelatorioComissaoVendedorImprimir.setConfig = () => {
  return {
    mode: 'light'
  }
}

export default RelatorioComissaoVendedorImprimir
