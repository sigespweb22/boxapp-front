// ** React Imports
import { useContext, useState, useEffect, MouseEvent, useCallback, ReactElement } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import LockCheckOutline from 'mdi-material-ui/LockCheckOutline'
import CogOutline from 'mdi-material-ui/CogOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import AccountReactivateOutline from 'mdi-material-ui/AccountReactivateOutline'


// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import PageHeader from 'src/@core/components/page-header'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteAsset, alterStatusAsset } from 'src/store/apps/asset'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { AssetsType } from 'src/types/apps/assetTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/bussiness/commercial/asset/list/TableHeader'
import AddAssetDrawer from 'src/views/bussiness/commercial/asset/list/AddAssetDrawer'

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
  SERVICO:  <LockCheckOutline fontSize='small' sx={{ mr: 3, color: 'success.main' }} />,
  PRODUTO: <CogOutline fontSize='small' sx={{ mr: 3, color: 'warning.main' }} />,  
}

const servicoTipoObj: ServicoTipoType = {
  UNICO:  <LockCheckOutline fontSize='small' sx={{ mr: 3, color: 'success.main' }} />,
  RECORRENTE: <CogOutline fontSize='small' sx={{ mr: 3, color: 'warning.main' }} />,  
}

const unidadeMedidaObj: UnidadeMedidaType = {
  CPU:  <LockCheckOutline fontSize='small' sx={{ mr: 3, color: 'success.main' }} />,
  HR: <CogOutline fontSize='small' sx={{ mr: 3, color: 'warning.main' }} />,
  GB: <CogOutline fontSize='small' sx={{ mr: 3, color: 'warning.main' }} />,
  vCPU: <CogOutline fontSize='small' sx={{ mr: 3, color: 'warning.main' }} />
}

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders client column
const renderClient = (row: AssetsType) => {
  <AvatarWithoutImageLink href={`/apps/user/view/${row.id}`}>
    <CustomAvatar
        skin='light'
        color={'primary'}
        sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
      >
        {getInitials(row.nome ? row.nome : 'NA')}
    </CustomAvatar>
  </AvatarWithoutImageLink>
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

// ** Styled component for the link inside menu
const MenuItemLink = styled('a')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  padding: theme.spacing(1.5, 4),
  color: theme.palette.text.primary
}))

const RowOptions = ({ id, status } : { id: number | string, status: string }) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }
  const handleDelete = () => {
    dispatch(deleteAsset(id))
    handleRowOptionsClose()
  }
  const handleAlterStatus = () => {
    dispatch(alterStatusAsset(id))
    handleRowOptionsClose()
  }

  return (
    <> 
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        {ability?.can('update', 'ac-asset-page') &&
          <MenuItem onClick={handleAlterStatus}>
            <AccountReactivateOutline fontSize='small' sx={{ mr: 2 }} />
            {
              status == "ACTIVE" ? t("Deactivate") : t("Activate")
            }
          </MenuItem>
        }
        {ability?.can('read', 'ac-asset-page') &&
          <MenuItem sx={{ p: 0 }}>
            <Link href={`/apps/user/view/${id}`} passHref>
              <MenuItemLink>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
                {t("View")}
              </MenuItemLink>
            </Link>
          </MenuItem>
        }
        {ability?.can('update', 'ac-asset-page') &&
          <MenuItem onClick={handleRowOptionsClose}>
            <PencilOutline fontSize='small' sx={{ mr: 2 }} />
            {t("Edit")}
          </MenuItem>
        }
        {ability?.can('delete', 'ac-asset-page') &&
          <MenuItem onClick={handleDelete}>
            <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
            {t("Delete")}
          </MenuItem>
        }
      </Menu>
    </>
  )
}

const columns = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'nome',
    headerName: 'Nome',
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
    flex: 0.2,
    minWidth: 250,
    field: 'referencia',
    headerName: 'Referencia',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.referencia}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'tipo',
    minWidth: 150,
    headerName: 'Tipo',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {assetTipoObj[row.tipo]}
          <CustomChip
            skin='light'
            size='small'
            label={row.tipo}
            color={'success'}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
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
    flex: 0.2,
    minWidth: 250,
    field: 'valorVenda',
    headerName: 'Valor venda',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.valorVenda}
        </Typography>
      )
    }
  },  
  {
    flex: 0.15,
    field: 'unidadeMedida',
    minWidth: 150,
    headerName: 'Unidade medida',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {unidadeMedidaObj[row.unidadeMedida]}
          <CustomChip
            skin='light'
            size='small'
            label={row.unidadeMedida}
            color={'success'}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    field: 'clienteAtivoTipoServico',
    minWidth: 150,
    headerName: 'Serviço tipo',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {servicoTipoObj[row.clienteAtivoTipoServico]}
          <CustomChip
            skin='light'
            size='small'
            label={row.tipo}
            color={'success'}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'caracteristica',
    headerName: 'Caracteristica',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.caracteristica}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'observacao',
    headerName: 'Observação',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.observacao}
        </Typography>
      )
    }
  }, 
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }: CellType) => <RenderStatus status={row.status}/>
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Ações',
    headerAlign: 'right',
    align: 'right',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} status={row.status}/>
  }
]

const AssetList = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** State
  const [tipo, setAtivo] = useState<string>('')
  const [unidadeMedida, setUnidadeMedida] = useState<string>('')
  const [servicoTipo, setServicoTipo] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addAtivoOpen, setAddAtivoOpen] = useState<boolean>(false)

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

  const handleAssetChange = useCallback((e: SelectChangeEvent) => {
    setAsset(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const toggleAddAssetDrawer = () => setAddAssetOpen(!addAssetOpen)

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
        <AddAssetDrawer open={addAtivoOpen} toggle={toggleAddAssetDrawer} />
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