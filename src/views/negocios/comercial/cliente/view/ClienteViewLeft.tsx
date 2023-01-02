// ** React Imports
import { useEffect } from 'react'

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

const statusColors: ColorsType = {
  ACTIVE: 'success',
  INACTIVE: 'error'
}

interface Props {
  id: string | string[] | undefined
}

const formatCnpj = (cnpj: string) => {
  return cnpj?.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
}

const formatCpf = (cpf: string) => {
  return cpf?.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

const ClienteViewLeft = ({id}: Props) => {
  // ** Hooks
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                label={store?.data.razaoSocial || store?.data.nomeFantasia}
                color='primary'
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
              <Typography variant='h6'>{t("Details")}</Typography>
              <Divider />
              <Box sx={{ pt: 2, pb: 2 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("Person type")}:</Typography>
                  <Typography variant='body2'>{store?.data.tipoPessoa}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("Trading name")}:</Typography>
                  <Typography variant='body2'>{store?.data.nomeFantasia}</Typography>
                </Box>
                {store.data.tipoPessoa === 'JURIDICA' &&
                  <Box sx={{ display: 'flex', mb: 2.7 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("Corporate Name")}:</Typography>
                    <Typography variant='body2'>{store?.data.razaoSocial}</Typography>
                  </Box>
                }
                {store.data.tipoPessoa === 'JURIDICA' &&
                  <Box sx={{ display: 'flex', mb: 2.7 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("State registration")}:</Typography>
                    <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                      {store?.data.inscricaoEstadual}
                    </Typography>
                  </Box>
                }
                {store.data.tipoPessoa === 'JURIDICA' &&
                  <Box sx={{ display: 'flex', mb: 2.7 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("Federal registration")}:</Typography>
                    <Typography variant='body2'>{formatCnpj(store?.data.cnpj)}</Typography>
                  </Box>
                }
                {store.data.tipoPessoa === 'FISICA' &&
                  <Box sx={{ display: 'flex', mb: 2.7 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("Individual Taxpayer Registration")}:</Typography>
                    <Typography variant='body2'>{formatCpf(store?.data.cpf)}</Typography>
                  </Box>
                }
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("Phone number")}:</Typography>
                  <Typography variant='body2'>{store?.data.telefonePrincipal}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("E-mail")}:</Typography>
                  <Typography variant='body2'>{store?.data.emailPrincipal}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("Note")}:</Typography>
                  <Typography variant='body2'>{store?.data.observacao}</Typography>
                </Box>
                {store.data.tipoPessoa === 'JURIDICA' &&
                  <Box sx={{ display: 'flex', mb: 2.7 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("Foundation date")}:</Typography>
                    <Typography variant='body2'>{store?.data.dataFundacao}</Typography>
                  </Box>
                }
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("City code")}:</Typography>
                  <Typography variant='body2'>{store?.data.codigoMunicipio}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("Street")}:</Typography>
                  <Typography variant='body2'>{store?.data.rua}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("Number")}:</Typography>
                  <Typography variant='body2'>{store?.data.numero}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("Address complement")}:</Typography>
                  <Typography variant='body2'>{store?.data.complemento}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("State")}:</Typography>
                  <Typography variant='body2'>{store?.data.estado}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("City")}:</Typography>
                  <Typography variant='body2'>{store?.data.cidade}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("Zip code")}:</Typography>
                  <Typography variant='body2'>{store?.data.cep}</Typography>
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
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            {t("Client with id")}: {id} {t("Does not exist. Please check the client listing")}:{' '}
            <Link href='/pages/negocios/comercial/cliente/list'>{t("Clients listing")}</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  }
}

ClienteViewLeft.acl = {
  action: 'read',
  subject: 'ac-cliente-page'
}

export default ClienteViewLeft