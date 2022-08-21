// ** React Imports
import { useContext, useState, useEffect, MouseEvent, useCallback, ReactElement } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Third Party Import
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Actions Imports
import { fetchData, deleteRole } from 'src/store/apps/role'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { RolesType } from 'src/types/apps/roleTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/system/control-access/role/list/TableHeader'
import AddRoleDrawer from 'src/views/system/control-access/role/list/AddRoleDrawer'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { updateRole } from 'src/store/apps/role'

interface CellType {
  row: RolesType
}

interface RoleData {
  id: string
  name: string
  description: string
}

// ** Styled component for the link inside menu
const MenuItemLink = styled('a')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  padding: theme.spacing(1.5, 4),
  color: theme.palette.text.primary
}))

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders client column
const renderClient = (row: RolesType) => {
  return (
    <AvatarWithoutImageLink href={`/apps/role/view/${row.id}`}>
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
      >
        {getInitials(row.name ? row.name : 'AC')}
      </CustomAvatar>
    </AvatarWithoutImageLink>
  )
}

const defaultColumns = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'name',
    headerName: 'Nome',
    renderCell: ({ row }: CellType) => {
      const { id, name } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Link href={`/apps/role/view/${id}`} passHref>
                <Typography
                  noWrap
                  component='a'
                  variant='body2'
                  sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                >
                  {name}
                </Typography>
              </Link>
              <Link href={`/apps/role/view/${id}`} passHref>
                <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                  🔐{name}
                </Typography>
              </Link>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'description',
    headerName: 'Descrição',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.description}
        </Typography>
      )
    }
  }
]

const defaultValues = {
  id: '',
  name: '', 
  description: ''
}

const RoleList = () => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)
  const [viewDialogOpen, setViewDialogOpen] = useState<boolean>(false)
  const [addRoleOpen, setAddRoleOpen] = useState<boolean>(false)

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** Hooks
  const {
    control,
    setValue: setFormValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ 
    defaultValues
  })
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.role)

  useEffect(() => {
    dispatch(
      fetchData({
        q: value
      })
    )
  }, [dispatch, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleEditRole = ({ id, name, description } : RoleData) => {
    setFormValue('id', id)
    setFormValue('name', name)
    setFormValue('description', description)
    setEditDialogOpen(true)
  }

  const handleViewRole = ({ id, name, description } : RoleData) => {
    setFormValue('id', id)
    setFormValue('name', name)
    setFormValue('description', description)
    setViewDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    dispatch(deleteRole(id))
    handleRowOptionsClose()
  }

  const toggleAddRoleDrawer = () => setAddRoleOpen(!addRoleOpen)
  const handleDialogEditToggle = () => setEditDialogOpen(!editDialogOpen)
  const handleDialogViewToggle = () => setViewDialogOpen(!viewDialogOpen)

  const onSubmit = (data: RoleData) => {
    setEditDialogOpen(false)
    dispatch(updateRole({ ...data,  }))
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Ações',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {ability?.can('read', 'ac-role-page') &&
            <IconButton onClick={() => handleViewRole(row)}>
              <EyeOutline fontSize='small' sx={{ mr: 2 }} />
            </IconButton>
          }
          {ability?.can('update', 'ac-role-page') &&
            <IconButton onClick={() => handleEditRole(row)}>
              <PencilOutline fontSize='small' />
            </IconButton>
          }
          {ability?.can('delete', 'ac-role-page') &&
            <IconButton onClick={() => handleDelete(row.id)}>
              <DeleteOutline fontSize='small' />
            </IconButton>
          }
        </Box>
      )
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <PageHeader
              title={<Typography variant='h5'>{t("Permissions")}</Typography>}
              subtitle={
                <Typography variant='body2'>
                  {t("Permission listing")}.
                </Typography>
              }
            />
          </Grid> 
          {ability?.can('list', 'ac-role-page') ? (
            <Grid item xs={12}>
              <Card>
                <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddRoleDrawer} />
                <DataGrid
                  localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                  autoHeight
                  rows={store.data}
                  columns={columns}
                  checkboxSelection
                  pageSize={pageSize}
                  disableSelectionOnClick
                  rowsPerPageOptions={[10, 25, 50]}
                  onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                />
              </Card>
            </Grid>
          ) : "Você não tem permissão para ver este recurso."}
          <AddRoleDrawer open={addRoleOpen} toggle={toggleAddRoleDrawer} />
        </Grid>
      </Grid>
      <Dialog maxWidth='sm' fullWidth onClose={handleDialogEditToggle} open={editDialogOpen}>
        <DialogTitle sx={{ mx: 'auto', textAlign: 'center' }}>
          <Typography variant='h4' component='span' sx={{ mb: 2 }}>
            {t("Edit Permission")}
          </Typography>
          <Typography variant='body2'>{t("Edit permission as per your requirements")}</Typography>
        </DialogTitle>
        <DialogContent sx={{ mx: 'auto' }}>
          <Alert severity='warning' sx={{ maxWidth: '500px' }}>
            <AlertTitle>{t("Warning")}!</AlertTitle>
            {t("By editing the permission name, you might break the system permissions functionality. Please ensure you're absolutely certain before proceeding")}.
          </Alert>
          <Box component='form' sx={{ mt: 5 }} onSubmit={handleSubmit(onSubmit)}>
            <FormGroup sx={{ mb: 2, alignItems: 'center', flexDirection: 'row', flexWrap: ['wrap', 'nowrap'] }}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    size='large'
                    value={value}
                    label={t('Permission Name')}
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    placeholder="Exe.: CanUserList"
                    sx={{ mr: [0, 0], mb: [3, 0] }}
                  />
                )}
              />
            </FormGroup>
            {errors.name && (
              <FormHelperText sx={{ color: 'error.main' }}>{t("Please enter a valid permission name")}</FormHelperText>
            )}
            <FormGroup sx={{ mb: 2, pt: 2, alignItems: 'center', flexDirection: 'row', flexWrap: ['wrap', 'nowrap'] }}>
              <Controller
                name='description'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    size='large'
                    value={value}
                    label={t('Permission Description')}
                    onChange={onChange}
                    error={Boolean(errors.description)}
                    placeholder="Exe.: Pode visualizar a tela principal de usuários e ver todos os registros de usuário"
                    sx={{ mr: [0, 0], mb: [0, 0] }}
                  />
                )}
              />

              
            </FormGroup>
            {errors.description && (
              <FormHelperText sx={{ color: 'error.main' }}>{t("Please enter a valid permission description")}</FormHelperText>
            )}
            <FormGroup sx={{ mb: 1, pt: 3, justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained'>
                {t("Update")}
              </Button>
            </FormGroup>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog maxWidth='sm' fullWidth onClose={handleDialogViewToggle} open={viewDialogOpen}>
          <DialogTitle sx={{ mx: 'auto', textAlign: 'center' }}>
            <Typography variant='h4' component='span' sx={{ mb: 2 }}>
              {t("View Permission")}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Alert severity='warning'>
              <AlertTitle>{t("Warning")}!</AlertTitle>
              {t("In this mode you can only display the data. No changes can be made")}.
            </Alert>
            <Box component='form' sx={{ mt: 5 }} onSubmit={handleSubmit(onSubmit)}>
              <FormGroup sx={{ mb: 2, alignItems: 'center', flexDirection: 'row', flexWrap: ['wrap', 'nowrap'] }}>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      disabled='true'
                      size='large'
                      value={value}
                      label={t('Permission Name')}
                      onChange={onChange}
                      error={Boolean(errors.name)}
                      placeholder="Exe.: CanUserList"
                      sx={{ mr: [0, 0], mb: [3, 0] }}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup sx={{ mb: 2, pt: 2, alignItems: 'center', flexDirection: 'row', flexWrap: ['wrap', 'nowrap'] }}>
                <Controller
                  name='description'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      disabled='true'
                      size='large'
                      value={value}
                      label={t('Permission Description')}
                      onChange={onChange}
                      error={Boolean(errors.description)}
                      placeholder="Exe.: Pode visualizar a tela principal de usuários e ver todos os registros de usuário"
                      sx={{ mr: [0, 0], mb: [0, 0] }}
                    />
                  )}
                />
              </FormGroup>
            </Box>
          </DialogContent>
      </Dialog>
    </>
  )
}

// **Controle de acesso da página
// **Usuário deve possuir ao menos umas das ações como habilidade para ter acesso 
// **a esta página de subject abaixo
RoleList.acl = {
  action: 'list',
  subject: 'ac-role-page'
}

export default RoleList