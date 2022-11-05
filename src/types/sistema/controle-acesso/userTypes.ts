// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type UserLayoutType = {
  id: string | undefined
}

export type ApplicationGroupType = {
  id: string,
  name: string
}

export type ApplicationUserGroupViewModelType = {
  userId: string
  groupId: string
  name: string
}

export type UsersType = {
  id: string
  role: string[]
  applicationUserGroups: ApplicationUserGroupViewModelType[]
  applicationUserGroupsNames: string[]
  email: string
  password: string
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

export type UserEditType = {
  id: string
  fullName: string
  email: string
  applicationUserGroups: ApplicationUserGroupViewModelType[]
}

export type UsuarioContaType = {
  id: string
  avatar: string
  userName: string
  email: string
  fullName: string
  applicationUserGroups: []
}

export type UsuarioSegurancaType = {
  senhaAnterior: string
  novaSenha: string
}