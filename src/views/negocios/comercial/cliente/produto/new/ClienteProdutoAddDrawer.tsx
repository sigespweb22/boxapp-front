// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'
import Autocomplete from '@mui/material/Autocomplete'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addClienteProduto } from 'src/store/negocios/comercial/cliente/produto'

// ** Types Imports
import { AppDispatch } from 'src/store'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import clienteApiService from 'src/@api-center/negocios/comercial/cliente/clienteApiService'
import produtoApiService from 'src/@api-center/negocios/comercial/produto/produtoApiService'

interface ClienteProdutoAddDrawerType {
  clienteId: string
  open: boolean
  toggle: () => void
}

interface ProdutoType {
  id: string | ''
  nome: string | ''
}

interface ClienteProdutoType {
  id: string
  nome: string
  caracteristicas: string
  valorVenda: string
  clienteId: string
  produtoId: string
  produto: ProdutoType
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
  caracteristicas: '',
  valorVenda: '',
  clienteId: '',
  produto: {id: '', nome: ''},
  status: ''
}

const ClienteProdutoAddDrawer = (props: ClienteProdutoAddDrawerType) => {
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

  // ** States
  const [produtos, setProdutos] = useState([])

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(clienteApiService.storageTokenKeyName)!}`
    }
  }

  useEffect(() => {
    axios
      .get(`${produtoApiService.listToSelectAsync}`, config)
      .then(response => {
        setProdutos(response.data)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: ClienteProdutoType): void => {
    data.clienteId = props?.clienteId
    dispatch(addClienteProduto({...data}))
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
        <Typography variant='h6'>Novo Cliente Produto</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="produto"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    value={value}
                    sx={{ width: 360 }}
                    options={produtos}
                    onChange={(event, newValue) => {
                      onChange(newValue)
                    }}
                    id='autocomplete-controlled'
                    getOptionLabel={option => option.nome}
                    renderInput={params => <TextField {...params} label='Produto' />}
                  />
                )
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='nome'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Nome'
                  onChange={onChange}
                  placeholder='(e.g.: Mikrotik)'
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
              name='valorVenda'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Valor venda'
                  onChange={onChange}
                  placeholder='(e.g.: R$ 150,00)'
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
ClienteProdutoAddDrawer.acl = {
  action: 'create',
  subject: 'ac-cliente-produto-page'
}

export default ClienteProdutoAddDrawer