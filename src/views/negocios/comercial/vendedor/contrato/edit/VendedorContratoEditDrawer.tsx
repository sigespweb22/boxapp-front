// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { editVendedorContrato } from 'src/store/negocios/comercial/vendedor/contrato'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { VendedorContratoType } from 'src/types/negocios/comercial/vendedor/contrato/vendedorContratoTypes'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import vendedorApiService from 'src/@api-center/negocios/comercial/vendedor/vendedorApiService'
import vendedorContratoApiService from 'src/@api-center/negocios/comercial/vendedor/contrato/vendedorContratoApiService'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

interface SidebarVendedorContratoEditType {
  row: VendedorContratoType | undefined
  open: boolean
  toggle: () => void
}

let contratos: { id: string, nome: string  }[] = [];

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  comissaoPercentual: yup
    .number()
    .transform((value) => (isNaN(value) || value === null || value === undefined) ? 0 : value)
    .moreThan(-1),
  comissaoReais: yup
    .number()
    .transform((value) => (isNaN(value) || value === null || value === undefined) ? 0 : value)
    .moreThan(-1),
})


const defaultValues = {
  id: '',
  comissaoReais: 0,
  comissaoPercentual: 0,
  clienteContratoId: '',
  vendedorId: '',
  contrato: {id: '', nome: ''},
  status: '',
}

const isValidComissao = (data: VendedorContratoType) => {
  if (data.comissaoReais != 0 && data.comissaoPercentual != 0) {
    toast.warning('Permitido apenas uma das opções de comissionamento.')
    
    return false
  }
  
  return true
}

const formatCurrency = (currency: number) => {
  return currency.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

const SidebarVendedorContratoEdit = (props: SidebarVendedorContratoEditType) => {
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
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(vendedorApiService.storageTokenKeyName)!}`
    }
  }

  useEffect(() => {
    axios
      .get(`${vendedorContratoApiService.listToSelectAsync}`, config)
      .then(response => {
        contratos = response.data
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contratos])

  useEffect(() => {
    setValue('id', props?.row?.id || '')
    setValue('comissaoReais', props?.row?.comissaoReais || 0)
    setValue('comissaoPercentual', props?.row?.comissaoPercentual || 0)
    setValue('clienteContratoId', props?.row?.clienteContratoId || '')
    setValue('vendedorId', props?.row?.vendedorId || '')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const onSubmit = (data: VendedorContratoType): void => {
    if (isValidComissao(data)) {
      dispatch(editVendedorContrato({...data}))
      toggle()
      reset()
    }
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
        <Typography variant='h6'>{t("Edit Seller Contract")}</Typography>
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
                  label='ID'
                  onChange={onChange}
                  placeholder='(e.g.: Id)'
                />
              )}
            />
          </FormControl>  
          <FormControl fullWidth sx={{ mb: 6 }} >
            <TextField
                disabled={true}
                label={t("Customer name linked to the contract")}
                value={props?.row?.clienteContrato?.cliente.nomeFantasia || 0}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }} >
            <TextField
                disabled={true}
                label={t("Total value of the contract")}
                value={formatCurrency(props?.row?.clienteContrato?.valorContrato || 0)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='comissaoReais'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={value}
                  label={t("Commission in reais (R$)")}
                  onChange={onChange}
                  placeholder='(e.g.: R$ 150,00)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='comissaoPercentual'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={value}
                  label={t("Percentage commission (%)")}
                  onChange={onChange}
                  placeholder='(e.g.: 10%)'
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
SidebarVendedorContratoEdit.acl = {
  action: 'update',
  subject: 'ac-vendedorContrato-page'
}

export default SidebarVendedorContratoEdit