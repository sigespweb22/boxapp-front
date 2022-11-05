// ** React Imports
import { useEffect, ElementType, ChangeEvent } from 'react'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { fetchUsuarioConta, editUsuarioConta } from 'src/store/sistema/controle-acesso/usuario'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { UsuarioContaType } from 'src/types/sistema/controle-acesso/userTypes'

// ** Icons Imports
import IconButton from '@mui/material/IconButton'
import GoogleCirclesGroup from 'mdi-material-ui/GoogleCirclesGroup'

// ** Api Services
import usuarioApiService from 'src/@api-center/sistema/usuario/usuarioApiService'

// ** Axios Imports
import axios from 'axios'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

interface Props {
  id: string | undefined
}

interface UsuarioContaData {
  id: string
  avatar: string
  userName: string
  email: string
  fullName: string
  applicationUserGroups: applicationUserGroup[]
}

interface applicationUserGroup {
  id: string
  name: string
}

const defaultValues: UsuarioContaData = {
  id: '',
  avatar: '/images/avatars/2.png',
  userName: '',
  email: '',
  fullName: '',
  applicationUserGroups: []
}

const UsuarioPerfilConta = (props: Props) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    setValue,
    handleSubmit
  } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  useEffect(() => {
    const storedToken = window.localStorage.getItem(usuarioApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios
      .get(`${usuarioApiService.contaListOneAsync}/${props.id}`, config)
      .then(response => {
        if (response)
        {
          setValue('id', response.data.id)
          setValue('fullName', response.data.fullName)
          setValue('userName', response.data.userName)
          setValue('email', response.data.email)
          setValue('applicationUserGroups', response.data.applicationUserGroups)
        }
      })
  }, [])

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setValue('avatar', reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  const setImgPadrao = (genero: string) => {
    switch (genero) {
      case 'MASCULINA':
        setValue('avatar', '/images/avatars/1.png')
        break;
      case 'FEMININA':
        setValue('avatar', '/images/avatars/4.png')
        break;
      default:
        setValue('avatar', '/images/avatars/2.png')
        break;
    }
  }

  const onSubmit = (data: UsuarioContaType) => {
    debugger
    dispatch(editUsuarioConta({ ...data  }))
  }

  const handleReset = () => {
    reset()
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ mt: 4.8, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Controller
                    name='avatar'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <ImgStyled src={value} onChange={onChange} alt='Profile Pic' />
                    )}
                  />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Escolher Nova Foto
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgPadrao('MASCULINA')}>
                  Foto padrão (Masculina)
                </ResetButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgPadrao('FEMININA')}>
                  Foto padrão (Feminina)
                </ResetButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgPadrao('OUTRO')}>
                  Foto padrão (Outro)
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ mt: 5 }}>
                  Apenas PNG ou JPEG. Tamanho máximo de 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name='id'
                  control={control}
                  render={({ field: { value } }) => (
                    <TextField
                      disabled
                      label='Id'
                      placeholder='(e.g.: 105ff854-cc42-442d-8a6d-8b443a1a7769)'
                      value={value}
                    />
                  )}
                />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name='fullName'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='Nome completo'
                      placeholder='(e.g.: John Doe)'
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name='userName'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='Nome usuário'
                      placeholder='(e.g.: john@example.com)'
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name='email'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='E-mail'
                      placeholder='(e.g.: john@example.com)'
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mb: 6 }} >
              <Controller
                name="applicationUserGroups"
                control={control}
                render={( value ) => {
                  return (
                    <FormControl fullWidth>
                      <Box sx={{ fontSize: 16, mb: "10px" }}>Grupos</Box>
                      {/* {
                        value.applicationUserGroups.map(group =>
                          {
                            return (
                                <Box key={group.groupId}  sx={{ fontSize: 16, mb: "10px" }}>
                                  <IconButton size='small' sx={{ mr: '1px', mb: '3px', color: '#FF671F' }} >
                                    <GoogleCirclesGroup fontSize='small' />
                                  </IconButton>
                                  {group.name}
                                </Box>
                            )
                          }
                        )
                      } */}
                    </FormControl>
                  )
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' sx={{ mr: 3.5 }}>
              Salvar alterações
            </Button>
            <Button type='button' onClick={() => handleReset()} variant='outlined' color='secondary'>
              Limpar
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

UsuarioPerfilConta.acl = {
  action: 'update',
  subject: 'ac-user-page'
}

export default UsuarioPerfilConta
