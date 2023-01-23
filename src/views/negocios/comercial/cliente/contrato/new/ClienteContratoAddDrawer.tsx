// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'
import Autocomplete from '@mui/material/Autocomplete'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addClienteContrato } from 'src/store/negocios/comercial/cliente/contrato'

// ** Types Imports
import { AppDispatch } from 'src/store'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import clienteApiService from 'src/@api-center/negocios/comercial/cliente/clienteApiService'
import enumApiService from 'src/@api-center/sistema/enum/enumServicoApiService'

interface SidebarClienteContratoAddType {
  clienteId: string
  open: boolean
  toggle: () => void
}

interface ClienteContratoType {
  valorContrato: number
  periodicidade: string
  clienteId: string
  bomControleContratoId: number
  status: string
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const defaultValues = {
  valorContrato: '',
  periodicidade: '',
  clienteId: '',
  bomControleContratoId: '',
  status: '',
}

const SidebarClienteContratoAdd = (props: SidebarClienteContratoAddType) => {
  // ** Props
  const { open, toggle } = props
  
  // ** Hooks
  const { t } = useTranslation()
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

  // ** States
  const [periodicidades, setPeriodicidades] = useState([])

  const config = {
    headers: { 
      Authorization: `Bearer ${window.localStorage.getItem(clienteApiService.storageTokenKeyName)}` 
    }
  }

  useEffect(() => {
    axios
      .get(`${enumApiService.periodicidadesListAsync}`, config)
      .then(response => {
        setPeriodicidades(response.data)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: ClienteContratoType): void => {
    data.clienteId = props?.clienteId
    dispatch(addClienteContrato({...data,  }))
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
        <Typography variant='h6'>{t("New Client Contract")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='valorContrato'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type="number"
                  value={value}
                  label={t("Contract value")}
                  onChange={onChange}
                  placeholder='(e.g.: R$ 1500,00)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
                name="periodicidade"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <Autocomplete
                      value={value}
                      sx={{ width: 360 }}
                      options={periodicidades}
                      onChange={(event, newValue) => {
                        setValue('periodicidade', newValue || '')
                        onChange(newValue)
                      }}
                      id='autocomplete-controlled'
                      getOptionLabel={option => option}
                      renderInput={params => <TextField {...params} label={t("Frequency")} />}
                    />
                  )
                }}
              />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='bomControleContratoId'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Bom controle id'
                  onChange={onChange}
                  placeholder={t("(e.g.: Contract ID in Bom Controle)")}
                />
              )}
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              {t("Save")}
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              {t("Cancel")}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
SidebarClienteContratoAdd.acl = {
  action: 'create',
  subject: 'ac-cliente-contrato-page'
}

export default SidebarClienteContratoAdd