// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import RelatorioComissaoVendedor from '../comissao-vendedor/relatorio-comissao-vendedor/RelatorioComissaoVendedor'
import RelatorioComissaoVendedores from '../comissao-vendedor/relatorio-comissao-vendedores/RelatorioComissaoVendedores'
import RelatorioBotoesVendedor from '../comissao-vendedor/relatorio-comissao-vendedor/RelatorioBotoesVendedor'

interface RelatorioComissaoType {
  id: string
}

const RelatorioComissao = ({ id }: RelatorioComissaoType) => {
  // ** State
  const [isMultiple, setIsMultiple] = useState<boolean>(false)

  const split = id.split('&')

  const handleIsMultiplo = (split: any) => {
    switch (split) {
      case "":
        setIsMultiple(true)
        break;
      case "undefined":
        setIsMultiple(true)
        break;
    }
  } 

  useEffect(() => {
    handleIsMultiplo(split[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container spacing={1}>
      <Grid item xl={6} md={12} xs={12}>
        {isMultiple ? <RelatorioComissaoVendedores dataInicio={split[1]} dataFim={split[2]} /> : <RelatorioComissaoVendedor id={split[0]} dataInicio={new Date(split[1]) || null} dataFim={new Date(split[2]) || null} />}
      </Grid>
    </Grid>
  )
}

export default RelatorioComissao
