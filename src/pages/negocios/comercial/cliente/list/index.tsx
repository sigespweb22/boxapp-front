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
import Tooltip from '@mui/material/Tooltip'

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
import { fetchData, alterStatusClientes } from 'src/store/negocios/comercial/cliente'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { ClienteType } from 'src/types/negocios/comercial/cliente/clienteTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/negocios/comercial/cliente/new/TableHeader'
import ClienteAddDrawer from 'src/views/negocios/comercial/cliente/new/ClienteAddDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface ClientStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: ClienteType
}

const clientStatusObj: ClientStatusType = {
  ACTIVE: 'success',
  RECORRENTE: 'secondary'
}

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders cliente column
const renderClient = (row: ClienteType) => {
  return (
    <AvatarWithoutImageLink href='#'>
      <CustomAvatar skin='light' color={'primary'} sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}>
        {getInitials(row.nomeFantasia ? row.nomeFantasia : 'NF')}
      </CustomAvatar>
    </AvatarWithoutImageLink>
  )
}

// ** renders status column
const RenderStatus = ({ status }: { status: string }) => {
  // ** Hooks
  const { t } = useTranslation()

  return (
    <CustomChip
      skin='light'
      size='small'
      label={t(status)}
      color={clientStatusObj[status]}
      sx={{ textTransform: 'capitalize' }}
    />
  )
}

const formatCnpj = (cnpj: string) => {
  return cnpj?.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

const formatCpf = (cpf: string) => {
  return cpf?.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
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
          {renderClient(row)}
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
          {formatCnpj(row.cnpj)}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'cpf',
    headerName: 'CPF',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {formatCpf(row.cpf)}
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
    renderCell: ({ row }: CellType) => <RenderStatus status={row.status} />
  }
]
const ClientList = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [clienteAddOpen, setClienteAddOpen] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.cliente)

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

  const handleAlterStatus = (id: string | undefined) => {
    dispatch(alterStatusClientes(id))
  }

  const RenderButton = ({ id, status }: { id: string | undefined; status: string }) => {
    if (status === 'INACTIVE') {
      return (
        <Tooltip title={t('Activate')}>
          <IconButton onClick={() => handleAlterStatus(id)}>
            <ElevatorUp fontSize='small' />
          </IconButton>
        </Tooltip>
      )
    } else if (status === 'ACTIVE') {
      return (
        <Tooltip title={t('Deactivate')}>
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

  const toggleClienteAddDrawer = () => setClienteAddOpen(!clienteAddOpen)

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
          {ability?.can('read', 'ac-cliente-page') && (
            <Link href={`/negocios/comercial/cliente/view/${row.id}`} passHref>
              <Tooltip title={t('View')}>
                <IconButton>
                  <EyeOutline fontSize='small' sx={{ mr: 2 }} />
                </IconButton>
              </Tooltip>
            </Link>
          )}
          {ability?.can('update', 'ac-cliente-page') && (
            <Tooltip title={t('Edit')}>
              <Link href={`/negocios/comercial/cliente/edit/${row.id}`} passHref>
                <IconButton>
                  <PencilOutline fontSize='small' />
                </IconButton>
              </Link>
            </Tooltip>
          )}
          {ability?.can('update', 'ac-cliente-page') && <RenderButton id={row.id} status={row.status} />}
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>{t('Clients')}</Typography>}
          subtitle={<Typography variant='body2'>{t('Clients listing')}.</Typography>}
        />
      </Grid>
      {ability?.can('list', 'ac-cliente-page') ? (
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} handleFilter={handleFilter} toggle={toggleClienteAddDrawer} />
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
      ) : (
        <>{t('You do not have permission to view this resource.')}</>
      )}
      {ability?.can('create', 'ac-cliente-page') ? (
        <ClienteAddDrawer open={clienteAddOpen} toggle={toggleClienteAddDrawer} />
      ) : (
        <></>
      )}
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ClientList.acl = {
  action: 'list',
  subject: 'ac-cliente-page'
}

export default ClientList
