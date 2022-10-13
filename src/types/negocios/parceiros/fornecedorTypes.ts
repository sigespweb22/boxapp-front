// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type FornecedorLayoutType = {
  id: string
}

export type FornecedorType = {
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