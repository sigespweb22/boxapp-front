// ** React Imports
import { useState, useEffect, useContext } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material'
import { EyeOutline } from 'mdi-material-ui'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Actions Imports
import { fetchData } from 'src/store/sistema/rotina/rotinaEventHistory/index'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { RotinaType } from 'src/types/sistema/rotinas/rotinaType'
import { RotinaEventHistoryType } from 'src/types/sistema/rotinas/rotinasEventsHistories/rotinaEventHistoryType'
import { useSelector } from 'react-redux'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useDispatch } from 'react-redux'
import RotinaEventHistoryViewDrawer from 'src/views/sistema/rotinas/rotinasEventsHistories/RotinaEventHistoryViewDrawer'


interface RotinaViewType {
  row: RotinaType | undefined
  open: boolean
  toggle: () => void
}

interface CellType {
  row: RotinaEventHistoryType
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const defaultValues = {
  id: '',
  nome: '',
  descricao: '',
  observacao: '',
  chaveSequencial: '',
  dataCompetenciaInicio: '',
  dataCompetenciaFim: '',
  status: ''
}

const defaultColumns = [
  {
    flex: 0.1,
    minWidth: 80,
    field: 'dataInicio',
    headerName: 'Data inicio',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.dataInicio}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'statusProgresso',
    headerName: 'Status do progresso',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.statusProgresso}
        </Typography>
      )
    }
  }
]

const RotinaViewDrawer = (props: RotinaViewType) => {
  // ** Hook
  const [pageSize, setPageSize] = useState<number>(10)
  
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.rotinaEventHistory)
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)
  const [row, setRow] = useState<RotinaEventHistoryType | undefined>()
  const [rotinaEventHistoryViewOpen, setRotinaEventHistoryViewOpen] = useState<boolean>(false)

  // ** Props
  const { open, toggle } = props

  // ** Hooks
  const {
    reset,
    control,
    setValue,
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange'
  })

  // ** States
  useEffect(() => {
    if(props?.row){
      setValue('id', props?.row?.id || '')
      setValue('nome', props?.row?.nome || '')
      setValue('descricao', props?.row?.descricao || '')
      setValue('observacao', props?.row?.observacao || '')
      setValue('chaveSequencial', props?.row?.chaveSequencial || '')
      setValue('dataCompetenciaInicio', props?.row?.dataCompetenciaInicio || '')
      setValue('dataCompetenciaFim', props?.row?.dataCompetenciaFim || '')
      setValue('status', props?.row?.status || '')
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const handleClose = () => {
    toggle()
    reset()
  }

  useEffect(() => {
    dispatch(
      fetchData({
        rotinaId: props?.row?.id
      })
    )
  }, [dispatch, props?.row?.id])

  const handleViewRotinaEventHistory = (row : RotinaEventHistoryType) => {
    setRow(row)
    setRotinaEventHistoryViewOpen(true)
  }

  const toggleRotinaEventHistoryViewDrawer = () => setRotinaEventHistoryViewOpen(!rotinaEventHistoryViewOpen)

  const columns = [
    ...defaultColumns,
    {
      flex: 0.03,
      minWidth: 70,
      sortable: false,
      field: 'actions',
      headerName: 'Ações',
      headerAlign: 'center' as const,
      align: 'center' as const,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {ability?.can('read', 'ac-rotinaEventHistory-page') &&
            <Tooltip title={t("View")}>
              <IconButton onClick={() => handleViewRotinaEventHistory(row)}>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
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
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>{t("Routine View")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='id'
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  disabled
                  value={value}
                  label='Id'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='nome'
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  disabled
                  value={value}
                  label={t("Name")}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='dataCompetenciaInicio'
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  disabled
                  value={value}
                  label={t("Start date period")}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='dataCompetenciaFim'
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  disabled
                  value={value}
                  label={t("End date period")}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='descricao'
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  disabled
                  value={value}
                  label={t("Description")}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='observacao'
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  disabled
                  value={value}
                  label={t("Note")}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='chaveSequencial'
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  disabled
                  value={value}
                  label={t("Sequential key")}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='status'
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  disabled
                  value={t(value)}
                  label='Status'
                />
              )}
            />
          </FormControl>
          <Typography variant='h6' sx={{ml: 1,mb: 5}}>
            {t("Event routine history")}:
          </Typography>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <DataGrid
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              autoHeight
              rows={store.data}
              columns={columns}
              checkboxSelection={false}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
              />
          </FormControl>
          <RotinaEventHistoryViewDrawer open={rotinaEventHistoryViewOpen} toggle={toggleRotinaEventHistoryViewDrawer} row={row}/>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              {t("Cancel")}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
RotinaViewDrawer.acl = {
  action: 'read',
  subject: 'ac-rotina-page'
}

export default RotinaViewDrawer