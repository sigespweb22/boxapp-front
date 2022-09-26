// ** React Imports
import React, { useEffect, useState } from 'react'

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
import LinearProgress from '@mui/material/LinearProgress'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import TableEdit from 'mdi-material-ui/TableEdit'
import EyeArrowRightOutline from 'mdi-material-ui/EyeArrowRightOutline'
import Login from 'mdi-material-ui/Login'
import InformationOutline from 'mdi-material-ui/InformationOutline'

interface PipelineDataType {
  id: string,
  title: string
  avatars: string[]
  totalUsers: number
  totalTarefas: number
}

const pipelineData: PipelineDataType[] = [
  { id: 'ec1bb0cf-b43a-4ab9-aff7-93b094cbffee', totalTarefas: 10, totalUsers: 4, title: 'Prospecção', avatars: ['1.png', '2.png', '3.png', '4.png'] },
  { id: 'ec1bb0cf-b43a-4ab9-aff7-93b094cbffee', totalTarefas: 15, totalUsers: 7, title: 'Pré-vendas', avatars: ['5.png', '6.png', '7.png', '8.png', '1.png', '2.png', '3.png'] },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', totalTarefas: 20, totalUsers: 5, title: 'Vendas', avatars: ['4.png', '5.png', '6.png', '7.png', '8.png'] },
  { id: '4', totalUsers: 3, totalTarefas: 25, title: 'Pós-vendas', avatars: ['1.png', '2.png', '3.png'] },
  { id: '5', totalUsers: 2, totalTarefas: 30, title: 'Implantação', avatars: ['4.png', '5.png'] }
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

const RolesCards = () => {
  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')

  // ** Hooks
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { name: '' } })

  useEffect(() => {
    const a = () => {
      
    }
  },[])

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setValue('name', '')
  }

  const renderCards = () =>
    pipelineData.map((item, index: number) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Box>
              <Typography variant='h6'>{item.title}</Typography>
            </Box>
            <Box sx={{ marginTop: '15px', mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              <Typography variant='body2'>{item.totalUsers} usuários trabalhando neste pipe</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <IconButton size='small' sx={{ color: '#ff671f' }} onClick={() => {
                  handleClickOpen()
                  setDialogTitle('Edit')
                }}>
                <TableEdit fontSize='small' />
              </IconButton>
              <IconButton size='small' sx={{ color: '#ff671f' }} onClick={() => {
                  handleClickOpen()
                  setDialogTitle('Edit')
                }}>
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
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'primary.main', marginLeft: '61%' }}>
                {/* {`${row.completedTasks}/`} */}{"Tickets 65/"}
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'rgb(127, 51, 15)' }}>
                {/* {row.tasks} */}{"150"}
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

  const onSubmit = () => handleClose()

  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleClickOpen()
            setDialogTitle('Add')
          }}
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
                      handleClickOpen()
                      setDialogTitle('Add')
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
      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ textAlign: 'center' }}>
            <Typography variant='h4' component='span'>
              {`${dialogTitle} Role`}
            </Typography>
            <Typography variant='body2'>Set Role Permissions</Typography>
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
            <Box sx={{ my: 4 }}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Role Name'
                      onChange={onChange}
                      error={Boolean(errors.name)}
                      placeholder='Enter Role Name'
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid role name</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Typography variant='h6'>Role Permissions</Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ pl: '0 !important' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          fontSize: '0.875rem',
                          alignItems: 'center',
                          textTransform: 'capitalize'
                        }}
                      >
                        Administrator Access
                        <Tooltip placement='top' title='Allows a full access to the system'>
                          <InformationOutline sx={{ ml: 1, fontSize: '1rem' }} />
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <FormControlLabel
                        label='Select All'
                        control={<Checkbox size='small' />}
                        sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rolesArr.map((i, index: number) => {
                    return (
                      <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: 0 } }}>
                        <TableCell sx={{ fontWeight: 600, color: theme => `${theme.palette.text.primary} !important` }}>
                          {i}
                        </TableCell>
                        <TableCell>
                          <FormControlLabel control={<Checkbox size='small' />} label='Read' />
                        </TableCell>
                        <TableCell>
                          <FormControlLabel control={<Checkbox size='small' />} label='Write' />
                        </TableCell>
                        <TableCell>
                          <FormControlLabel control={<Checkbox size='small' />} label='Create' />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'center' }}>
            <Box className='demo-space-x'>
              <Button size='large' type='submit' variant='contained'>
                Submit
              </Button>
              <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
                Discard
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default RolesCards
