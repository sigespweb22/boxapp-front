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
import Cpu64Bit from 'mdi-material-ui/Cpu64Bit'
import DesktopClassic from 'mdi-material-ui/DesktopClassic'
import Cancel from 'mdi-material-ui/Cancel'
import Matrix from 'mdi-material-ui/Matrix'
import Alarm from 'mdi-material-ui/Alarm'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import PageHeader from 'src/@core/components/page-header'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData } from 'src/store/negocios/parceiros/fornecedor/servico/index'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { FornecedorServicoType } from 'src/types/negocios/parceiros/fornecedor/servico/fornecedorServicoTypes'

// ** Custom Components Imports
import FornecedorServicoViewDrawer from 'src/views/negocios/parceiros/fornecedor/servico/view/FornecedorServicoViewDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface Props {
  id: string | string[] | undefined
}

interface UnidadeMedidaType {
  [key: string]: ReactElement
}

interface CellType {
  row: FornecedorServicoType
}

const fornecedorServicoStatusObj = (status: string) => {
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

const unidadeMedidaColor = (ct: string) => {
  switch (ct) 
  {
    case 'CPU':
      return 'info'
    case 'HR':
      return 'primary'
    case 'GB':
      return 'secondary'
    case 'vCPU':
      return 'error'
    default: 
      return 'primary'
  }
}

// ** renders group column
const renderNome = (row: FornecedorServicoType) => {
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
        color={fornecedorServicoStatusObj(status)}
        sx={{ textTransform: 'capitalize' }}
    />
  )
}

const unidadeMedidaIcon: UnidadeMedidaType = {
  NENHUM:  <Cancel fontSize='small' sx={{ mr: 3, color: 'primary.main' }} />,
  CPU:  <DesktopClassic fontSize='small' sx={{ mr: 3, color: 'info.main' }} />,
  HR: <Alarm fontSize='small' sx={{ mr: 3, color: 'primary.main' }} />,
  GB: <Matrix fontSize='small' sx={{ mr: 3, color: 'secondary.main' }} />,
  vCPU: <Cpu64Bit fontSize='small' sx={{ mr: 3, color: 'error.main' }} />
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
    field: 'codigoServico',
    headerName: 'Código serviço',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.codigoServico}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'unidadeMedida',
    minWidth: 130,
    headerName: 'Unidade medida',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {unidadeMedidaIcon[row.unidadeMedida]}
          <CustomChip
            skin='light'
            size='small'
            label={row.unidadeMedida}
            color={unidadeMedidaColor(row.unidadeMedida)}
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

const FornecedorServicoTableListToView = ({ id }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
   
  // ** State
  const [value, setValue] = useState<string | string[] | undefined>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [fornecedorServicoViewOpen, setFornecedorServicoViewOpen] = useState<boolean>(false)
  const [row, setRow] = useState<FornecedorServicoType | undefined>()

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.fornecedorServico)

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

  const handleFornecedorServicoView = (row : FornecedorServicoType) => {
    setRow(row)
    setFornecedorServicoViewOpen(true)
  }

  const toggleFornecedorServicoViewDrawer = () => setFornecedorServicoViewOpen(!fornecedorServicoViewOpen)

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
          {ability?.can('read', 'ac-fornecedor-servico-page') &&
            <Tooltip title={t("View")}>
              <IconButton onClick={() => handleFornecedorServicoView(row)}>
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
                {t("Contract list")}
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
        <FornecedorServicoViewDrawer open={fornecedorServicoViewOpen} toggle={toggleFornecedorServicoViewDrawer} row={row}/>
      </Grid>
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
FornecedorServicoTableListToView.acl = {
  action: 'list',
  subject: 'ac-fornecedor-servico-page'
}

export default FornecedorServicoTableListToView