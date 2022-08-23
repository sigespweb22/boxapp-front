// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type UserLayoutType = {
  id: string | undefined
}

export type AssetsType = {
  id: string
  nome: string
  referencia: string
  codigoUnico: string
  tipo: string
  valorCusto: number
  valorVenda: number
  unidadeMedida: string
  clienteAtivoTipoServico: string
  caracteristica: string
  observacao: string
  status: string
  avatarColor?: ThemeColor
}