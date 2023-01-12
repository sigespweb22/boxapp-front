// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { VendedorComissaoType } from 'src/types/negocios/comercial/vendedor/comissao/vendedorComissaoTypes'
import { useForm, Controller } from 'react-hook-form'

// ** Copmponents Imports
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

interface VendedorComissaoViewDrawerType {
  row: VendedorComissaoType | undefined
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

const VendedorComissaoViewDrawer = (props: VendedorComissaoViewDrawerType) => {
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
        <Typography variant='h6'>{t("View Seller Contract")}</Typography>
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
          <FormControl fullWidth sx={{ mb: 6 }} >
            <TextField
                disabled={true}
                label={t("Customer name linked to the contract")}
                value={props?.row?.clienteContratoViewModel?.cliente.nomeFantasia || 0}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }} >
            <TextField
                disabled={true}
                label={t("Total value of the contract")}
                value={formatCurrency(props?.row?.clienteContratoViewModel?.valorContrato || 0)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }} >
            <TextField
                disabled={true}
                label={t("Total value of the contract")}
                value={formatCurrency(props?.row?.valorComissao || 0)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <TextField
                  disabled={true}
                  type='status'
                  label='Status'
                  value={t(props?.row?.status || '')}
                  onChange={onChange}
                />
              )}
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
VendedorComissaoViewDrawer.acl = {
  action: 'read',
  subject: 'ac-vendedorComissao-page'
}

export default VendedorComissaoViewDrawer