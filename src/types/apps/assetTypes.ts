// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type UserLayoutType = {
  id: string
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
  clienteAtivoTipoServicoTipo: string
  caracteristica: string
  observacao: string
  status: string
  avatarColor: ThemeColor
}