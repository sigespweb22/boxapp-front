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

// ** Api Services
import pipelineApiService from 'src/@api-center/pipeline/pipelineApiService'

// ** Axios Imports
import axios from 'axios'

// ** Custom Components Imports
import AddPipelineDrawer from 'src/views/bussiness/processos/pipelines/new/AddPipelineDrawer'

// ** Types
import { PipelineType } from 'src/types/bussiness/processos/pipeline/pipelineTypes'

interface PipelineDataType {
  id: string,
  nome: string
  totalTarefas: number
  totalTarefasConcluidas: number
  totalAssinantes: number
  avatars: string[]
}

const pipelineDataInitial: PipelineDataType[] = []

// const pipelineDataInitial: PipelineDataType[] = [
//   { id: 'ec1bb0cf-b43a-4ab9-aff7-93b094cbffee', totalTarefas: 10, totalUsers: 4, title: 'Prospecção', avatars: ['1.png', '2.png', '3.png', '4.png'] },
//   { id: 'ec1bb0cf-b43a-4ab9-aff7-93b094cbffee', totalTarefas: 15, totalUsers: 7, title: 'Pré-vendas', avatars: ['5.png', '6.png', '7.png', '8.png', '1.png', '2.png', '3.png'] },
//   { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', totalTarefas: 20, totalUsers: 5, title: 'Vendas', avatars: ['4.png', '5.png', '6.png', '7.png', '8.png'] },
//   { id: '4', totalUsers: 3, totalTarefas: 25, title: 'Pós-vendas', avatars: ['1.png', '2.png', '3.png'] },
//   { id: '5', totalUsers: 2, totalTarefas: 30, title: 'Implantação', avatars: ['4.png', '5.png'] }
// ]

const PipelinesCard = () => {
  // ** States
  const [pipelineData, setPipelineData] = useState<PipelineDataType[]>(pipelineDataInitial)
  const [addPipelineOpen, setAddPipelineOpen] = useState<boolean>(false)

  // ** Hooks
  const storedToken = window.localStorage.getItem(pipelineApiService.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: "Bearer " + storedToken
    }
  }

  useEffect(() => {
    axios
      .get(pipelineApiService.listAsync, config)
      .then(response => {
        setPipelineData(response.data.allData)
      })
  }, [])

  const renderCards = () =>
    pipelineData.map((item, index: number) => (
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