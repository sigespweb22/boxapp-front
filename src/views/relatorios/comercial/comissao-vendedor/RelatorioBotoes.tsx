// ** Next Import
import Link from 'next/link'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'


interface Props {
  id: string | undefined
}

const PreviewActions = ({ id }: Props) => {
  const { t } = useTranslation()
  const imprimir = () => {
    window.print()
  }

  return (
    <Card>
      <CardContent>
        <Button
          fullWidth
          sx={{ mb: 3.5 }}
          color='primary'
          variant='contained'
          onClick={imprimir}
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
