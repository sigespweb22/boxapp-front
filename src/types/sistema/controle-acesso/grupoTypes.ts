// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type GrupoLayoutType = {
  id: string | undefined
}

export type ApplicationRoleGroupViewModelType = {
  roleId: string
  groupId: string
  name: string
}

export type GrupoType = {
  id: string
  name: string
  applicationRoleGroups: ApplicationRoleGroupViewModelType[]
  applicationRoleGroupsNames: string[]
  status: string
  avatarColor?: ThemeColor
}

export type GrupoEditType = {
  id: string
  name: string
  applicationRoleGroups: ApplicationRoleGroupViewModelType[]
}