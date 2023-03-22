// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { Abilities } from 'src/context/types'

export type UserLayoutType = {
  id: string | undefined
}

export type ApplicationGroupType = {
  id: string,
  name: string
}

export type ApplicationUserGroups = {
  groupId: string
  name: string
}

export type ApplicationUserGroupViewModelType = {
  id: string
  userId: string
  groupId: string
  name: string
}

export type UsersType = {
  userId: string
  id: string
  roles: string[]
  rolesClaims: Abilities[]
  applicationUserGroups: ApplicationUserGroupViewModelType[]
  email: string
  password: string
  confirmNewPassword: string
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
  applicationUserGroups: ApplicationUserGroups[]
}

export type UsuarioInfoType = {
  id: string
  bio: string
  dataAniversario: string
  telefoneCelular: string
  genero: string
}

export type UsuarioSegurancaType = {
  senhaAnterior: string
  novaSenha: string
}