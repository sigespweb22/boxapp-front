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
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import Tooltip from '@mui/material/Tooltip'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addClientes } from 'src/store/negocios/comercial/cliente'

// ** Types Imports
import { AppDispatch } from 'src/store'

// ** Axios Imports
import axios from 'axios'

// ** InputMask Imports
import InputMask from 'react-input-mask'

// ** Api Services
import clientApiService from 'src/@api-center/negocios/comercial/cliente/clienteApiService'
import enumApiService from 'src/@api-center/sistema/enum/enumServicoApiService'
import { Autocomplete } from '@mui/material'

interface ClienteAddDrawerType {
  open: boolean
  toggle: () => void
}

interface ClientData {
  nomeFantasia: string
  razaoSocial: string
  inscricaoEstadual: string
  tipoPessoa: string
  cnpj: string
  cpf: string
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
    .required()
})

const defaultValues = {
  nomeFantasia: '',
  razaoSocial: '',
  inscricaoEstadual: '',
  tipoPessoa: 'JURIDICA',
  cnpj: '',
  cpf: '',
  telefonePrincipal: '',
  emailPrincipal: '',
  observacao: '',
  dataFundacao: '0001-01-01 00:00:00',
  codigoMunicipio: '',
  rua: '',
  numero: '',
  complemento: '',
  cidade: '',
  estado: '',
  cep: '',
  status: ''
}

const ClienteAddDrawer = (props: ClienteAddDrawerType) => {
  // ** Props
  const { open, toggle } = props

  // ** Hooks
  const { t } = useTranslation()
  const [cnpjToSearch, setCnpjToSearch] = useState('')

  // ** State
  const [isTipoPessoaFisica, setIsTipoPessoaFisica] = useState(false)
  const [isTipoPessoaJuridica, setIsTipoPessoaJuridica] = useState(true)
  const [tiposPessoa, setTiposPessoa] = useState([])

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(enumApiService.storageTokenKeyName)!}`
    }
  }

  useEffect(() => {
    const tiposPessoaRequest = axios.get(enumApiService.tiposPessoaListAsync, config)
    
    tiposPessoaRequest
      .then(response => {
        if (response.status == 200) setTiposPessoa(response.data)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    dispatch(addClientes({ ...data }))
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
    onChangeIsTipoPessoa('JURIDICA')
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
          response.data.phones.length >= 1 ? `${response.data.phones[0].area}${response.data.phones[0].number}` : defaultValues.telefonePrincipal
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

  const onChangeIsTipoPessoa = (value: string | null) => {
    switch (value) {
      case 'FISICA':
        setIsTipoPessoaFisica(true)
        setIsTipoPessoaJuridica(false)
        break
      case 'JURIDICA':
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
      <Grid container spacing={0} sx={{ pl: 2, pt: 2, pr: 2, pb: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12} md={12} lg={12}>
            <Alert sx={{ mb: '20px' }} severity='warning'>
              {t("To link services, products and contracts to a customer, access its editing area")}.
            </Alert>
          </Grid>
          <Grid>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='tipoPessoa'
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <Autocomplete
                      value={value}
                      options={tiposPessoa}
                      onChange={(event, newValue) => {
                        onChange(newValue), onChangeIsTipoPessoa(newValue)
                      }}
                      id='autocomplete-controlled'
                      renderInput={params => <TextField {...params} label={t("Person type")} />}
                    />
                  )
                }}
              />
            </FormControl>
          </Grid>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='nomeFantasia'
              control={control}
              rules={{ required: true }}           
              render={({ field: { value, onChange } }) => (
                  <TextField
                  value={value}
                  label={t("Trading name")}
                  onChange={onChange}
                  placeholder='e.g.: Empresa de software'
                  error={Boolean(errors.nomeFantasia)}
                />
              )}
            />
          </FormControl>
          {isTipoPessoaFisica? (
            <></>
          ): isTipoPessoaJuridica? (
            <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='razaoSocial'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label={t("Corporate Name")}
                  onChange={onChange}
                  placeholder='e.g.: Empresa de software LTDA'
                />
              )}
            />
          </FormControl>
          ):(<></>)}
          {isTipoPessoaFisica? (
            <></>
          ): isTipoPessoaJuridica? (
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='inscricaoEstadual'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField value={value} label={t("State registration")} onChange={onChange} placeholder='e.g.: 123456' />
                )}
              />
            </FormControl>
          ):(<></>)}
          {isTipoPessoaFisica? (
            <Grid sx={{ display: 'flex', alignItems: 'center', width: 'auto' }} xs={12} md={12} lg={12}>
            <Grid sx={{ width: 'auto' }} xs={10} md={12} lg={12}>
              <FormControl sx={{ mb: 6 }} fullWidth={true}>
                <Controller
                  name='cpf'
                  control={control}
                  render={props => (
                    <InputMask
                      mask='999.999.999-99'
                      value={props.field.value}
                      disabled={false}
                      onChange={(value): void => {
                        props.field.onChange(value)
                        changeHandler(value)
                      }}
                    >
                      <TextField
                        sx={{ width: 'auto' }}
                        disabled={false}
                        name='cpf'
                        type='text'
                        label={t("Individual Taxpayer Registration")}
                        placeholder='e.g.: 159.753.486-13'
                        error={Boolean(errors.cnpj)}
                      />
                    </InputMask>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          ): isTipoPessoaJuridica? (
            <Grid sx={{ display: 'flex', alignItems: 'center', width: 'auto' }} xs={12} md={12} lg={12}>
              <Grid sx={{ width: 'auto' }} xs={10} md={10} lg={10}>
                <FormControl sx={{ mb: 6 }} fullWidth={true}>
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
                          sx={{ width: 'auto' }}
                          disabled={false}
                          name='cnpj'
                          type='text'
                          label={t("Federal registration")}
                          placeholder='e.g.: 60.133.365/0001-16'
                          error={Boolean(errors.cnpj)}
                        />
                      </InputMask>
                    )}
                  />
                  {errors.cnpj && <FormHelperText sx={{ color: 'error.main' }}>{errors.cnpj.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid xs={2} md={2} lg={2}>
                <Tooltip title={t('Search CNPJ')}>
                  <IconButton onClick={handleClick} sx={{ ml: 4, mb: 6 }} aria-label='capture screenshot' color='primary'>
                    <StoreSearchOutline fontSize='medium' />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          ):(<></>)}
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='telefonePrincipal'
              control={control}
              render={props => (
                <InputMask
                  mask='(99) 9.9999-9999'
                  value={props.field.value}
                  disabled={false}
                  onChange={(value): void => {
                    props.field.onChange(value)
                    changeHandler(value)
                  }}
                >
                  <TextField
                    sx={{ width: 'auto' }}
                    disabled={false}
                    name='telefonePrincipal'
                    type='text'
                    label={t("Phone number")}
                    placeholder='e.g.: (48) 9.8896-1111'
                  />
                </InputMask>
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
                  label={t("E-mail")}
                  onChange={onChange}
                  placeholder='e.g.: nome@email.com'
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
                  label={t("Note")}
                  onChange={onChange}
                  placeholder={t("(e.g.: Note about the customer)")}
                />
              )}
            />
          </FormControl>
          {isTipoPessoaFisica? (
            <></>
          ): isTipoPessoaJuridica? (
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='dataFundacao'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField value={value} label={t("Foundation date")} onChange={onChange} placeholder='e.g.: 10/01/2000' />
                )}
              />
            </FormControl>
          ):(<></>)}
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='codigoMunicipio'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label={t("City code")}
                  onChange={onChange}
                  placeholder='e.g.: 654789'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='rua'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField value={value} label={t("Street")} onChange={onChange} placeholder='e.g.: Rua Abílio Diniz' />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='numero'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField value={value} label={t("Number")} onChange={onChange} placeholder='e.g.: 52' />
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
                  label={t("Address complement")}
                  onChange={onChange}
                  placeholder={t("(e.g.: Next to Banco do Brasil)")}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='cidade'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField value={value} label={t("City")} onChange={onChange} placeholder='e.g.: Criciúma' />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='estado'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField value={value} label={t("State")} onChange={onChange} placeholder='e.g.: Santa Catarina' />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='cep'
              control={control}
              render={props => (
                <InputMask
                  mask='99999-999'
                  value={props.field.value}
                  disabled={false}
                  onChange={(value): void => {
                    props.field.onChange(value)
                    changeHandler(value)
                  }}
                >
                  <TextField
                    sx={{ width: 'auto' }}
                    disabled={false}
                    name='cep'
                    type='text'
                    label={t("Zip code")}
                    placeholder='e.g.: 88801-000'
                  />
                </InputMask>
              )}
            />
          </FormControl>
          {isTipoPessoaFisica}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} onClick={handleSubmit(onSubmit)}>
              {t("Save")}
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              {t("Cancel")}
            </Button>
          </Box>
        </form>
      </Grid>
    </Drawer>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ClienteAddDrawer.acl = {
  action: 'create',
  subject: 'ac-cliente-page'
}

export default ClienteAddDrawer
