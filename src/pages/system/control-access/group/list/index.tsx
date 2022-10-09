// ** React Imports
import { useContext, useState, useEffect, useCallback, ReactElement } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip';

// ** Icons Imports
import LockCheckOutline from 'mdi-material-ui/LockCheckOutline'
import ElevatorUp from 'mdi-material-ui/ElevatorUp'
import ElevatorDown from 'mdi-material-ui/ElevatorDown'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import Help from 'mdi-material-ui/Help'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import PageHeader from 'src/@core/components/page-header'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, alterStatusGroup } from 'src/store/apps/group'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { GroupsType } from 'src/types/apps/groupTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/system/control-access/group/list/TableHeader'
import AddGroupDrawer from 'src/views/system/control-access/group/list/AddGroupDrawer'
import ViewGroupDrawer from 'src/views/system/control-access/group/view/ViewGroupDrawer'
import EditGroupDrawer from 'src/views/system/control-access/group/edit/EditGroupDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface UserGroupType {
  [key: string]: ReactElement
}

interface UserStatusType {
  [key: string]: ThemeColor
}

interface applicationGroup {
  id: string,
  name: string
}

interface ApplicationUserRoleViewModel {
  roleId: string
  name: string
}

interface CellType {
  row: GroupsType
}

const userStatusObj: GroupStatusType = {
  NENHUM: 'primary',
  ACTIVE: 'success',
  PENDING: 'warning',
  INACTIVE: 'secondary'
}

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

const userGroupObj: UserGroupType = {
  GENERALS: <LockCheckOutline fontSize='small' sx={{ mr: 3, color: 'success.main' }} />
}

const permissionTransform = (groups: ApplicationUserRoleViewModel[]) => {
  const elem: string[] = []

  groups.forEach(element => {
    elem.push("| " + element.name + " | ")
  })

  return elem
}

// ** renders group column
const renderGroup = (row: GroupsType) => {
  return (
    <AvatarWithoutImageLink href="#">
      <CustomAvatar
          skin='light'
          color={'primary'}
          sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
        >
          {getInitials(row.name ? row.name : 'NP')}
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
        color={userStatusObj[status]}
        sx={{ textTransform: 'capitalize' }}
    />
  )
}

const defaultColumns = [
  {
    flex: 0.08,
    minWidth: 30,
    field: 'name',
    headerName: 'Nome',
    headerAlign: 'left' as const,
    align: 'left' as const,
    renderCell: ({ row }: CellType) => {
      const { id, name } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderGroup(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Link href={`/apps/client/view/${id}`} passHref>
              <Typography
                noWrap
                component='a'
                variant='body2'
                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
              >
                {name}
              </Typography>
            </Link>
            <Link href={`/apps/client/view/${id}`} passHref>
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
          {userGroupObj["GENERALS"]}
          <CustomChip
            skin='light'
            size='small'
            label={permissionTransform(row.applicationRoleGroups)}
            color={'success'}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      )
    }
  },
  {
    flex: 0.04,
    minWidth: 50,
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => <RenderStatus status={row.status}/>
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
  const [viewGroupOpen, setViewGroupOpen] = useState<boolean>(false)
  const [editGroupOpen, setEditGroupOpen] = useState<boolean>(false)
  const [row, setRow] = useState<GroupsType | undefined>()

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

  const handleViewGroup = (row : GroupsType) => {
    setRow(row)
    setViewGroupOpen(true)
  }

  const handleEditGroup = (row : GroupsType) => {
    setRow(row)
    setEditGroupOpen(true)
  }

  const handleAlterStatus = (id: string) => {
    dispatch(alterStatusGroup(id))
  }

  const RenderButton = ({ id, status } : { id: string, status: string }) => {
    if (status === 'INACTIVE' || status === 'PENDING')
    {
      return (
        <Tooltip title={t("Activate")}>
          <IconButton onClick={() => handleAlterStatus(id)}>
            <ElevatorUp fontSize='small' />
          </IconButton>
        </Tooltip>        
      )
    } else if (status === 'ACTIVE') {
      return (
        <Tooltip title={t("Deactivate")}>
          <IconButton onClick={() => handleAlterStatus(id)}>
            <ElevatorDown fontSize='small' />
          </IconButton>
        </Tooltip>
      )
    }
    else {
      return (
        <IconButton onClick={() => handleAlterStatus(id)}>
          <Help fontSize='small' />
        </IconButton>
      )
    }
  }

  const toggleAddGroupDrawer = () => setAddGroupOpen(!addGroupOpen)
  const toggleViewGroupDrawer = () => setViewGroupOpen(!viewGroupOpen)
  const toggleEditGroupDrawer = () => setEditGroupOpen(!editGroupOpen)

  const columns = [
    ...defaultColumns,
    {
      flex: 0.05,
      minWidth: 90,
      sortable: false,
      field: 'actions', 
      headerName: 'Ações',
      headerAlign: 'center' as const,
      align: 'center' as const,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {ability?.can('read', 'ac-group-page') &&
            <Tooltip title={t("View")}>
              <IconButton onClick={() => handleViewGroup(row)}>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('update', 'ac-group-page') &&
            <Tooltip title={t("Edit")}>
              <IconButton onClick={() => handleEditGroup(row)}>
                <PencilOutline fontSize='small' />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('delete', 'ac-group-page') &&
            <RenderButton id={row.id} status={row.status}/>
          }
        </Box>
      )
    }
  ]

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
        <ViewGroupDrawer open={viewGroupOpen} toggle={toggleViewGroupDrawer} row={row}/>
        <EditGroupDrawer open={editGroupOpen} toggle={toggleEditGroupDrawer} row={row}/>
      </Grid>
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
GroupList.acl = {
  action: 'list',
  subject: 'ac-user-page'
}

export default GroupList