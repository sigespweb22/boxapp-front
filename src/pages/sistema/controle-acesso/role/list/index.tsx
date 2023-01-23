// ** React Imports
import { useContext, useState, useEffect, useCallback } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Third Party Import
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import Grid, { GridProps } from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Alert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData } from 'src/store/sistema/controle-acesso/role'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { RoleType } from 'src/types/sistema/controle-acesso/roleTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/sistema/controle-acesso/role/list/TableHeader'
import AddRoleDrawer from 'src/views/sistema/controle-acesso/role/list/AddRoleDrawer'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

interface CellType {
  row: RoleType
}

interface RoleData {
  id: string
  name: string
  description: string
}

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders client column
const renderClient = (row: RoleType) => {
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
      const { name } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {name}
            </Typography>
            <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
              🔐{name}
            </Typography>
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

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  borderRadius: 10,
  padding: theme.spacing(11.25, 36),
  backgroundColor: hexToRGBA(theme.palette.primary.main, 0.1),
  [theme.breakpoints.down('xl')]: {
    padding: theme.spacing(11.25, 20)
  },
  [theme.breakpoints.down('md')]: {
    textAlign: 'center'
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(11.25, 5)
  }
}))

const GridStyled = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    order: -1
  }
}))

const Img = styled('img')(({ theme }) => ({
  bottom: 0,
  right: 144,
  width: 160,
  position: 'absolute',
  [theme.breakpoints.down('md')]: {
    width: 200,
    position: 'static'
  },
  [theme.breakpoints.down('sm')]: {
    width: 180
  }
}))

const RoleList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [viewDialogOpen, setViewDialogOpen] = useState<boolean>(false)
  const [addRoleOpen, setAddRoleOpen] = useState<boolean>(false)

  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

  // ** Hooks
  const {
    control,
    setValue: setFormValue,
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

  const handleViewRole = ({ id, name, description }: RoleData) => {
    setFormValue('id', id)
    setFormValue('name', name)
    setFormValue('description', description)
    setViewDialogOpen(true)
  }

  const toggleAddRoleDrawer = () => setAddRoleOpen(!addRoleOpen)
  const handleDialogViewToggle = () => setViewDialogOpen(!viewDialogOpen)

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Ações',
      headerAlign: 'center' as const,
      align: 'center' as const,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {ability?.can('read', 'ac-role-page') && (
            <IconButton onClick={() => handleViewRole(row)}>
              <EyeOutline fontSize='small' sx={{ mr: 2 }} />
            </IconButton>
          )}
        </Box>
      )
    }
  ]

  return (
    <>
      <BoxWrapper>
        <Grid container spacing={0}>
          <Grid item xs={12} md={9.45}>
            <Typography variant='h4' sx={{ mb: 3, color: 'primary.main' }}>
              {t('Permission')}
            </Typography>
            <Typography variant='h6' sx={{ mb: 3, color: 'primary.main' }}>
              {t(
                "Ready to build App Access Permissions groups? So you are in the right place! Grab your coffee and let's go!"
              )}{' '}
              🚀
            </Typography>
            <Typography sx={{ mb: 9.5, color: 'text.secondary' }}>
              {t(
                'All permissions are created automatically by our team, according to the evolution of the functionalities'
              )}
              .
              {t(
                ' Therefore, below you can check the description of each one, in order to be able to correctly adapt them to the groups according to your access needs'
              )}
              .
            </Typography>
          </Grid>
          <GridStyled item xs={12} md={4}>
            <Img alt='pricing-cta-avatar' src='/images/cards/pose_m18.png' />
          </GridStyled>
        </Grid>
      </BoxWrapper>
      <Grid container spacing={6} sx={{ mt: 10 }}>
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
        ) : (
          <>{t('You do not have permission to view this resource.')}</>
        )}
        <AddRoleDrawer open={addRoleOpen} toggle={toggleAddRoleDrawer} />
      </Grid>
      <Dialog maxWidth='sm' fullWidth onClose={handleDialogViewToggle} open={viewDialogOpen}>
        <DialogTitle sx={{ mx: 'auto', textAlign: 'center' }}>
          <Typography variant='h4' component='span' sx={{ mb: 2 }}>
            {t('View Permission')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Alert severity='warning'>
            <AlertTitle>{t('Warning')}!</AlertTitle>
            {t('In this mode you can only display the data. No changes can be made')}.
          </Alert>
          <Box component='form' sx={{ mt: 5 }}>
            <FormGroup sx={{ mb: 2, alignItems: 'center', flexDirection: 'row', flexWrap: ['wrap', 'nowrap'] }}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    disabled={true}
                    size='medium'
                    value={value}
                    label={t('Permission Name')}
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    placeholder='e.g. CanUserList'
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
                    disabled={true}
                    size='medium'
                    value={value}
                    label={t('Permission Description')}
                    onChange={onChange}
                    error={Boolean(errors.description)}
                    placeholder='e.g. Pode visualizar a tela principal de usuários e ver todos os registros de usuário'
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
