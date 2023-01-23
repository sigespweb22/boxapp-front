// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/sistema/controle-acesso/userTypes'


export type VendedorLayoutType = {
  id: string
}

export type VendedorType = {
  id?: string
  nome: string
  userId?: string
  applicationUser: UsersType | null
  status: string
  avatarColor?: ThemeColor
}