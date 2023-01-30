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
import { PlayBox } from 'mdi-material-ui'

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
import { fetchData, alterStatusVendedor } from 'src/store/negocios/comercial/vendedor'

// ** Api services imports
import rotinaApiService from 'src/@api-center/sistema/rotinas/rotinaApiService'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { VendedorType } from 'src/types/negocios/comercial/vendedor/vendedorTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/negocios/comercial/vendedor/new/TableHeader'
import VendedorAddDrawer from 'src/views/negocios/comercial/vendedor/new/VendedorAddDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import axios from 'axios'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

interface VendedorStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: VendedorType
}

const VendedorStatusObj: VendedorStatusType = {
  ACTIVE: 'success',
  RECORRENTE: 'secondary'
}

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders cliente column
const renderVendedor = (row: VendedorType) => {
  return (
    <AvatarWithoutImageLink href='#'>
      <CustomAvatar skin='light' color={'primary'} sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}>
        {getInitials(row.nome ? row.nome : 'NF')}
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
      color={VendedorStatusObj[status]}
      sx={{ textTransform: 'capitalize' }}
    />
  )
}

const defaultColumns = [
  {
    flex: 0.1,
    minWidth: 100,
    field: 'nome',
    headerName: 'Nome',
    headerAlign: 'left' as const,
    align: 'left' as const,
    renderCell: ({ row }: CellType) => {
      {
        const { nome } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderVendedor(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component='a'
                variant='body2'
                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
              >
                {nome}
              </Typography>
            </Box>
          </Box>
        )
      }
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'Usuario',
    headerName: 'Nome do usuário',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.applicationUser?.fullName}
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

const VendedorList = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [vendedorAddOpen, setVendedorAddOpen] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.vendedor)

  useEffect(() => {
    dispatch(
      fetchData({
        q: value
      })
    )
  }, [dispatch, value])

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(rotinaApiService.storageTokenKeyName)!}` 
    }
  }

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleAlterStatus = (id: string | undefined) => {
    dispatch(alterStatusVendedor(id))
  }

  const handleComissaoPlay = (id: string | undefined) => {
    const rotinaId = 'b0c60d41-7b31-4e02-ab9e-ad2c9e351443'
    const vendedorId = id

    axios.post(`${rotinaApiService.dispatchPrefixRoute}/dispatch-vendedores-comissoes-create-by-vendedorId/${rotinaId}`, { vendedorId: vendedorId }, config)
    toast.success("Comissão disparada com sucesso. \nAgora você pode continuar o uso do BoxApp enquanto trabalhamos sua solicitação.")
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

  const toggleVendedorAddDrawer = () => setVendedorAddOpen(!vendedorAddOpen)

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
      renderCell: ({ row }: CellType ) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {ability?.can('create', 'ac-cliente-page') && (
            <Tooltip title={t("Run routine")}>
              <IconButton onClick={() => handleComissaoPlay(row.id)}>
                <PlayBox fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          )}
          {ability?.can('read', 'ac-vendedor-page') && (
            <Link href={`/negocios/comercial/vendedor/view/${row.id}`} passHref>
              <Tooltip title={t('View')}>
                <IconButton>
                  <EyeOutline fontSize='small' sx={{ mr: 2 }} />
                </IconButton>
              </Tooltip>
            </Link>
          )}
          {ability?.can('update', 'ac-vendedor-page') && (
            <Tooltip title={t('Edit')}>
              <Link href={`/negocios/comercial/vendedor/edit/${row.id}`} passHref>
                <IconButton>
                  <PencilOutline fontSize='small' />
                </IconButton>
              </Link>
            </Tooltip>
          )}
          {ability?.can('update', 'ac-vendedor-page') && <RenderButton id={row.id} status={row.status} />}
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>{t('Sellers')}</Typography>}
          subtitle={<Typography variant='body2'>{t('Sellers listing')}.</Typography>}
        />
      </Grid>
      {ability?.can('list', 'ac-vendedor-page') ? (
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} handleFilter={handleFilter} toggle={toggleVendedorAddDrawer} />
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
      {ability?.can('create', 'ac-vendedor-page') ? (
        <VendedorAddDrawer open={vendedorAddOpen} toggle={toggleVendedorAddDrawer} />
      ) : (
        <>{t('You do not have permission to view this resource.')}</>
      )}
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
VendedorList.acl = {
  action: 'list',
  subject: 'ac-vendedor-page'
}

export default VendedorList
