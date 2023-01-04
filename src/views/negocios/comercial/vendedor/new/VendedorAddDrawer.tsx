// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'

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
import { addVendedor } from 'src/store/negocios/comercial/vendedor'

// ** Types Imports
import { AppDispatch } from 'src/store'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import { Autocomplete } from '@mui/material'
import usuarioApiService from 'src/@api-center/sistema/usuario/usuarioApiService'

interface VendedorAddDrawerType {
  open: boolean
  toggle: () => void
}

interface ApplicationUser {
  id: string
  fullName: string
}

interface VendedorData {
  [x: string]: any
  nome: string
  userId: string
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
  nome: yup
    .string()
    .min(3, obj => showErrors('Nome', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  nome: '',
  usuario: { userId: '', name: '' },
  status: '',
  applicationUser: null,
}

const VendedorAddDrawer = (props: VendedorAddDrawerType) => {
  // ** Props
  const { open, toggle } = props
  const { t } = useTranslation()
  const [usuarios, setUsuarios] = useState<ApplicationUser[]>([])

  const dispatch = useDispatch<AppDispatch>()

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(usuarioApiService.storageTokenKeyName)}`
    }
  }

  useEffect(() => {
    axios.get(`${usuarioApiService.listToSelectAsync}`, config).then(response => {
      setUsuarios(response.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const onSubmit = (data: VendedorData) => {
    data.userId = data.applicationUser?.userId
    data.applicationUser = null
    dispatch(addVendedor({
      ...data,
      applicationUser: null
    }))
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
        <Typography variant='h6'>{t('New Seller')}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Grid container spacing={0} sx={{ pl: 2, pt: 2, pr: 2, pb: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12} md={12} lg={12}>
            <Alert sx={{ mb: '20px' }} severity='warning'>
              {t("To link contracts to a seller, access its editing area")}.
            </Alert>
          </Grid>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='nome'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                  <TextField
                  value={value}
                  label={t("Name")}
                  onChange={onChange}
                  placeholder='e.g.: John Doe'
                  error={Boolean(errors.nome)}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='applicationUser'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    multiple={false}
                    options={usuarios}
                    filterSelectedOptions
                    value={value}
                    getOptionLabel={option => option.fullName}
                    onChange={(event, newValue): void => {
                      onChange(newValue)
                    }}
                    renderInput={params => <TextField {...params} label={t("User")} placeholder='(e.g.: John Doe)' />}
                  />
                )
              }}
            />
          </FormControl>
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
VendedorAddDrawer.acl = {
  action: 'create',
  subject: 'ac-vendedor-page'
}

export default VendedorAddDrawer
