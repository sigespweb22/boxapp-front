// ** React Imports
import { useForm } from 'react-hook-form'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { RotinaEventHistoryType } from 'src/types/sistema/rotinas/rotinasEventsHistories/rotinaEventHistoryType'

// ** Copmponents Imports
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useEffect, useState } from 'react'

interface SidebarClienteContratoFaturaViewType {
  row: RotinaEventHistoryType | undefined
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

const SidebarClienteContratoFaturaView = (props: SidebarClienteContratoFaturaViewType) => {
  // ** Hook
  const [isError, setIsError] = useState(false)
  const { reset } = useForm()

  // ** Props
  const { open, toggle } = props

  const handleClose = () => {
    toggle()
    reset()
  }

  const { t } = useTranslation()

  useEffect(() => {
    if (props.row?.statusProgresso === 'FALHA_EXECUCAO') {
      setIsError(true)
    }
    if (props.row?.statusProgresso === 'CONCLUIDA') {
      setIsError(false)
    }
    if (props.row?.statusProgresso === 'EM_EXECUCAO') {
      setIsError(false)
    }
  }, [props.row?.statusProgresso])

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
        <Typography variant='h6'>{t('Routine event data')}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField disabled={true} label='ID' value={props?.row?.id} defaultValue='.' />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField disabled={true} label={t('Start date')} value={props?.row?.dataInicio} defaultValue='.' />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField disabled label={t('Date of the conclusion')} value={props?.row?.dataFim} defaultValue='.' />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label={t('Progress status')}
              value={props?.row?.statusProgresso}
              defaultValue='.'
            />
          </FormControl>
          {isError &&
            <FormControl fullWidth sx={{ mb: 6 }}>
              <TextField
                disabled={true}
                label={t('Error message')}
                value={props?.row?.exceptionMensagem}
              />
            </FormControl>
          }
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label={t('Total failed items')}
              value={props?.row?.totalItensInsucesso}
              defaultValue='.'
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label={t('Total successful items')}
              value={props?.row?.totalItensSucesso}
              defaultValue='.'
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              {t('Cancel')}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
SidebarClienteContratoFaturaView.acl = {
  action: 'read',
  subject: 'ac-clienteContratoFatura-page'
}

export default SidebarClienteContratoFaturaView
