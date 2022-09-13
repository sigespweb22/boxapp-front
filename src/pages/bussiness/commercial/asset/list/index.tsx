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
import Cancel from 'mdi-material-ui/Cancel'
import AccountWrenchOutline from 'mdi-material-ui/AccountWrenchOutline'
import ElevatorUp from 'mdi-material-ui/ElevatorUp'
import ElevatorDown from 'mdi-material-ui/ElevatorDown'
import Cpu64Bit from 'mdi-material-ui/Cpu64Bit'
import DesktopClassic from 'mdi-material-ui/DesktopClassic'
import Matrix from 'mdi-material-ui/Matrix'
import Alarm from 'mdi-material-ui/Alarm'
import Numeric1BoxOutline from 'mdi-material-ui/Numeric1BoxOutline'
import RouterNetwork from 'mdi-material-ui/RouterNetwork'
import Autorenew from 'mdi-material-ui/Autorenew'
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
import { fetchData, alterStatusAsset } from 'src/store/apps/asset'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { AssetsType } from 'src/types/apps/assetTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/bussiness/commercial/asset/new/TableHeader'
import AddAssetDrawer from 'src/views/bussiness/commercial/asset/new/AddAssetDrawer'
import ViewAssetDrawer from 'src/views/bussiness/commercial/asset/view/ViewAssetDrawer'
import EditAssetDrawer from 'src/views/bussiness/commercial/asset/edit/EditAssetDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface AssetStatusType {
  [key: string]: ThemeColor
}

interface AssetTipoType {
  [key: string]: ReactElement
}

interface ServicoTipoType {
  [key: string]: ReactElement
}

interface UnidadeMedidaType {
  [key: string]: ReactElement
}

interface CellType {
  row: AssetsType
}

const assetStatusObj: AssetStatusType = {
  ACTIVE: 'success',
  RECORRENTE: 'secondary'
}

// ** Vars
const assetTipoObj: AssetTipoType = {
  SERVICO:  <AccountWrenchOutline fontSize='small' sx={{ mr: 3, color: 'success.main' }} />,
  PRODUTO: <RouterNetwork fontSize='small' sx={{ mr: 3, color: 'info.main' }} />,  
}

const servicoTipoObj: ServicoTipoType = {
  NENHUM:  <Cancel fontSize='small' sx={{ mr: 3, color: 'secondary.main' }} />,
  UNICO:  <Numeric1BoxOutline fontSize='small' sx={{ mr: 3, color: 'primary.main' }} />,
  RECORRENTE: <Autorenew fontSize='small' sx={{ mr: 3, color: 'success.main' }} />,  
}

const unidadeMedidaObj: UnidadeMedidaType = {
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
const renderClient = (row: AssetsType) => {
  return (
    <AvatarWithoutImageLink href={`/apps/asset/view/${row.id}`}>
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
        color={assetStatusObj[status]}
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

const stResolveColor = (st: string) => {
  switch (st) 
  {
    case 'RECORRENTE':
      return 'success'
    case 'UNICO':
      return 'primary'
    case 'NENHUM':
      return 'secondary'
    default:
    return 'primary'
  }
}

const tipoResolveColor = (tipo: string) => {
  switch (tipo) 
  {
    case 'SERVICO':
      return 'success'
    case 'PRODUTO':
      return 'info'
  }
}

const defaultColumns = [
  {
    flex: 0.2,
    minWidth: 30,
    field: 'nome',
    headerName: 'Nome',
    headerAlign: 'right' as const,
    align: 'right' as const,
    renderCell: ({ row }: CellType) => {
      const { id, nome, unidadeMedida } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Link href={`/apps/asset/view/${id}`} passHref>
              <Typography
                noWrap
                component='a'
                variant='body2'
                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
              >
                {nome}
              </Typography>
            </Link>
            <Link href={`/apps/asset/view/${id}`} passHref>
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
    flex: 0.06,
    field: 'tipo',
    minWidth: 50,
    headerName: 'Tipo',
    headerAlign: 'right' as const,
    align: 'right' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {assetTipoObj[row.tipo]}
          <CustomChip
            skin='light'
            size='small'
            label={row.tipo}
            color={tipoResolveColor(row.tipo)}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'valorCusto',
    headerName: 'Valor custo',
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
    minWidth: 110,
    field: 'valorVenda',
    headerName: 'Valor venda',
    headerAlign: 'right' as const,
    align: 'right' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.valorVenda}
        </Typography>
      )
    }
  },  
  {
    flex: 0.1,
    field: 'unidadeMedida',
    minWidth: 130,
    headerName: 'Unidade medida',
    headerAlign: 'right' as const,
    align: 'right' as const,
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
    flex: 0.1,
    field: 'clienteAtivoTipoServicoTipo',
    minWidth: 100,
    headerName: 'Serviço tipo',
    headerAlign: 'right' as const,
    align: 'right' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {servicoTipoObj[row.clienteAtivoTipoServicoTipo]}
          <CustomChip
            skin='light'
            size='small'
            label={row.clienteAtivoTipoServicoTipo}
            color={stResolveColor(row.clienteAtivoTipoServicoTipo)}
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
    renderCell: ({ row }: CellType) => <RenderStatus status={row.status}/>
  }
]

const AssetList = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addAssetOpen, setAddAssetOpen] = useState<boolean>(false)
  const [viewAssetOpen, setViewAssetOpen] = useState<boolean>(false)
  const [editAssetOpen, setEditAssetOpen] = useState<boolean>(false)
  const [row, setRow] = useState<AssetsType>()

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.asset)

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

  const handleViewAsset = (row : AssetsType) => {
    setRow(row)
    setViewAssetOpen(true)
  }

  const handleEditAsset = (row : AssetsType) => {
    setRow(row)
    setEditAssetOpen(true)
  }

  const handleAlterStatus = (id: string) => {
    dispatch(alterStatusAsset(id))
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

  const toggleAddAssetDrawer = () => setAddAssetOpen(!addAssetOpen)
  const handleAssetViewToggle = () => setViewAssetOpen(!viewAssetOpen)
  const handleAssetEditToggle = () => setEditAssetOpen(!editAssetOpen)

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
          {ability?.can('read', 'ac-role-page') &&
            <Tooltip title={t("View")}>
              <IconButton onClick={() => handleViewAsset(row)}>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('update', 'ac-role-page') &&
            <Tooltip title={t("Edit")}>
              <IconButton onClick={() => handleEditAsset(row)}>
                <PencilOutline fontSize='small' />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('delete', 'ac-role-page') &&
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
            title={<Typography variant='h5'>{t("Assets")}</Typography>}
            subtitle={
              <Typography variant='body2'>
                {t("Assets listing")}.
              </Typography>
            }
          />
        </Grid> 
        {ability?.can('list', 'ac-asset-page') ? (
          <Grid item xs={12}>
            <Card>
              <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddAssetDrawer} />
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
        <AddAssetDrawer open={addAssetOpen} toggle={toggleAddAssetDrawer} />
        <ViewAssetDrawer open={viewAssetOpen} toggle={handleAssetViewToggle} row={row}/>
        <EditAssetDrawer open={editAssetOpen} toggle={handleAssetEditToggle} row={row}/>
      </Grid>
    </Grid>
  )
}

// **Controle de acesso da página
// **Usuário deve possuir ao menos umas das ações como habilidade para ter acesso 
// **a esta página de subject abaixo
AssetList.acl = {
  action: 'list',
  subject: 'ac-asset-page'
}

export default AssetList