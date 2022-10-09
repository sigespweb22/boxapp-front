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
import { editGroup } from 'src/store/apps/group'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { GroupsType } from 'src/types/apps/groupTypes'
import { GroupEditType } from 'src/types/apps/groupTypes'

// ** Api Services
import groupApiService from 'src/@api-center/group/groupApiService'
import roleApiService from 'src/@api-center/role/roleApiService'

// ** Axios Imports
import axios from 'axios'

interface SidebarEditGroupType {
  row: GroupEditType | undefined
  open: boolean
  toggle: () => void
}

interface RoleDataType {
  roleId: string
  name: string
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const rolesDefaultValues: RoleDataType[] = []

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Nome do grupo é requerido.")
})

const SidebarEditGroup = (props: SidebarEditGroupType) => {
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

  const [roles, setRoles] = useState<RoleDataType[]>(rolesDefaultValues)
  const [role, setRole] = useState<RoleDataType[]>(rolesDefaultValues)

  const storedToken = window.localStorage.getItem(groupApiService.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: "Bearer " + storedToken
    }
  }

  useEffect(() => {
    axios
      .get(roleApiService.listToSelectAsync, config)
      .then(response => {
        setRoles(response.data)
      })
  }, [])

  const onSubmit = (data: GroupEditType) => {
    debugger
    dispatch(editGroup({ ...data,  }))
    toggle()
    reset()
  }

  useEffect(() => {
    if(props?.row){
      setValue('id', props?.row?.id ?? '')
      setValue('name', props?.row?.name ?? '')
      setValue('applicationRoleGroups', props?.row?.applicationRoleGroups ?? [])
      setRole(props?.row?.applicationRoleGroups ?? [])
    }
  }, [props?.row])

  const handleClose = () => {
    toggle()
    reset()
    setValue('id', props?.row?.id ?? '')
    setValue('name', props?.row?.name ?? '')
    setValue('applicationRoleGroups', props?.row?.applicationRoleGroups ?? [])
    setRole(props?.row?.applicationRoleGroups ?? [])
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
        <Typography variant='h6'>{t("Group Edit")}</Typography>
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
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  placeholder='(e.g.: Ex.: Master)'
                  error={Boolean(errors.name)}
                />
              )}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }} >
            <Controller
              name={"applicationRoleGroups"}
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    multiple
                    options={roles || []}
                    filterSelectedOptions
                    value={role}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                      <TextField {...params} label="Permissões" placeholder='(e.g.: Master)' />
                    )}
                    onChange={(event, newValue) => {
                      setRole(newValue)
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

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
SidebarEditGroup.acl = {
  action: 'update',
  subject: 'ac-group-page'
}

export default SidebarEditGroup