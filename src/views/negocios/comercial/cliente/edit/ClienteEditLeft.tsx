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

// ** InputMask Imports
import InputMask from 'react-input-mask'

// ** Next Import
import Link from 'next/link'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

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

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Actions Imports
import { editCliente, fetchData } from 'src/store/negocios/comercial/cliente/view'

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

const defaultValues: ClienteType = {
  id: '',
  tipoPessoa: '',
  nomeFantasia: '',
  razaoSocial: '',
  inscricaoEstadual: '',
  cnpj: '',
  telefonePrincipal: '',
  emailPrincipal: '',
  cpf: '',
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

const formatCnpj = (cnpj: string) => {
  return cnpj?.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
}

const formatCpf = (cpf: string) => {
  return cpf?.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

const ClienteEditLeft = ({id}: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const [data, setData] = useState<null | ClienteType>(defaultValues)
  const { t } = useTranslation()

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.clienteView)

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
      setValue('tipoPessoa', store?.data.tipoPessoa)
      setValue('nomeFantasia', store?.data.nomeFantasia)
      setValue('razaoSocial', store?.data.razaoSocial)
      setValue('inscricaoEstadual', store?.data.inscricaoEstadual)
      setValue('cnpj', store?.data.cnpj)
      setValue('cpf', store?.data.cpf)
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

  const onSubmit = (data: ClienteType) => {
    dispatch(editCliente({ ...data  }))
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
              <Box sx={{ display: 'flex', mb: 0 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t("Person type")}:</Typography>
                <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                  {store?.data.tipoPessoa}
                </Typography>
              </Box>
              <Box sx={{ pt: 2, pb: 2 }}>
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

            {ability?.can('update', 'ac-cliente-page') &&
              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' sx={{ mr: 3 }} onClick={handleEditClickOpen}>
                  {t("Edit")}
                </Button>
              </CardActions>
            }

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='cliente-view-left'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
              aria-describedby='cliente-view-left-description'
            >
              <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                {t("Edit customer information")}
              </DialogTitle>
              <DialogContent>
                <DialogContentText variant='body2' id='cliente-view-left-description' sx={{ textAlign: 'center', mb: 7 }}>
                  {t("The updating of customer information is auditable")}.
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                          name='tipoPessoa'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              disabled
                              value={value}
                              label={t("Person type")}
                              onChange={onChange}
                              placeholder='(e.g.: Ex.: JURIDICA)'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
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
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                          name='nomeFantasia'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label={t("Trading name")}
                              onChange={onChange}
                              placeholder='(e.g.: Ex.: Empresa de Tecnologia)'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {store.data.tipoPessoa === 'JURIDICA' &&
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth sx={{ mb: 6 }}>
                            <Controller
                              name='razaoSocial'
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label={t("Corporate Name")}
                                  onChange={onChange}
                                  placeholder='(e.g.: Ex.: Empresa de Tecnologia LTDA)'
                                />
                              )}
                            />
                          </FormControl>
                      </Grid>
                    }
                    {store.data.tipoPessoa === 'JURIDICA' &&
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth sx={{ mb: 6 }}>
                          <Controller
                            name='inscricaoEstadual'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label={t("State registration")}
                                onChange={onChange}
                                placeholder='(e.g.: Ex.: 123456)'
                              />
                            )}
                          />
                        </FormControl>
                      </Grid>
                    }
                    {store.data.tipoPessoa === 'FISICA' &&
                      <Grid item xs={12} sm={12}>
                        <FormControl fullWidth sx={{ mb: 6 }}>
                          <Controller
                            name='cpf'
                            control={control}
                            render={props => (
                              <InputMask
                                mask='999.999.999-99'
                                value={props.field.value}
                                disabled={false}
                                onChange={(value): void => {
                                  props.field.onChange(value.target.value)
                                  setValue('cpf', value.target.value)
                                }}
                              >
                                <TextField
                                  sx={{ width: 'auto' }}
                                  disabled={false}
                                  name='cpf'
                                  type='text'
                                  label={t("Individual Taxpayer Registration")}
                                  placeholder='e.g.: 035.753.486-13'
                                />
                              </InputMask>
                            )}
                          />
                        </FormControl>
                      </Grid>
                    }
                    {store.data.tipoPessoa === 'JURIDICA' &&
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth sx={{ mb: 6 }}>
                          <Controller
                            name='cnpj'
                            control={control}
                            render={props => (
                              <InputMask
                                mask='99.999.999/9999-99'
                                value={props.field.value}
                                disabled={false}
                                onChange={(value): void => {
                                  props.field.onChange(value.target.value)
                                  setValue('cnpj', value.target.value)
                                }}
                              >
                                <TextField
                                  sx={{ width: 'auto' }}
                                  disabled={false}
                                  name='cnpj'
                                  type='text'
                                  label={t("Federal registration")}
                                  placeholder='(e.g.: Ex.: 42.326.712/0001-45)'
                                />
                              </InputMask>
                            )}
                          />
                        </FormControl>
                      </Grid>
                    }
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                          name='telefonePrincipal'
                          control={control}
                          render={props => (
                            <InputMask
                              mask='(99) 9.9999-9999'
                              value={props.field.value}
                              disabled={false}
                              onChange={(value): void => {
                                props.field.onChange(value.target.value)
                              }}
                            >
                              <TextField
                                sx={{ width: 'auto' }}
                                disabled={false}
                                name='telefonePrincipal'
                                type='text'
                                label={t("Phone number")}
                                placeholder='e.g.: (48) 9.8896-1111'
                              />
                            </InputMask>
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
                              label={t("E-mail")}
                              onChange={onChange}
                              placeholder='(e.g.: Ex.: empresa@empresa.com'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {store.data.tipoPessoa === 'JURIDICA' &&
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth sx={{ mb: 6 }}>
                          <Controller
                            name='store?.dataFundacao'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label={t("Foundation date")}
                                onChange={onChange}
                                placeholder='(e.g.: Ex.: 10/01/2000'
                              />
                            )}
                          />
                        </FormControl>
                      </Grid>
                    }
                    <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <Controller
                        name='cep'
                        control={control}
                        render={props => (
                          <InputMask
                            mask='99999-999'
                            value={props.field.value}
                            disabled={false}
                            onChange={(value): void => {
                              props.field.onChange(value.target.value)
                            }}
                          >
                            <TextField
                              sx={{ width: 'auto' }}
                              disabled={false}
                              name='cep'
                              type='text'
                              label={t("Zip code")}
                              placeholder='e.g.: 88801-000'
                            />
                          </InputMask>
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
                              label={t("State")}
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
                          name='rua'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label={t("Street")}
                              onChange={onChange}
                              placeholder='(e.g.: Rua Abílio Diniz'
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
                              label={t("Number")}
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
                          name='complemento'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label={t("Address complement")}
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
                              label={t("City")}
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
                                label={t("City code")}
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
                              label={t("Note")}
                              onChange={onChange}
                              placeholder={t("(e.g.: This company is in the process of evolution)")}
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <DialogActions sx={{ justifyContent: 'center' }}>
                      <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                        {t("Save")}
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
            {t("Client with id")}: {id} {t("Does not exist. Please check the client listing")}:{' '}
            <Link href='/pages/negocios/comercial/cliente/list'>{t("Clients listing")}</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  }
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ClienteEditLeft.acl = {
  action: 'update',
  subject: 'ac-cliente-page'
}

export default ClienteEditLeft