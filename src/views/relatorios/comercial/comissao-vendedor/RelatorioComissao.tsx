// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import RelatorioComissaoVendedor from '../comissao-vendedor/relatorio-comissao-vendedor/RelatorioComissaoVendedor'
import RelatorioBotoes from './RelatorioBotoes'

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
