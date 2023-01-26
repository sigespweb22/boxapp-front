// ** React Imports
import { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { DataGrid, ptBR } from '@mui/x-data-grid'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Translate import
import { useTranslation } from 'react-i18next'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData } from 'src/store/negocios/comercial/vendedor/contrato/index'

// ** Third Party Imports
import { ClienteContratoViewModelType } from 'src/types/negocios/comercial/cliente/contrato/clienteContratoTypes'
import { VendedorType } from 'src/types/negocios/comercial/vendedor/vendedorTypes'
import { ThemeColor } from 'src/@core/layouts/types'

interface VendedorVinculadoContratoViewDrawer {
  row: ClienteContratoViewModelType | undefined
  open: boolean
  toggle: () => void
}

interface CellType {
  row: VendedorType
}

interface VendedorVinculadoContratoType {
  [key: string]: ThemeColor
}

const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const renderVendedor = (row: VendedorType) => {
  return (
    <AvatarWithoutImageLink href='#'>
      <CustomAvatar skin='light' color={'primary'} sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}>
        {getInitials(row.nome ? row.nome : 'NF')}
      </CustomAvatar>
    </AvatarWithoutImageLink>
  )
}

const vendedorVinculadoStatusObj: VendedorVinculadoContratoType = {
  ACTIVE: 'success',
  RECORRENTE: 'secondary'
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
      color={vendedorVinculadoStatusObj[status]}
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
    field: 'Comissao',
    headerName: 'Comissão',
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
    flex: 0.08,
    minWidth: 50,
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => <RenderStatus status={row.status} />
  }
]

const VendedorVinculadoContratoViewDrawer = (props: VendedorVinculadoContratoViewDrawer) => {
  // ** Props
  const { open, toggle } = props

  const [pageSize, setPageSize] = useState<number>(10)
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()
  const store = useSelector((state: RootState) => state.vendedorContrato)

  const { reset } = useForm()

  const handleClose = () => {
    toggle()
    reset()
  }

  useEffect(() => {
    dispatch(
      fetchData({
        vendedorId: props?.row?.id
      })
    )
  }, [dispatch])

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
        <Typography variant='h6'>{t('View seller linked to contract')}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form>
          <FormControl>
            <DataGrid
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              autoHeight
              rows={store.data}
              columns={defaultColumns}
              checkboxSelection={false}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              {t('Cancel')}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default VendedorVinculadoContratoViewDrawer
