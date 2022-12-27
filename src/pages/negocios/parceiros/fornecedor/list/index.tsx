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
import { fetchData, alterStatusFornecedor } from 'src/store/negocios/parceiros/fornecedor'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { FornecedorType } from 'src/types/negocios/parceiros/fornecedor/fornecedorTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/negocios/parceiros/fornecedor/new/TableHeader'
import FornecedorAddDrawer from 'src/views/negocios/parceiros/fornecedor/new/FornecedorAddDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface FornecedorStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: FornecedorType
}

const fornecedorStatusObj: FornecedorStatusType = {
  ACTIVE: 'success',
  INACTIVE: 'secondary'
}

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders fornecedor column
const renderFornecedor = (row: FornecedorType) => {
  return (
    <AvatarWithoutImageLink href={`/apps/Fornecedor/view/${row.id}`}>
      <CustomAvatar
          skin='light'
          color={'primary'}
          sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
        >
          {getInitials(row.nomeFantasia ? row.nomeFantasia : 'NF')}
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
        color={fornecedorStatusObj[status]}
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
      const { nomeFantasia, emailPrincipal } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderFornecedor(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
                noWrap
                component='a'
                variant='body2'
                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {nomeFantasia}
            </Typography>
            <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
              📬{emailPrincipal}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'cnpj',
    headerName: 'CNPJ',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.cnpj}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'telefonePrincipal',
    headerName: 'Telefone principal',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.telefonePrincipal}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'cidade',
    headerName: 'Cidade',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.cidade}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'Estado',
    headerName: 'estado',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.estado}
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

const FornecedorList = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [fornecedorAddOpen, setFornecedorAddOpen] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.fornecedor)

  useEffect(() => {
    dispatch(
      fetchData({
        id: value
      })
    )
  }, [dispatch, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleAlterStatus = (id: string) => {
    dispatch(alterStatusFornecedor(id))
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

  const toggleFornecedorAddDrawer = () => setFornecedorAddOpen(!fornecedorAddOpen)

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
          {ability?.can('read', 'ac-fornecedor-page') &&
            <Link href={`/negocios/parceiros/fornecedor/view/${row.id}`} passHref>
              <Tooltip title={t("View")}>
                <IconButton>
                  <EyeOutline fontSize='small' sx={{ mr: 2 }} />
                </IconButton>
              </Tooltip>
            </Link>
          }
          {ability?.can('update', 'ac-fornecedor-page') &&
            <Link href={`/negocios/parceiros/fornecedor/edit/${row.id}`} passHref>
              <Tooltip title={t("Edit")}>
                <IconButton>
                  <PencilOutline fontSize='small' />
                </IconButton>
              </Tooltip>
            </Link>
          }
          {ability?.can('delete', 'ac-fornecedor-page') &&
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
            title={<Typography variant='h5'>{t("Fornecedors")}</Typography>}
            subtitle={
              <Typography variant='body2'>
                Listagem de fornecedores.
              </Typography>
            }
          />
        </Grid> 
        {ability?.can('list', 'ac-fornecedor-page') ? (
          <Grid item xs={12}>
            <Card>
              <TableHeader value={value} handleFilter={handleFilter} toggle={toggleFornecedorAddDrawer} />
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
        <FornecedorAddDrawer open={fornecedorAddOpen} toggle={toggleFornecedorAddDrawer} />
      </Grid>
    </Grid>
  )
}

// **Controle de acesso da página
// **Usuário deve possuir ao menos umas das ações como habilidade para ter acesso 
// **a esta página de subject abaixo
FornecedorList.acl = {
  action: 'list',
  subject: 'ac-fornecedor-page'
}

export default FornecedorList