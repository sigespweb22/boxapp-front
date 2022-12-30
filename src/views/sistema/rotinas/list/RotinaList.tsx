// ** React Imports
import { useContext, useState, useEffect, useCallback, useRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Third Party Import
import { useTranslation } from 'react-i18next'
import { HubConnectionBuilder } from '@microsoft/signalr';

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
import PlayBox from 'mdi-material-ui/PlayBox'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import TableHeader from 'src/views/sistema/rotinas/components/TableHeader'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import PageHeader from 'src/@core/components/page-header'
import RotinaEditDrawer from 'src/views/sistema/rotinas/edit/RotinaEditDrawer'
import RotinaViewDrawer from 'src/views/sistema/rotinas/view/RotinaViewDrawer'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, alterStatusRotina } from 'src/store/sistema/rotina'

// ** Api services imports
import rotinaApiService from 'src/@api-center/sistema/rotinas/rotinaApiService'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { RotinaType } from 'src/types/sistema/rotinas/rotinaType'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import axios from 'axios'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface RotinaStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: RotinaType
}

const rotinaStatusObj: RotinaStatusType = {
  ACTIVE: 'success',
  RECORRENTE: 'secondary'
}

const rotinaEventHistoryStatusObj: RotinaStatusType = {
  EM_EXECUCAO: 'info',
  CONCLUIDA: 'success',
  FALHA_EXECUCAO: 'error'
}

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders cliente column
const renderRotinaNome = (row: RotinaType) => {
  return (
    <AvatarWithoutImageLink href="#">
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
      color={rotinaStatusObj[status]}
      sx={{ textTransform: 'capitalize' }}
    />
  )
}

const RenderRotinaEventHistoryStatus = ({ status }: { status: string }) => {
  // ** Hooks
  const { t } = useTranslation()

  return (
    <CustomChip
      skin='light'
      size='small'
      label={t(status)}
      color={rotinaEventHistoryStatusObj[status]}
      sx={{ textTransform: 'capitalize' }}
    />
  )
}

const defaultColumns = [
  {
    flex: 0.45,
    minWidth: 30,
    field: 'nome',
    headerName: 'Nome',
    headerAlign: 'left' as const,
    align: 'left' as const,
    renderCell: ({ row }: CellType) => {
      const { nome, chaveSequencial } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderRotinaNome(row)}
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
              🔑{chaveSequencial}
            </Typography>
          </Box>
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
    renderCell: ({ row }: CellType) => <RenderStatus status={row.status} />
  },
  {
    flex: 0.15,
    minWidth: 100,
    field: 'dataCriacaoUltimoEvento',
    headerName: 'Última rotina - Data',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.dataCriacaoUltimoEvento}
        </Typography>
      )
    }
  },
  {
    flex: 0.09,
    minWidth: 50,
    field: 'statusUltimoEvento',
    headerName: 'Última rotina - Status',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => <RenderRotinaEventHistoryStatus status={row.statusUltimoEvento} />
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'totalItensSucessoUltimoEvento',
    headerName: 'Última rotina - Total Sucessos',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.totalItensSucessoUltimoEvento}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'totalItensInsucessoUltimoEvento',
    headerName: 'Última rotina - Total Insucessos',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.totalItensInsucessoUltimoEvento}
        </Typography>
      )
    }
  }
]

const RotinaList = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [rotinaEditOpen, setRotinaEditOpen] = useState<boolean>(false)
  const [rotinaViewOpen, setRotinaViewOpen] = useState<boolean>(false)
  const [row, setRow] = useState<RotinaType | undefined>()
  const [mess, setMess] = useState<any | null>('')
  const [connection, setConnection] = useState<any | null>(null);

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.rotina)

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/notificacaoHub")
        .withAutomaticReconnect()
        .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
        connection.start()
                  .then(() => {
                      console.log('Connected!');

                      connection.on('ReceiveMessage', (message: string) => {
                          setMess(message)
                          console.log(mess)
                      });
                  })
                  .catch((e: any) => console.log('Connection failed: ', e));
    }
  }, [connection]);

  const sendMessage = async (user: string, message: string) => {
    const chatMessage = {
        user: user,
        message: message
    };

    if (connection.connectionStarted) {
        try {
            await connection.send('SendMessage', chatMessage);
        }
        catch(e) {
            console.log(e);
        }
    }
    else {
        alert('No connection to server yet.');
    }
  }

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(rotinaApiService.storageTokenKeyName)!}` 
    }
  }

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
    dispatch(alterStatusRotina(id))
  }

  const handleRotinaEdit = (row : RotinaType) => {
    setRow(row)
    setRotinaEditOpen(true)
  }

  const handleRotinaView = (row : RotinaType) => {
    setRow(row)
    setRotinaViewOpen(true)
  }

  const handleRotinaPlay = (row: RotinaType) => {
    axios.post(`${rotinaApiService.dispatchPrefixRoute}/${row.dispatcherRoute}/${row.id}`, {}, config)
    toast.success(`Rotina disparada com sucesso. \nAgora você pode continuar o uso do BoxApp enquanto trabalhamos sua solicitação, e quando quiser retorne a esta tela para verificar o STATUS de EXECUÇÃO da rotina.`)

    setTimeout(function () {
      dispatch(fetchData({q: ''}))
    }, 500)
  }

  const RenderButton = ({ id, status }: { id: string | undefined , status: string }) => {
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

  const toggleRotinaEditDrawer = () => setRotinaEditOpen(!rotinaEditOpen)
  const toggleRotinaViewDrawer = () => setRotinaViewOpen(!rotinaViewOpen)

  const columns = [
    ...defaultColumns,
    {
      flex: 0.2,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Ações',
      headerAlign: 'center' as const,
      align: 'center' as const,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {ability?.can('create', 'ac-cliente-page') && (
            <Tooltip title={t("Run routine")}>
              <IconButton onClick={() => handleRotinaPlay(row)}>
                <PlayBox fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          )}
          {ability?.can('read', 'ac-rotina-page') && (
            <Tooltip title={t('View')}>
              <IconButton onClick={() => handleRotinaView(row)}>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          )}
          {ability?.can('update', 'ac-rotina-page') && (
            <Tooltip title={t('Edit')}>
              <IconButton onClick={() => handleRotinaEdit(row)}>
                <PencilOutline fontSize='small' />
              </IconButton>
            </Tooltip>
          )}
          {ability?.can('update', 'ac-rotina-page') && <RenderButton id={row.id} status={row.status} />}
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>{t('Routine')}</Typography>}
            subtitle={<Typography variant='body2'>{t('Routine listing')}.</Typography>}
          />
        </Grid>
        {ability?.can('list', 'ac-rotina-page') ? (
          <Grid item xs={12}>
            <Card>
              <TableHeader value={value} handleFilter={handleFilter} />
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
          <>{t("You do not have permission to view this resource.")}</>
        )}
        <RotinaEditDrawer open={rotinaEditOpen} toggle={toggleRotinaEditDrawer} row={row}/>
        <RotinaViewDrawer open={rotinaViewOpen} toggle={toggleRotinaViewDrawer} row={row}/>
      </Grid>
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
RotinaList.acl = {
  action: 'list',
  subject: 'ac-rotina-page'
}

export default RotinaList
