
// ** React Import
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface RelatorioComissaoType {
  id: string
}

const OptionsWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const RelatorioComissao = (id: RelatorioComissaoType) => {
  const [vendedorId, setVendedorId] = useState<string | null>(null)

  useEffect(() => {
    setVendedorId(id.id)
  }, [])

  return vendedorId;
}

export default RelatorioComissao
