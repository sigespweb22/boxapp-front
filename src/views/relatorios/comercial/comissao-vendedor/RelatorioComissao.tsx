// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import RelatorioComissaoVendedor from '../comissao-vendedor/RelatorioComissao'
import RelatorioComissaoVendedores from '../comissao-vendedor/RelatorioComissao'
import RelatorioBotoes from '../comissao-vendedor/RelatorioBotoes'
import { Alert } from 'mdi-material-ui'

interface RelatorioComissaoType {
  id: string
}

const RelatorioComissao = (id: RelatorioComissaoType) => {
  const [vendedorId, setVendedorId] = useState<string | null>(null)
  const [isMultiple, setIsMultiple] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<null | RelatorioComissaoType>(null)

  useEffect(() => {
    // ** call to data report
    // ** set data report
    // ** type report
    // isMultiple
    setVendedorId(id.id)
  }, [])

  useEffect(() => {
    axios
      .get('/apps/invoice/single-invoice', { params: { id } })
      .then(res => {
        setData(res.data)
        setError(false)
      })
      .catch(() => {
        setData(null)
        setError(true)
      })
  }, [id])

  if (data) {
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
            Invoice with the id: {id} does not exist. Please check the list of invoices:{' '}
            <Link href={''}>Invoice List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default RelatorioComissao
