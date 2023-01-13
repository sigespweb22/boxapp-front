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

const RelatorioBotoesVendedor = () => {
  const { t } = useTranslation()

  return (
    <Card>
      <CardContent>
        <Button fullWidth sx={{ mb: 3.5 }} color='primary' variant='contained'>
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

export default RelatorioBotoesVendedor