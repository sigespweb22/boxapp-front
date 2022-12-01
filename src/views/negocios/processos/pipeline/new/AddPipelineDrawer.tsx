// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addPipeline } from 'src/store/negocios/processos/pipeline'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { PipelineType } from 'src/types/negocios/processos/pipeline/pipelineTypes'

// ** Api Services
import usersApiService from 'src/@api-center/sistema/usuario/usuarioApiService'

// ** Axios Imports
import axios from 'axios'

// ** MUI Imports
import Autocomplete from '@mui/material/Autocomplete'

interface SidebarAddPipelineType {
  open: boolean
  toggle: () => void
}

interface UserDataType {
  userId: string
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

const userDefaultValues: UserDataType[] = []
const defaultValues = {
  nome: '',
  posicao: '',
  pipelineAssinantes: [],
}

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
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const [users, setUsers] = useState<UserDataType[]>(userDefaultValues)

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(usersApiService.storageTokenKeyName)!}` 
    }
  }

  useEffect(() => {
    axios
      .get(usersApiService.listToSelectAsync, config)
      .then(response => {
        setUsers(response.data)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: PipelineType) => {
    dispatch(addPipeline({ ...data,  }))
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
              name='nome'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Nome'
                  onChange={onChange}
                  placeholder='(e.g.: Prospecção)'
                  error={Boolean(errors.nome)}
                />
              )}
            />
            {errors.nome && <FormHelperText sx={{ color: 'error.main' }}>{errors.nome.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='posicao'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Posição'
                  onChange={onChange}
                  placeholder='(e.g.: 1)'
                  error={Boolean(errors.posicao)}
                />
              )}
            />
            {errors.posicao && <FormHelperText sx={{ color: 'error.main' }}>{errors.posicao.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }} >
            <Controller
              name="pipelineAssinantes"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => {
                return (
                  <FormControl fullWidth>
                    <Autocomplete
                      multiple
                      options={users}
                      filterSelectedOptions
                      id='multiple-group'
                      value={value}
                      getOptionLabel={option => option.name}
                      onChange={(event, newValue): void => {
                        onChange(newValue)
                      }}
                      renderInput={params => <TextField {...params} label='Assinantes' placeholder='(e.g.: João da Silva)' />}
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
// ** Usuário deve possuir a habilidade específica para ter acesso a esta página com o subject abaixo
SidebarAddPipeline.acl = {
  action: 'create',
  subject: 'ac-pipeline-page'
}

export default SidebarAddPipeline