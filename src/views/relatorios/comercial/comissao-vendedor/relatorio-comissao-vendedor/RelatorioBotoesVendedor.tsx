// ** React Import
import { useRef } from "react";

// ** Next Import
import Link from 'next/link'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** React to print Imports
import ReactToPrint from "react-to-print";

import RelatorioComissaoVendedor from 'src/views/relatorios/comercial/comissao-vendedor/relatorio-comissao-vendedor/RelatorioComissaoVendedor'

// ** react
import React from 'react'

const RelatorioBotoesVendedor = () => {
  const { t } = useTranslation()
  let componentRef = useRef();

  return (
    <Card>
      <CardContent>
        <RelatorioComissaoVendedor ref={(el: React.MutableRefObject<undefined>) => (componentRef = el)} />
        <ReactToPrint
          trigger={() => <Button>Print this out!</Button>}
          content={() => componentRef}
        />
        {/* <Button fullWidth sx={{ mb: 3.5 }} color='primary' variant='contained' onClick={imprimir}>
          {t('Print')}
        </Button> */}

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