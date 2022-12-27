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
import { fetchData, alterStatusClienteProduto } from 'src/store/negocios/comercial/cliente/produto/index'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ClienteProdutoType } from 'src/types/negocios/comercial/cliente/produto/clienteProdutoTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/negocios/comercial/cliente/produto/list/TableHeader'
import ClienteProdutoAddDrawer from 'src/views/negocios/comercial/cliente/produto/new/ClienteProdutoAddDrawer'
import ClienteProdutoViewDrawer from 'src/views/negocios/comercial/cliente/produto/view/ClienteProdutoViewDrawer'
import ClienteProdutoEditDrawer from 'src/views/negocios/comercial/cliente/produto/edit/ClienteProdutoEditDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface Props {
  id: string
}

interface CellType {
  row: ClienteProdutoType
}

const clienteProdutoStatusObj = (status: string) => {
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
const renderProdutoNome = (row: ClienteProdutoType) => {
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
        color={clienteProdutoStatusObj(status)}
        sx={{ textTransform: 'capitalize' }}
    />
  )
}

const defaultColumns = [
  {
    flex: 0.1,
    minWidth: 30,
    field: 'name',
    headerName: 'Nome',
    headerAlign: 'left' as const,
    align: 'left' as const,
    renderCell: ({ row }: CellType) => {
      const { nome } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderProdutoNome(row)}
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
              🛒{ `Nome produto do Fornecedor 👉  ${row.produto.nome}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.04,
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
    flex: 0.04,
    minWidth: 50,
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => <RenderStatus status={row.status}/>
  }
]

const ClienteProdutoTableList = ({ id }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [clienteProdutoAddOpen, setClienteProdutoAddOpen] = useState<boolean>(false)
  const [clienteProdutoViewOpen, setClienteProdutoViewOpen] = useState<boolean>(false)
  const [clienteProdutoEditOpen, setClienteProdutoEditOpen] = useState<boolean>(false)
  const [row, setRow] = useState<ClienteProdutoType | undefined>()

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.clienteProduto)

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

  const handleViewClienteProduto = (row : ClienteProdutoType) => {
    setRow(row)
    setClienteProdutoViewOpen(true)
  }

  const handleEditClienteProduto = (row : ClienteProdutoType) => {
    setRow(row)
    setClienteProdutoEditOpen(true)
  }

  const handleAlterStatus = (id: string) => {
    dispatch(alterStatusClienteProduto(id))
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

  const toggleClienteProdutoAddDrawer = () => setClienteProdutoAddOpen(!clienteProdutoAddOpen)
  const toggleClienteProdutoViewDrawer = () => setClienteProdutoViewOpen(!clienteProdutoViewOpen)
  const toggleClienteProdutoEditDrawer = () => setClienteProdutoEditOpen(!clienteProdutoEditOpen)

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
          {ability?.can('read', 'ac-cliente-produto-page') &&
            <Tooltip title={t("View")}>
              <IconButton onClick={() => handleViewClienteProduto(row)}>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('update', 'ac-cliente-produto-page') &&
            <Tooltip title={t("Edit")}>
              <IconButton onClick={() => handleEditClienteProduto(row)}>
                <PencilOutline fontSize='small' />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('delete', 'ac-cliente-produto-page') &&
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
                {t("Product list")}
              </Typography>
            }
          />
        </Grid> 
        {ability?.can('list', 'ac-cliente-produto-page') ? (
          <Grid item xs={12}>
            <Card>
              {ability?.can('create', 'ac-cliente-produto-page') &&
                <TableHeader toggle={toggleClienteProdutoAddDrawer} />
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
        <ClienteProdutoAddDrawer open={clienteProdutoAddOpen} toggle={toggleClienteProdutoAddDrawer} clienteId={id} />
        <ClienteProdutoViewDrawer open={clienteProdutoViewOpen} toggle={toggleClienteProdutoViewDrawer} row={row}/>
        <ClienteProdutoEditDrawer open={clienteProdutoEditOpen} toggle={toggleClienteProdutoEditDrawer} row={row}/>
      </Grid>
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ClienteProdutoTableList.acl = {
  action: 'list',
  subject: 'ac-cliente-produto-page'
}

export default ClienteProdutoTableList