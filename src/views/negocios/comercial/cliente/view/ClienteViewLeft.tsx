// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Alert from '@mui/material/Alert'

// ** Next Import
import Link from 'next/link'

// ** Third Party Imports
import { useForm } from 'react-hook-form'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { ClienteType } from 'src/types/negocios/comercial/cliente/clienteTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Actions Imports
import { fetchData } from 'src/store/negocios/comercial/cliente/view'

// ** Store Imports
import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'

interface ColorsType {
  [key: string]: ThemeColor
}

const roleColors: ColorsType = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors: ColorsType = {
  ACTIVE: 'success',
  INACTIVE: 'error'
}

interface Props {
  id: string | string[] | undefined
}

const defaultValues: ClienteType = {
  id: '',
  nomeFantasia: '',
  razaoSocial: '',
  inscricaoEstadual: '',
  cnpj: '',
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
}

const ClienteViewLeft = ({id}: Props) => {
  // ** Hooks
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<null | ClienteType>(defaultValues)
  const { t } = useTranslation()

  // ** States
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.clienteView)

  const {
    setValue
  } = useForm({
    mode: 'onChange'
  })

  useEffect(() => {
    dispatch(
      fetchData({
        id: id
      })
    )
  }, [dispatch, id])

  useEffect(() => {
    if(store?.data)
    {
      setData(store.data)
    }
  }, [store])

  useEffect(() => {
    if(store)
    {
      setValue('id', store?.data.id)
      setValue('nomeFantasia', store?.data.nomeFantasia)
      setValue('razaoSocial', store?.data.razaoSocial)
      setValue('inscricaoEstadual', store?.data.inscricaoEstadual)
      setValue('cnpj', store?.data.cnpj)
      setValue('telefonePrincipal', store?.data.telefonePrincipal)
      setValue('emailPrincipal', store?.data.emailPrincipal)
      setValue('dataFundacao', store?.data.dataFundacao)
      setValue('cep', store?.data.cep)
      setValue('rua', store?.data.rua)
      setValue('numero', store?.data.numero)
      setValue('complemento', store?.data.complemento)
      setValue('estado', store?.data.estado)
      setValue('cidade', store?.data.cidade)
      setValue('codigoMunicipio', store?.data.codigoMunicipio)
      setValue('observacao', store?.data.observacao)
    }
  }, [store])

  const renderClienteAvatar = () => {
    if (store) {
      return (
        <CustomAvatar
          skin='light'
          variant='rounded'
          color={'primary' as ThemeColor}
          sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
        >
          {getInitials(store?.data.nomeFantasia || "CP")}
        </CustomAvatar>
      )
    } else {
      return null
    }
  }

  if (store) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {renderClienteAvatar()}
              <Typography variant='h6' sx={{ mb: 2 }}>
                {store?.data.nomeFantasia}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={store?.data.razaoSocial}
                color={roleColors[store?.data.nomeFantasia || 'primary']}
                sx={{
                  height: 20,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  borderRadius: '5px',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Detalhes</Typography>
              <Divider />
              <Box sx={{ pt: 2, pb: 2 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Nome fantasia:</Typography>
                  <Typography variant='body2'>{store?.data.nomeFantasia}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Razão Social:</Typography>
                  <Typography variant='body2'>{store?.data.razaoSocial}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Status:</Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={`${t(store?.data.status)}`}
                    color={statusColors[store?.data.status]}
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Inscrição Estadual:</Typography>
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                    {store?.data.inscricaoEstadual}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Cnpj:</Typography>
                  <Typography variant='body2'>{store?.data.cnpj}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Telefone Principal:</Typography>
                  <Typography variant='body2'>{store?.data.telefonePrincipal}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>E-mail Principal:</Typography>
                  <Typography variant='body2'>{store?.data.emailPrincipal}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Observação:</Typography>
                  <Typography variant='body2'>{store?.data.observacao}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Data fundação:</Typography>
                  <Typography variant='body2'>{store?.data.dataFundacao}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Código Município:</Typography>
                  <Typography variant='body2'>{store?.data.codigoMunicipio}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Rua:</Typography>
                  <Typography variant='body2'>{store?.data.rua}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Número:</Typography>
                  <Typography variant='body2'>{store?.data.numero}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Complemento:</Typography>
                  <Typography variant='body2'>{store?.data.complemento}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Estado:</Typography>
                  <Typography variant='body2'>{store?.data.estado}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Cep:</Typography>
                  <Typography variant='body2'>{store?.data.cidade}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            Cliente com o id: {id} não existe. Por favor verifique a listagem de clientes:{' '}
            <Link href='/pages/negocios/comercial/cliente/list'>Lsitagem de clientes</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default ClienteViewLeft