// ** React Imports
import { useEffect } from 'react'

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
import { addServico } from 'src/store/negocios/comercial/servico'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { ServicoType } from 'src/types/negocios/comercial/servico/servicoTypes'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import fornecedorServicoApiService from 'src/@api-center/negocios/parceiros/fornecedor/servico/fornecedorServicoApiService'

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

interface SidebarAddServicoType {
  open: boolean
  toggle: () => void
}

const unidadesMedida : string[] = ["NENHUM", "CPU", "HR", "GB", "vCPU"];
let fornecedoresServicos: { id: string, nome: string  }[] = [];

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

const SidebarAddServico = (props: SidebarAddServicoType) => {
  // ** Props
  const { open, toggle } = props

  const defaultValues = {
    nome: '',
    codigoUnico: '',
    valorCusto: '',
    unidadeMedida: '',
    caracteristicas: '',
    fornecedorServico: {id: '', nome: ''},
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

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(fornecedorServicoApiService.storageTokenKeyName)!}`
    }
  }

  useEffect(() => {

    axios
      .get(`${fornecedorServicoApiService.listToSelectAsync}`, config)
      .then(response => {
        fornecedoresServicos = response.data
      })
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fornecedoresServicos]);

  const onSubmit = (data: ServicoType) => {
    dispatch(addServico({ ...data,  }))
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
        <Typography variant='h6'>Novo Serviço</Typography>
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
                  placeholder='(e.g.: Ex.: Hospedagem de sites 10GB)'
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
              name='valorCusto'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Valor custo'
                  onChange={onChange}
                  placeholder='(e.g.: R$ 150,00)'
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
              name="fornecedorServico"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    value={value}
                    sx={{ width: 360 }}
                    options={fornecedoresServicos}
                    onChange={(event, newValue) => {
                      onChange(newValue)
                    }}
                    id='autocomplete-controlled'
                    getOptionLabel={option => option.nome}
                    renderInput={params => <TextField {...params} label='Fornecedor Serviço' />}
                  />
                )
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='caracteristicas'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Características'
                  onChange={onChange}
                  placeholder='(e.g.: Serviço de alta complexidade)'
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
SidebarAddServico.acl = {
  action: 'create',
  subject: 'ac-servico-page'
}

export default SidebarAddServico