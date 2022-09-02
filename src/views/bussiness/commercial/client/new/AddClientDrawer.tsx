// ** React Imports
import { useState, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import StoreSearchOutline from 'mdi-material-ui/StoreSearchOutline'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addClient } from 'src/store/bussiness/commercial/client'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { ClientsType } from 'src/types/bussiness/commercial/client/clientTypes'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import clientApiService from 'src/@api-center/client/clientApiService'

interface SidebarAddClientType {
  row: ClientsType
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

const SidebarAddClient = (props: SidebarAddClientType) => {
  

  // ** Props
  const { open, toggle } = props
  
  // ** Hooks
  const { t } = useTranslation()
  const [cnpjToSearch, setCnpjToSearch] = useState('')

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

  // useEffect(() => {
  //   const fetchCnpj = () => { 
  //     const storedToken = window.localStorage.getItem(clientApiService.storageTokenKeyName)!
  //     const config = {
  //       headers: {
  //         Authorization: "Bearer " + storedToken
  //       }
  //     }

  //     axios
  //       .get(`${clientApiService.listOneTPAsync}/cnpjToSearch`, config)
  //       .then(response => {
  //         debugger
  //         const a = response.data
  //       })
  //   }
  //   fetchCnpj()
  // }, []);

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

      axios
        .get(clientApiService.listOneTPAsync.concat(cnpjToSearch), config)
        .then(response => {
          setValue('nomeFantasia', response.data.alias)
          setValue('razaoSocial', response.data.company.name)
          setValue('telefonePrincipal', response.data.phones[0].number)
          setValue('emailPrincipal', response.data.emails[0].address)
          setValue('emailPrincipal', response.data.emails[0].address)
          setValue('dataFundacao', response.data.founded)
          setValue('codigoMunicipio', response.data.address.municipality)
          setValue('rua', response.data.address.street + " - " +response.data.address.district)
          setValue('numero', response.data.address.number)
          setValue('complemento', response.data.address.details)
          setValue('cidade', response.data.address.city)
          setValue('estado', response.data.address.state)
          setValue('cep', response.data.address.zip)
        }).catch((resp) => {
          debugger
          if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
          if (typeof resp.response.data != 'undefined' && 
              typeof resp.response.data.errors != 'undefined')
          {
            if (typeof resp.response.data.title != 'undefined' &&
                resp.response.data.title === "One or more validation errors occurred.")
            {
              const returnObj = Object.entries(resp.response.data.errors);
              returnObj.forEach(err => {
                toast.error(err)
              });
            } else {
              resp.response.data.errors.forEach(err => {
                toast.error(err)
              });
            }
          } else {
            const returnObj = Object.entries(resp.response.data.errors);
            returnObj.forEach(function(err) {
              err[1].forEach(function (ie) {
                toast.error(ie)        
              })
            });
          }
        })
  }

  useEffect(() => {
      
  });

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
                <TextField
                  value={props.field.value}  
                  label='Cnpj'
                  onChange={(value): void => {
                    props.field.onChange(value)
                    changeHandler(value)
                  }}
                  placeholder='(e.g.: 60.133.365/0001-16)'
                  error={Boolean(errors.cnpj)}
                />
              )}
            />
            {errors.cnpj && <FormHelperText sx={{ color: 'error.main' }}>{errors.cnpj.message}</FormHelperText>}
          </FormControl>
          <IconButton onClick={handleClick} sx={{ ml: 2, height: '58px', width: '38px' }} aria-label='capture screenshot' color='primary'>
            <StoreSearchOutline fontSize='medium' />
          </IconButton>
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
