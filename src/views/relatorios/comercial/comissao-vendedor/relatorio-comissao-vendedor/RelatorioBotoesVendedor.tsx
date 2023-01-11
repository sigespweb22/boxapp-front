// ** Next Import
import Link from 'next/link'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'


interface Props {
  id: string
  dataInicio: string
  dataFim: string
}

const PreviewActions = ({ id, dataInicio, dataFim }: Props) => {
  const { t } = useTranslation()
  const imprimir = () => {
    window.print()
  }

  return (
    <Card>
      <CardContent>
        <Button
          fullWidth
          // target='_blank'
          sx={{ mb: 3.5 }}
          // component={Link}
          color='primary'
          variant='contained'
          onClick={imprimir}
          // href={'/src/views/relatorios/comercial/comissao-vendedor/relatorio-comissao-vendedor/RelatorioComissaoVendedorImprimir'}
        >
          {t("Print")}
        </Button>
        <Button
          fullWidth
          color='secondary'
          variant='outlined'
          href='../../'
          // component={Link}
          // href='/src/views/relatorios/comercial'
          // passHref
        >
          {t("Back")}
        </Button>
      </CardContent>
    </Card>
  )
}

export default PreviewActions
