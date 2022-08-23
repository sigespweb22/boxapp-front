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
import Chip from '@mui/material/Chip'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Copmponents Imports
import Select, { SelectChangeEvent } from '@mui/material/Select'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addAsset } from 'src/store/apps/asset'

// ** Types Imports
import { AppDispatch } from 'src/store'

// ** Api Services
import apiGroup from 'src/@api-center/group/groupApiService'

// ** Axios Imports
import axios from 'axios'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

interface SidebarAddAssetType {
  open: boolean
  toggle: () => void
}

interface AssetData {
  nome: string
  referencia: string
  codigoUnico: string
  tipo: string
  valorCusto: number
  valorVenda: number
  unidadeMedida: string
  clienteAtivoTipoServicoTipo: string
  caracteristica: string
  observacao: string
  status: string
}

const tipos : string[] = [];
const servicoTipos : string[] = [];
const unidadesMedida : string[] = [];

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
    .required(),
  tipo: yup
    .string()
    .min(1, obj => showErrors('Tipo', obj.value.length, obj.min))
    .required(),
  unidadeMedida: yup
    .string()
    .min(1, obj => showErrors('Unidade medida', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  nome: '',
  referencia: '',
  codigoUnico: '',
  tipo: '',
  valorCusto: '',
  valorVenda: 0,
  unidadeMedida: 0,
  clienteAtivoTipoServicoTipo: '',
  caracteristica: '',
  observacao: '',
  status: ''
}

const SidebarAddAsset = (props: SidebarAddAssetType) => {
  const storedToken = window.localStorage.getItem(apiGroup.storageTokenKeyName)!
  let config = {
    headers: {
      Authorization: "Bearer " + storedToken
    }
  }

  useEffect(() => {
    // ** get tipos

    // ** get servicoTipos

    // ** unidadesMedida

    // axios
    //   .get(apiGroup.listToSelectAsync, config)
    //   .then(response => {
    //     ativos = response.data
    //   })
  }, []);

  // ** Hook
  const { t } = useTranslation()

  // ** Props
  const { open, toggle } = props

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

  const onSubmit = (data: AssetData) => {
    dispatch(addAsset({ ...data,  }))
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
        <Typography variant='h6'>{t("Asset New")}</Typography>
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
                  placeholder='Hospedagem de sites 10GB'
                  error={Boolean(errors.nome)}
                />
              )}
            />
            {errors.nome && <FormHelperText sx={{ color: 'error.main' }}>{errors.nome.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='referencia'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Referência'
                  onChange={onChange}
                  placeholder='(e.g.: #A5B30001)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="tipo"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id='single-select-tipo-chip-label'>{t("Type")}</InputLabel>
                    <Select
                      name="tipo"
                      autoWidth
                      label="Tipo"
                      MenuProps={MenuProps}
                      onChange={onChange}
                      defaultValue=''
                      id='single-select-tipo'
                      labelId='single-select-chip-label'
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText>Auto width</FormHelperText>
                    <Select
                        name="tipo"
                        label="Tipo"
                        value={value}
                        MenuProps={MenuProps}
                        id='single-select-tipo'
                        onChange={onChange}
                        labelId='single-select-chip-label'
                        error={Boolean(errors.tipo)}
                      >
                        {
                          tipos.map(tipo => (
                            <MenuItem key={tipo} value={group.name}>
                              {tipo.name}
                            </MenuItem>
                          ))
                        }
                    </Select>
                    {errors.tipo && <FormHelperText sx={{ color: 'error.main' }}>{errors.tipo.message}</FormHelperText>}
                  </FormControl>
                )
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='valorCusto'
              control={control}
              rules={{ required: true }}
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
              name='valorVenda'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Valor venda'
                  onChange={onChange}
                  placeholder='(e.g.: R$ 300,00)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="unidadeMedida"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id='single-select-unidade-medida-chip-label'>{t("Unit Measurement")}</InputLabel>
                    <Select
                        name="unidadeMedida"
                        multiple
                        label="Unidade medida"
                        value={value}
                        MenuProps={MenuProps}
                        id='single-select-unidade-medida'
                        onChange={onChange}
                        labelId='single-select-unidade-medida-chip-label'
                        error={Boolean(errors.unidadeMedida)}
                      >
                        {
                          unidadesMedida.map(tipo => (
                            <MenuItem key={um} value={um.name}>
                              {um.name}
                            </MenuItem>
                          ))
                        }
                    </Select>
                    {errors.unidadeMedida && <FormHelperText sx={{ color: 'error.main' }}>{errors.unidadeMedida.message}</FormHelperText>}
                  </FormControl>
                )
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="clienteAtivoTipoServicoTipo"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id='single-select-catst-chip-label'>{t("Type of Service")}</InputLabel>
                    <Select
                        name="clienteAtivoTipoServicoTipo"
                        label="Serviço tipo"
                        value={value} 
                        MenuProps={MenuProps}
                        id='single-select-catst'
                        onChange={onChange}
                        labelId='single-select-catst-chip-label'
                        renderValue={selected => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {(selected as unknown as string[]).map(value => (
                              <Chip key={value} label={value} sx={{ m: 0.75 }} />
                            ))}
                          </Box>
                        )}
                      >
                        {
                          servicoTipos.map(st => (
                            <MenuItem key={st} value={st.name}>
                              {st.name}
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
              name='caracteristica'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Característica'
                  onChange={onChange}
                  placeholder='(e.g.: #A5B30001)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='observacao'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Observação'
                  onChange={onChange}
                  placeholder='(e.g.: #A5B30001)'
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

export default SidebarAddAsset