// ** React Imports
import { useContext, useState, useEffect } from 'react'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import Delete from 'mdi-material-ui/Delete'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import PageHeader from 'src/@core/components/page-header'

// ** Actions Imports
import { deletePermanentlyVendedorComissao, fetchDataByVendedor } from 'src/store/negocios/comercial/vendedor/comissao/index'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { VendedorComissaoType } from 'src/types/negocios/comercial/vendedor/comissao/vendedorComissaoTypes'

// ** Custom Components Imports
import VendedorComissaoViewDrawer from 'src/views/negocios/comercial/vendedor/comissao/view/VendedorComissaoViewDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface Props {
  id: string | null
}
interface CellType {
  row: VendedorComissaoType
}

const vendedorComissaoStatusObj = (status: string) => {
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
        color={vendedorComissaoStatusObj(status)}
        sx={{ textTransform: 'capitalize' }}
    />
  )
}

const defaultColumns = [
  {
    flex: 0.1,
    minWidth: 100,
    field: 'clienteContratoViewModel.NomeFantasia',
    headerName: 'Cliente',
    headerAlign: 'left' as const,
    align: 'left' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row?.clienteContratoViewModel?.cliente.nomeFantasia || ''}
        </Typography>
      )
    }
  },
  {
    flex: 0.05,
    minWidth: 100,
    field: 'clienteContratoViewModel.clienteContratoFaturaViewModel.dataCompetencia',
    headerName: 'Data competência',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row?.clienteContratoFaturaViewModel?.dataCompetencia || ''}
        </Typography>
      )
    }
  },
  {
    flex: 0.05,
    minWidth: 100,
    field: 'clienteContratoViewModel.clienteContratoFaturaViewModel.dataPagamento',
    headerName: 'Data pagamento',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row?.clienteContratoFaturaViewModel?.dataPagamento || ''}
        </Typography>
      )
    }
  },
  {
    flex: 0.05,
    minWidth: 100,
    field: 'clienteContratoViewModel.valorContrato',
    headerName: 'Valor contrato (BRL)',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {formatCurrency(row?.clienteContratoViewModel?.valorContrato || 0)}
        </Typography>
      )
    }
  },
  {
    flex: 0.05,
    minWidth: 100,
    field: 'valorComissao',
    headerName: 'Valor comissão (BRL)',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {formatCurrency(row?.valorComissao)}
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

const VendedorComissaoTableList = ({ id }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

  // ** State
  const [value, setValue] = useState<string | null>(null)
  const [pageSize, setPageSize] = useState<number>(10)
  const [vendedorComissaoViewOpen, setVendedorComissaoViewOpen] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.vendedorComissao)
  const [row, setRow] = useState<VendedorComissaoType | undefined>()

  useEffect(() => {
    setValue(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(
      fetchDataByVendedor({
        vendedorId: value
      })
    )
  }, [dispatch, value])

  const handleDeletePermanently = (id: string | null, vendedorId: string | null) => {
    const params = { id: id, vendedorId: vendedorId }
    dispatch(deletePermanentlyVendedorComissao(params))
  }
  
  const handleVendedorComissaoView = (row : VendedorComissaoType) => {
    setRow(row)
    setVendedorComissaoViewOpen(true)
  }

  const toggleVendedorComissaoViewDrawer = () => setVendedorComissaoViewOpen(!vendedorComissaoViewOpen)

  const columns = [
    ...defaultColumns,
    {
      flex: 0.03,
      minWidth: 25,
      sortable: false,
      field: 'actions',
      headerName: 'Ações',
      headerAlign: 'center' as const,
      align: 'center' as const,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {ability?.can('read', 'ac-vendedorComissao-page') && (
              <Tooltip title={t('View')}>
                <IconButton onClick={() => handleVendedorComissaoView(row)}>
                  <EyeOutline fontSize='small' sx={{ mr: 2 }} />
                </IconButton>
              </Tooltip>
          )}
          {ability?.can('delete', 'ac-vendedorComissao-page') && (
              <Tooltip title={t("Remove")}>
                <IconButton onClick={() => handleDeletePermanently(row.id, row.vendedorId)}>
                  <Delete fontSize='small' />
                </IconButton>
              </Tooltip>
            )
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
                {t("Comission list")}
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
        <VendedorComissaoViewDrawer open={vendedorComissaoViewOpen} toggle={toggleVendedorComissaoViewDrawer} row={row}/>
      </Grid>
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
VendedorComissaoTableList.acl = {
  action: 'update',
  subject: 'ac-vendedorComissao-page'
}

export default VendedorComissaoTableList
