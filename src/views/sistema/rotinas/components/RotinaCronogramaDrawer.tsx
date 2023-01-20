// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import DatePicker from '@mui/lab/DatePicker'
import { Autocomplete } from '@mui/material'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import rotinaApiService from 'src/@api-center/sistema/rotinas/rotinaApiService'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addClientes } from 'src/store/negocios/comercial/cliente'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { ClienteType } from 'src/types/negocios/comercial/cliente/clienteTypes'

// ** Axios Imports
import axios from 'axios'

interface RotinaCronogramaDrawerType {
  open: boolean
  toggle: () => void
}

let rotinas: { id: string; name: string }[] = []

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const RotinaCronogramaDrawer = (props: RotinaCronogramaDrawerType) => {
  // ** Props
  const { open, toggle } = props

  // ** Hooks
  const { t } = useTranslation()
  const [time, setTime] = useState<DateType>(new Date())

  const dispatch = useDispatch<AppDispatch>()

  const {
    control,
    handleSubmit,
  } = useForm({
    mode: 'onChange'
  })

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(rotinaApiService.storageTokenKeyName)!}`
    }
  }

  useEffect(() => {
    axios.get(`${rotinaApiService.listAsync}`, config).then(response => {
      rotinas = response.data
    })
  }, [rotinas])

  debugger

  const onSubmit = () => {
    toggle()
  }

  const handleClose = () => {
    toggle()
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
        <Typography variant='h6'>{t('Add routine schedule')}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Grid container spacing={0} sx={{ pl: 2, pt: 2, pr: 2, pb: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12} md={12} lg={12}>
            <Alert sx={{ mb: '20px' }} severity='warning'>
              {t('Cuidado ao escolher as rotinas, algumas dependem de outra para funcionar')}.
            </Alert>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='applicationUserGroups'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <FormControl fullWidth>
                      <Autocomplete
                        multiple
                        options={rotinas}
                        filterSelectedOptions
                        id='multiple-group'
                        value={value}
                        getOptionLabel={option => option.id}
                        onChange={(event, newValue): void => {
                          onChange(newValue)
                        }}
                        renderInput={params => <TextField {...params} label={t('Routines')} />}
                      />
                    </FormControl>
                  )
                }}
              />
            </FormControl>
            {/* <div>
              <DatePicker
                showTimeSelect
                selected={time}
                timeIntervals={15}
                showTimeSelectOnly
                dateFormat='h:mm aa'
                id='time-only-picker'
                onChange={(date: Date) => setTime(date)}
                customInput={<CustomInput label='Time Only' />}
              />
            </div> */}
          </Grid>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} onClick={handleSubmit(onSubmit)}>
              {t('Save')}
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              {t('Cancel')}
            </Button>
          </Box>
        </form>
      </Grid>
    </Drawer>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
RotinaCronogramaDrawer.acl = {
  action: 'create',
  subject: 'ac-rotina-page'
}

export default RotinaCronogramaDrawer
