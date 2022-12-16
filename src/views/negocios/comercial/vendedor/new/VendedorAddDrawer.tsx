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
import vendedorApiService from 'src/@api-center/negocios/comercial/vendedor/vendedorApiService'
import { Autocomplete } from '@mui/material'
import usuarioApiService from 'src/@api-center/sistema/usuario/usuarioApiService'

interface VendedorAddDrawerType {
  open: boolean
  toggle: () => void
}

interface Usuario {
  userId: string
  name: string
}

interface VendedorData {
  nome: string
  userId: string
  status: string
  usuario: Usuario
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
  status: ''
}

const VendedorAddDrawer = (props: VendedorAddDrawerType) => {
  // ** Props
  const { open, toggle } = props
  const { t } = useTranslation()
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

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
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: VendedorData) => {
    dispatch(addVendedor({ ...data }))
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
        <Typography variant='h6'>{t('Seller New')}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Grid container spacing={0} sx={{ pl: 2, pt: 2, pr: 2, pb: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12} md={12} lg={12}>
            <Alert sx={{ mb: '20px' }} severity='warning'>
              Para vincular contratos a um vendedor, acesse a sua área de edição.
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
                  label='Nome'
                  onChange={onChange}
                  placeholder='e.g.: John Doe'
                  error={Boolean(errors.nome)}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='usuario'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    multiple={false}
                    options={usuarios || []}
                    filterSelectedOptions
                    value={value}
                    id='autocomplete-multiple-outlined'
                    getOptionLabel={option => option.name}
                    renderInput={params => <TextField {...params} label='Usuario' placeholder='(e.g.: Jhon Dare)' />}
                    onChange={(event, newValue) => {
                      // setRole(newValue)
                      onChange(newValue)
                    }}
                  />
                )
              }}
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
