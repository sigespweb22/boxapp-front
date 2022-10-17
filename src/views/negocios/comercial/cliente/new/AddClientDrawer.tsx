// ** React Imports
import { useState, ChangeEvent, SyntheticEvent } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import StoreSearchOutline from 'mdi-material-ui/StoreSearchOutline'
import Divider from '@mui/material/Divider'
import CardContent, { CardContentProps } from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'
import Collapse from '@mui/material/Collapse'
import { styled, alpha, useTheme } from '@mui/material/styles'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
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
import { addClient } from 'src/store/negocios/comercial/cliente'

// ** Types Imports
import { AppDispatch } from 'src/store'

// ** Axios Imports
import axios from 'axios'

// ** InputMask Imports
import InputMask from 'react-input-mask'

// ** Api Services
import clientApiService from 'src/@api-center/negocios/comercial/cliente/clienteApiService'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'

interface SidebarAddClientType {
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

const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(12)
  }
}))

const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
    position: 'absolute'
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const InvoiceAction = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const SidebarAddClient = (props: SidebarAddClientType) => {
  // ** Props
  const { open, toggle } = props
  
  // ** Hooks
  const { t } = useTranslation()
  const [count, setCount] = useState<number>(1)
  const [cnpjToSearch, setCnpjToSearch] = useState('')

  // ** Hook
  const theme = useTheme()

  // ** Deletes form
  const deleteForm = (e: SyntheticEvent) => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

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
    dispatch(addClient({ ...data,  }))
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
    if (typeof cnpjToSearch == 'undefined' ||
        cnpjToSearch == '')
    { 
      return toast.error("CNPJ é requerido para efetuar a busca.")
    }

    const storedToken = window.localStorage.getItem(clientApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    const cnpjScape = cnpjToSearch.replace(".", "").replace(".", "").replace("/", "").replace("-", "")
    axios
      .get(clientApiService.listOneTPAsync.concat(cnpjScape), config)
      .then(response => {
        toast.success("CNPJ encontrado! Os dados da empresa serão automaticamente populados nos campos.")

        setValue('nomeFantasia', response.data.alias != '' ? response.data.alias : defaultValues.nomeFantasia)
        setValue('razaoSocial', response.data.company.name != '' ? response.data.company.name : defaultValues.razaoSocial)
        setValue('telefonePrincipal', response.data.phones.length >= 1 ? response.data.phones[0].number : defaultValues.telefonePrincipal)
        setValue('emailPrincipal', response.data.emails.length >= 1 ? response.data.emails[0].address : defaultValues.emailPrincipal)
        setValue('dataFundacao', response.data.founded != '' ? response.data.founded : defaultValues.dataFundacao)
        setValue('codigoMunicipio', response.data.address.municipality != '' ? response.data.address.municipality : defaultValues.dataFundacao)
        setValue('rua', response.data.address.street + " - " +response.data.address.district)
        setValue('numero', response.data.address.number != '' ? response.data.address.number : defaultValues.numero)
        setValue('complemento', response.data.address.details != '' ? response.data.address.details : defaultValues.complemento)
        setValue('cidade', response.data.address.city != '' ? response.data.address.city : defaultValues.cidade)
        setValue('estado', response.data.address.state != '' ? response.data.address.state : defaultValues.estado)
        setValue('cep', response.data.address.zip != '' ? response.data.address.zip : defaultValues.cep)
      }).catch((resp) => {
        debugger
        if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
        
        if (typeof resp.response.data != 'undefined')
        {
          resp.response.data.errors.forEach((err: any) => {
            try {
              const statusCode =  err.match(/\d+/)[0]
              if (statusCode === "0") return toast.error("Ops! Algo deu errado.")
              if (statusCode === "404") return toast.error("CNPJ não encontrado na receita federal.")
              if (statusCode === "400") return toast.error("Ops! Algo deu errado. Verifique o CNPJ informado e tente novamente.")
            }
            catch (e) {
              return toast.error(`${e}<br>Ops! Algo deu errado.`)
            }
          });
        }
      })
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
        <Typography variant='h6'>{t("Client New")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder='(e.g.: 123456)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth={false} sx={{ width: '290px', mb: 6 }}>
            <Controller
              name='cnpj'
              control={control}
              render={(props) => (
                <InputMask
                  mask="99.999.999/9999-99"
                  value={props.field.value}
                  disabled={false}
                  onChange={(value): void => {
                    props.field.onChange(value)
                    changeHandler(value)
                  }}
                >
                  <TextField
                    disabled={false}
                    name="cnpj"
                    type="text"
                    label='Cnpj'
                    placeholder='(e.g.: 60.133.365/0001-16)'
                    error={Boolean(errors.cnpj)} 
                  />
                </InputMask>
              )}
            />
            {errors.cnpj && <FormHelperText sx={{ color: 'error.main' }}>{errors.cnpj.message}</FormHelperText>}
          </FormControl>
          <Tooltip title={t("Search CNPJ")}>
            <IconButton onClick={handleClick} sx={{ ml: 2, height: '58px', width: '38px' }} aria-label='capture screenshot' color='primary'>
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
                <TextField
                  value={value}
                  label='Data fundação'
                  onChange={onChange}
                  placeholder='(e.g.: 10/01/2000'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='codigoMunicipio'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type="number"
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

          <Divider />
            <RepeaterWrapper>
              <Repeater count={count}>
                {(i: number) => {
                  const Tag = i === 0 ? Box : Collapse
                  return (
                    <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
                      <Grid container>
                        <RepeatingContent item lg={12} md={12} xs={12}>
                          <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                            <Grid item lg={6} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                              <Typography
                                variant='body2'
                                className='col-title'
                                sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                              >
                                Item
                              </Typography>
                              <Select fullWidth size='small' defaultValue='App Design'>
                                <MenuItem value='App Design'>App Design</MenuItem>
                                <MenuItem value='App Customization'>App Customization</MenuItem>
                                <MenuItem value='ABC Template'>ABC Template</MenuItem>
                                <MenuItem value='App Development'>App Development</MenuItem>
                              </Select>
                              <TextField
                                rows={2}
                                fullWidth
                                multiline
                                size='small'
                                sx={{ mt: 3.5 }}
                                defaultValue='Customization & Bug Fixes'
                              />
                            </Grid>
                            <Grid item lg={2} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                              <Typography
                                variant='body2'
                                className='col-title'
                                sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                              >
                                Cost
                              </Typography>
                              <TextField
                                size='small'
                                type='number'
                                placeholder='24'
                                defaultValue='24'
                                InputProps={{ inputProps: { min: 0 } }}
                              />
                              <Box sx={{ mt: 3.5 }}>
                                <Typography component='span' variant='body2'>
                                  Discount:
                                </Typography>{' '}
                                <Typography component='span' variant='body2'>
                                  0%
                                </Typography>
                                <Tooltip title='Tax 1' placement='top'>
                                  <Typography component='span' variant='body2' sx={{ mx: 2 }}>
                                    0%
                                  </Typography>
                                </Tooltip>
                                <Tooltip title='Tax 2' placement='top'>
                                  <Typography component='span' variant='body2'>
                                    0%
                                  </Typography>
                                </Tooltip>
                              </Box>
                            </Grid>
                            <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                              <Typography
                                variant='body2'
                                className='col-title'
                                sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                              >
                                Hours
                              </Typography>
                              <TextField
                                size='small'
                                type='number'
                                placeholder='1'
                                defaultValue='1'
                                InputProps={{ inputProps: { min: 0 } }}
                              />
                            </Grid>
                            <Grid item lg={2} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                              <Typography
                                variant='body2'
                                className='col-title'
                                sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                              >
                                Price
                              </Typography>
                              <Typography>$24.00</Typography>
                            </Grid>
                          </Grid>
                          <InvoiceAction>
                            <IconButton size='small' onClick={deleteForm}>
                              <Close fontSize='small' />
                            </IconButton>
                          </InvoiceAction>
                        </RepeatingContent>
                      </Grid>
                    </Tag>
                  )
                }}
              </Repeater>

              <Grid container sx={{ mt: 4 }}>
                <Grid item xs={12} sx={{ px: 0 }}>
                  <Button
                    size='small'
                    variant='contained'
                    startIcon={<Plus fontSize='small' />}
                    onClick={() => setCount(count + 1)}
                  >
                    Add serviço
                  </Button>
                </Grid>
              </Grid>
            </RepeaterWrapper>

          <Divider />

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

export default SidebarAddClient