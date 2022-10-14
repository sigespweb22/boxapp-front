// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { ClientsType } from 'src/types/negocios/comercial/cliente/clienteTypes'
import { useForm, Controller } from 'react-hook-form'

// ** Copmponents Imports
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

interface SidebarViewClientType {
  row: ClientsType | undefined
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

const SidebarViewClient = (props: SidebarViewClientType) => {
  // ** Hook
  const { t } = useTranslation()
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

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>{t("Client View")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='nomeFantasia'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.nomeFantasia}
                  placeholder='Nome fantasia'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='razaoSocial'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.razaoSocial}
                  placeholder='Razão sociaç'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='inscricaoSocial'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.inscricaoEstadual}
                  placeholder='Inscrição estadual'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='cnpj'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.cnpj}
                  placeholder='CNPJ'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='telefonePrincipal'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.telefonePrincipal}
                  placeholder='Telefone principal'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='emailPrincipal'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.emailPrincipal}
                  placeholder='E-mail principal'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='observacao'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.observacao}
                  placeholder='Observação'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='dataFundacao'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.dataFundacao}
                  placeholder='Data fundação'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='codigoMunicipio'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.codigoMunicipio}
                  placeholder='Código município'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='rua'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.rua}
                  placeholder='Rua'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='numero'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.numero}
                  placeholder='Número'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='complemento'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.complemento}
                  placeholder='Complemento'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='cidade'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.cidade}
                  placeholder='Cidade'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='estado'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.estado}
                  placeholder='Estado'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='cep'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.cep}
                  placeholder='Cep'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='status'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.status}
                  placeholder='Status'
                />
              )}
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

export default SidebarViewClient