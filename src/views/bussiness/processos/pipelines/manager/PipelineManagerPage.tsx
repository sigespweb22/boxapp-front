// ** React Imports
import React, { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import FormHelperText from '@mui/material/FormHelperText'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import ContentCopy from 'mdi-material-ui/ContentCopy'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Types
import { PipelineType } from 'src/types/bussiness/processos/pipeline/pipelineTypes'
import { PipelineLayoutType } from 'src/types/bussiness/processos/pipeline/pipelineTypes'

// ** Api Services
import pipelineApiService from 'src/@api-center/pipeline/pipelineApiService'

// ** Third Party Components
import axios from 'axios'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

import PipelineKanBan from 'src/@core/components/pipelines/index'

interface CardDataType {
  title: string
  avatars: string[]
  totalUsers: number
}

// ** Styled component for the link inside menu
const MenuItemLink = styled('a')(() => ({
  width: '100%',
  textDecoration: 'none',
}))

const cardData: CardDataType[] = [
  { totalUsers: 4, title: 'Prospecção', avatars: ['1.png', '2.png', '3.png', '4.png'] },
  { totalUsers: 7, title: 'Pré-vendas', avatars: ['5.png', '6.png', '7.png', '8.png', '1.png', '2.png', '3.png'] },
  { totalUsers: 5, title: 'Vendas', avatars: ['4.png', '5.png', '6.png', '7.png', '8.png'] },
  { totalUsers: 3, title: 'Pós-vendas', avatars: ['1.png', '2.png', '3.png'] },
  { totalUsers: 2, title: 'Implantação', avatars: ['4.png', '5.png'] }
]

const rolesArr = [
  'User Management',
  'Content Management',
  'Disputes Management',
  'Database Management',
  'Financial Management',
  'Reporting',
  'API Control',
  'Repository Management',
  'Payroll'
]

type Props = PipelineLayoutType & {
  pipelineData: PipelineType[]
}

const PipelineManager = ({ id, pipelineData }: Props) => {
  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<null | PipelineType>(null)
 
  const storedToken = window.localStorage.getItem(pipelineApiService.storageTokenKeyName)!
  useEffect(() => {
    axios
      .get(pipelineApiService.listAsync, {
            headers: {
              Authorization: "Bearer " + storedToken
            },
            params: { id }
      })
      .then(response => {
        setData(response.data)
        setError(false)
      })
      .catch(() => {
        setData(null)
        setError(true)
      })
  }, [id])

  // ** Hooks
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { name: '' } })

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setValue('name', '')
  }

  const renderCards = () =>
    cardData.map((item, index: number) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Link href={`/bussiness/processos/pipelines/manager/`} passHref>
          <MenuItemLink>
            <Card>
              <CardContent>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant='body2'>Total {item.totalUsers} usuários</Typography>
                  <AvatarGroup
                    max={4}
                    sx={{
                      '& .MuiAvatarGroup-avatar': { fontSize: '.875rem' },
                      '& .MuiAvatar-root, & .MuiAvatarGroup-avatar': { width: 32, height: 32 }
                    }}
                  >
                    {item.avatars.map((img, index: number) => (
                      <Avatar key={index} alt={item.title} src={`/images/avatars/${img}`} />
                    ))}
                  </AvatarGroup>
                </Box>
                <Box>
                  <Typography variant='h6'>{item.title}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography
                    variant='body2'
                    sx={{ color: 'primary.main', cursor: 'pointer' }}
                    onClick={() => {
                      handleClickOpen()
                      setDialogTitle('Edit')
                    }}
                  >
                    Editar o pipe
                  </Typography>
                  <IconButton size='small' sx={{ color: 'text.primary' }}>
                    <ContentCopy fontSize='small' />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </MenuItemLink>
        </Link>
      </Grid>
  ))

  const onSubmit = () => handleClose()

  const onDragEnd = () => {
    // TODO: reorder our collumn
  }

  return (
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={<Typography variant='h5'>Pré-venda</Typography>}
          subtitle={
            <Typography variant='body2'>
              Nesta etapa ocorre a qualificação dos leads
            </Typography>
          }
        />
        <Grid item xs={12} sm={6} lg={4}>
          <PipelineKanBan />    
        </Grid>
      </Grid>    
  )
}

export default PipelineManager
