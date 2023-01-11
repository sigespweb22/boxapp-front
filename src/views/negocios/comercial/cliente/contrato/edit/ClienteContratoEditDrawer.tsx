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

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { editClienteContrato } from 'src/store/negocios/comercial/cliente/contrato'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { ClienteContratoViewModelType } from 'src/types/negocios/comercial/cliente/contrato/clienteContratoTypes'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import clienteApiService from 'src/@api-center/negocios/comercial/cliente/clienteApiService'
import clienteContratoApiService from 'src/@api-center/negocios/comercial/cliente/contrato/clienteContratoApiService'
import enumApiService from 'src/@api-center/sistema/enum/enumServicoApiService'

// ** Copmponents Imports
import { useTranslation } from 'react-i18next'

interface SidebarClienteContratoEditType {
  row: ClienteContratoViewModelType | undefined
  open: boolean
  toggle: () => void
}

let contratos: { id: string, nome: string  }[] = [];

interface ClienteContratoData {
  id: string
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
  id: '',
  valorContrato: 0,
  periodicidade: '',
  clienteId: '',
  bomControleContratoId: 0,
  contrato: {id: '', nome: ''},
  status: '',
}

const SidebarClienteContratoEdit = (props: SidebarClienteContratoEditType) => {
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
      Authorization: `Bearer ${window.localStorage.getItem(clienteApiService.storageTokenKeyName)!}`
    }
  }

  useEffect(() => {
    axios
      .get(`${enumApiService.periodicidadesListAsync}`, config)
      .then(response => {
        setPeriodicidades(response.data)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    axios
      .get(`${clienteContratoApiService.listToSelectAsync}`, config)
      .then(response => {
        contratos = response.data
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contratos])

  useEffect(() => {
    setValue('id', props?.row?.id || '')
    setValue('valorContrato', props?.row?.valorContrato || 0)
    setValue('periodicidade', props?.row?.periodicidade || '')
    setValue('clienteId', props?.row?.clienteId || '')
    setValue('bomControleContratoId', props?.row?.bomControleContratoId || 0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const onSubmit = (data: ClienteContratoData) => {
    dispatch(editClienteContrato({
      ...data,
      cliente: {
        id: undefined,
        nomeFantasia: '',
        razaoSocial: '',
        inscricaoEstadual: '',
        tipoPessoa: '',
        cnpj: '',
        cpf: '',
        telefonePrincipal: '',
        emailPrincipal: '',
        observacao: '',
        dataFundacao: '',
        codigoMunicipio: 0,
        rua: '',
        numero: '',
        complemento: '',
        cidade: '',
        estado: '',
        cep: '',
        status: '',
        avatarColor: undefined
      },
      fatura: {
        id: '',
        dataVencimento: '',
        dataCompetencia: '',
        valor: 0,
        desconto: null,
        numeroParcela: null,
        status: ''
      }
    }))
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
        <Typography variant='h6'>{t("Edit Client Contract")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='id'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled
                  value={value}
                  label='Id'
                  onChange={onChange}
                  placeholder='(e.g.: Id)'
                />
              )}
            />
          </FormControl>  
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='valorContrato'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={value}
                  label={t("Contract value")}
                  onChange={onChange}
                  placeholder='(e.g.: R$ 150,00)'
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
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={value}
                  label={t("Contract ID in Bom Controle")}
                  onChange={onChange}
                  placeholder='(e.g.: 10)'
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
SidebarClienteContratoEdit.acl = {
  action: 'update',
  subject: 'ac-clienteContrato-page'
}

export default SidebarClienteContratoEdit