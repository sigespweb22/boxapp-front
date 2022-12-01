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

interface FornecedorProdutoEditDrawerType {
  row: FornecedorProdutoType | undefined
  open: boolean
  toggle: () => void
}

interface FornecedorProdutoData {
  id: string
  nome: string
  codigoProduto: string
  fornecedorId: string
  caracteristicas: string
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
  codigoProduto: '',
  fornecedorId: '',
  caracteristicas: '',
  status: ''
}

const FornecedorProdutoEditDrawer = (props: FornecedorProdutoEditDrawerType) => {
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
    setValue('codigoProduto', props?.row?.codigoProduto || '')
    setValue('fornecedorId', props?.row?.fornecedorId || '')
    setValue('caracteristicas', props?.row?.caracteristicas || '')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const onSubmit = (data: FornecedorProdutoData) => {
    dispatch(editFornecedorProduto({ ...data }))
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
              name='codigoProduto'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Código produto'
                  onChange={onChange}
                  placeholder='(e.g.: #ABCD1234)'
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
FornecedorProdutoEditDrawer.acl = {
  action: 'update',
  subject: 'ac-fornecedor-produto-page'
}

export default FornecedorProdutoEditDrawer