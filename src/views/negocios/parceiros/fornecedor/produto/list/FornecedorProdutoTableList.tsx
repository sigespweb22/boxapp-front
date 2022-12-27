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
import { fetchData, alterStatusFornecedorProduto } from 'src/store/negocios/parceiros/fornecedor/produto/index'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { FornecedorProdutoType } from 'src/types/negocios/parceiros/fornecedor/produto/fornecedorProdutoTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/negocios/comercial/cliente/produto/list/TableHeader'
import FornecedorProdutoAddDrawer from 'src/views/negocios/parceiros/fornecedor/produto/new/FornecedorProdutoAddDrawer'
import FornecedorProdutoViewDrawer from 'src/views/negocios/parceiros/fornecedor/produto/view/FornecedorProdutoViewDrawer'
import FornecedorProdutoEditDrawer from 'src/views/negocios/parceiros/fornecedor/produto/edit/FornecedorProdutoEditDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface Props {
  id: string | undefined
}

interface CellType {
  row: FornecedorProdutoType
}

const fornecedorProdutoStatusObj = (status: string) => {
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
const renderNome = (row: FornecedorProdutoType) => {
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
        color={fornecedorProdutoStatusObj(status)}
        sx={{ textTransform: 'capitalize' }}
    />
  )
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
          {renderNome(row)}
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
              🛒{nome}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.04,
    minWidth: 100,
    field: 'codigoProduto',
    headerName: 'Código produto',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.codigoProduto}
        </Typography>
      )
    }
  },
  {
    flex: 0.04,
    field: 'caracteristicas',
    minWidth: 130,
    headerName: 'Características',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {row.caracteristicas}
        </Box>
      )
    }
  },
  {
    flex: 0.03,
    minWidth: 50,
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => <RenderStatus status={row.status}/>
  }
]

const FornecedorProdutoTableList = ({ id }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** State
  const [value, setValue] = useState<string | string[] | undefined>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [fornecedorProdutoAddOpen, setFornecedorProdutoAddOpen] = useState<boolean>(false)
  const [fornecedorProdutoViewOpen, setFornecedorProdutoViewOpen] = useState<boolean>(false)
  const [fornecedorProdutoEditOpen, setFornecedorProdutoEditOpen] = useState<boolean>(false)
  const [row, setRow] = useState<FornecedorProdutoType | undefined>()

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.fornecedorProduto)

  useEffect(() => {
    setValue(id)
  }, [id])

  useEffect(() => {
    dispatch(
      fetchData({
        fornecedorId: value
      })
    )
  }, [dispatch, value])

  const handleViewFornecedorProduto = (row : FornecedorProdutoType) => {
    setRow(row)
    setFornecedorProdutoViewOpen(true)
  }

  const handleEditFornecedorProduto = (row : FornecedorProdutoType) => {
    setRow(row)
    setFornecedorProdutoEditOpen(true)
  }

  const handleAlterStatus = (id: string) => {
    dispatch(alterStatusFornecedorProduto(id))
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

  const toggleFornecedorProdutoAddDrawer = () => setFornecedorProdutoAddOpen(!fornecedorProdutoAddOpen)
  const toggleFornecedorProdutoViewDrawer = () => setFornecedorProdutoViewOpen(!fornecedorProdutoViewOpen)
  const toggleFornecedorProdutoEditDrawer = () => setFornecedorProdutoEditOpen(!fornecedorProdutoEditOpen)

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
          {ability?.can('read', 'ac-fornecedor-produto-page') &&
            <Tooltip title={t("View")}>
              <IconButton onClick={() => handleViewFornecedorProduto(row)}>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('update', 'ac-fornecedor-produto-page') &&
            <Tooltip title={t("Edit")}>
              <IconButton onClick={() => handleEditFornecedorProduto(row)}>
                <PencilOutline fontSize='small' />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('delete', 'ac-fornecedor-produto-page') &&
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
        {ability?.can('list', 'ac-fornecedor-produto-page') ? (
          <Grid item xs={12}>
            <Card>
              {ability?.can('create', 'ac-fornecedor-produto-page') &&
                <TableHeader toggle={toggleFornecedorProdutoAddDrawer} />
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
        <FornecedorProdutoAddDrawer open={fornecedorProdutoAddOpen} toggle={toggleFornecedorProdutoAddDrawer} fornecedorId={id} />
        <FornecedorProdutoViewDrawer open={fornecedorProdutoViewOpen} toggle={toggleFornecedorProdutoViewDrawer} row={row}/>
        <FornecedorProdutoEditDrawer open={fornecedorProdutoEditOpen} toggle={toggleFornecedorProdutoEditDrawer} row={row}/>
      </Grid>
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
FornecedorProdutoTableList.acl = {
  action: 'list',
  subject: 'ac-fornecedor-produto-page'
}

export default FornecedorProdutoTableList