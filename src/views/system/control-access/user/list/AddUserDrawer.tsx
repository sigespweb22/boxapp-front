// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Autocomplete from '@mui/material/Autocomplete'

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
import { addUser } from 'src/store/apps/user'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { UsersType } from 'src/types/apps/userTypes'

// ** Api Services
import apiGroup from 'src/@api-center/group/groupApiService'

// ** Axios Imports
import axios from 'axios'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

let groups: { id: string, name: string  }[] = [];

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
  fullName: yup
    .string()
    .min(3, obj => showErrors('Nome completo', obj.value.length, obj.min))
    .required(),
  email: yup
    .string()
    .email("E-mail deve ser um e-mail válido")
    .required("E-mail é Requerido"),
  password: yup
    .string()
    .min(3, obj => showErrors('Senha', obj.value.length, obj.min))
    .typeError('Senha é requerida')
    .required()
})

const defaultValues = {
  fullName: '',
  email: '',
  password: '',
  applicationUserGroups: [],
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  const storedToken = window.localStorage.getItem(apiGroup.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: "Bearer " + storedToken
    }
  }

  useEffect(() => {
    axios
      .get(`${apiGroup.listToSelectAsync}`, config)
      .then(response => {
        groups = response.data
      })
  }, [groups]);

  // ** Hook
  const { t } = useTranslation()

  // ** Props
  const { open, toggle } = props

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
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

  const onSubmit = (data: UsersType) => {
    dispatch(addUser({ ...data,  }))
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
        <Typography variant='h6'>{t("User New")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='fullName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Nome completo'
                  onChange={onChange}
                  placeholder='(e.g.: Alan Rezende)'
                  error={Boolean(errors.fullName)}
                />
              )}
            />
            {errors.fullName && <FormHelperText sx={{ color: 'error.main' }}>{errors.fullName.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='email'
                  value={value}
                  label='Email'
                  onChange={onChange}
                  placeholder='(e.g.: alan.rezende@email.com)'
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type="password"
                  value={value}
                  label='Senha'
                  onChange={onChange}
                  placeholder='(e.g.: Password123*)'
                  error={Boolean(errors.password)}
                />
              )}
            />
            {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }} >
            <Controller
              name="applicationUserGroups"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => {
                return (
                  <FormControl fullWidth>
                    <Autocomplete
                      multiple
                      options={groups}
                      filterSelectedOptions
                      id='multiple-group'
                      value={value}
                      getOptionLabel={option => option.name}
                      onChange={(event, newValue): void => {
                        onChange(newValue)
                      }}
                      renderInput={params => <TextField {...params} label='Grupo' placeholder='(e.g.: Master)' />}
                    />
                  </FormControl>
                )
              }}
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
SidebarAddUser.acl = {
  action: 'create',
  subject: 'ac-user-page'
}

export default SidebarAddUser