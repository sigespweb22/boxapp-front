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

// import ReactToPrint from 'react-to-print'

// import RelatorioComissaoVendedorImprimir from 'src/pages/relatorios/comercial/comissao-vendedor/print'

const imprimir = () => {
  window.print()
}

const PreviewActions = () => {
  const { t } = useTranslation()

  return (
    <Card>
      <CardContent>
        {/* <Link target='_blank' href={`/src/pages/relatorios/comercial/comissao-vendedor/print/${id}&${dataInicio}&${dataFim}`} passHref>
        <Button fullWidth sx={{ mb: 3.5 }} color='primary' variant='contained'>
          {t('Print')}
        </Button>
        </Link> */}

        {/* <ReactToPrint trigger={() => <Button>Print this out!</Button>} content={() => componentRef} />
        {/* <div style={{ display: 'none' }}>
          <RelatorioComissaoVendedorImprimir ref={(el: React.MutableRefObject<undefined>) => (componentRef = el)} />
        </div> */} 

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
