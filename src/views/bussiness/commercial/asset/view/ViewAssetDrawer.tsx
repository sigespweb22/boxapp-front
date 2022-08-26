// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { AssetsType } from 'src/types/apps/assetTypes'
import { useForm, Controller } from 'react-hook-form'

// ** Copmponents Imports
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

interface SidebarViewAssetType {
  row: AssetsType
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

const SidebarViewAsset = (props: SidebarViewAssetType) => {
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
        <Typography variant='h6'>{t("Asset View")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='nome'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.nome}
                  placeholder='Nome'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='referencia'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.referencia}
                  placeholder='Referência'
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
                  disabled='true'
                  value={props.row.codigoUnico}
                  placeholder='Código Único'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='tipo'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.tipo}
                  placeholder='Tipo'
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
                  disabled='true'
                  value={props.row.valorCusto}
                  placeholder='Valor custo'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='valorVenda'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.valorVenda}
                  placeholder='Valor venda'
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
                  disabled='true'
                  value={props.row.unidadeMedida}
                  placeholder='Unidade medida'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='clienteAtivoTipoServicoTipo'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.clienteAtivoTipoServicoTipo}
                  placeholder='Serviço tipo'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='caracteristica'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.caracteristica}
                  placeholder='Característica'
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
                  disabled='true'
                  value={props.row.observacao}
                  placeholder='Observação'
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
                  disabled='true'
                  value={t(props.row.status)}
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

export default SidebarViewAsset