// ** Types
import { FornecedorType } from 'src/types/negocios/parceiros/fornecedor/fornecedorTypes'

export type FornecedorServicoLayoutType = {
  id: string
}

export type FornecedorServicoType = {
  id: string
  nome: string
  codigoServico: string
  unidadeMedida: string
  caracteristicas: string
  fornecedorId: string
  fornecedor: FornecedorType
  status: string
}