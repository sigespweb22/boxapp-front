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

  debugger

  return (
    <Card>
      <CardContent>
        <Button
          fullWidth
          target='_blank'
          sx={{ mb: 3.5 }}
          // component={Link}
          color='primary'
          variant='contained'
          href={`/relatorios/comercial/comissao-vendedor/print/${id}${dataInicio}${dataFim}`}
        >
          {t("Print")}
        </Button>

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
