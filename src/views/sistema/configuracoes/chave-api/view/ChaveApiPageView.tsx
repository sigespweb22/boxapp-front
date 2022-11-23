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
import { useForm, Controller } from 'react-hook-form'

// ** Copmponents Imports
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
        <Typography variant='h6'>Visualizar Chave Api</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              value={props?.row?.apiTerceiro}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              value={props?.row?.key}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              value={props?.row?.descricao}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              value={props?.row?.dataValidade}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              value={props?.row?.status}
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancelar
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
  subject: 'ac-chave_api_terceiro-page'
}

export default ChaveApiPageView