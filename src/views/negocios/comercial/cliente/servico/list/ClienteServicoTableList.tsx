// ** React Imports
import { useContext, useState, useEffect, ReactElement } from 'react'

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
import { fetchData, alterStatusClienteServico } from 'src/store/negocios/comercial/cliente/servico/index'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ClienteServicoType } from 'src/types/negocios/comercial/cliente/servico/clienteServicoTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/negocios/comercial/cliente/servico/list/TableHeader'
import ClienteServicoAddDrawer from 'src/views/negocios/comercial/cliente/servico/new/ClienteServicoAddDrawer'
import ClienteServicoViewDrawer from 'src/views/negocios/comercial/cliente/servico/view/ClienteServicoViewDrawer'
import ClienteServicoEditDrawer from 'src/views/negocios/comercial/cliente/servico/edit/ClienteServicoEditDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

import CurrencyUsdOff from 'mdi-material-ui/CurrencyUsdOff'
import Cached from 'mdi-material-ui/Cached'
import CheckboxMarkedCircleOutline from 'mdi-material-ui/CheckboxMarkedCircleOutline'

interface Props {
  id: string | string[] | undefined
}

interface CobrancaTipoType {
  [key: string]: ReactElement
}

interface CellType {
  row: ClienteServicoType
}

const clienteServicoStatusObj = (status: string) => {
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

// ** renders group column
const renderServicoNome = (row: ClienteServicoType) => {
  return (
    <AvatarWithoutImageLink href="#">
      <CustomAvatar
          skin='light'
          color={'primary'}
          sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
        >
          {getInitials(row.nome ? row.nome : 'SN')}
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
        color={clienteServicoStatusObj(status)}
        sx={{ textTransform: 'capitalize' }}
    />
  )
}

const cobrancaTipoIcon: CobrancaTipoType = {
  NENHUM:  <CurrencyUsdOff fontSize='small' sx={{ mr: 3, color: 'second.main' }} />,
  UNICO: <CheckboxMarkedCircleOutline fontSize='small' sx={{ mr: 3, color: 'primary.main' }} />,
  RECORRENTE: <Cached fontSize='small' sx={{ mr: 3, color: 'info.main' }} />
}

const cobrancaTipoColor = (ct: string) => {
  switch (ct) 
  {
    case 'NENHUM':
      return 'secondary'
    case 'UNICO':
      return 'primary'
    case 'RECORRENTE':
      return 'info'
    default:
      return 'primary'
  }
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
      const { nome } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderServicoNome(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {nome}
            </Typography>
            <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
              ⚙️{nome}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'valorVenda',
    headerName: 'Valor venda',
    headerAlign: 'center' as const,
    align: 'center' as const,
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
    field: 'cobrancaTipo',
    minWidth: 130,
    headerName: 'Cobrança tipo',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {cobrancaTipoIcon[row.cobrancaTipo]}
          <CustomChip
            skin='light'
            size='small'
            label={row.cobrancaTipo}
            color={cobrancaTipoColor(row.cobrancaTipo)}
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

const ClienteServicoTableList = ({ id }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** State
  const [value, setValue] = useState<string | string[] | undefined>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [clienteServicoAddOpen, setClienteServicoAddOpen] = useState<boolean>(false)
  const [clienteServicoViewOpen, setClienteServicoViewOpen] = useState<boolean>(false)
  const [clienteServicoEditOpen, setClienteServicoEditOpen] = useState<boolean>(false)
  const [row, setRow] = useState<ClienteServicoType | undefined>()

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.clienteServico)

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

  const handleViewClienteServico = (row : ClienteServicoType) => {
    setRow(row)
    setClienteServicoViewOpen(true)
  }

  const handleEditClienteServico = (row : ClienteServicoType) => {
    setRow(row)
    setClienteServicoEditOpen(true)
  }

  const handleAlterStatus = (id: string) => {
    dispatch(alterStatusClienteServico(id))
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

  const toggleClienteServicoAddDrawer = () => setClienteServicoAddOpen(!clienteServicoAddOpen)
  const toggleClienteServicoViewDrawer = () => setClienteServicoViewOpen(!clienteServicoViewOpen)
  const toggleClienteServicoEditDrawer = () => setClienteServicoEditOpen(!clienteServicoEditOpen)

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
          {ability?.can('read', 'ac-cliente-servico-page') &&
            <Tooltip title={t("View")}>
              <IconButton onClick={() => handleViewClienteServico(row)}>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('update', 'ac-cliente-servico-page') &&
            <Tooltip title={t("Edit")}>
              <IconButton onClick={() => handleEditClienteServico(row)}>
                <PencilOutline fontSize='small' />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('delete', 'ac-cliente-servico-page') &&
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
                {t("Service list")}
              </Typography>
            }
          />
        </Grid> 
        {ability?.can('list', 'ac-cliente-servico-page') ? (
          <Grid item xs={12}>
            <Card>
              {ability?.can('create', 'ac-cliente-servico-page') &&
                <TableHeader toggle={toggleClienteServicoAddDrawer} />
              }
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
        <ClienteServicoAddDrawer open={clienteServicoAddOpen} toggle={toggleClienteServicoAddDrawer} clienteId={id} />
        <ClienteServicoViewDrawer open={clienteServicoViewOpen} toggle={toggleClienteServicoViewDrawer} row={row}/>
        <ClienteServicoEditDrawer open={clienteServicoEditOpen} toggle={toggleClienteServicoEditDrawer} row={row}/>
      </Grid>
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ClienteServicoTableList.acl = {
  action: 'list',
  subject: 'ac-cliente-servico-page'
}

export default ClienteServicoTableList