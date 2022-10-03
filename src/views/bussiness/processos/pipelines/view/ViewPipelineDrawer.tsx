// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'

// ** Third Party Imports
import { PipelineType } from 'src/types/bussiness/processos/pipeline/pipelineTypes'
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Api Services
import usersApiService from 'src/@api-center/user/userApiService'

// ** Axios Imports
import axios from 'axios'

// ** Data
import { top100Films } from 'src/@fake-db/autocomplete'

interface SidebarViewPipelineType {
  row: PipelineType | undefined
  open: boolean
  toggle: () => void
}

interface DataType {
  year: number
  title: string
}

interface UserDataType {
  userId: string
  name: string
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const fixedOptions = [top100Films[6]]

const SidebarViewPipeline = (props: SidebarViewPipelineType) => {
  // ** Hook
  const {
    reset,
    control
  } = useForm()

  // ** Props
  const { open, toggle } = props

  // ** State
  const [value, setValue] = useState<DataType[]>([...fixedOptions])

  const handleClose = () => {
    toggle()
    reset()
  }

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
        <Typography variant='h6'>Visualizar Pipeline</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='nome'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.nome}
                  placeholder='Nome'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller              
              name='posicao'
              control={control}
              render={() => (
                <TextField
                  disabled={true}
                  value={props?.row?.posicao}
                  placeholder='Posição'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }} >
            <Controller
              name="assinantes"
              control={control}
              rules={{ required: true }}
              render={() => {
                return (
                  <FormControl fullWidth>
                    <Autocomplete
                      disabled={true}
                      multiple
                      value={value}
                      options={top100Films}
                      id='autocomplete-fixed-option'
                      getOptionLabel={option => option.title}
                      renderInput={params => <TextField {...params} label='Fixed tag' placeholder='' />}
                      onChange={(event, newValue) => {
                        setValue([...fixedOptions, ...newValue.filter(option => fixedOptions.indexOf(option) === -1)])
                      }}
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            label={option.title}
                            {...(getTagProps({ index }) as {})}
                            disabled={fixedOptions.indexOf(option) !== -1}
                            key={index}
                          />
                        ))
                      }
                    />
                  </FormControl>
                )
              }}
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 5 }}>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarViewPipeline