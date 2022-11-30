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
import Autocomplete from '@mui/material/Autocomplete'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { editPipeline } from 'src/store/negocios/processos/pipeline'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { PipelineType } from 'src/types/negocios/processos/pipeline/pipelineTypes'

// ** Api Services
import usersApiService from 'src/@api-center/sistema/usuario/usuarioApiService'

// ** Axios Imports
import axios from 'axios'

interface SidebarEditPipelineType {
  row: PipelineType | undefined
  open: boolean
  toggle: () => void
}

interface UserDataType {
  userId: string
  name: string
}

const usersDefaultValues: UserDataType[] = []

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

const SidebarEditPipeline = (props: SidebarEditPipelineType) => {
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
  const [users, setUsers] = useState<UserDataType[]>(usersDefaultValues)
  const [user, setUser] = useState<UserDataType[]>(usersDefaultValues)

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

  useEffect(() => {

    if(props?.row){
      setValue('id', props?.row?.id ?? '')
      setValue('nome', props?.row?.nome ?? '')
      setValue('posicao', props?.row?.posicao ?? null)
      setValue('pipelineAssinantes', props?.row?.pipelineAssinantes ?? [])
      setUser(props?.row?.pipelineAssinantes ?? [])
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.row])

  const onSubmit = (data: PipelineType) => {
    dispatch(editPipeline({ ...data,  }))
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
              name={"pipelineAssinantes"}
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <Autocomplete
                    multiple
                    options={users || []}
                    filterSelectedOptions
                    value={user}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                      <TextField {...params} label="Assinantes" placeholder='(e.g.: Loren Ipsun)' />
                    )}
                    onChange={(event, newValue) => {
                      setUser(newValue)
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
// ** Usuário deve possuir a habilidade específica para ter acesso a esta página com o subject abaixo
SidebarEditPipeline.acl = {
  action: 'update',
  subject: 'ac-pipeline-page'
}

export default SidebarEditPipeline