// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import GoogleCirclesGroup from 'mdi-material-ui/GoogleCirclesGroup'

// ** Third Party Imports
import { UsersType } from 'src/types/apps/userTypes'
import { useForm, Controller } from 'react-hook-form'

// ** Copmponents Imports
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

interface SidebarViewUserType {
  row: UsersType | undefined
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

const SidebarViewUser = (props: SidebarViewUserType) => {
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

  const { t } = useTranslation()

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
        <Typography variant='h6'>Visualizar Usuário</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='fullName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled={true}
                  value={props?.row?.fullName}
                  onChange={onChange}
                  placeholder='(e.g.: Alan Rezende)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled={true}
                  type='email'
                  value={props?.row?.email}
                  onChange={onChange}
                  placeholder='(e.g.: alan.rezende@email.com)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled={true}
                  type='status'
                  value={t(props?.row?.status)}
                  onChange={onChange}
                  placeholder='(e.g.: ATIVO)'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }} >
            <Controller
              name="applicationUserGroups"
              control={control}
              render={() => {
                return (
                  <FormControl fullWidth>
                    <Box sx={{ fontSize: 16, mb: "10px" }}>Grupos</Box>
                    {props?.row?.applicationUserGroupsNames.map(group =>
                       {
                          return (
                            <div>
                              <IconButton size='small' sx={{ mr: '1px', mb: '3px', color: '#FF671F' }} >
                                <GoogleCirclesGroup fontSize='small' />
                              </IconButton>
                              {group}
                            </div>
                          )
                       }
                    )}
                  </FormControl>
                )
              }}
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
SidebarViewUser.acl = {
  action: 'read',
  subject: 'ac-user-page'
}

export default SidebarViewUser