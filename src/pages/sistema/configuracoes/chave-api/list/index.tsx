// ** React Imports
import { useContext, useState, useEffect, useCallback } from 'react'
// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import ElevatorUp from 'mdi-material-ui/ElevatorUp'
import ElevatorDown from 'mdi-material-ui/ElevatorDown'
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
import { fetchData, alterStatusChaveApi } from 'src/store/sistema/configuracoes/chave-api/index'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { ChaveApiType } from 'src/types/sistema/configuracoes/chave-api/chaveApiTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/sistema/configuracoes/chave-api/new/TableHeader'
import ChaveApiPageEdit from 'src/views/sistema/configuracoes/chave-api/edit/ChaveApiPageEdit'
import ChaveApiPageView from 'src/views/sistema/configuracoes/chave-api/view/ChaveApiPageView'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface ChaveApiStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: ChaveApiType
}

const chaveApiStatusObj: ChaveApiStatusType = {
  ACTIVE: 'success',
  DEACTIVE: 'secondary'
}

// ** renders cliente column
const renderChaveApi = (row: ChaveApiType) => {
  return (
    <CustomAvatar
        skin='light'
        color={'primary'}
        sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
      >
        {getInitials(row.apiTerceiro ? row.apiTerceiro : 'CAPI')}
    </CustomAvatar>
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
        color={chaveApiStatusObj[status]}
        sx={{ textTransform: 'capitalize' }}
    />
  )
}

const defaultColumns = [
  {
    flex: 0.2,
    minWidth: 30,
    field: 'apiTerceiro',
    headerName: 'Api terceiro',
    headerAlign: 'left' as const,
    align: 'left' as const,
    renderCell: ({ row }: CellType) => {
      const { apiTerceiro } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderChaveApi(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
                noWrap
                component='a'
                variant='body2'
                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
              >
                {apiTerceiro}
            </Typography>
            <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
              🔐{apiTerceiro}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'key',
    headerName: 'Key',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.key}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'descricao',
    headerName: 'descricao',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.descricao}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'dataValidade',
    headerName: 'data Validade',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.dataValidade}
        </Typography>
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

const ChaveApiList = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [chaveApiPageEditOpen, setChaveApiPageEditOpen] = useState<boolean>(false)
  const [chaveApiPageViewOpen, setChaveApiPageViewOpen] = useState<boolean>(false)
  const [row, setRow] = useState<ChaveApiType | undefined>()

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.chaveApi)

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

  const handleViewChaveApi = (row : ChaveApiType) => {
    setRow(row)
    setChaveApiPageViewOpen(true)
  }

  const handleEditChaveApi = (row : ChaveApiType) => {
    setRow(row)
    setChaveApiPageEditOpen(true)
  }

  const handleAlterStatus = (id: string) => {
    dispatch(alterStatusChaveApi(id))
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

  const toggleChaveApiPageEdit = () => setChaveApiPageEditOpen(!chaveApiPageEditOpen)
  const toggleChaveApiPageView = () => setChaveApiPageViewOpen(!chaveApiPageViewOpen)

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
          {ability?.can('read', 'ac-chaveApiTerceiro-page') &&
            <Tooltip title={t("View")}>
              <IconButton onClick={() => handleViewChaveApi(row)}>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('update', 'ac-chaveApiTerceiro-page') &&
            <Tooltip title={t("Edit")}>
              <IconButton onClick={() => handleEditChaveApi(row)}>
                <PencilOutline fontSize='small' />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('update', 'ac-chaveApiTerceiro-page') &&
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
            title={<Typography variant='h5'>{t("Api Key")}</Typography>}
            subtitle={
              <Typography variant='body2'>
                {t("Api key listing")}.
              </Typography>
            }
          />
        </Grid> 
        {ability?.can('list', 'ac-chaveApiTerceiro-page') ? (
          <Grid item xs={12}>
            <Card>
              <TableHeader value={value} handleFilter={handleFilter} />
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
        <ChaveApiPageEdit open={chaveApiPageEditOpen} toggle={toggleChaveApiPageEdit} row={row}/>
        <ChaveApiPageView open={chaveApiPageViewOpen} toggle={toggleChaveApiPageView} row={row}/>
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ChaveApiList.acl = {
  action: 'list',
  subject: 'ac-chaveApiTerceiro-page'
}

export default ChaveApiList