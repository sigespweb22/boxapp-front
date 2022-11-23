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
import Autocomplete from '@mui/material/Autocomplete'
import InputLabel from '@mui/material/InputLabel'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addClienteContrato } from 'src/store/negocios/comercial/cliente/contrato'

// ** Types Imports
import { AppDispatch } from 'src/store'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import clienteApiService from 'src/@api-center/negocios/comercial/cliente/clienteApiService'
import clienteContratoApiService from 'src/@api-center/negocios/comercial/cliente/contrato/clienteContratoApiService'

interface SidebarClienteContratoAddType {
  clienteId: string | string[] | undefined
  open: boolean
  toggle: () => void
}

interface ContratoType {
  id: string | ''
  nome: string | ''
}

let contratos: { id: string, nome: string  }[] = [];

interface ClienteContratoType {
  id: string
  valorContrato: string
  periodicidade: string
  clienteId: string
  bomControleContratoId: string
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
  valorContrato: '',
  periodicidade: '',
  clienteId: '',
  bomControleContratoId: '',
  status: '',
}

const SidebarClienteContratoAdd = (props: SidebarClienteContratoAddType) => {
  const storedToken = window.localStorage.getItem(clienteApiService.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: "Bearer " + storedToken
    }
  }

  useEffect(() => {
    axios
      .get(`${clienteContratoApiService.listToSelectAsync}`, config)
      .then(response => {
        contratos = response.data
      })
  }, [contratos]);

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

  const onSubmit = (data: ClienteContratoType): void => {
    data.clienteId = props?.clienteId
    dispatch(addClienteContrato({...data,  }))
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
        <Typography variant='h6'>Novo Cliente Contrato</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='id'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Id'
                  onChange={onChange}
                  placeholder='(e.g.: Id do contrato)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='valorContrato'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Valor do contrato'
                  onChange={onChange}
                  placeholder='(e.g.: R$ 1500,00)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='periodicidade'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Periodicidade'
                  onChange={onChange}
                  placeholder='(e.g.: Periodicidade do contrato)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='clienteId'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Id do cliente'
                  onChange={onChange}
                  placeholder='(e.g.: Id do cliente)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='bomControleContratoId'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Id contrato do bom controle'
                  onChange={onChange}
                  placeholder='(e.g.: Id contrato do bom controle)'
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
SidebarClienteContratoAdd.acl = {
  action: 'create',
  subject: 'ac-cliente-contrato-page'
}

export default SidebarClienteContratoAdd