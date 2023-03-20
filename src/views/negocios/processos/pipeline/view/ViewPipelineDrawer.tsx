// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'

// ** Third Party Imports
import { PipelineType } from 'src/types/negocios/processos/pipeline/pipelineTypes'
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import AccountGroupOutline from 'mdi-material-ui/AccountGroupOutline'

interface SidebarViewPipelineType {
  row: PipelineType | undefined
  open: boolean
  toggle: () => void
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const SidebarViewPipeline = (props: SidebarViewPipelineType) => {
  // ** Hook
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
              render={() => {
                return (
                  <FormControl fullWidth>
                    <Box sx={{ fontSize: 20, mb: "10px" }}>Assinantes</Box>
                    {
                      props?.row?.pipelineAssinantes.map((item) => {
                          return (
                              <Box key={item.name}  sx={{ fontSize: 16, mb: "10px" }}>
                                <IconButton size='small' sx={{ mr: '1px', mb: '3px', color: '#FF671F' }} >
                                  <AccountGroupOutline fontSize='small' />
                                </IconButton>
                                {item.name}
                              </Box>
                          )
                        }
                      )
                    }
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

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade específica para ter acesso a esta página com o subject abaixo
SidebarViewPipeline.acl = {
  action: 'read',
  subject: 'ac-pipeline-page'
}

export default SidebarViewPipeline