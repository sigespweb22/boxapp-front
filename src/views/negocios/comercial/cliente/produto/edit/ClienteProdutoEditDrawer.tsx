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
import { editClienteProduto } from 'src/store/negocios/comercial/cliente/produto'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { ClienteProdutoType } from 'src/types/negocios/comercial/cliente/produto/clienteProdutoTypes'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import clienteApiService from 'src/@api-center/negocios/comercial/cliente/clienteApiService'
import produtoApiService from 'src/@api-center/negocios/comercial/produto/produtoApiService'
import { useTranslation } from 'react-i18next'

interface SidebarClienteProdutoEditType {
  row: ClienteProdutoType | undefined
  open: boolean
  toggle: () => void
}

interface ClienteProdutoData {
  id: string
  nome: string
  caracteristicas: string
  clienteId: string
  produto: {id: string, nome: string},
  valorVenda: string
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
  nome: '',
  caracteristicas: '',
  valorVenda: '',
  clienteId: '',
  produto: {id: '', nome: ''},
  status: '',
}

const SidebarClienteProdutoEdit = (props: SidebarClienteProdutoEditType) => {
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

  const [produtos, setProdutos] = useState([])

  const config = {
    headers: {
      Authorization: `${window.localStorage.getItem(clienteApiService.storageTokenKeyName)!}`
    }
  }

  useEffect(() => {
    axios
      .get(`${produtoApiService.listToSelectAsync}`, config)
      .then(response => {
        setProdutos(response.data)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue('id', props?.row?.id || '')
    setValue('nome', props?.row?.nome || '')
    setValue('caracteristicas', props?.row?.caracteristicas || '')
    setValue('valorVenda', props?.row?.valorVenda || '')
    setValue('clienteId', props?.row?.clienteId || '')
    setValue('produto', props?.row?.produto || {id: '', nome: ''})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const onSubmit = (data: ClienteProdutoData) => {
    dispatch(editClienteProduto({ ...data,  }))
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
        <Typography variant='h6'>{t("Edit Customer Product")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="produto"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    value={value}
                    sx={{ width: 360 }}
                    options={produtos}
                    onChange={(event, newValue) => {
                      setValue('produto', newValue || {id: '', nome: ''})
                      onChange(newValue)
                    }}
                    id='autocomplete-controlled'
                    getOptionLabel={option => option.nome}
                    renderInput={params => <TextField {...params} label='Produto' />}
                  />
                )
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='nome'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Nome'
                  onChange={onChange}
                  placeholder='(e.g.: Mikrotik)'
                />
              )}
            />
          </FormControl>  
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='caracteristicas'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Características'
                  onChange={onChange}
                  placeholder='(e.g.: Característica do produto)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='valorVenda'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Valor venda'
                  onChange={onChange}
                  placeholder='(e.g.: R$ 150.00)'
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
SidebarClienteProdutoEdit.acl = {
  action: 'update',
  subject: 'ac-cliente-produto-page'
}

export default SidebarClienteProdutoEdit