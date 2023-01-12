// ** React Imports
import { useContext, useState, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { ClienteContratoViewModelType } from 'src/types/negocios/comercial/cliente/contrato/clienteContratoTypes'
import { useForm, Controller } from 'react-hook-form'

// ** Copmponents Imports
import { useTranslation } from 'react-i18next'
import ClienteContratoFaturaViewDrawer from 'src/views/negocios/comercial/cliente/contrato/fatura/view/ClienteContratoFaturaViewDrawer'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import { ClienteContratoFaturaType } from 'src/types/negocios/comercial/cliente/contrato/fatura/clienteContratoFaturaTypes'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material'
import { EyeOutline } from 'mdi-material-ui'

// ** Actions Imports
import { fetchData } from 'src/store/negocios/comercial/cliente/contrato/fatura/index'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

interface SidebarClienteContratoViewType {
  row: ClienteContratoViewModelType | undefined
  open: boolean
  toggle: () => void
}

interface CellType {
  row: ClienteContratoFaturaType
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const defaultColumns = [
  {
    flex: 0.1,
    minWidth: 118,
    field: 'dataCompetencia',
    headerName: 'Data competencia',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.dataCompetencia}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 70,
    field: 'valor',
    headerName: 'Valor',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.valor}
        </Typography>
      )
    }
  },
  // {
  //   flex: 0.04,
  //   minWidth: 50,
  //   field: 'status',
  //   headerName: 'Status',
  //   headerAlign: 'center' as const,
  //   align: 'center' as const,
  //   renderCell: ({ row }: CellType) => <RenderStatus status={row.status}/>
  // }
]

const formatCurrency = (currency: number) => {
  return currency.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

const SidebarClienteContratoView = (props: SidebarClienteContratoViewType) => {
  // ** Hook
  const [pageSize, setPageSize] = useState<number>(10)
  const [row, setRow] = useState<ClienteContratoFaturaType | undefined>()
  const [clienteContratoFaturaViewOpen, setClienteContratoFaturaViewOpen] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.clienteContratoFatura)
  const ability = useContext(AbilityContext)
  const {
    reset,
    control
  } = useForm()

  useEffect(() => {
    dispatch(
      fetchData({
        clienteContratoId: props?.row?.id
      })
    )
  }, [dispatch, props?.row?.id])

  const handleViewClienteContratoFatura = (row : ClienteContratoFaturaType) => {
    setRow(row)
    setClienteContratoFaturaViewOpen(true)
  }

  // ** Props
  const { open, toggle } = props

  const handleClose = () => {
    toggle()
    reset()
  }

  const { t } = useTranslation()

  const toggleClienteContratoFaturaViewDrawer = () => setClienteContratoFaturaViewOpen(!clienteContratoFaturaViewOpen)

  const columns = [
    ...defaultColumns,
    {
      flex: 0.03,
      minWidth: 70,
      sortable: false,
      field: 'actions', 
      headerName: 'Ações',
      headerAlign: 'center' as const,
      align: 'center' as const,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {ability?.can('read', 'ac-clienteContratoFatura-page') &&
            <Tooltip title={t("View")}>
              <IconButton onClick={() => handleViewClienteContratoFatura(row)}>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          }
        </Box>
      )
    }
  ]

  return (
    <Drawer
      open={open}
      z-index={1000}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>{t("View Client Contract")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label='ID'
              value={props?.row?.id}
              defaultValue="."
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label={t("Contract value")}
              value={formatCurrency(props?.row?.valorContrato || 0)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled
              label={t("Frequency")}
              value={props?.row?.periodicidade}
              defaultValue="."
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label={t("Contract id(Bom Controle)")}
              value={props?.row?.bomControleContratoId || null}
              defaultValue="."
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <TextField
                  disabled={true}
                  type='status'
                  label='Status'
                  value={t(props?.row?.status || '')}
                  onChange={onChange}
                />
              )}
            />
          </FormControl>
          <Typography variant='h6' sx={{ml: 1,mb: 5}}>
            {t("Contract invoices")}:
          </Typography>
          <FormControl>
            <DataGrid 
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              autoHeight
              rows={store.data}
              columns={columns}
              checkboxSelection={false}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
              />
          </FormControl>
          <ClienteContratoFaturaViewDrawer open={clienteContratoFaturaViewOpen} toggle={toggleClienteContratoFaturaViewDrawer} row={row}/>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              {t("Cancel")}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
SidebarClienteContratoView.acl = {
  action: 'read',
  subject: 'ac-clienteContrato-page'
}

export default SidebarClienteContratoView