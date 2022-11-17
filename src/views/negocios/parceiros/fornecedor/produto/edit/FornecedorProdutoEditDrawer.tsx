// ** React Imports
import { useEffect } from 'react'

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
import { editFornecedorProduto } from 'src/store/negocios/parceiros/fornecedor/produto'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { FornecedorProdutoType } from 'src/types/negocios/parceiros/fornecedor/produto/fornecedorProdutoTypes'

interface SidebarFornecedorProdutoEditType {
  row: FornecedorProdutoType | undefined
  open: boolean
  toggle: () => void
}

interface FornecedorProdutoData {
  id: string
  nome: string
  codigoUnico: string
  caracteristicas: string
  descricao: string
  valorCusto: string
  fornecedorId: string
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
  id: '',
  nome: '',
  codigoUnico: '',
  caracteristicas: '',
  descricao: '',
  valorCusto: '',
  fornecedorId: '',
  status: ''
}

const SidebarFornecedorProdutoEdit = (props: SidebarFornecedorProdutoEditType) => {
  // ** Props
  const { open, toggle } = props
  
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    setValue,
    handleSubmit
  } = useForm({
      defaultValues,
      mode: 'onChange'
  })

  useEffect(() => {
    setValue('id', props?.row?.id || '')
    setValue('nome', props?.row?.nome || '')
    setValue('codigoUnico', props?.row?.codigoUnico || '')
    setValue('descricao', props?.row?.descricao || '')
    setValue('valorCusto', props?.row?.valorCusto || '')
    setValue('caracteristicas', props?.row?.caracteristicas || '')
    setValue('fornecedorId', props?.row?.fornecedorId || '')
  }, [props])

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

  const onSubmit = (data: FornecedorProdutoData) => {
    dispatch(editFornecedorProduto({ ...data,  }))
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
        <Typography variant='h6'>Editar Fornecedor Produto</Typography>
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
              name='codigoUnico'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Código único'
                  onChange={onChange}
                  placeholder='(e.g.: #ABCD1234)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='descricao'
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
              name='valorCusto'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Valor do produto'
                  onChange={onChange}
                  placeholder='(e.g.: R$ 150,00)'
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
SidebarFornecedorProdutoEdit.acl = {
  action: 'update',
  subject: 'ac-fornecedor-produto-page'
}

export default SidebarFornecedorProdutoEdit