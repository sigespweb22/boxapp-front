// ** React Imports
import { useState, SyntheticEvent, Fragment, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip';

// ** Icons Imports
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockCheckOutline from 'mdi-material-ui/LockCheckOutline'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'

// Import Translate
import { useTranslation } from 'react-i18next'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

// ** Api Services
import { UsersType } from 'src/types/sistema/controle-acesso/userTypes'

interface GroupData {
  userId: string
  name: string
  groupId: string
}

const defaultValues: UsersType = {
  userId: '',
  id: '',
  roles: [],
  rolesClaims: [],
  applicationUserGroups: [],
  email: '',
  password: '',
  status: '',
  avatar: '',
  company: '',
  country: '',
  contact: '',
  fullName: '',
  userName: '',
  currentPlan: '',
  avatarColor: 'primary'
}

const capitalizeFullName = (userName: string) => {
  if (userName)
  {
    const name = userName[0] + userName.slice(1).toLowerCase().slice(0, 10)
    const newName = `${name}...`

    return newName
  }
}

const formatGroupsToTooltip = (groups: string[]) => {
  const elem: string[] = []

  groups.forEach(element => {
    elem.push("| " + element + " | ")
  })

  return elem
}

const formatGroup = (groups: GroupData[]) => {
  if (groups.length > 0)
  {
    if (groups.length > 1) 
    {
      return `${groups[0].name}...`
    } else {
      return groups[0].name
    }
  }
}

const UserDropdown = (props: Props) => {
  // ** Props
  const { t } = useTranslation()
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [value, setValue] = useState<UsersType>(defaultValues)

  useEffect(() => {
    const userStorage = window.localStorage.getItem('userData') || ''
    const userStorageConverted = JSON.parse(userStorage)

    setValue(userStorageConverted)
  }, [])

  // ** Hooks
  const router = useRouter()
  const { logout } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string, id?: string) => {
    if (url) {
      router.push({
        pathname: url,
        query: id
      })
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt={value.fullName}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={value.avatar}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar alt={value.fullName} src={value.avatar} sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Tooltip title={value.fullName}>
                <Typography sx={{ fontWeight: 600 }}>{capitalizeFullName(value.fullName)}</Typography>
              </Tooltip>
              <Tooltip title={t("Group(s) with access permission(s)")}>
                <LockCheckOutline fontSize='small' sx={{ mr: 2,  color: 'success.main' }} />
              </Tooltip>
              <Tooltip title={formatGroupsToTooltip(value.applicationUserGroups.map(x => x.name))}>
                <Typography variant='body2' sx={{ 
                  fontSize: '0.8rem',
                  color: 'success.main',
                  mt: -5,
                  ml: 7
                  }}>
                  {formatGroup(value.applicationUserGroups)}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose(`/sistema/controle-acesso/usuario/perfil/${value.id}`, )}>
          <Box sx={styles}>
            <AccountOutline sx={{ mr: 2 }} />
            {t("Profile")}
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
          <LogoutVariant sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          {t("Log out")}
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
