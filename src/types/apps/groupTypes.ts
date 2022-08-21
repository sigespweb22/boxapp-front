// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type GroupLayoutType = {
  id: string | undefined
}

export type GroupsType = {
  id: string
  name: string
  applicationRoleGroups: string[]
  applicationRoleGroupsNames: string[]
  status: string
  avatarColor?: ThemeColor
}