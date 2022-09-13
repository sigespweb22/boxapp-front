// ** React Imports
import { useEffect, useState } from 'react'

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
import Select, { SelectChangeEvent } from '@mui/material/Select'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addGroup } from 'src/store/apps/group'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { GroupsType } from 'src/types/apps/groupTypes'

// ** Api Services
import roleApiService from 'src/@api-center/role/roleApiService'

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

interface SidebarAddGroupType {
  open: boolean
  toggle: () => void
}

let roles: { id: string, name: string }[] = [];

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
  name: yup
    .string()
    .min(3, obj => showErrors('Nome', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  name: '',  
  applicationRoleGroups: [],
}

const SidebarAddGroup = (props: SidebarAddGroupType) => {
  const storedToken = window.localStorage.getItem(roleApiService.storageTokenKeyName)!
  let config = {
    headers: {
      Authorization: "Bearer " + storedToken
    }
  }

  useEffect(() => {
    axios
      .get(roleApiService.listToSelectAsync, config)
      .then(response => {
        roles = response.data
      })
  }, []);

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

  const onSubmit = (data: GroupsType) => {
    dispatch(addGroup({ ...data,  }))
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
        <Typography variant='h6'>{t("Group New")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Nome do grupo'
                  onChange={onChange}
                  placeholder='Suporte'
                  error={Boolean(errors.name)}
                />
              )}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="applicationRoleGroups"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id='multiple-permission-label'>{t("Permissions")}</InputLabel>
                    <Select
                        name="applicationRoleGroups"
                        multiple
                        label="Permissions"
                        value={value}
                        MenuProps={MenuProps}
                        id='multiple-permission'
                        onChange={onChange}
                        labelId='multiple-permission-label'
                        renderValue={selected => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {(selected as unknown as string[]).map(value => (
                              <Chip key={value} label={value} sx={{ m: 0.75 }} />
                            ))}
                          </Box>
                        )}
                      >
                        {
                          roles.map(role => (
                            <MenuItem key={role.id} value={role.name}>
                              {role.name}
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

export default SidebarAddGroup