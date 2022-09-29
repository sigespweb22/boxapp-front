// ** React Imports
import { useState, useEffect } from 'react'

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
import Chip from '@mui/material/Chip'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Copmponents Imports
import Select from '@mui/material/Select'

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
import usersApiService from 'src/@api-center/user/userApiService'

// ** Axios Imports
import axios from 'axios'

// ** Types
import { PipelineType } from 'src/types/bussiness/processos/pipeline/pipelineTypes'

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

interface SidebarAddPipelineType {
  open: boolean
  toggle: () => void
}

interface UserDataType {
  id: string
  name: string
}

let users: { id: string, name: string  }[] = [];

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

const defaultValues: UserDataType[] = []

const SidebarAddPipeline = (props: SidebarAddPipelineType) => {

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
    resolver: yupResolver(schema)
  })
  const { t } = useTranslation()
  const [users, setUsers] = useState<UserDataType[]>(defaultValues)

  const storedToken = window.localStorage.getItem(usersApiService.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: "Bearer " + storedToken
    }
  }

  useEffect(() => {
    axios
      .get(usersApiService.listToSelectAsync, config)
      .then(response => {
        setUsers(response.data)
      })
  }, [users]);


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
        <Typography variant='h6'>Novo Pipeline</Typography>
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
                  placeholder='Alan Rezende'
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
                  placeholder='alan.rezende@email.com'
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
                  placeholder='Password123*'
                  error={Boolean(errors.password)}
                />
              )}
            />
            {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="applicationUserGroups"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id='demo-multiple-chip-label'>Responsável pelo pipeline</InputLabel>
                    <Select
                        name="assinantes"
                        multiple={false}
                        label="Responsável pelo pipeline"
                        value={value}
                        MenuProps={MenuProps}
                        id='multiple-user'
                        onChange={onChange}
                        labelId='multiple-user-label'
                        renderValue={selected => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {(selected as unknown as string[]).map(value => (
                              <Chip key={value} label={value} sx={{ m: 0.75 }} />
                            ))}
                          </Box>
                        )}
                      >
                        {
                          users.map(user => (
                            <MenuItem key={user.id} value={user.name}>
                              {user.name}
                            </MenuItem>
                          ))
                        }
                    </Select>
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

export default SidebarAddPipeline