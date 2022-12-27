// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { ChaveApiType } from 'src/types/sistema/configuracoes/chave-api/chaveApiTypes'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

interface ChaveApiPageViewType {
  row: ChaveApiType | undefined
  open: boolean
  toggle: () => void
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const ChaveApiPageView = (props: ChaveApiPageViewType) => {
  // ** Hook
  const {
    reset,
  } = useForm()

  // ** Props
  const { open, toggle } = props

  const handleClose = () => {
    toggle()
    reset()
  }
  const { t } = useTranslation()

  return (
    <Drawer
      open={open}
      z-index={1000}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>{t("View API key")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label='ID'
              value={props?.row?.id}
              defaultValue='.'
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label={t("Third party API")}
              value={props?.row?.apiTerceiro}
              defaultValue='.'
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label={t("Bom Controle Key")}
              value={props?.row?.key}
              defaultValue='.'
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label={t("Description")}
              value={props?.row?.descricao}
              defaultValue='.'
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label={t("Expiration date")}
              value={props?.row?.dataValidade}
              defaultValue='.'
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label='Status'
              value={t(`${props?.row?.status}`)}
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              {t("Cancel")}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ChaveApiPageView.acl = {
  action: 'read',
  subject: 'ac-chaveApiTerceiro-page'
}

export default ChaveApiPageView