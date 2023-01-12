// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete'

// ** Types
import { AppDispatch } from 'src/store'
import { UsuarioInfoType } from 'src/types/sistema/controle-acesso/userTypes'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Actions Imports
import { editUsuarioInfo } from 'src/store/sistema/controle-acesso/usuario'

// ** InputMask Imports
import InputMask from 'react-input-mask'

// ** Axios Imports
import axios from 'axios'

// ** Api imports
import enumApiService from 'src/@api-center/sistema/enum/enumServicoApiService'
import usuarioApiService from 'src/@api-center/sistema/usuario/usuarioApiService'
import { Renderable, Toast, toast, ValueFunction } from 'react-hot-toast'

// Import Translate
import { useTranslation } from 'react-i18next'

interface Props {
  id: string | undefined
}

interface UsuarioInfoData {
  id: string,
  bio: string,
  dataAniversario: string,
  telefoneCelular: string,
  genero: string,
}

const defaultValues: UsuarioInfoData = {
  id: '',
  bio: '',
  dataAniversario: '',
  telefoneCelular: '',
  genero: ''
}

const defaultValuesGeneros: string[] = []

const clearMaskPhone = (telefone: string) => {
  if (telefone)
  {
    return telefone.replace(" ", "").replace("(", "").replace(")", "").replace(".", "").replace("-", "")
  }
}

const UsuarioPerfilInfo = (props: Props) => {
  // ** Stats
  const { t } = useTranslation()
  const [generos, setGeneros] = useState(defaultValuesGeneros)

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

  const config = {
    headers: { 
      Authorization: `Bearer ${window.localStorage.getItem(enumApiService.storageTokenKeyName)!}`
    }
  }

  useEffect(() => {

    axios
      .get(enumApiService.generosListAsync, config)
      .then((response) => {
        setGeneros(response.data)
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

    axios
      .get(`${usuarioApiService.infoListOneAsync}/${props.id}`, config)
      .then((response) => {
        if (response.status === 200) {
          setValue('id', response.data.id)
          setValue('bio', response.data.bio)
          setValue('dataAniversario', response.data.dataAniversario)
          setValue('telefoneCelular', response.data.telefoneCelular)
          setValue('genero', response.data.genero)
        }
      })
      .catch((err => {
        if (err.response.status === 400 || err.response.status === 404)
        return err.response.data.errors.map((x: Renderable | ValueFunction<Renderable, Toast>) => toast.error(x));
      }))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id])
  
  const handleReset = () => {
    reset()
  }

  const onSubmit = (data: UsuarioInfoType) => {
    data.telefoneCelular = clearMaskPhone(data.telefoneCelular) || ""
    dispatch(editUsuarioInfo({ ...data  }))
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ mt: 4.8 }}>
            <FormControl fullWidth sx={{ mb: 0 }}>
                <Controller
                  name='bio'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      label={t("Biography")}
                      placeholder={t("(e.g.: My name is John Doe, I'm 37 years old, I'm married and I love technology...)")}
                      onChange={(newValue): void => {
                        onChange(newValue)
                      }}
                      value={value}
                    />
                  )}
                />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mb: 0 }}>
              <Controller
                name='dataAniversario'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <InputMask
                    mask="99/99/9999"
                    value={value}
                    disabled={false}
                    onChange={(newValue): void => {
                      onChange(newValue)
                    }}
                  >
                    <TextField
                      disabled={false}
                      name="dataAniversario"
                      type="text"
                      label={t("Birth date")}
                      placeholder='(e.g.: 01/04/1985)'
                    />
                  </InputMask>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mb: 0 }}>
                <Controller
                  name='telefoneCelular'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <InputMask
                      mask="(99) 9.9999-9999"
                      value={value}
                      disabled={false}
                      onChange={(newValue): void => {
                        onChange(newValue)
                      }}
                    >
                      <TextField
                        disabled={false}
                        name="telefoneCelular"
                        type="text"
                        label={t("Phone number")}
                        placeholder='(e.g.: (48) 98901-4524)'
                      />
                    </InputMask>
                  )}
                />
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name="genero"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <Autocomplete
                      value={value}
                      sx={{ width: 360 }}
                      options={generos}
                      onChange={(event, newValue) => {
                        onChange(newValue)
                      }}
                      id='autocomplete-controlled'
                      getOptionLabel={option => t(`${option}`)}
                      renderInput={params => <TextField {...params} label={t("Gender")} />}
                    />
                  )
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' sx={{ mr: 3.5 }}>
              {t("Save editions")}
            </Button>
            <Button type='button' onClick={() => handleReset()} variant='outlined' color='secondary'>
              {t("Clean")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

UsuarioPerfilInfo.acl = {
  action: 'update',
  subject: 'ac-user-page'
}

export default UsuarioPerfilInfo
