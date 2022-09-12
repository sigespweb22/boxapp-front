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
import LockCheckOutline from 'mdi-material-ui/LockCheckOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import AccountReactivateOutline from 'mdi-material-ui/AccountReactivateOutline'


// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import PageHeader from 'src/@core/components/page-header'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteGroup, alterStatusGroup } from 'src/store/apps/group'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { GroupsType } from 'src/types/apps/groupTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/system/control-access/group/list/TableHeader'
import AddGroupDrawer from 'src/views/system/control-access/group/list/AddGroupDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface RoleGroupType {
  [key: string]: ReactElement
}

interface GroupStatusType {
  [key: string]: ThemeColor
}

// ** Vars
const rolesGroupObj: RoleGroupType = {
  GENERALS: <LockCheckOutline fontSize='small' sx={{ mr: 3, color: 'success.main' }} />
}

interface CellType {
  row: GroupsType
}

const groupStatusObj: GroupStatusType = {
  ACTIVE: 'success',
  INACTIVE: 'secondary'
}

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders client column
const renderClient = (row: GroupsType) => {
  return (
    <AvatarWithoutImageLink href={`/apps/user/view/${row.id}`}>
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
      >
        {getInitials(row.name ? row.name : 'GP')}
      </CustomAvatar>
    </AvatarWithoutImageLink>
  )
}

// ** renders status column
const RenderStatus = ({ status } : { status: string }) => {
  // ** Hooks
  const { t } = useTranslation()

  return (
    <CustomChip
        skin='light'
        size='small'
        label={t(status)}
        color={groupStatusObj[status]}
        sx={{ textTransform: 'capitalize' }}
    />
  )
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

const RowOptions = ({ id, status } : { id: number | string, status: string }) => {
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
    dispatch(deleteGroup(id))
    handleRowOptionsClose()
  }
  const handleAlterStatus = () => {
    dispatch(alterStatusGroup(id))
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
        {ability?.can('delete', 'ac-group-page') &&
          <MenuItem onClick={handleAlterStatus}>
            <AccountReactivateOutline fontSize='small' sx={{ mr: 2 }} />
            {
              status == "ACTIVE" ? t("Deactivate") : t("Activate")
            }
          </MenuItem>
        }
        {ability?.can('read', 'ac-group-page') &&
          <MenuItem sx={{ p: 0 }}>
            <Link href={`/apps/group/view/${id}`} passHref>
              <MenuItemLink>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
                {t("View")}
              </MenuItemLink>
            </Link>
          </MenuItem>
        }
        {ability?.can('update', 'ac-group-page') &&
          <MenuItem onClick={handleRowOptionsClose}>
            <PencilOutline fontSize='small' sx={{ mr: 2 }} />
            {t("Edit")}
          </MenuItem>
        }
        {ability?.can('delete', 'ac-group-page') &&
          <MenuItem onClick={handleDelete}>
            <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
            {t("Delete")}
          </MenuItem>
        }
      </Menu>
    </>
  )
}

const permissionTransform = (groups: string[]) => {
  if (!groups.length) return "Nenhuma permissão vinculada."
  var elem: string[] = []

  groups.forEach(element => {
    elem.push("| " + element + " | ")
  })

  return elem
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
            <Link href={`/apps/group/view/${id}`} passHref>
              <Typography
                noWrap
                component='a'
                variant='body2'
                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
              >
                {name.toUpperCase()}
              </Typography>
            </Link>
            <Link href={`/apps/group/view/${id}`} passHref>
              <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                🔑{name}
              </Typography>
            </Link>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    field: 'applicationRoleGroups',
    minWidth: 150,
    headerName: 'Permissões',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {rolesGroupObj["GENERALS"]}
          <CustomChip
            skin='light'
            size='small'
            label={permissionTransform(row.applicationRoleGroupsNames)}
            color={'success'}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => <RenderStatus status={row.status}/>
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Ações',
    headerAlign: 'right' as const,
    align: 'right' as const,
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} status={row.status}/>
  }
]

const GroupList = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addGroupOpen, setAddGroupOpen] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.group)

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

  const toggleAddGroupDrawer = () => setAddGroupOpen(!addGroupOpen)

  return (
    <Grid container spacing={6}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>{t("Groups")}</Typography>}
            subtitle={
              <Typography variant='body2'>
                {t("Groups listing")}.
              </Typography>
            }
          />
        </Grid> 
        {ability?.can('list', 'ac-group-page') ? (
          <Grid item xs={12}>
            <Card>
              <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddGroupDrawer} />
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
        <AddGroupDrawer open={addGroupOpen} toggle={toggleAddGroupDrawer} />
      </Grid>
    </Grid>
  )
}

// **Controle de acesso da página
// **Usuário deve possuir ao menos umas das ações como habilidade para ter acesso 
// **a esta página de subject abaixo
GroupList.acl = {
  action: 'list',
  subject: 'ac-group-page'
}

export default GroupList