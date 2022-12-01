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
import { editClienteServico } from 'src/store/negocios/comercial/cliente/servico'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { ClienteServicoType } from 'src/types/negocios/comercial/cliente/servico/clienteServicoTypes'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import clienteApiService from 'src/@api-center/negocios/comercial/cliente/clienteApiService'
import servicoApiService from 'src/@api-center/negocios/comercial/servico/servicoApiService'

interface SidebarClienteServicoEditType {
  row: ClienteServicoType | undefined
  open: boolean
  toggle: () => void
}

interface ServicoType {
  id: string
  nome: string
}

let servicos: { id: string, nome: string  }[] = [];
const cobrancaTipos : string[] = ["NENHUM", "UNICO", "RECORRENTE"];

interface ClienteServicoData {
  id: string,
  nome: string
  valorVenda: string,
  caracteristicas: string,
  cobrancaTipo: string,
  clienteId: string,
  servicoId: string,
  servico: ServicoType,
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
  valorVenda: '',
  caracteristicas: '',
  cobrancaTipo: 'NENHUM',
  clienteId: '',
  servico: {id: '', nome: ''},
  status: ''
}

const SidebarClienteServicoEdit = (props: SidebarClienteServicoEditType) => {
  const config = {
    headers: {
      Authorization: `${window.localStorage.getItem(clienteApiService.storageTokenKeyName)!}`
    }
  }

  useEffect(() => {
    axios
      .get(`${servicoApiService.listToSelectAsync}`, config)
      .then(response => {
        servicos = response.data
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicos]);

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
    setValue('clienteId', props?.row?.clienteId || '')
    setValue('valorVenda', props?.row?.valorVenda || '')
    setValue('cobrancaTipo', props?.row?.cobrancaTipo || '')
    setValue('servico', props?.row?.servico || {id: '', nome: ''})
    setValue('caracteristicas', props?.row?.caracteristicas || '')

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const onSubmit = (data: ClienteServicoData) => {
    dispatch(editClienteServico({ ...data,  }))
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
        <Typography variant='h6'>Editar Cliente Serviço</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="servico"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    value={value}
                    sx={{ width: 360 }}
                    options={servicos}
                    onChange={(event, newValue) => {
                      setValue('servico', newValue || {id: '', nome: ''})
                      onChange(newValue)
                    }}
                    id='autocomplete-controlled'
                    getOptionLabel={option => option.nome}
                    renderInput={params => <TextField {...params} label='Serviço' />}
                  />
                )
              }}
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
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="cobrancaTipo"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id='single-select-um-chip-label'>Cobrança tipo</InputLabel>
                    <Select
                      value={value}
                      name="cobrancaTipo"
                      autoWidth
                      label="Cobrança tipo"
                      MenuProps={MenuProps}
                      onChange={onChange}
                      id='single-select-um'
                      labelId='single-select-um-chip-label'
                    >
                      {
                        cobrancaTipos.map(ct => (
                          <MenuItem key={ct} value={ct}>
                            {ct}
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
SidebarClienteServicoEdit.acl = {
  action: 'update',
  subject: 'ac-cliente-servico-page'
}

export default SidebarClienteServicoEdit