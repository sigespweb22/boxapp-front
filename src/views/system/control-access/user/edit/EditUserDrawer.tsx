// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
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

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { editUser } from 'src/store/apps/user/index'

// ** Copmponents Imports
import Select from '@mui/material/Select'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { UsersType } from 'src/types/apps/userTypes'

// ** Api Services
import groupApiService from 'src/@api-center/group/groupApiService'

// ** Axios Imports
import axios from 'axios'

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

interface SidebarEditUserType {
  row: UsersType | undefined
  open: boolean
  toggle: () => void
}

interface GroupDataType {
  id: string
  name: string
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
    .required("Nome é requerido"),
  posicao: yup
    .string()
    .min(1, obj => showErrors('Posição', obj.value.length, obj.min))
    .required("Posição é requerida")
})

const SidebarEditPipeline = (props: SidebarEditUserType) => {
  const groupDefaultValues: GroupDataType[] = []
  const defaultValues = {
    id: props?.row?.id ?? '',
    fullName: props?.row?.fullName ?? '',
    email: props?.row?.email ?? '',
    password: props?.row?.password ?? '',
    applicationUserGroups: props?.row?.applicationUserGroups ?? []
  }
  
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
  const [groups, setGroups] = useState<GroupDataType[]>(groupDefaultValues)

  const storedToken = window.localStorage.getItem(groupApiService.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: "Bearer " + storedToken
    }
  }

  useEffect(() => {
    axios
      .get(groupApiService.listToSelectAsync, config)
      .then(response => {
        setGroups(response.data)
      })
  }, []);

  const { t } = useTranslation()

  //** Set values
  setValue('id', defaultValues.id)
  setValue('fullName', defaultValues.fullName)
  setValue('email', defaultValues.email)
  setValue('password', defaultValues.password)
  setValue('applicationUserGroups', defaultValues.applicationUserGroups)

  const onSubmit = (data: UsersType) => {
    dispatch(editUser({ ...data, }))
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
        <Typography variant='h6'>Editar Pipeline</Typography>
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
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="applicationUserGroups"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id='demo-multiple-chip-label'>{t("User Group")}</InputLabel>
                    <Select
                        name="applicationUserGroups"
                        multiple
                        label="Grupo usuário"
                        value={value}
                        MenuProps={MenuProps}
                        id='multiple-group'
                        onChange={onChange}
                        labelId='multiple-group-label'
                        renderValue={selected => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {(selected as unknown as string[]).map(value => (
                              <Chip key={value} label={value} sx={{ m: 0.75 }} />
                            ))}
                          </Box>
                        )}
                      >
                        {
                          groups.map(group => (
                            <MenuItem key={group.id} value={group.name}>
                              {group.name}
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

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
SidebarEditPipeline.acl = {
  action: 'update',
  subject: 'ac-user-page'
}

export default SidebarEditPipeline