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
import { addVendedorContratoWithoutUpdateState } from 'src/store/negocios/comercial/vendedor/contrato'

// ** Types Imports
import { AppDispatch } from 'src/store'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import vendedorApiService from 'src/@api-center/negocios/comercial/vendedor/vendedorApiService'

// ** Toast
import { toast } from 'react-toastify'

interface VendedorContratoAddType {
  clienteContratoId: string
  open: boolean
  toggle: () => void
}

interface Vendedor {
  vendedorId: string
  nome: string
}

interface VendedorContratoType {
  id: string
  comissaoReais: number
  comissaoPercentual: number
  clienteContratoId: string
  vendedorId: string
  vendedor: { id: string, nome: string }
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
  comissaoReais: 0,
  comissaoPercentual: 0,
  vendedor: { vendedorId: '', nome: '' }
}

const isValidComissao = (data: VendedorContratoType) => {
  if (data.comissaoReais != 0 && data.comissaoPercentual != 0) {
    toast.warning('Permitido apenas uma das opções de comissionamento.')
    return false
  }
  return true
}

const VendedorContratoAddDrawer = (props: VendedorContratoAddType) => {
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
  const [vendedores, setVendedores] = useState<Vendedor[]>([])

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(vendedorApiService.storageTokenKeyName)}`
    }
  }

  useEffect(() => {
    axios.get(`${vendedorApiService.listToSelectAsync}`, config).then(response => {
      setVendedores(response.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (data: VendedorContratoType): void => {
    if (isValidComissao(data)) {
      data.clienteContratoId = props.clienteContratoId
      data.vendedorId = data.vendedor.id

      dispatch(addVendedorContratoWithoutUpdateState({...data}))
      toggle()
      reset()
    }
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
        <Typography variant='h6'>Vincular vendedor</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='comissaoPercentual'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Comissão percentual (%)'
                  onChange={onChange}
                  placeholder='(e.g.: 15)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='comissaoReais'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Comissão em reais (R$)'
                  onChange={onChange}
                  placeholder='(e.g.: R$ 150,00)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='vendedor'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    multiple={false}
                    options={vendedores || []}
                    filterSelectedOptions
                    value={value}
                    id='autocomplete-multiple-outlined'
                    getOptionLabel={option => option.nome}
                    renderInput={params => <TextField {...params} label='Vendedor' placeholder='(e.g.: Jhon Dare)' />}
                    onChange={(event, newValue) => {
                      // setRole(newValue)
                      onChange(newValue)
                    }}
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
VendedorContratoAddDrawer.acl = {
  action: 'create',
  subject: 'ac-vendedorContrato-page'
}

export default VendedorContratoAddDrawer
