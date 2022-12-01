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

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { editServico } from 'src/store/negocios/comercial/servico'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { ServicoType } from 'src/types/negocios/comercial/servico/servicoTypes'
import { ThemeColor } from 'src/@core/layouts/types'

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
  row: ServicoType | undefined
  open: boolean
  toggle: () => void
}

interface ServicoData {
  id: string
  nome: string
  codigoUnico: string
  tipo: string
  valorCusto: string
  caracteristicas: string
  unidadeMedida: string
  status: string
  fornecedorServico: {id: string, nome: string}
  fornecedorServicoId: string
  avatarColor: ThemeColor
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

const defaultValues = {
  id: '',
  nome: '',
  codigoUnico: '',
  tipo: '',
  valorCusto: '',
  unidadeMedida: '',
  fornecedorServico: {id: '', nome: ''},
  caracteristicas: '',
  status: ''
}

const SidebarServicoEdit = (props: SidebarAddServicoType) => {
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

  useEffect(() => {

    // ** Set values
    setValue('id', props?.row?.id || '')
    setValue('nome', props?.row?.nome || '')
    setValue('codigoUnico', props?.row?.codigoUnico || '')
    setValue('tipo', props?.row?.tipo || '')
    setValue('valorCusto', props?.row?.valorCusto || '')
    setValue('unidadeMedida', props?.row?.unidadeMedida || '')
    setValue('fornecedorServico', props?.row?.fornecedorServico || {id: '', nome: ''})
    setValue('caracteristicas', props?.row?.caracteristicas || '')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

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
  
  const onSubmit = (data: ServicoData) => {
    dispatch(editServico({ ...data }))
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
        <Typography variant='h6'>Editar Serviço</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='id'
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  disabled
                  value={value}
                  label='Id'
                />
              )}
            />
          </FormControl>
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
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='string'
                  value={value}
                  label='Valor custo'
                  name='valorCusto'
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
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id='single-select-um-chip-label'>{t("Unit Measurement")}</InputLabel>
                    <Select
                      name="unidadeMedida"
                      autoWidth
                      label="Unidade medida"
                      value={value}
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
          <FormControl fullWidth sx={{ mb: 6 }} >
            <Controller
              name={"fornecedorServico"}
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    multiple={false}
                    options={fornecedoresServicos || []}
                    filterSelectedOptions
                    value={value}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={option => option.nome}
                    renderInput={params => (
                      <TextField {...params} label="Fornecedor Serviço" placeholder='(e.g.: E-mail 50GB)' />
                    )}
                    onChange={(event, newValue) => {
                      setValue('fornecedorServico', newValue || {id: '', nome: ''})
                      onChange(newValue)
                    }}
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
                  placeholder='(e.g.: Produto frágil ou Serviço de baixa complexidade)'
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
SidebarServicoEdit.acl = {
  action: 'update',
  subject: 'ac-servico-page'
}

export default SidebarServicoEdit