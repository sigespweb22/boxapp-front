// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import CustomChip from 'src/@core/components/mui/chip'

import Link from 'next/link'

// ** Third Party Imports
import { ClienteContratoType } from 'src/types/negocios/comercial/cliente/contrato/clienteContratoTypes'
import { useForm, Controller } from 'react-hook-form'

// ** Copmponents Imports
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import { ClienteContratoFaturaType } from 'src/types/negocios/comercial/cliente/contrato/fatura/clienteContratoFaturaTypes'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material'
import { EyeOutline } from 'mdi-material-ui'
import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

interface SidebarClienteContratoViewType {
  row: ClienteContratoType | undefined
  open: boolean
  toggle: () => void
}

interface CellType {
  row: ClienteContratoFaturaType
}


const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

const clienteContratoFaturaStatusObj = (status: string) => {
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

const renderContratoNome = (row: ClienteContratoFaturaType) => {
  return (
    <AvatarWithoutImageLink href="#">
      <CustomAvatar
          skin='light'
          color={'primary'}
          sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
        >
          {getInitials(row.id ? row.id : 'CC')}
      </CustomAvatar>
    </AvatarWithoutImageLink>
  )
}

const RenderStatus = ({ status } : { status: string }) => {
  // ** Hooks
  const { t } = useTranslation()

  return (
    <CustomChip
        skin='light'
        size='small'
        label={t(status)}
        color={clienteContratoFaturaStatusObj(status)}
        sx={{ textTransform: 'capitalize' }}
    />
  )
}

debugger

const defaultColumns = [
  {
    flex: 0.08,
    minWidth: 30,
    field: 'dataVencimento',
    headerName: 'Data do vencimento',
    headerAlign: 'left' as const,
    align: 'left' as const,
    renderCell: ({ row }: CellType) => {
      const { dataVencimento } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderContratoNome(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {dataVencimento}
            </Typography>
            <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
              📝{dataVencimento}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'dataCompetencia',
    headerName: 'Data competencia',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.dataCompetencia}
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

const formatCurrency = (currency: number) => {
  return currency.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

const SidebarClienteContratoView = (props: SidebarClienteContratoViewType) => {
  // ** Hook
  const [pageSize, setPageSize] = useState<number>(10)
  const store = useSelector((state: RootState) => state.clienteContratoFatura)
  const ability = useContext(AbilityContext)
  const {
    reset,
    control
  } = useForm()


  // ** Props
  const { open, toggle } = props

  const handleClose = () => {
    toggle()
    reset()
  }

  const { t } = useTranslation()

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
          {ability?.can('read', 'ac-clienteContrato-page') &&
            <Tooltip title={t("View")}>
              <IconButton>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
                {row.valor}
              </IconButton>
            </Tooltip>
          }
        </Box>
      )
    }
  ]

  return (
    <Drawer
      open={open}
      z-index={1000}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Visualizar Cliente Contrato</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              value={props?.row?.id}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              label='Valor do contrato'
              value={formatCurrency(props?.row?.valorContrato || 0)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              // label='Periodicidade'
              value={props?.row?.periodicidade}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              // label='Id do contrato(Bom Controle)'
              value={props?.row?.bomControleContratoId || null}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <TextField
                  disabled={true}
                  type='status'
                  label='Status'
                  value={t(props?.row?.status || '')}
                  onChange={onChange}
                />
              )}
            />
          </FormControl>
          <FormControl>
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
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
SidebarClienteContratoView.acl = {
  action: 'read',
  subject: 'ac-clienteContrato-page'
}

export default SidebarClienteContratoView