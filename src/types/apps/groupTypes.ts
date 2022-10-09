// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type GroupLayoutType = {
  id: string | undefined
}

export type ApplicationRoleGroupViewModelType = {
  roleId: string
  groupId: string
  name: string
}

export type GroupsType = {
  id: string
  name: string
  applicationRoleGroups: ApplicationRoleGroupViewModelType[]
  applicationRoleGroupsNames: string[]
  status: string
  avatarColor?: ThemeColor
}

export type GroupEditType = {
  id: string
  name: string
  applicationRoleGroups: ApplicationRoleGroupViewModelType[]
}