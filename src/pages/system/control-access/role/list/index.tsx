// ** React Imports
import { useContext, useState, useEffect, MouseEvent, useCallback, ReactElement } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

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

interface CellType {
  row: RolesType
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

const RowOptions = ({ id } : { id: number | string }) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }
  const handleDelete = () => {
    dispatch(deleteRole(id))
    handleRowOptionsClose()
  }

  return (
    <> 
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        {ability?.can('read', 'ac-role-page') &&
          <MenuItem sx={{ p: 0 }}>
            <Link href={`/apps/role/view/${id}`} passHref>
              <MenuItemLink>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
                {t("View")}
              </MenuItemLink>
            </Link>
          </MenuItem>
        }
        {ability?.can('update', 'ac-role-page') &&
          <MenuItem onClick={handleRowOptionsClose}>
            <PencilOutline fontSize='small' sx={{ mr: 2 }} />
            {t("Edit")}
          </MenuItem>
        }
        {ability?.can('delete', 'ac-role-page') &&
          <MenuItem onClick={handleDelete}>
            <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
            {t("Delete")}
          </MenuItem>
        }
      </Menu>
    </>
  )
}

const columns = [
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
                  {name.toUpperCase()}
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
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Ações',
    headerAlign: 'right',
    align: 'right',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
  }
]

const RoleList = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addRoleOpen, setAddRoleOpen] = useState<boolean>(false)

  // ** Hooks
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

  const toggleAddRoleDrawer = () => setAddRoleOpen(!addRoleOpen)

  return (
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