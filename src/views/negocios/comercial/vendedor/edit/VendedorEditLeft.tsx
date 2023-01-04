// ** React Imports
import { useState, useContext, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Alert from '@mui/material/Alert'

// ** Next Import
import Link from 'next/link'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

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

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Actions Imports
import { editVendedor, fetchData } from 'src/store/negocios/comercial/vendedor/view'

// ** Store Imports
import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete } from '@mui/material'
import usuarioApiService from 'src/@api-center/sistema/usuario/usuarioApiService'
import axios from 'axios'

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

interface ApplicationUser {
  id: string
  fullName: string
}

const defaultValues: VendedorType = {
  id: '',
  nome: '',
  userId: '',
  applicationUser: null,
  status: '',
  avatarColor: 'primary'
}

const VendedorEditLeft = ({ id }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const [data, setData] = useState<null | VendedorType>(defaultValues)
  const { t } = useTranslation()

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.vendedorView)
  const [usuarios, setUsuarios] = useState<ApplicationUser[]>([])

  const { reset, setValue, control, handleSubmit } = useForm({
    mode: 'onChange'
  })

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(usuarioApiService.storageTokenKeyName)}`
    }
  }

  useEffect(() => {
    axios.get(`${usuarioApiService.listToSelectAsync}`, config).then(response => {
      setUsuarios(response.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(
      fetchData({
        id: id
      })
    )
  }, [dispatch, id])

  useEffect(() => {
    if (store?.data) {
      setData(store.data)
    }
  }, [store])

  useEffect(() => {
    if (store) {
      setValue('id', store?.data.id)
      setValue('nome', store?.data.nome)
      setValue('applicationUser', store?.data.applicationUser)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store])

  const renderVendedorAvatar = () => {
    if (store) {
      return (
        <CustomAvatar
          skin='light'
          variant='rounded'
          color={'primary' as ThemeColor}
          sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
        >
          {getInitials(store?.data.nome || 'CP')}
        </CustomAvatar>
      )
    } else {
      return null
    }
  }

  const onSubmit = (data: VendedorType) => {
    data.userId = data.applicationUser?.userId
    data.applicationUser = null

    dispatch(editVendedor({ ...data }))
    handleEditClose()
    reset()
  }

  // Handle Edit dialog
  const handleEditClickOpen = () => {
    dispatch(fetchData({ id: data?.id }))
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setOpenEdit(false)
  }

  if (store) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {renderVendedorAvatar()}
              <Typography variant='h6' sx={{ mb: 2 }}>
                {store?.data.nome}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={store?.data.applicationUser?.fullName || store?.data.nome}
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
              <Typography variant='h6'>{t('Details')}</Typography>
              <Divider />
              <Box sx={{ display: 'flex', mb: 0, pt: 2, pb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t('Name')}:</Typography>
                <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                  {store?.data.nome}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 0, pt: 0, pb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t('User')}:</Typography>
                <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                  {store?.data.applicationUser?.fullName}
                </Typography>
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
            </CardContent>

            {ability?.can('update', 'ac-vendedor-page') && (
              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' sx={{ mr: 3 }} onClick={handleEditClickOpen}>
                  {t('Edit')}
                </Button>
              </CardActions>
            )}

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='vendedor-view-left'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
              aria-describedby='vendedor-view-left-description'
            >
              <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                {t('Edit seller information')}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  variant='body2'
                  id='vendedor-view-left-description'
                  sx={{ textAlign: 'center', mb: 7 }}
                >
                  {t('Updating seller information is auditable')}.
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <Controller
                        name='nome'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label={t('Name')}
                            onChange={onChange}
                            placeholder='(e.g.: Ex.: John Doe)'
                          />
                        )}
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <Controller
                        name='applicationUser'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => {
                          return (
                            <FormControl fullWidth>
                              <Autocomplete
                                multiple={false}
                                options={usuarios}
                                filterSelectedOptions
                                value={value}
                                getOptionLabel={option => option.fullName}
                                onChange={(event, newValue): void => {
                                  onChange(newValue)
                                }}
                                renderInput={params => (
                                  <TextField {...params} label={t('User')} placeholder='(e.g.: John Doe)' />
                                )}
                              />
                            </FormControl>
                          )
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                      {t('Save')}
                    </Button>
                    <Button size='large' variant='outlined' color='secondary' onClick={handleEditClose}>
                      {t('Discard')}
                    </Button>
                  </DialogActions>
                </form>
              </DialogContent>
            </Dialog>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            {t('Seller with id')}: {id} {t('does not exist. Please check the sellers listing')}:{' '}
            <Link href='/pages/negocios/comercial/vendedor/list'>{t('Sellers listing')}</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  }
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
VendedorEditLeft.acl = {
  action: 'update',
  subject: 'ac-vendedor-page'
}

export default VendedorEditLeft
