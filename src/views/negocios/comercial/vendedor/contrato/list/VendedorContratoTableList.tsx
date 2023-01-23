// ** React Imports
import { useContext, useState, useEffect } from 'react'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip';

// ** Icons Imports
import ElevatorUp from 'mdi-material-ui/ElevatorUp'
import ElevatorDown from 'mdi-material-ui/ElevatorDown'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import Help from 'mdi-material-ui/Help'
import { PencilOutline } from 'mdi-material-ui'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import PageHeader from 'src/@core/components/page-header'

// ** Actions Imports
import { alterStatusVendedorContrato, fetchData } from 'src/store/negocios/comercial/vendedor/contrato/index'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { VendedorContratoType } from 'src/types/negocios/comercial/vendedor/contrato/vendedorContratoTypes'

// ** Custom Components Imports
import VendedorContratoViewDrawer from 'src/views/negocios/comercial/vendedor/contrato/view/VendedorContratoViewDrawer'
import VendedorContratoEditDrawer from 'src/views/negocios/comercial/vendedor/contrato/edit/VendedorContratoEditDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface Props {
  id: string
}

interface CellType {
  row: VendedorContratoType
}

const clienteContratoStatusObj = (status: string) => {
  switch (status)
  {
    case "NENHUM":
      return 'primary'
    case "ACTIVE":
      return 'success'
    case "INACTIVE":
      return 'secondary'
    default:
      return 'secondary'
  }
}

const formatCurrency = (currency: number | null) => {
  return currency?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
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
        color={clienteContratoStatusObj(status)}
        sx={{ textTransform: 'capitalize' }}
    />
  )
}

const defaultColumns = [
  {
    flex: 0.1,
    minWidth: 100,
    field: 'NomeClienteContrato',
    headerName: 'Nome do cliente',
    headerAlign: 'left' as const,
    align: 'left' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row?.clienteContrato?.cliente.nomeFantasia || 0}
        </Typography>
      )
    }
  },
  {
    flex: 0.05,
    minWidth: 100,
    field: 'comissaoReais',
    headerName: 'Comissão (BRL)',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {formatCurrency(row.comissaoReais)}
        </Typography>
      )
    }
  },
  {
    flex: 0.05,
    minWidth: 100,
    field: 'comissaoPercentual',
    headerName: 'Comissão (%)',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.comissaoPercentual + ' %'}
        </Typography>
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

const VendedorContratoTableList = ({ id }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [vendedorContratoViewOpen, setVendedorContratoViewOpen] = useState<boolean>(false)
  const [vendedorContratoEditOpen, setVendedorContratoEditOpen] = useState<boolean>(false)
  const [row, setRow] = useState<VendedorContratoType | undefined>()

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.vendedorContrato)

  useEffect(() => {
    setValue(id)
  }, [id])

  useEffect(() => {
    dispatch(
      fetchData({
        vendedorId: value
      })
    )
  }, [dispatch, value])

  const handleViewVendedorContrato = (row : VendedorContratoType) => {
    setRow(row)
    setVendedorContratoViewOpen(true)
  }

  const handleEditVendedorContrato = (row : VendedorContratoType) => {
    setRow(row)
    setVendedorContratoEditOpen(true)
  }

  const handleAlterStatus = (id: string) => {
    dispatch(alterStatusVendedorContrato(id))
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

  const toggleVendedorContratoViewDrawer = () => setVendedorContratoViewOpen(!vendedorContratoViewOpen)
  const toggleVendedorContratoEditDrawer = () => setVendedorContratoEditOpen(!vendedorContratoEditOpen)

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
          {ability?.can('read', 'ac-vendedorContrato-page') &&
            <Tooltip title={t("View")}>
              <IconButton onClick={() => handleViewVendedorContrato(row)}>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('update', 'ac-vendedorContrato-page') &&
            <Tooltip title={t("Edit")}>
              <IconButton onClick={() => handleEditVendedorContrato(row)}>
                <PencilOutline fontSize='small' />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('delete', 'ac-vendedorContrato-page') &&
            <RenderButton id={row.id} status={row.status}/>
          }
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={1}>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ mt: "10px"}}>
          <PageHeader
            title={<Typography variant='h5'></Typography>}
            subtitle={
              <Typography variant='body2'>
                {t("Contract list")}
              </Typography>
            }
          />
        </Grid>
        {ability?.can('list', 'ac-vendedorContrato-page') ? (
          <Grid item xs={12}>
            <Card>
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
        <VendedorContratoViewDrawer open={vendedorContratoViewOpen} toggle={toggleVendedorContratoViewDrawer} row={row}/>
        <VendedorContratoEditDrawer open={vendedorContratoEditOpen} toggle={toggleVendedorContratoEditDrawer} row={row}/>
      </Grid>
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
VendedorContratoTableList.acl = {
  action: 'list',
  subject: 'ac-vendedorContrato-page'
}

export default VendedorContratoTableList