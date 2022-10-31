// ** React Imports
import { useState, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import StoreSearchOutline from 'mdi-material-ui/StoreSearchOutline'
import Divider from '@mui/material/Divider'
import Grid, { GridProps } from '@mui/material/Grid'
import Collapse from '@mui/material/Collapse'
import { styled, alpha, useTheme } from '@mui/material/styles'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import Tooltip from '@mui/material/Tooltip';
import Plus from 'mdi-material-ui/Plus'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addClienteServico } from 'src/store/negocios/comercial/cliente/servico'

// ** Types Imports
import { AppDispatch } from 'src/store'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import clienteApiService from 'src/@api-center/negocios/comercial/cliente/clienteApiService'
import servicoApiService from 'src/@api-center/negocios/comercial/servico/servicoApiService'

interface SidebarClienteServicoAddType {
  clienteId: string | undefined
  open: boolean
  toggle: () => void
}

let servicos: { id: string, nome: string  }[] = [];
const cobrancaTipos : string[] = ["UNICO", "RECORRENTE"];

interface ClienteServicoData {
  valorVenda: number,
  caracteristicas: string,
  cobrancaTipo: string,
  clienteId: string,
  servicoId: string,
  status: string
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

const defaultValues = {
  valorVenda: null,
  caracteristicas: '',
  cobrancaTipo: 'NENHUM',
  clienteId: '',
  servicoId: '',
  status: ''
}

const SidebarClienteServicoAdd = (props: SidebarClienteServicoAddType) => {
  const storedToken = window.localStorage.getItem(clienteApiService.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: "Bearer " + storedToken
    }
  }

  useEffect(() => {
    axios
      .get(`${servicoApiService.listToSelectAsync}`, config)
      .then(response => {
        servicos = response.data
      })
  }, [servicos]);

  // ** Props
  const { open, toggle } = props
  
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
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

  const onSubmit = (data: ClienteServicoData) => {
    debugger
    data.clienteId = props?.clienteId || ""
    dispatch(addClienteServico({ ...data,  }))
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  const resolveValor = (event: { currentTarget: { value: string; name: any } }) => {
    if (event.currentTarget.value === null)
    {
      setValue(event.currentTarget.name, 0);
    }
    else
    {
      setValue(event.currentTarget.name, event.currentTarget.value);
    }
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
        <Typography variant='h6'>Novo Cliente Serviço</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="servicoId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id='single-select-um-chip-label'>Serviço</InputLabel>
                    <Select
                      name="servicoId"
                      autoWidth
                      label="Serviço"
                      MenuProps={MenuProps}
                      onChange={onChange}
                      defaultValue=''
                      id='single-select-um'
                      labelId='single-select-um-chip-label'
                    >
                      <MenuItem value='null'>
                        <em>NENHUM</em>
                      </MenuItem>
                      {
                        servicos.map(srvc => (
                          <MenuItem key={srvc.id} value={srvc.nome}>
                            {srvc.nome}
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
              name='valorVenda'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  variant="outlined"
                  value={value}
                  label='Valor venda'
                  name='valorVenda'
                  inputProps={{
                    step: 0.5,
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                    endAdornment: <InputAdornment position="end">per person</InputAdornment>,
                  }}
                  onChange={(): void =>  {
                    onChange
                    resolveValor
                  }}
                  placeholder='(e.g.: R$ 150,00)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="cobrancaTipo"
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id='single-select-um-chip-label'>Cobrança tipo</InputLabel>
                    <Select
                      name="cobrancaTipo"
                      autoWidth
                      label="Cobrança tipo"
                      MenuProps={MenuProps}
                      onChange={onChange}
                      defaultValue=''
                      id='single-select-um'
                      labelId='single-select-um-chip-label'
                    >
                      <MenuItem value='null'>
                        <em>NENHUM</em>
                      </MenuItem>
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

export default SidebarClienteServicoAdd