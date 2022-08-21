// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type RoleLayoutType = {
  id: string | undefined
}

export type RolesType = {
  id: string
  name: string
  description: string
  avatarColor?: ThemeColor
}