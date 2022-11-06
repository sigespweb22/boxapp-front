// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { ServicoType } from 'src/types/negocios/comercial/servico/servicoTypes'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

interface SidebarViewServicoType {
  row: ServicoType | undefined
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

const SidebarClienteView = (props: SidebarViewServicoType) => {
  // ** Hook
  const {
    reset,
    control
  } = useForm()
  const { t } = useTranslation()

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
        <Typography variant='h6'>Visualizar Serviço</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='id'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.id}
                  placeholder='Id'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='nome'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.nome}
                  placeholder='Nome'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='codigoUnico'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.codigoUnico}
                  placeholder='Código Único'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='valorCusto'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.valorCusto}
                  placeholder='Valor custo'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='unidadeMedida'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.unidadeMedida}
                  placeholder='Unidade medida'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='fornecedorServico'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.fornecedorServico.nome}
                  placeholder='Fornecedor serviço'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='caracteristicas'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.caracteristicas}
                  placeholder='Características'
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
                  value={t(props?.row?.status || '')}
                  placeholder='Status'
                />
              )}
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Salvar
            </Button>
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
SidebarClienteView.acl = {
  action: 'read',
  subject: 'ac-servico-page'
}

export default SidebarClienteView