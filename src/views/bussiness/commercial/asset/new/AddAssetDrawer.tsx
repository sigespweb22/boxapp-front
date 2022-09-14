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

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Copmponents Imports
import Select from '@mui/material/Select'

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
import { AssetsType } from 'src/types/apps/assetTypes'

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

interface SidebarAddAssetType {
  open: boolean
  toggle: () => void
}

const tipos : string[] = ["SERVICO", "PRODUTO"];
const servicoTipos : string[] = ["UNICO", "RECORRENTE"];
const unidadesMedida : string[] = ["CPU", "HR", "GB", "vCPU"];

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
    .required()
})

const defaultValues = {
  nome: '',
  referencia: null,
  codigoUnico: null,
  tipo: null,
  valorCusto: 0,
  valorVenda: 0,
  unidadeMedida: 'NENHUM',
  clienteAtivoTipoServicoTipo: 'NENHUM',
  caracteristica: '',
  observacao: '',
  status: ''
}

const SidebarAddAsset = (props: SidebarAddAssetType) => {
  // ** Hook
  const { t } = useTranslation()

  // ** Props
  const { open, toggle } = props

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: AssetsType) => {
    dispatch(addAsset({ ...data,  }))
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  const resolveValor = (event: { currentTarget: { value: string; name: any } }) => {
    if (event.currentTarget.value === '')
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
                  placeholder='(e.g.: Ex.: Hospedagem de sites 10GB)'
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
              name="tipo"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => {
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
                      {
                        tipos.map(tipo => (
                          <MenuItem key={tipo} value={tipo}>
                            {tipo}
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
                  type='number'
                  value={value}
                  label='Valor custo'
                  name='valorCusto'
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
              name='valorVenda'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Valor venda'
                  name='valorVenda'
                  onChange={(): void => {
                    onChange
                    resolveValor
                  }}
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
              render={({ field: { onChange } }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id='single-select-um-chip-label'>{t("Unit Measurement")}</InputLabel>
                    <Select
                      name="tipo"
                      autoWidth
                      label="Tipo"
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
                        unidadesMedida.map(tipo => (
                          <MenuItem key={tipo} value={tipo}>
                            {tipo}
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
              name="clienteAtivoTipoServicoTipo"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id='single-select-st-chip-label'>{t("Type of Service")}</InputLabel>
                    <Select
                      name="clienteAtivoTipoServicoTipo"
                      autoWidth
                      label="Serviço tipo"
                      MenuProps={MenuProps}
                      onChange={onChange}
                      defaultValue=''
                      id='single-select-st'
                      labelId='single-select-st-chip-label'
                    >
                      <MenuItem value='null'>
                        <em>NENHUM</em>
                      </MenuItem>
                      {
                        servicoTipos.map(st => (
                          <MenuItem key={st} value={st}>
                            {st}
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
                  label='Características'
                  onChange={onChange}
                  placeholder='(e.g.: Produto frágil ou Serviço de baixa complexidade)'
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
                  placeholder='(e.g.: Sempre verificar disponibilidade)'
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