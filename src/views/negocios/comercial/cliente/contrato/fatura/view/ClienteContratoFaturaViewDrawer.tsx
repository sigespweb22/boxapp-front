// ** React Imports
import { Controller, useForm } from 'react-hook-form'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { ClienteContratoFaturaType } from 'src/types/negocios/comercial/cliente/contrato/fatura/clienteContratoFaturaTypes'

// ** Copmponents Imports
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

interface SidebarClienteContratoFaturaViewType {
  row: ClienteContratoFaturaType | undefined
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


const formatCurrency = (currency: number) => {
  return currency.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

const SidebarClienteContratoFaturaView = (props: SidebarClienteContratoFaturaViewType) => {
  // ** Hook
  const {
    reset,
    control
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
        <Typography variant='h6'>{t("View Client Contract")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label='ID'
              value={props?.row?.id}
              defaultValue="."
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label={t("Expiration date")}
              value={props?.row?.dataVencimento}
              defaultValue="."
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled
              label={t("Date of competence")}
              value={props?.row?.dataCompetencia}
              defaultValue="."
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label={t("Invoice amount")}
              value={formatCurrency(props?.row?.valor || 0)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label={t("Discount")}
              value={formatCurrency(props?.row?.desconto || 0)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label={t("Installment number")}
              value={props?.row?.numeroParcela}
              defaultValue="."
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='quitado'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <TextField
                  disabled={true}
                  type='quitado'
                  label={t("Paid")}
                  value={t(props?.row?.status || '')}
                  onChange={onChange}
                />
              )}
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
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
SidebarClienteContratoFaturaView.acl = {
  action: 'read',
  subject: 'ac-clienteContratoFatura-page'
}

export default SidebarClienteContratoFaturaView