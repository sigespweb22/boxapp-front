// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Key from 'mdi-material-ui/Key'

// ** Third Party Imports
import { GrupoType } from 'src/types/sistema/controle-acesso/grupoTypes'
import { useForm, Controller } from 'react-hook-form'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

interface SidebarViewGroupType {
  row: GrupoType | undefined
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

const SidebarViewGroup = (props: SidebarViewGroupType) => {
  // ** Hook
  const { t } = useTranslation()
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
        <Typography variant='h6'>{t("View Group")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              disabled={true}
              value={props?.row?.name}
              label={t("Group name")}
              defaultValue='.'
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <TextField
                  disabled={true}
                  type='status'
                  value={t(props?.row?.status || '')}
                  onChange={onChange}
                  placeholder='(e.g.: ATIVO)'
                  defaultValue='.'
                  label='Status'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Box sx={{ fontSize: 16, mb: "10px" }}>{t("Permissions")}</Box>
            {props?.row?.applicationRoleGroups.map(group =>
                {
                  return (
                    <Box key={group.groupId}  sx={{ fontSize: 16, mb: "10px" }}>
                      <IconButton size='small' sx={{ mr: '1px', mb: '3px', color: '#FF671F' }} >
                        <Key fontSize='small' />
                      </IconButton>
                      {group.name}
                    </Box>
                  )
                }
            )}
          </FormControl>
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
SidebarViewGroup.acl = {
  action: 'read',
  subject: 'ac-group-page'
}

export default SidebarViewGroup