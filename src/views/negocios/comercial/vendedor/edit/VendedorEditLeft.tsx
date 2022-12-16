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
import { fetchData } from 'src/store/negocios/comercial/vendedor'

// ** Store Imports
import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'


interface Props {
  id: string | string[] | undefined
}

const defaultValues: VendedorType = {
  id: '',
  nome: '',
  userId: '',
  status: '',
}

const VendedorEditLeft = ({id}: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const [data, setData] = useState<null | VendedorType>(defaultValues)
  const { t } = useTranslation()

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.vendedorView)

  const {
    reset,
    setValue,
    control,
    handleSubmit
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
      setValue('nome', store?.data.nome)
      setValue('userId', store?.data.userId)
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

  // Handle Edit dialog
  const handleEditClickOpen = () => {
    dispatch(fetchData({id: data?.id}))
    setOpenEdit(true)
  }
  
  const handleEditClose = () => {
    setOpenEdit(false)
    reset()
  }

  if (store) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {renderClienteAvatar()}
              <Typography variant='h6' sx={{ mb: 2 }}>
                {store?.data.nome}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={store?.data.userId || store?.data.nome}
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
              <Typography variant='h6'>Detalhes</Typography>
              <Divider />
              <Box sx={{ display: 'flex', mb: 0 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Nome:</Typography>
                <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                  {store?.data.nome}
                </Typography>
              </Box>
              <Box sx={{ pt: 2, pb: 2 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Id do usuário:</Typography>
                  <Typography variant='body2'>{store?.data.userId}</Typography>
                </Box>
              </Box>
            </CardContent>

            {ability?.can('update', 'ac-vendedor-page') &&
              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' sx={{ mr: 3 }} onClick={handleEditClickOpen}>
                  Editar
                </Button>
              </CardActions>
            }

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='vendedor-view-left'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
              aria-describedby='vendedor-view-left-description'
            >
              <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                Editar informações do vendedor
              </DialogTitle>
              <DialogContent>
                <DialogContentText variant='body2' id='vendedor-view-left-description' sx={{ textAlign: 'center', mb: 7 }}>
                  A atualização das informações de vendedor são passíveis de auditoria.
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
                              label='Nome'
                              onChange={onChange}
                              placeholder='(e.g.: Ex.: John Doe)'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                          name='userId'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label='Id do usuário'
                              onChange={onChange}
                              placeholder='(e.g.: Ex.: #ABC123)'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <DialogActions sx={{ justifyContent: 'center' }}>
                      <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                        Salvar
                      </Button>
                      <Button size='large' variant='outlined' color='secondary' onClick={handleEditClose}>
                        {t("Discard")}
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
            Vendedor com o id: {id} não existe. Por favor verifique a listagem de vendedores:{' '}
            <Link href='/pages/negocios/comercial/vendedor/list'>Listagem de vendedores</Link>
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