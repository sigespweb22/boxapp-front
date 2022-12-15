// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addFornecedorServico } from 'src/store/negocios/parceiros/fornecedor/servico/index'

// ** Types Imports
import { AppDispatch } from 'src/store'

interface SidebarFornecedorServicoAddType {
  fornecedorId: string | undefined
  open: boolean
  toggle: () => void
}

const unidadesMedida : string[] = ["NENHUM", "CPU", "HR", "GB", "vCPU"];

interface FornecedorServicoData {
  nome: string,
  codigoServico: string,
  unidadeMedida: string,
  caracteristicas: string,
  fornecedorId: string,
  fornecedor: { id: '', nome: ''},
  status: string
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const defaultValues = {
  nome: '',
  codigoServico: '',
  unidadeMedida: '',
  caracteristicas: '',
  fornecedor: {id: '', nome: ''},
  status: ''
}

const SidebarFornecedorServicoAdd = (props: SidebarFornecedorServicoAddType) => {
  // ** Props
  const { open, toggle } = props
  
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    handleSubmit
  } = useForm({
      defaultValues,
      mode: 'onChange'
  })

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        width: 350,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
      }
    }
  }

  const onSubmit = (data: FornecedorServicoData) => {
    data.fornecedorId = props?.fornecedorId || ""
    dispatch(addFornecedorServico({ ...data,  }))
    toggle()
    reset()
  }

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
        <Typography variant='h6'>Novo Fornecedor Serviço</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>          
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='nome'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Nome'
                  onChange={onChange}
                  placeholder='(e.g.: E-mail 50GB)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='codigoServico'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Código serviço'
                  onChange={onChange}
                  placeholder='(e.g.: #1510)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="unidadeMedida"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id='single-select-um-chip-label'>Unidade medida</InputLabel>
                    <Select
                      value={value}
                      name="unidadeMedida"
                      autoWidth
                      label="Unidade medida"
                      MenuProps={MenuProps}
                      onChange={onChange}
                      id='single-select-um'
                      labelId='single-select-um-chip-label'
                    >
                      {
                        unidadesMedida.map(um => (
                          <MenuItem key={um} value={um}>
                            {um}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                )
              }}
            />
          </FormControl>  
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='caracteristicas'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Características'
                  onChange={onChange}
                  placeholder='(e.g.: Consultoria especializada para serviços especiais)'
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
SidebarFornecedorServicoAdd.acl = {
  action: 'create',
  subject: 'ac-fornecedor-servico-page'
}

export default SidebarFornecedorServicoAdd