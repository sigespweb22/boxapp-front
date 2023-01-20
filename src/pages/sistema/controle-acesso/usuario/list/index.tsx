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
import { fetchData, alterStatusUser } from 'src/store/sistema/controle-acesso/usuario'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/sistema/controle-acesso/userTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/sistema/controle-acesso/usuario/list/TableHeader'
import AddUserDrawer from 'src/views/sistema/controle-acesso/usuario/list/AddUserDrawer'
import ViewUserDrawer from 'src/views/sistema/controle-acesso/usuario/view/ViewUserDrawer'
import EditUserDrawer from 'src/views/sistema/controle-acesso/usuario/edit/EditUserDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface UserGroupType {
  [key: string]: ReactElement
}

interface UserStatusType {
  [key: string]: ThemeColor
}

interface ApplicationUserGroupViewModel {
  groupId: string
  name: string
}

interface CellType {
  row: UsersType
}

const userStatusObj: UserStatusType = {
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

const groupTransform = (groups: ApplicationUserGroupViewModel[]) => {
  const elem: string[] = []

  groups.forEach(element => {
    elem.push("| " + element.name + " | ")
  })

  return elem
}

// ** renders user column
const renderUser = (row: UsersType) => {
  return (
    <AvatarWithoutImageLink href="#">
      <CustomAvatar
          skin='light'
          color={'primary'}
          sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
        >
          {getInitials(row.fullName ? row.fullName : 'NF')}
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
    field: 'fullName',
    headerName: 'Nome',
    headerAlign: 'left' as const,
    align: 'left' as const,
    renderCell: ({ row }: CellType) => {
      const { fullName, userName } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderUser(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component='a'
                variant='body2'
                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
              >
                {fullName}
              </Typography>
              <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                👤 {userName}
              </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.07,
    minWidth: 100,
    field: 'email',
    headerName: 'E-mail',
    headerAlign: 'left' as const,
    align: 'left' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.email}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'applicationUserGroups',
    minWidth: 150,
    headerName: 'Grupos',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {userGroupObj["GENERALS"]}
          <CustomChip
            skin='light'
            size='small'
            label={groupTransform(row.applicationUserGroups)}
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

const UserList = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [viewUserOpen, setViewUserOpen] = useState<boolean>(false)
  const [editUserOpen, setEditUserOpen] = useState<boolean>(false)
  const [row, setRow] = useState<UsersType | undefined>()

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.usuario)

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

  const handleViewClient = (row : UsersType) => {
    setRow(row)
    setViewUserOpen(true)
  }

  const handleEditClient = (row : UsersType) => {
    setRow(row)
    setEditUserOpen(true)
  }

  const handleAlterStatus = (id: string) => {
    dispatch(alterStatusUser(id))
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

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  const toggleViewUserDrawer = () => setViewUserOpen(!viewUserOpen)
  const toggleEditUserDrawer = () => setEditUserOpen(!editUserOpen)

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
          {ability?.can('read', 'ac-user-page') &&
            <Tooltip title={t("View")}>
              <IconButton onClick={() => handleViewClient(row)}>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('update', 'ac-user-page') &&
            <Tooltip title={t("Edit")}>
              <IconButton onClick={() => handleEditClient(row)}>
                <PencilOutline fontSize='small' />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('update', 'ac-user-page') &&
            <RenderButton id={row.id} status={row.status}/>
          }
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6}>

        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>{t("Users")}</Typography>}
            subtitle={
              <Typography variant='body2'>
                {t("Users listing")}.
              </Typography>
            }
          />
        </Grid> 
        {ability?.can('list', 'ac-user-page') ? (
          <Grid item xs={12}>
            <Card>
              <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
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
        ) : <>{t("You do not have permission to view this resource.")}</>}
        <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
        <ViewUserDrawer open={viewUserOpen} toggle={toggleViewUserDrawer} row={row}/>
        <EditUserDrawer open={editUserOpen} toggle={toggleEditUserDrawer} row={row}/>
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
UserList.acl = {
  action: 'list',
  subject: 'ac-user-page'
}

export default UserList