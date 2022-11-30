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
import FormHelperText from '@mui/material/FormHelperText'
import Alert from '@mui/material/Alert'

// ** Next Import
import Link from 'next/link'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { FornecedorType } from 'src/types/negocios/parceiros/fornecedor/fornecedorTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Actions Imports
import { editFornecedor, fetchData } from 'src/store/negocios/parceiros/fornecedor/view'

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

const schema = yup.object().shape({
  nomeFantasia: yup
    .string()
    .required("Nome fantasia é requerido."),
  razaoSocial: yup
    .string()
    .required("Razão social é requerida."),
  cnpj: yup
    .string()
    .required("CNPJ é requerido.")
})

interface Props {
  id: string | undefined
}

const defaultValues: FornecedorType = {
  id: '',
  nomeFantasia: '',
  razaoSocial: '',
  inscricaoEstadual: '',
  cnpj: '',
  telefonePrincipal: '',
  emailPrincipal: '',
  observacao: '',
  codigoMunicipio: 0,
  rua: '',
  numero: '',
  complemento: '',
  cidade: '',
  estado: '',
  cep: '',
  fornecedorServicos: {id: '', nome: ''},
  status: '',
}

const FornecedorEditLeft = ({id}: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const [data, setData] = useState<null | FornecedorType>(defaultValues)
  const { t } = useTranslation()

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.fornecedorView)

  const {
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
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
      setData(store?.data)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const renderFornecedorAvatar = () => {
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

  const onSubmit = (data: FornecedorType) => {
    dispatch(editFornecedor({ ...data,  }))
    handleEditClose()
    reset()
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
              {renderFornecedorAvatar()}
              <Typography variant='h6' sx={{ mb: 2 }}>
                {store?.data.nomeFantasia}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={store?.data.razaoSocial}
                color={'primary'}
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

            {ability?.can('update', 'ac-fornecedor-page') &&
              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' sx={{ mr: 3 }} onClick={handleEditClickOpen}>
                  Editar
                </Button>
              </CardActions>
            }

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='fornecedor-view-left'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
              aria-describedby='fornecedor-view-left-description'
            >
              <DialogTitle id='fornecedor-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                Editar informações do fornecedor
              </DialogTitle>
              <DialogContent>
                <DialogContentText variant='body2' id='fornecedor-view-left-description' sx={{ textAlign: 'center', mb: 7 }}>
                  A atualização das informações do fornecedor são passíveis de auditoria.
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                          name='id'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              disabled={true}
                              value={value}
                              label='Id'
                              onChange={onChange}
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                          name='nomeFantasia'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label='Nome fantasia'
                              onChange={onChange}
                              placeholder='(e.g.: Ex.: Empresa de Tecnologia)'
                              error={Boolean(errors.nomeFantasia)}
                            />
                          )}
                        />
                        {errors.nomeFantasia && <FormHelperText sx={{ color: 'error.main' }}>{errors.nomeFantasia.message}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                          <Controller
                            name='razaoSocial'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='Razão social'
                                onChange={onChange}
                                placeholder='(e.g.: Ex.: Empresa de Tecnologia LTDA)'
                                error={Boolean(errors.razaoSocial)}
                              />
                            )}
                          />
                          {errors.razaoSocial && <FormHelperText sx={{ color: 'error.main' }}>{errors.razaoSocial.message}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <Controller
                        name='inscricaoEstadual'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Inscrição estadual'
                            onChange={onChange}
                            placeholder='(e.g.: Ex.: 64.228.202/0001-78)'
                          />
                        )}
                      />
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                            <Controller
                              name='cnpj'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Cnpj'
                                  onChange={onChange}
                                  placeholder='(e.g.: Ex.: 42.326.712/0001-45)'
                                  error={Boolean(errors.cnpj)}
                                />
                              )}
                            />
                            {errors.cnpj && <FormHelperText sx={{ color: 'error.main' }}>{errors.cnpj.message}</FormHelperText>}
                          </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                          name='telefonePrincipal'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label='Telefone principal'
                              onChange={onChange}
                              placeholder='(e.g.: Ex.: (48) 3451-6526)'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                          name='emailPrincipal'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label='E-mail principal'
                              onChange={onChange}
                              placeholder='(e.g.: Ex.: empresa@empresa.com'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <Controller
                        name='cep'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Cep'
                            onChange={onChange}
                            placeholder='(e.g.: 88801-430'
                          />
                        )}
                      />
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                          name='estado'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label='Estado'
                              onChange={onChange}
                              placeholder='(e.g.: Santa Catarina'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                          name='numero'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label='Número'
                              onChange={onChange}
                              placeholder='(e.g.: 52'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                          name='rua'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label='Rua'
                              onChange={onChange}
                              placeholder='(e.g.: Rua Abílio Diniz'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                          name='complemento'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label='Complemento'
                              onChange={onChange}
                              placeholder='(e.g.: Próximo ao Banco do Brasil'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>                    
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                          name='cidade'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label='Cidade'
                              onChange={onChange}
                              placeholder='(e.g.: Criciúma'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                          <Controller
                            name='codigoMunicipio'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='Código município'
                                onChange={onChange}
                                placeholder='(e.g.: Ex.: 654789'
                              />
                            )}
                          />
                      </FormControl>
                    </Grid>                    
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                          name='observacao'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label='Observacao'
                              onChange={onChange}
                              placeholder='(e.g.: Ex.: Esta empresa está em processo de evolução'
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
                  </Grid>
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
            Fornecedor com o id: {id} não existe. Por favor verifique a listagem de fornecedores:{' '}
            <Link href='/pages/negocios/parceiros/fornecedor/list'>Listagem de fornecedores</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  }
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
FornecedorEditLeft.acl = {
  action: 'update',
  subject: 'ac-fornecedor-page'
}

export default FornecedorEditLeft