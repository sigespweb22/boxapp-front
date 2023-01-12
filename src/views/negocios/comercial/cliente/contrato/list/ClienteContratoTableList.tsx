// ** React Imports
import { useContext, useState, useEffect } from 'react'

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
// import ElevatorUp from 'mdi-material-ui/ElevatorUp'
// import ElevatorDown from 'mdi-material-ui/ElevatorDown'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import FileLinkOutline from 'mdi-material-ui/FileLinkOutline'
// import Help from 'mdi-material-ui/Help'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import PageHeader from 'src/@core/components/page-header'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData } from 'src/store/negocios/comercial/cliente/contrato/index'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ClienteContratoViewModelType } from 'src/types/negocios/comercial/cliente/contrato/clienteContratoTypes'

// ** Custom Components Imports
import ClienteContratoAddDrawer from 'src/views/negocios/comercial/cliente/contrato/new/ClienteContratoAddDrawer'
import ClienteContratoViewDrawer from 'src/views/negocios/comercial/cliente/contrato/view/ClienteContratoViewDrawer'
import ClienteContratoEditDrawer from 'src/views/negocios/comercial/cliente/contrato/edit/ClienteContratoEditDrawer'
import VendedorContratoAddDrawer from 'src/views/negocios/comercial/vendedor/contrato/new/VendedorContratoAddDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface Props {
  id: string
}

interface CellType {
  row: ClienteContratoViewModelType
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

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

const formatCurrency = (currency: number | null) => {
  return currency?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

// ** renders group column
const renderContratoNome = (row: ClienteContratoViewModelType) => {
  return (
    <AvatarWithoutImageLink href="#">
      <CustomAvatar
          skin='light'
          color={'primary'}
          sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
        >
          {getInitials(row.id ? row.id : 'CC')}
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
        color={clienteContratoStatusObj(status)}
        sx={{ textTransform: 'capitalize' }}
    />
  )
}

const defaultColumns = [
  {
    flex: 0.08,
    minWidth: 30,
    field: 'periodicidade',
    headerName: 'Periodicidade',
    headerAlign: 'left' as const,
    align: 'left' as const,
    renderCell: ({ row }: CellType) => {
      const { periodicidade } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderContratoNome(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {periodicidade}
            </Typography>
            <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
              📝{periodicidade}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'valorContrato',
    headerName: 'Valor do contrato',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {formatCurrency(row.valorContrato)}
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

const ClienteContratoTableList = ({ id }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [clienteContratoAddOpen, setClienteContratoAddOpen] = useState<boolean>(false)
  const [clienteContratoViewOpen, setClienteContratoViewOpen] = useState<boolean>(false)
  const [clienteContratoEditOpen, setClienteContratoEditOpen] = useState<boolean>(false)
  const [vendedorContratoAddOpen, setVendedorContratoAddOpen] = useState<boolean>(false)
  const [row, setRow] = useState<ClienteContratoViewModelType | undefined>()
  const [clienteContratoId, setClienteContratoId] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.clienteContrato)

  useEffect(() => {
    setValue(id)
  }, [id])

  useEffect(() => {
    dispatch(
      fetchData({
        clienteId: value
      })
    )
  }, [dispatch, value])

  const handleViewClienteContrato = (row : ClienteContratoViewModelType) => {
    setRow(row)
    setClienteContratoViewOpen(true)
  }

  const handleCreateVendedorContrato = (row : ClienteContratoViewModelType) => {
    setClienteContratoId(row.id)
    setVendedorContratoAddOpen(true)
  }

  // const handleEditClienteContrato = (row : ClienteContratoViewModelType) => {
  //   setRow(row)
  //   setClienteContratoEditOpen(true)
  // }

  // const handleAlterStatus = (id: string) => {
  //   dispatch(alterStatusClienteContrato(id))
  // }

  // const RenderButton = ({ id, status } : { id: string, status: string }) => {
  //   if (status === 'INACTIVE' || status === 'PENDING')
  //   {
  //     return (
  //       <Tooltip title={t("Activate")}>
  //         <IconButton onClick={() => handleAlterStatus(id)}>
  //           <ElevatorUp fontSize='small' />
  //         </IconButton>
  //       </Tooltip>
  //     )
  //   } else if (status === 'ACTIVE') {
  //     return (
  //       <Tooltip title={t("Deactivate")}>
  //         <IconButton onClick={() => handleAlterStatus(id)}>
  //           <ElevatorDown fontSize='small' />
  //         </IconButton>
  //       </Tooltip>
  //     )
  //   }
  //   else {
  //     return (
  //       <IconButton onClick={() => handleAlterStatus(id)}>
  //         <Help fontSize='small' />
  //       </IconButton>
  //     )
  //   }
  // }

  const toggleClienteContratoAddDrawer = () => setClienteContratoAddOpen(!clienteContratoAddOpen)
  const toggleClienteContratoViewDrawer = () => setClienteContratoViewOpen(!clienteContratoViewOpen)
  const toggleClienteContratoEditDrawer = () => setClienteContratoEditOpen(!clienteContratoEditOpen)
  const toggleVendedorContratoAddDrawer = () => setVendedorContratoAddOpen(!vendedorContratoAddOpen)

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
          {ability?.can('read', 'ac-clienteContrato-page') &&
            <Tooltip title={t("View")}>
              <IconButton onClick={() => handleViewClienteContrato(row)}>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('create', 'ac-vendedorContrato-page') &&
            <Tooltip title={t("Seller link")}>
              <IconButton onClick={() => handleCreateVendedorContrato(row)}>
                <FileLinkOutline fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          }
          {/* {ability?.can('update', 'ac-clienteContrato-page') &&
            <Tooltip title={t("Edit")}>
              <IconButton onClick={() => handleEditClienteContrato(row)}>
                <PencilOutline fontSize='small' />
              </IconButton>
            </Tooltip>
          } */}
          {/* {ability?.can('delete', 'ac-clienteContrato-page') &&
            <RenderButton id={row.id} status={row.status}/>
          } */}
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
        {ability?.can('list', 'ac-clienteContrato-page') ? (
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
        <ClienteContratoAddDrawer open={clienteContratoAddOpen} toggle={toggleClienteContratoAddDrawer} clienteId={id} />
        <ClienteContratoViewDrawer open={clienteContratoViewOpen} toggle={toggleClienteContratoViewDrawer} row={row}/>
        <ClienteContratoEditDrawer open={clienteContratoEditOpen} toggle={toggleClienteContratoEditDrawer} row={row}/>
        <VendedorContratoAddDrawer open={vendedorContratoAddOpen} toggle={toggleVendedorContratoAddDrawer} clienteContratoId={clienteContratoId}/>
      </Grid>
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ClienteContratoTableList.acl = {
  action: 'list',
  subject: 'ac-clienteContrato-page'
}

export default ClienteContratoTableList
