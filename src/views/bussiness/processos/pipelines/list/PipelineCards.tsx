// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import TableEdit from 'mdi-material-ui/TableEdit'
import EyeArrowRightOutline from 'mdi-material-ui/EyeArrowRightOutline'
import Login from 'mdi-material-ui/Login'

// ** Custom Components Imports
import AddPipelineDrawer from 'src/views/bussiness/processos/pipelines/new/AddPipelineDrawer'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData } from 'src/store/bussiness/processos/pipeline'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

const PipelinesCard = () => {
  // ** States
  const [addPipelineOpen, setAddPipelineOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.pipeline)

  useEffect(() => {
    dispatch(
      fetchData({
        q: value
      })
    )
  }, [dispatch, value])

  const renderCards = () =>
    store.data.map((item, index: number) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Box>
              <Typography variant='h6'>{item.nome}</Typography>
            </Box>
            <Box sx={{ marginTop: '15px', mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <AvatarGroup
                  max={6}
                  sx={{
                    '& .MuiAvatarGroup-avatar': { fontSize: '.875rem' },
                    '& .MuiAvatar-root, & .MuiAvatarGroup-avatar': { width: 32, height: 32 }
                  }}
                >
                  {item.avatars.map((img, index: number) => (
                    <Avatar key={index} alt={item.nome} src={`/images/avatars/${img}`} />
                  ))}
              </AvatarGroup>
              <Typography variant='body2'>{item.totalAssinantes} usuários trabalhando neste pipe</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <IconButton size='small' sx={{ color: '#ff671f' }} onClick={() => {}}>
                <TableEdit fontSize='small' />
              </IconButton>
              <IconButton size='small' sx={{ color: '#ff671f' }} onClick={() => {}}>
                <EyeArrowRightOutline fontSize='small'/>
              </IconButton>
              <Link 
                href={{
                  pathname: `/bussiness/processos/pipelines/manager/[id]`,
                  query: {id: item.id },
                }}>
                  <IconButton size='small' sx={{ color: 'text.primary' }}>
                    <Login fontSize='small' sx={{ 
                                                          color: '#ff671f',
                                                          }} />
                  </IconButton>
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {`Tickets ${item.totalTarefasConcluidas}/`}
                </Typography>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'rgb(127, 51, 15)' }}>
                  {item.totalTarefas}
                </Typography>
              </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: "-20px" }}>
              <Box sx={{ width: 130, mr: 5 }}>
                <LinearProgress value={40} sx={{ height: 6 }} variant='determinate' />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))

  const toggleAddPipelineDrawer = () => setAddPipelineOpen(!addPipelineOpen)

  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: 'pointer' }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={5}>
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <img width={65} height={130} alt='add-role' src='/images/cards/pose_m1.png' />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <CardContent>
                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ mb: 3, whiteSpace: 'nowrap' }}
                    onClick={() => {
                      toggleAddPipelineDrawer()
                    }}
                  >
                    Novo pipe
                  </Button>
                  <Typography>Experimente construir um novo pipe.</Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {renderCards()}
      <AddPipelineDrawer open={addPipelineOpen} toggle={toggleAddPipelineDrawer} />
    </Grid>
  )
}

export default PipelinesCard