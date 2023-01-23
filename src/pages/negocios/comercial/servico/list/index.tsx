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

// ** Icons Imports
import ElevatorUp from 'mdi-material-ui/ElevatorUp'
import ElevatorDown from 'mdi-material-ui/ElevatorDown'
import Cpu64Bit from 'mdi-material-ui/Cpu64Bit'
import DesktopClassic from 'mdi-material-ui/DesktopClassic'
import Cancel from 'mdi-material-ui/Cancel'
import Matrix from 'mdi-material-ui/Matrix'
import Alarm from 'mdi-material-ui/Alarm'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import Help from 'mdi-material-ui/Help'
import Tooltip from '@mui/material/Tooltip';

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import PageHeader from 'src/@core/components/page-header'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, alterStatusServico } from 'src/store/negocios/comercial/servico'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { ServicoType } from 'src/types/negocios/comercial/servico/servicoTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/negocios/comercial/servico/new/TableHeader'
import AddServicoDrawer from 'src/views/negocios/comercial/servico/new/AddServicoDrawer'
import ViewServicoDrawer from 'src/views/negocios/comercial/servico/view/ViewServicoDrawer'
import EditServicoDrawer from 'src/views/negocios/comercial/servico/edit/EditServicoDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface ServicoStatusType {
  [key: string]: ThemeColor
}

interface UnidadeMedidaType {
  [key: string]: ReactElement
}

interface CellType {
  row: ServicoType
}

const servicoStatusObj: ServicoStatusType = {
  ACTIVE: 'success',
  RECORRENTE: 'secondary'
}

const unidadeMedidaObj: UnidadeMedidaType = {
  NENHUM:  <Cancel fontSize='small' sx={{ mr: 3, color: 'primary.main' }} />,
  CPU:  <DesktopClassic fontSize='small' sx={{ mr: 3, color: 'info.main' }} />,
  HR: <Alarm fontSize='small' sx={{ mr: 3, color: 'primary.main' }} />,
  GB: <Matrix fontSize='small' sx={{ mr: 3, color: 'secondary.main' }} />,
  vCPU: <Cpu64Bit fontSize='small' sx={{ mr: 3, color: 'error.main' }} />
}

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders client column
const renderClient = (row: ServicoType) => {
  return (
    <AvatarWithoutImageLink href={`/apps/servico/view/${row.id}`}>
      <CustomAvatar
          skin='light'
          color={'primary'}
          sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
        >
          {getInitials(row.nome ? row.nome : 'NA')}
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
        color={servicoStatusObj[status]}
        sx={{ textTransform: 'capitalize' }}
    />
  )
}

const umResolveColor = (um: string) => {
  switch (um) 
  {
    case 'CPU':
      return 'info'
    case 'HR':
      return 'primary'
    case 'GB':
      return 'secondary'
    case 'vCPU':
      return 'error'
    default: 
      return 'primary'
  }
}

const defaultColumns = [
  {
    flex: 0.2,
    minWidth: 30,
    field: 'nome',
    headerName: 'Nome',
    headerAlign: 'left' as const,
    align: 'left' as const,
    renderCell: ({ row }: CellType) => {
      const { id, nome, unidadeMedida } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Link href={`/apps/servico/view/${id}`} passHref>
              <Typography
                noWrap
                component='a'
                variant='body2'
                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
              >
                {nome}
              </Typography>
            </Link>
            <Link href={`/apps/servico/view/${id}`} passHref>
              <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                🩺{unidadeMedida}
              </Typography>
            </Link>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'valorCusto',
    headerName: 'Valor custo',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.valorCusto}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'unidadeMedida',
    minWidth: 130,
    headerName: 'Unidade medida',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {unidadeMedidaObj[row.unidadeMedida]}
          <CustomChip
            skin='light'
            size='small'
            label={row.unidadeMedida}
            color={umResolveColor(row.unidadeMedida)}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      )
    }
  },
  {
    flex: 0.09,
    minWidth: 50,
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => <RenderStatus status={row.status}/>
  }
]

const ServicoList = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addServicoOpen, setAddServicoOpen] = useState<boolean>(false)
  const [viewServicoOpen, setViewServicoOpen] = useState<boolean>(false)
  const [editServicoOpen, setEditServicoOpen] = useState<boolean>(false)
  const [row, setRow] = useState<ServicoType>()

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.servico)

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

  const handleViewServico = (row : ServicoType) => {
    setRow(row)
    setViewServicoOpen(true)
  }

  const handleEditServico = (row : ServicoType) => {
    setRow(row)
    setEditServicoOpen(true)
  }

  const handleAlterStatus = (id: string) => {
    dispatch(alterStatusServico(id))
  }

  const RenderButton = ({ id, status } : { id: string, status: string }) => {
    if (status === 'INACTIVE')
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
    } else {
      return (
        <IconButton onClick={() => handleAlterStatus(id)}>
          <Help fontSize='small' />
        </IconButton>
      )
    }
  }

  const toggleAddServicoDrawer = () => setAddServicoOpen(!addServicoOpen)
  const handleServicoViewToggle = () => setViewServicoOpen(!viewServicoOpen)
  const handleServicoEditToggle = () => setEditServicoOpen(!editServicoOpen)

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Ações',
      headerAlign: 'right' as const,
      align: 'right' as const,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {ability?.can('read', 'ac-servico-page') &&
            <Tooltip title={t("View")}>
              <IconButton onClick={() => handleViewServico(row)}>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('update', 'ac-servico-page') &&
            <Tooltip title={t("Edit")}>
              <IconButton onClick={() => handleEditServico(row)}>
                <PencilOutline fontSize='small' />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('delete', 'ac-servico-page') &&
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
            title={<Typography variant='h5'>{t("Servicos")}</Typography>}
            subtitle={
              <Typography variant='body2'>
                {t("Service list")}.
              </Typography>
            }
          />
        </Grid> 
        {ability?.can('list', 'ac-servico-page') ? (
          <Grid item xs={12}>
            <Card>
              <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddServicoDrawer} />
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
        <AddServicoDrawer open={addServicoOpen} toggle={toggleAddServicoDrawer} />
        <ViewServicoDrawer open={viewServicoOpen} toggle={handleServicoViewToggle} row={row}/>
        <EditServicoDrawer open={editServicoOpen} toggle={handleServicoEditToggle} row={row}/>
      </Grid>
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ServicoList.acl = {
  action: 'list',
  subject: 'ac-servico-page'
}

export default ServicoList