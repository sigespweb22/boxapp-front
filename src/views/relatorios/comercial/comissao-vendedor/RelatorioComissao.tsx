// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import RelatorioComissaoVendedor from '../comissao-vendedor/relatorio-comissao-vendedor/RelatorioComissaoVendedor'
import RelatorioComissaoVendedores from '../comissao-vendedor/relatorio-comissao-vendedores/RelatorioComissaoVendedores'
import RelatorioBotoesVendedores from './relatorio-comissao-vendedores/RelatorioBotoesVendedores'
import RelatorioBotoesVendedor from './relatorio-comissao-vendedor/RelatorioBotoesVendedor'

interface RelatorioComissaoType {
  id: string
}

const RelatorioComissao = ({ id }: RelatorioComissaoType) => {
  // ** State
  const { t } = useTranslation()
  const [vendedorId, setVendedorId] = useState<string[]>()
  const [isMultiple, setIsMultiple] = useState<boolean>(false)

  var split = id.split('&')

  const handleIsMultiplo = (split: any) => {
    switch (split) {
      case "" :
        setIsMultiple(true)
        break;
      case "undefined" :
        setIsMultiple(true)
        break;
    }
  } 

  useEffect(() => {
    // ** call to data report
    // ** set data report
    // ** type report
    // isMultiple
    setVendedorId(split)
    handleIsMultiplo(split[0])
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xl={9} md={8} xs={12}>
        {isMultiple ? <RelatorioComissaoVendedores dataInicio={split[1]} dataFim={split[2]} /> : <RelatorioComissaoVendedor id={split[0]} dataInicio={split[1]} dataFim={split[2]} />}
      </Grid>
      <Grid item xl={3} md={4} xs={12}>
        {isMultiple ? <RelatorioBotoesVendedores dataInicio={split[1]} dataFim={split[2]} /> : <RelatorioBotoesVendedor id={split[0]} dataInicio={split[1]} dataFim={split[2]} />}
      </Grid>
    </Grid>
  )
}

export default RelatorioComissao
