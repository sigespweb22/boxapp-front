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
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { editProduto } from 'src/store/negocios/comercial/produto'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { ProdutoType } from 'src/types/negocios/comercial/produto/produtoTypes'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import fornecedorProdutoApiService from 'src/@api-center/negocios/parceiros/fornecedor/produto/fornecedorProdutoApiService'

interface ProdutoEditDrawerType {
  row: ProdutoType | undefined
  open: boolean
  toggle: () => void
}

interface ProdutoData {
  id: string
  nome: string
  codigoUnico: string
  caracteristicas: string
  descricao: string
  valorCusto: string
  fornecedorProduto: { id: string; nome: string }
  fornecedorProdutoId: string
  status: string
  avatarColor: ThemeColor
}

const defaultValues = {
  id: '',
  nome: '',
  codigoUnico: '',
  caracteristicas: '',
  descricao: '',
  valorCusto: '',
  fornecedorProduto: { id: '', nome: '' },
  fornecedorProdutoId: '',
  status: ''
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
    .required()
})

const ProdutoEditDrawer = (props: ProdutoEditDrawerType) => {
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
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // ** States
  const [fornecedoresProdutos, setFornecedoresProdutos] = useState([])

  const config = {
    headers: {
       Authorization: `Bearer ${window.localStorage.getItem(fornecedorProdutoApiService.storageTokenKeyName)!}`
    }
  }

  useEffect(() => {

    const fornecedoresProdutosRequest = axios.get(fornecedorProdutoApiService.listToSelectAsync, config)
    
    fornecedoresProdutosRequest
      .then(response => {
        setFornecedoresProdutos(response.data)
      })
      .catch(error => {
        setFornecedoresProdutos(error)
      })
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

    // ** Set values
    setValue('id', props?.row?.id || '')
    setValue('nome', props?.row?.nome || '')
    setValue('codigoUnico', props?.row?.codigoUnico || '')
    setValue('caracteristicas', props?.row?.caracteristicas || '')
    setValue('descricao', props?.row?.descricao || '')
    setValue('fornecedorProduto', props?.row?.fornecedorProduto || { id: '', nome: '' })
    setValue('valorCusto', props?.row?.valorCusto || '')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const onSubmit = (data: ProdutoData) => {
    dispatch(editProduto({ ...data }))
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
        <Typography variant='h6'>Editar Produto</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value } }) => <TextField disabled value={value} label='Id' />}
            />
          </FormControl>
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
                  placeholder='(e.g.: Ex.: Nome do produto)'
                  error={Boolean(errors.nome)}
                />
              )}
            />
            {errors.nome && <FormHelperText sx={{ color: 'error.main' }}>{errors.nome.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='codigoUnico'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField value={value} label='Código único' onChange={onChange} placeholder='(e.g.: #AB12345)' />
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
                  placeholder='(e.g.: Características do produto)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='descricao'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Descrição'
                  onChange={onChange}
                  placeholder='(e.g.: Descrição do produto)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='valorCusto'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <TextField value={value} label='Valor custo' onChange={onChange} placeholder='(e.g.: R$ 150,00)' />
                )
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name={'fornecedorProduto'}
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    multiple={false}
                    options={fornecedoresProdutos || []}
                    filterSelectedOptions
                    value={value}
                    id='autocomplete-multiple-outlined'
                    getOptionLabel={option => option.nome}
                    renderInput={params => (
                      <TextField {...params} label='Fornecedor Produto' placeholder='(e.g.: Roteador)' />
                    )}
                    onChange={(event, newValue) => {
                      setValue('fornecedorProduto', newValue || { id: '', nome: '' })
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
ProdutoEditDrawer.acl = {
  action: 'update',
  subject: 'ac-produto-page'
}

export default ProdutoEditDrawer
