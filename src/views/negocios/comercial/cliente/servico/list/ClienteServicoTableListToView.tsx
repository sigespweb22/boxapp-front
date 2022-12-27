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
import EyeOutline from 'mdi-material-ui/EyeOutline'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import PageHeader from 'src/@core/components/page-header'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData } from 'src/store/negocios/comercial/cliente/servico/index'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ClienteServicoType } from 'src/types/negocios/comercial/cliente/servico/clienteServicoTypes'

// ** Custom Components Imports
import ClienteServicoViewDrawer from 'src/views/negocios/comercial/cliente/servico/view/ClienteServicoViewDrawer'

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

const ClienteServicoTableListToView = ({ id }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** State
  const [value, setValue] = useState<string | string[] | undefined>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [clienteServicoViewOpen, setClienteServicoViewOpen] = useState<boolean>(false)
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

  const handleClienteServicoView = (row : ClienteServicoType) => {
    setRow(row)
    setClienteServicoViewOpen(true)
  }

  const toggleClienteServicoViewDrawer = () => setClienteServicoViewOpen(!clienteServicoViewOpen)

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
              <IconButton onClick={() => handleClienteServicoView(row)}>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
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
        <ClienteServicoViewDrawer open={clienteServicoViewOpen} toggle={toggleClienteServicoViewDrawer} row={row}/>
      </Grid>
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
ClienteServicoTableListToView.acl = {
  action: 'list',
  subject: 'ac-cliente-servico-page'
}

export default ClienteServicoTableListToView