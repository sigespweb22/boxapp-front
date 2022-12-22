// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type VendedorLayoutType = {
  id: string
}

export type VendedorType = {
  id?: string
  nome: string
  userId: string
  status: string
  avatarColor?: ThemeColor
}