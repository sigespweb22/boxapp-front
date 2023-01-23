// ** React Imports
import { ReactNode } from 'react'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Components Imports
import RelatorioComissaoImprimir from 'src/views/relatorios/comercial/comissao-vendedor/print/RelatorioComissaoImprimir'
import { useRouter } from 'next/router'

const InvoicePrint = () => {
  const router = useRouter()
  const { id } = router.query  

  return <RelatorioComissaoImprimir id={String(id)}/>
}

InvoicePrint.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

InvoicePrint.setConfig = () => {
  return {
    mode: 'light'
  }
}

export default InvoicePrint
