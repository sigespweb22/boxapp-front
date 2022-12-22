// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type RotinaLayoutType = {
  id: string | undefined
}

export type RotinaType = {
  id: string
  nome: string
  descricao: string
  observacao: string
  chaveSequencial: string
  status: string
  avatarColor?: ThemeColor
}