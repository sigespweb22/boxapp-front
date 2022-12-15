interface applicationRole {
  subject: string
  actions: string[]
}

interface applicationRoleGroups {
  applicationRole: applicationRole
}

interface applicationGroup {
  applicationRoleGroups: applicationRoleGroups[]
}

interface applicationUserGroups {
  applicationGroup: applicationGroup
}

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type Abilities = {
  abilities: string
  subject: string
}

export type UserDataType = {
  id: string
  roles: string[]
  rolesClaims: Abilities[]
  applicationUserGroups: applicationUserGroups[]
  funcao: string
  setor: string
  status: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  logout: () => void
  isInitialized: boolean
  user: UserDataType | null
  setUser: (value: UserDataType | null) => void
  setIsInitialized: (value: boolean) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}
