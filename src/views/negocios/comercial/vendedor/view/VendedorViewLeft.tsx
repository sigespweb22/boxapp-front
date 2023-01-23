// ** React Imports
import { useEffect, useState } from 'react'

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
import { VendedorType } from 'src/types/negocios/comercial/vendedor/vendedorTypes'


// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Actions Imports
import { fetchData } from 'src/store/negocios/comercial/vendedor/view'

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

const defaultValues: VendedorType = {
  id: '',
  nome: '',
  userId: '',
  applicationUser: null,
  status: '',
  avatarColor: 'primary'
}

const VendedorViewLeft = ({id}: Props) => {
  // ** Hooks
  const { t } = useTranslation()

  // ** States
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.vendedorView)
  const [vendedorView, setVendedorView] = useState<VendedorType>(defaultValues)

  const {} = useForm({
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
      setVendedorView(store.data)
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
          {getInitials(vendedorView.nome || "CP")}
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
                {vendedorView.nome}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={vendedorView.applicationUser?.fullName || vendedorView.nome}
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
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("Name")}:</Typography>
                  <Typography variant='body2'>{vendedorView.nome}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("User")}:</Typography>
                  <Typography variant='body2'>{vendedorView.applicationUser?.fullName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Status:</Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={`${t(vendedorView.status)}`}
                    color={statusColors[vendedorView.status]}
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
            {t("Seller with id")}: {id} {t("does not exist. Please check the sellers listing")}:{' '}
            <Link href='/pages/negocios/comercial/vendedor/list'>{t("Sellers listing")}</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  }
}

VendedorViewLeft.acl = {
  action: 'read',
  subject: 'ac-vendedor-page'
}

export default VendedorViewLeft