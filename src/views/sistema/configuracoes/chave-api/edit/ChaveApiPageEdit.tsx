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
import { useForm, Controller } from 'react-hook-form'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { updateChaveApi } from 'src/store/sistema/configuracoes/chave-api/index'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { ChaveApiType } from 'src/types/sistema/configuracoes/chave-api/chaveApiTypes'

interface ChaveApiPageEditType {
  row: ChaveApiType | undefined
  open: boolean
  toggle: () => void
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const ChaveApiPageEdit = (props: ChaveApiPageEditType) => {
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
    mode: 'onChange'
  })

  const onSubmit = (data: ChaveApiType) => {
    dispatch(updateChaveApi({ ...data,  }))
    toggle()
    reset()
  }

  useEffect(() => {
    if(props?.row){
      setValue('id', props?.row?.id ?? '')
      setValue('key', props?.row?.key ?? '')
      setValue('descricao', props?.row?.descricao ?? '')
      setValue('dataValidade', props?.row?.dataValidade ?? '')
    }
  }, [props?.row])

  const handleClose = () => {
    toggle()
    reset()
    setValue('id', props?.row?.id ?? '')
    setValue('key', props?.row?.key ?? '')
    setValue('descricao', props?.row?.descricao ?? '')
    setValue('dataValidade', props?.row?.dataValidade ?? '')
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
        <Typography variant='h6'>{t("User Edit")}</Typography>
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
              name={"applicationUserGroups"}
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <Autocomplete
                    multiple
                    options={groups || []}
                    filterSelectedOptions
                    value={group}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                      <TextField {...params} label="Grupos" placeholder='(e.g.: Master)' />
                    )}
                    onChange={(event, newValue) => {
                      setGroup(newValue)
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
ChaveApiPageEdit.acl = {
  action: 'update',
  subject: 'ac-chave_api-page'
}

export default ChaveApiPageEdit