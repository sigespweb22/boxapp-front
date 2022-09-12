// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { editClient } from 'src/store/bussiness/commercial/client'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { ClientsType } from 'src/types/bussiness/commercial/client/clientTypes'

interface SidebarEditClientType {
  row: ClientsType | undefined
  open: boolean
  toggle: () => void
}

interface ClientData {
  id: string
  nomeFantasia: string
  razaoSocial: string
  inscricaoEstadual: string
  cnpj: string
  telefonePrincipal: string
  emailPrincipal: string
  observacao: string
  dataFundacao: string
  codigoMunicipio: string
  rua: string
  numero: string
  complemento: string
  cidade: string
  estado: string
  cep: string
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

const schema = yup.object().shape({
  nomeFantasia: yup
    .string()
    .required("Nome fantasia é requerido."),
  razaoSocial: yup
    .string()
    .required("Razão social é requerida."),
  cnpj: yup
    .string()
    .required("CNPJ é requerido.")
})

const defaultValues = {
  id: '',
  nomeFantasia: '',
  razaoSocial: '',
  inscricaoEstadual: '',
  cnpj: '',
  telefonePrincipal: '',
  emailPrincipal: '',
  observacao: '',
  dataFundacao: '',
  codigoMunicipio: '',
  rua: '',
  numero: '',
  complemento: '',
  cidade: '',
  estado: '',
  cep: '',
  status: ''
}

const SidebarEditClient = (props: SidebarEditClientType) => {
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
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const defaultValues = {
    id: props?.row?.id ?? '',
    nomeFantasia: props?.row?.nomeFantasia ?? '',
    razaoSocial: props?.row?.razaoSocial ?? '',
    inscricaoEstadual: props?.row?.inscricaoEstadual ?? '',
    cnpj: props?.row?.cnpj ?? '',
    telefonePrincipal: props?.row?.telefonePrincipal ?? '',
    emailPrincipal: props?.row?.emailPrincipal ?? '',
    observacao: props?.row?.observacao ?? '',
    dataFundacao: props?.row?.dataFundacao ?? '',
    codigoMunicipio: props?.row?.codigoMunicipio ?? '',
    rua: props?.row?.rua ?? '',
    numero: props?.row?.numero ?? '',
    complemento: props?.row?.complemento ?? '',
    cidade: props?.row?.cidade ?? '',
    estado: props?.row?.estado ?? '',
    cep: props?.row?.cep ?? '',
    status: props?.row?.status ?? '',
  }

  // ** Set values
  setValue('id', defaultValues.id)
  setValue('nomeFantasia', defaultValues.nomeFantasia)
  setValue('razaoSocial', defaultValues.razaoSocial)
  setValue('inscricaoEstadual', defaultValues.inscricaoEstadual)
  setValue('cnpj', defaultValues.cnpj)
  setValue('telefonePrincipal', defaultValues.telefonePrincipal)
  setValue('emailPrincipal', defaultValues.emailPrincipal)
  setValue('observacao', defaultValues.observacao)
  setValue('dataFundacao', defaultValues.dataFundacao)
  setValue('codigoMunicipio', defaultValues.codigoMunicipio)
  setValue('rua', defaultValues.rua)
  setValue('numero', defaultValues.numero)
  setValue('complemento', defaultValues.complemento)
  setValue('cidade', defaultValues.cidade)
  setValue('estado', defaultValues.estado)
  setValue('cep', defaultValues.cep)
  setValue('status', defaultValues.status)

  const onSubmit = (data: ClientsType) => {
    dispatch(editClient({ ...data,  }))
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
        <Typography variant='h6'>{t("Client Edit")}</Typography>
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
              name='nomeFantasia'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Nome fantasia'
                  onChange={onChange}
                  placeholder='(e.g.: Ex.: Empresa de software)'
                  error={Boolean(errors.nomeFantasia)}
                />
              )}
            />
            {errors.nomeFantasia && <FormHelperText sx={{ color: 'error.main' }}>{errors.nomeFantasia.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='razaoSocial'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Razão social'
                  onChange={onChange}
                  placeholder='(e.g.: Ex.: Empresa de software LTDA)'
                  error={Boolean(errors.razaoSocial)}
                />
              )}
            />
            {errors.razaoSocial && <FormHelperText sx={{ color: 'error.main' }}>{errors.razaoSocial.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='inscricaoEstadual'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Inscrição estadual'
                  onChange={onChange}
                  placeholder='(e.g.: Ex.: 12345678912345)'
                  error={Boolean(errors.razaoSocial)}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='cnpj'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='CNPJ'
                  onChange={onChange}
                  placeholder='(e.g.: Ex.: 60.133.365/0001-16)'
                  error={Boolean(errors.cnpj)}
                />
              )}
            />
            {errors.cnpj && <FormHelperText sx={{ color: 'error.main' }}>{errors.cnpj.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='telefonePrincipal'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Telefone principal'
                  onChange={onChange}
                  placeholder='(e.g.: Ex.: (48) 3451-6526)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='emailPrincipal'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='E-mail principal'
                  onChange={onChange}
                  placeholder='(e.g.: Ex.: empresa@empresa.com'
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
                  label='Observacao'
                  onChange={onChange}
                  placeholder='(e.g.: Ex.: Esta empresa está em processo de evolução'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='dataFundacao'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Data fundação'
                  onChange={onChange}
                  placeholder='(e.g.: Ex.: 10/01/2000'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='codigoMunicipio'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Código município'
                  onChange={onChange}
                  placeholder='(e.g.: Ex.: 654789'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='rua'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Rua'
                  onChange={onChange}
                  placeholder='(e.g.: Rua Abílio Diniz'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='numero'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Número'
                  onChange={onChange}
                  placeholder='(e.g.: 52'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='complemento'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Complemento'
                  onChange={onChange}
                  placeholder='(e.g.: Próximo ao Banco do Brasil'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='cidade'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Cidade'
                  onChange={onChange}
                  placeholder='(e.g.: Criciúma'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='estado'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Estado'
                  onChange={onChange}
                  placeholder='(e.g.: Santa Catarina'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='cep'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Cep'
                  onChange={onChange}
                  placeholder='(e.g.: 88801-430'
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

export default SidebarEditClient