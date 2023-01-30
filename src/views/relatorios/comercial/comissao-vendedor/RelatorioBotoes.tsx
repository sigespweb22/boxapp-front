// ** Next Import
import Link from 'next/link'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** react
import React from 'react'

interface RelatorioComissaoVendedorType {
  id: string
  dataInicio: Date | number | null
  dataFim: Date | number | null
}

const RelatorioBotoesVendedor = ({ id, dataInicio, dataFim }: RelatorioComissaoVendedorType) => {
  const { t } = useTranslation()

  return (
    <Card>
      <CardContent>
        <Link target='_blank' href={`/relatorios/comercial/comissao-vendedor/print/${id}&${dataInicio}&${dataFim}`} passHref>
          <Button fullWidth sx={{ mb: 3.5 }} color='primary' variant='contained'>
            {t('Print')}
          </Button> 
        </Link>
        <Link href='../'>
          <Button fullWidth color='secondary' variant='outlined'>
            {t('Back')}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default RelatorioBotoesVendedor
