// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type ServicoLayoutType = {
  id: string
}

export type ServicoType = {
  id: string
  nome: string
  codigoUnico: string
  tipo: string
  valorCusto: number
  caracteristicas: string
  unidadeMedida: string
  status: string
  avatarColor: ThemeColor
}