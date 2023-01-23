// ** React Imports
import { useState, MouseEvent, useEffect } from 'react'

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
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

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
import { addUser } from 'src/store/sistema/controle-acesso/usuario'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { UsersType } from 'src/types/sistema/controle-acesso/userTypes'

// ** Api Services
import apiGroup from 'src/@api-center/sistema/grupo/grupoApiService'

// ** Axios Imports
import axios from 'axios'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

interface State {
  showNewPassword: boolean
  showConfirmNewPassword: boolean
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
    .min(6, obj => showErrors('Senha ', obj.value.length, obj.min))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Deve conter 6 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial'
    )
    .required(),
  confirmNewPassword: yup
    .string()
    .required("Confirmação de senha é requerida")
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
})

const defaultValues = {
  fullName: '',
  email: '',
  password: '',
  confirmNewPassword: '',
  applicationUserGroups: [],
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(apiGroup.storageTokenKeyName)!}` 
    }
  }

  useEffect(() => {
    axios
      .get(`${apiGroup.listToSelectAsync}`, config)
      .then(response => {
        groups = response.data
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  // ** Hook
  const { t } = useTranslation()

  // ** Props
  const { open, toggle } = props

  // ** States
  const [values, setValues] = useState<State>({
    showNewPassword: false,
    showConfirmNewPassword: false
  })

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

  const handleClickShowPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
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
        <Typography variant='h6'>{t("New user")}</Typography>
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
                  label={t("Full name")}
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
                      renderInput={params => <TextField {...params} label={t("Groups")} placeholder='(e.g.: Master)' />}
                    />
                  </FormControl>
                )
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel 
              htmlFor='input-new-password' 
              error={Boolean(errors.password)}>
              {t("Password")}
            </InputLabel>
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <OutlinedInput
                  value={value}
                  label='Senha'
                  onChange={onChange}
                  id='input-new-password'
                  error={Boolean(errors.password)}
                  type={values.showNewPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        <Icon icon={values.showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.password && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel htmlFor='input-confirm-new-password' error={Boolean(errors.confirmNewPassword)}>
            {t("Confirm password")}
            </InputLabel>
            <Controller
              name='confirmNewPassword'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <OutlinedInput
                  value={value}
                  label='Confirma Nova Senha'
                  onChange={onChange}
                  id='input-confirm-new-password'
                  error={Boolean(errors.confirmNewPassword)}
                  type={values.showConfirmNewPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowConfirmNewPassword}
                        onMouseDown={handleMouseDownConfirmNewPassword}
                      >
                        <Icon icon={values.showConfirmNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.confirmNewPassword && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.confirmNewPassword.message}</FormHelperText>
            )}
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              {t("Save")}
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              {t("Cancel")}
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