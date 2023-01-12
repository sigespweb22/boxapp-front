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

interface Props {
  id: string
  dataInicio: string
  dataFim: string
}

const PreviewActions = ({id, dataInicio, dataFim }:Props) => {
  const { t } = useTranslation()
  const imprimir = () => {
    window.print()
  }

  return (
    <Card>
      <CardContent>
        <Button fullWidth sx={{ mb: 3.5 }} color='primary' variant='contained' onClick={imprimir}>
          {t('Print')}
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

export default PreviewActions
