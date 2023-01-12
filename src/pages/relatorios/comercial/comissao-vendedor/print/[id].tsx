// ** React Imports
import { ReactNode} from 'react'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Components Imports
import RelatorioComissaoVendedoresImprimir from 'src/views/relatorios/comercial/comissao-vendedor/relatorio-comissao-vendedor/impressao/RelatorioComissaoVendedorImprimir'


const InvoicePrint = () => {
  return <RelatorioComissaoVendedoresImprimir id={''} dataInicio={''} dataFim={''} />
}

InvoicePrint.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

InvoicePrint.setConfig = () => {
  return {
    mode: 'light'
  }
}

export default InvoicePrint
