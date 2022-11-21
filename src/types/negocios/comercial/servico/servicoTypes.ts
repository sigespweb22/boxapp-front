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
  valorCusto: string
  caracteristicas: string
  unidadeMedida: string
  fornecedorServico: {id: string, nome: string}
  fornecedorServicoId: string
  status: string
  avatarColor: ThemeColor
}