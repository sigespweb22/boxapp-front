// ** React Imports
import { useEffect, useState } from 'react'

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
import { editUser } from 'src/store/apps/user'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { UsersType } from 'src/types/apps/userTypes'
import { UserEditType } from 'src/types/apps/userTypes'

// ** Api Services
import groupApiService from 'src/@api-center/group/groupApiService'
import userApiService from 'src/@api-center/user/userApiService'

// ** Axios Imports
import axios from 'axios'

interface SidebarEditUserType {
  row: UsersType | undefined
  open: boolean
  toggle: () => void
}

interface GroupDataType {
  groupId: string
  name: string
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const groupsDefaultValues: GroupDataType[] = []

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Nome completo é requerido."),
  email: yup
    .string()
    .required("E-mail é requerido.")
})

const SidebarEditUser = (props: SidebarEditUserType) => {
  // ** Hook
  const { t } = useTranslation()

  // ** Props
  const { open, toggle } = props
  
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const [groups, setGroups] = useState<GroupDataType[]>(groupsDefaultValues)

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
  }, [])

  const onSubmit = (data: UsersType) => {
    dispatch(editUser({ ...data,  }))
    toggle()
    reset()
  }

  useEffect(() => {
    if(props?.row){
      setValue('id', props?.row?.id ?? '')
      setValue('fullName', props?.row?.fullName ?? '')
      setValue('email', props?.row?.email ?? '')
      setValue('applicationUserGroups', props?.row?.applicationUserGroups ?? [])
    }
  }, [props?.row])

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
        <Typography variant='h6'>{t("Client Edit")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='id'
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  disabled
                  value={value}
                />
              )}
            />
        </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='fullName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  placeholder='(e.g.: Ex.: Loren Ipsun)'
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
                  value={value}
                  label='E-mail'
                  onChange={onChange}
                  placeholder='(e.g.: Ex.: loren@dominio.com'
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
                  <Autocomplete
                    multiple={true}
                    value={value}
                    id="applicationUserGroups"
                    options={groups}
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                      <TextField {...params} label="Grupos" placeholder='(e.g.: Master)' />
                    )}
                    onChange={(event, newValue) => {
                      console.log(JSON.stringify(newValue, null, ' '));
                      onChange(newValue)
                    }}
                  />
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

export default SidebarEditUser