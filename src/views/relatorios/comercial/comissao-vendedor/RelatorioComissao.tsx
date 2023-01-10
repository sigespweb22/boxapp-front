// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import RelatorioComissaoVendedor from '../comissao-vendedor/RelatorioComissaoVendedores'
import RelatorioComissaoVendedores from '../comissao-vendedor/RelatorioComissao'
import RelatorioBotoes from '../comissao-vendedor/RelatorioBotoes'

interface RelatorioComissaoType {
  id: string
}

const RelatorioComissao = ({ id }: RelatorioComissaoType) => {
  // ** State
  const { t } = useTranslation()
  const [vendedorId, setVendedorId] = useState<string>('')
  const [isMultiple, setIsMultiple] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  // const [data, setData] = useState<RelatorioComissaoType>('')

  useEffect(() => {
    // ** call to data report
    // ** set data report
    // ** type report
    // isMultiple
    setVendedorId(id)
  }, [])

  // useEffect(() => {
  //   axios
  //     .get('../comissao-vendedor/RelatorioComissaoVendedores.tsx', { params: { id } })
  //     .then((res: { data: any }) => {
  //       setData(res.data)
  //       setError(false)
  //     })
  //     .catch(() => {
  //       setData(null)
  //       setError(true)
  //     })
  // }, [id])

  debugger

  if (vendedorId) {
    return (
      <>
       <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            {isMultiple ? <RelatorioComissaoVendedores id={''} /> : <RelatorioComissaoVendedor id={''} />}
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <RelatorioBotoes id={''} />
          </Grid>
        </Grid>
      </>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            {t("There are no invoices on this date with this list of sellers. Consult the list of sellers")}:{' '}
            <Link href='/negocios/comercial/vendedor/list'>{t("List of Sellers")}</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default RelatorioComissao
