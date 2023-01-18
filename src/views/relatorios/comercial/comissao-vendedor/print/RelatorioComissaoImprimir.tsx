// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import RelatorioComissaoVendedorImprimir from '../relatorio-comissao-vendedor/impressao/RelatorioComissaoVendedorImprimir'

interface RelatorioComissaoType {
  id: string
}

const RelatorioComissaoImprimir = ({ id }: RelatorioComissaoType) => {
  // ** State
  const [isMultiple, setIsMultiple] = useState<boolean>(false)

  const split = id.split('&')

  const handleIsMultiplo = (split: any) => {
    switch (split) {
      case '':
        setIsMultiple(true)
        break
      case 'undefined':
        setIsMultiple(true)
        break
    }
  }

  useEffect(() => {
    handleIsMultiplo(split[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  debugger

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
