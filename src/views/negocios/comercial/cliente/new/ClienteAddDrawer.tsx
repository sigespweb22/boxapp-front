// ** React Imports
import { useState, ChangeEvent } from 'react'

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
import { styled } from '@mui/material/styles'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import Tooltip from '@mui/material/Tooltip'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addClient } from 'src/store/negocios/comercial/cliente'

// ** Types Imports
import { AppDispatch } from 'src/store'

// ** Axios Imports
import axios from 'axios'

// ** InputMask Imports
import InputMask from 'react-input-mask'

// ** Api Services
import clientApiService from 'src/@api-center/negocios/comercial/cliente/clienteApiService'
import { Autocomplete } from '@mui/material'

interface SidebarClienteAddType {
  open: boolean
  toggle: () => void
}

interface ClientData {
  id: string
  nomeFantasia: string
  razaoSocial: string
  inscricaoEstadual: string
  tipoPessoa: string
  cnpj: string
  telefonePrincipal: string
  emailPrincipal: string
  observacao: string
  dataFundacao: string
  codigoMunicipio: number
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
    .min(3, obj => showErrors('Nome fantasia', obj.value.length, obj.min))
    .required(),
  razaoSocial: yup
    .string()
    .min(3, obj => showErrors('Razão social', obj.value.length, obj.min))
    .required(),
  cnpj: yup
    .string()
    .min(14, obj => showErrors('Cnpj', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  id: '',
  nomeFantasia: '',
  razaoSocial: '',
  inscricaoEstadual: '',
  tipoPessoa: '',
  cnpj: '',
  telefonePrincipal: '',
  emailPrincipal: '',
  observacao: '',
  dataFundacao: '0001-01-01 00:00:00',
  codigoMunicipio: 0,
  rua: '',
  numero: '',
  complemento: '',
  cidade: '',
  estado: '',
  cep: '',
  status: ''
}

const SidebarClienteAdd = (props: SidebarClienteAddType) => {
  // ** Props
  const { open, toggle } = props

  // ** Hooks
  const { t } = useTranslation()
  const [cnpjToSearch, setCnpjToSearch] = useState('')

  const [isTipoPessoaFisica, setIsTipoPessoaFisica] = useState(false)
  const [isTipoPessoaJuridica, setIsTipoPessoaJuridica] = useState(true)

  const options = ['Pessoa fisíca', 'Pessoa juridíca']

  const dispatch = useDispatch<AppDispatch>()

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: ClientData) => {
    dispatch(addClient({ ...data }))
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCnpjToSearch(event.target.value)
  }

  const handleClick = () => {
    if (typeof cnpjToSearch == 'undefined' || cnpjToSearch == '') {
      return toast.error('CNPJ é requerido para efetuar a busca.')
    }

    const storedToken = window.localStorage.getItem(clientApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: 'Bearer ' + storedToken
      }
    }

    const cnpjScape = cnpjToSearch.replace('.', '').replace('.', '').replace('/', '').replace('-', '')
    axios
      .get(clientApiService.listOneTPAsync.concat(cnpjScape), config)
      .then(response => {
        toast.success('CNPJ encontrado! Os dados da empresa serão automaticamente populados nos campos.')

        setValue('nomeFantasia', response.data.alias != '' ? response.data.alias : defaultValues.nomeFantasia)
        setValue(
          'razaoSocial',
          response.data.company.name != '' ? response.data.company.name : defaultValues.razaoSocial
        )
        setValue(
          'telefonePrincipal',
          response.data.phones.length >= 1 ? response.data.phones[0].number : defaultValues.telefonePrincipal
        )
        setValue(
          'emailPrincipal',
          response.data.emails.length >= 1 ? response.data.emails[0].address : defaultValues.emailPrincipal
        )
        setValue('dataFundacao', response.data.founded != '' ? response.data.founded : defaultValues.dataFundacao)
        setValue(
          'codigoMunicipio',
          response.data.address.municipality != '' ? response.data.address.municipality : defaultValues.dataFundacao
        )
        setValue('rua', response.data.address.street + ' - ' + response.data.address.district)
        setValue('numero', response.data.address.number != '' ? response.data.address.number : defaultValues.numero)
        setValue(
          'complemento',
          response.data.address.details != '' ? response.data.address.details : defaultValues.complemento
        )
        setValue('cidade', response.data.address.city != '' ? response.data.address.city : defaultValues.cidade)
        setValue('estado', response.data.address.state != '' ? response.data.address.state : defaultValues.estado)
        setValue('cep', response.data.address.zip != '' ? response.data.address.zip : defaultValues.cep)
      })
      .catch(resp => {
        if (resp.message == 'Network Error') return toast.error('Você não tem permissão para esta ação.')

        if (typeof resp.response.data != 'undefined') {
          resp.response.data.errors.forEach((err: any) => {
            try {
              const statusCode = err.match(/\d+/)[0]
              if (statusCode === '0') return toast.error('Ops! Algo deu errado.')
              if (statusCode === '404') return toast.error('CNPJ não encontrado na receita federal.')
              if (statusCode === '400')
                return toast.error('Ops! Algo deu errado. Verifique o CNPJ informado e tente novamente.')
            } catch (e) {
              return toast.error(`${e}<br>Ops! Algo deu errado.`)
            }
          })
        }
      })
  }

  const onChangeIsTipo = (value: any) => {
    switch (value) {
      case isTipoPessoaFisica:
        setIsTipoPessoaFisica(true)
        setIsTipoPessoaJuridica(false)
        break

      case isTipoPessoaJuridica:
        setIsTipoPessoaFisica(false)
        setIsTipoPessoaJuridica(true)
        break

      default:
        return null
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
        <Typography variant='h6'>{t('Client New')}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Alert sx={{ mb: '20px' }} severity='warning'>
            Para vincular serviços a um cliente, acesse a sua área de edição.
          </Alert>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='tipoPessoa'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    value={value}
                    sx={{ width: 360 }}
                    options={options}
                    onChange={(event, newValue) => {
                      onChange(newValue)
                      onChangeIsTipo(newValue)
                    }}
                    id='autocomplete-controlled'
                    renderInput={params => <TextField {...params} label='Tipo de pessoa' />}
                  />
                )
              }}
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
                  placeholder='(e.g.: Empresa de software)'
                  error={Boolean(errors.nomeFantasia)}
                />
              )}
            />
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
                  placeholder='(e.g.: Empresa de software LTDA)'
                  error={Boolean(errors.razaoSocial)}
                />
              )}
            />
            {errors.razaoSocial && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.razaoSocial.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='inscricaoEstadual'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField value={value} label='Inscrição estadual' onChange={onChange} placeholder='(e.g.: 123456)' />
              )}
            />
          </FormControl>
          <FormControl fullWidth={false} sx={{ width: '290px', mb: 6 }}>
            <Controller
              name='cnpj'
              control={control}
              render={props => (
                <InputMask
                  mask='99.999.999/9999-99'
                  value={props.field.value}
                  disabled={false}
                  onChange={(value): void => {
                    props.field.onChange(value)
                    changeHandler(value)
                  }}
                >
                  <TextField
                    disabled={false}
                    name='cnpj'
                    type='text'
                    label='Cnpj'
                    placeholder='(e.g.: 60.133.365/0001-16)'
                    error={Boolean(errors.cnpj)}
                  />
                </InputMask>
              )}
            />
            {errors.cnpj && <FormHelperText sx={{ color: 'error.main' }}>{errors.cnpj.message}</FormHelperText>}
          </FormControl>
          <Tooltip title={t('Search CNPJ')}>
            <IconButton
              onClick={handleClick}
              sx={{ ml: 2, height: '58px', width: '38px' }}
              aria-label='capture screenshot'
              color='primary'
            >
              <StoreSearchOutline fontSize='medium' />
            </IconButton>
          </Tooltip>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='telefonePrincipal'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Telefone principal'
                  onChange={onChange}
                  placeholder='(e.g.: (48) 3051.8896))'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='emailPrincipal'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='E-mail principal'
                  onChange={onChange}
                  placeholder='(e.g.: empresa@empresa.com'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='observacao'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Observacao'
                  onChange={onChange}
                  placeholder='(e.g.: Esta empresa está em processo de evolução'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='dataFundacao'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField value={value} label='Data fundação' onChange={onChange} placeholder='(e.g.: 10/01/2000' />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='codigoMunicipio'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Código município'
                  onChange={onChange}
                  placeholder='(e.g.: 654789'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='rua'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField value={value} label='Rua' onChange={onChange} placeholder='(e.g.: Rua Abílio Diniz' />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='numero'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField value={value} label='Número' onChange={onChange} placeholder='(e.g.: 52' />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='complemento'
              control={control}
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
              render={({ field: { value, onChange } }) => (
                <TextField value={value} label='Cidade' onChange={onChange} placeholder='(e.g.: Criciúma' />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='estado'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField value={value} label='Estado' onChange={onChange} placeholder='(e.g.: Santa Catarina' />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='cep'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField value={value} label='Cep' onChange={onChange} placeholder='(e.g.: 88801-430' />
              )}
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} onClick={handleSubmit(onSubmit)}>
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
SidebarClienteAdd.acl = {
  action: 'create',
  subject: 'ac-cliente-page'
}

export default SidebarClienteAdd
