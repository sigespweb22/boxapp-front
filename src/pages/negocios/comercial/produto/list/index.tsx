// ** React Imports
import { useContext, useState, useEffect, useCallback } from 'react'

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
import { fetchData, alterStatusProduto } from 'src/store/negocios/comercial/produto'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { ProdutoType } from 'src/types/negocios/comercial/produto/produtoTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/negocios/comercial/produto/new/TableHeader'
import ProdutoAddDrawer from 'src/views/negocios/comercial/produto/new/ProdutoAddDrawer'
import ProdutoViewDrawer from 'src/views/negocios/comercial/produto/view/ProdutoViewDrawer'
import ProdutoEditDrawer from 'src/views/negocios/comercial/produto/edit/ProdutoEditDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface ProdutoStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: ProdutoType
}

const produtoStatusObj: ProdutoStatusType = {
  ACTIVE: 'success',
  RECORRENTE: 'secondary'
}

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders client column
const renderClient = (row: ProdutoType) => {
  return (
    <AvatarWithoutImageLink href={`/apps/produto/view/${row.id}`}>
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
        color={produtoStatusObj[status]}
        sx={{ textTransform: 'capitalize' }}
    />
  )
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
      const { id, nome, caracteristicas } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Link href={`/apps/produto/view/${id}`} passHref>
              <Typography
                noWrap
                component='a'
                variant='body2'
                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
              >
                {nome}
              </Typography>
            </Link>
            <Link href={`/apps/produto/view/${id}`} passHref>
              <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                🛒{caracteristicas}
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
    field: 'descricao',
    minWidth: 130,
    headerName: 'Descrição',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {row.descricao}
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

const ProdutoList = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addProdutoOpen, setAddProdutoOpen] = useState<boolean>(false)
  const [viewProdutoOpen, setViewProdutoOpen] = useState<boolean>(false)
  const [editProdutoOpen, setEditProdutoOpen] = useState<boolean>(false)
  const [row, setRow] = useState<ProdutoType>()

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.produto)

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

  const handleViewProduto = (row : ProdutoType) => {
    setRow(row)
    setViewProdutoOpen(true)
  }

  const handleEditProduto = (row : ProdutoType) => {
    setRow(row)
    setEditProdutoOpen(true)
  }

  const handleAlterStatus = (id: string) => {
    dispatch(alterStatusProduto(id))
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

  const toggleAddProdutoDrawer = () => setAddProdutoOpen(!addProdutoOpen)
  const handleProdutoViewToggle = () => setViewProdutoOpen(!viewProdutoOpen)
  const handleProdutoEditToggle = () => setEditProdutoOpen(!editProdutoOpen)

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
          {ability?.can('read', 'ac-produto-page') &&
            <Tooltip title={t("View")}>
              <IconButton onClick={() => handleViewProduto(row)}>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('update', 'ac-produto-page') &&
            <Tooltip title={t("Edit")}>
              <IconButton onClick={() => handleEditProduto(row)}>
                <PencilOutline fontSize='small' />
              </IconButton>
            </Tooltip>
          }
          {ability?.can('delete', 'ac-produto-page') &&
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
            title={<Typography variant='h5'>{t("Produtos")}</Typography>}
            subtitle={
              <Typography variant='body2'>
                {t("Product list")}.
              </Typography>
            }
          />
        </Grid> 
        {ability?.can('list', 'ac-produto-page') ? (
          <Grid item xs={12}>
            <Card>
              <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddProdutoDrawer} />
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
        <ProdutoAddDrawer open={addProdutoOpen} toggle={toggleAddProdutoDrawer} />
        <ProdutoViewDrawer open={viewProdutoOpen} toggle={handleProdutoViewToggle} row={row}/>
        <ProdutoEditDrawer open={editProdutoOpen} toggle={handleProdutoEditToggle} row={row}/>
      </Grid>
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ProdutoList.acl = {
  action: 'list',
  subject: 'ac-produto-page'
}

export default ProdutoList