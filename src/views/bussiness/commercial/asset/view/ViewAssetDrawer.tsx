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
import { AssetsType } from 'src/types/apps/assetTypes'

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
      width: 350,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

interface SidebarAddAssetType {
  row: AssetsType
  open: boolean
  toggle: () => void
}

interface AssetData {
  nome: string
  referencia: string
  codigoUnico: string
  tipo: string
  valorCusto: string
  valorVenda: string
  unidadeMedida: string
  clienteAtivoTipoServicoTipo: string
  caracteristica: string
  observacao: string
  status: string
}

const tipos : string[] = ["SERVICO", "PRODUTO"];
const servicoTipos : string[] = ["NENHUM", "UNICO", "RECORRENTE"];
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
    .required(),
  unidadeMedida: yup
    .string()
    .min(1, obj => showErrors('Unidade medida', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  nome: '',
  referencia: null,
  codigoUnico: null,
  tipo: '',
  valorCusto: '',
  valorVenda: '',
  unidadeMedida: '',
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

  // **

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

  const onSubmit = (data: AssetData) => {
    dispatch(addAsset({ ...data,  }))
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  const resolveComma = (event: { currentTarget: { value: string; name: any } }) => {
    if (event.currentTarget.value.includes(','))
    {
      var replace = event.currentTarget.value.replace(",", ".");
      setValue(event.currentTarget.name, replace);
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
        <Typography variant='h6'>{t("Asset View")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='nome'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.nome}
                  placeholder='Nome'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='referencia'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.referencia}
                  placeholder='Referência'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='codigoUnico'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.codigoUnico}
                  placeholder='Código Único'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='tipo'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.tipo}
                  placeholder='Tipo'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='valorCusto'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.valorCusto}
                  placeholder='Valor custo'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='valorVenda'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.valorVenda}
                  placeholder='Valor venda'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='unidadeMedida'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.unidadeMedida}
                  placeholder='Unidade medida'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='clienteAtivoTipoServicoTipo'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.clienteAtivoTipoServicoTipo}
                  placeholder='Serviço tipo'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='caracteristica'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.caracteristica}
                  placeholder='Característica'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='observacao'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={props.row.observacao}
                  placeholder='Observação'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='status'
              control={control}
              render={() => (
                <TextField
                  disabled='true'
                  value={t(props.row.status)}
                  placeholder='Status'
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