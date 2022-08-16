// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type UserLayoutType = {
  id: string | undefined
}

export type UsersType = {
  id: string
  role: string[]
  applicationUserGroups: string[]
  email: string
  status: string
  avatar: string
  company: string
  country: string
  contact: string
  fullName: string
  userName: string
  currentPlan: string
  avatarColor?: ThemeColor
}