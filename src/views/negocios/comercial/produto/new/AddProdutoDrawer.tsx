// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import Autocomplete from '@mui/material/Autocomplete'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Copmponents Imports
import Select from '@mui/material/Select'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addProduto } from 'src/store/negocios/comercial/produto'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { ProdutoType } from 'src/types/negocios/comercial/produto/produtoTypes'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import fornecedorProdutoApiService from 'src/@api-center/negocios/parceiros/fornecedor/produto/fornecedorProdutoApiService'

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

interface SidebarAddProdutoType {
  open: boolean
  toggle: () => void
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} é requerido (a)`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} deve ter pelo menos ${min} caracteres`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  nome: yup
    .string()
    .min(3, obj => showErrors('Nome', obj.value.length, obj.min))
    .required()
})

const SidebarAddProduto = (props: SidebarAddProdutoType) => {
  // ** Props
  const { open, toggle } = props

  const defaultValues = {
    nome: '',
    codigoUnico: '',
    valorCusto: '',
    descricao: '',
    caracteristicas: '',
    status: ''
  }

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const storedToken = window.localStorage.getItem(fornecedorProdutoApiService.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: "Bearer " + storedToken
    }
  }

  const onSubmit = (data: ProdutoType) => {
    dispatch(addProduto({ ...data,  }))
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
        <Typography variant='h6'>Novo Produto</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='nome'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Nome'
                  onChange={onChange}
                  placeholder='(e.g.: Ex.: Nome do produto)'
                  error={Boolean(errors.nome)}
                />
              )}
            />
            {errors.nome && <FormHelperText sx={{ color: 'error.main' }}>{errors.nome.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='codigoUnico'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Código único'
                  onChange={onChange}
                  placeholder='(e.g.: #AB12345)'
                />
              )}
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
                  placeholder='(e.g.: Características do produto)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="descricao"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Descrição'
                  onChange={onChange}
                  placeholder='(e.g.: Descrição do produto)'
                />
              )}
            />
          </FormControl> 
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="valorCusto"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <TextField
                  value={value}
                  label='Valor custo'
                  onChange={onChange}
                  placeholder='(e.g.: R$ 150,00)'
                />
                )
              }}
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
SidebarAddProduto.acl = {
  action: 'create',
  subject: 'ac-produto-page'
}

export default SidebarAddProduto