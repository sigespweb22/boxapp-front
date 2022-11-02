// ** Types
import { ServicoType } from 'src/types/negocios/comercial/servico/servicoTypes'

export type ClienteServicoLayoutType = {
  id: string
}

export type ClienteServicoType = {
  id: string
  nome: string
  valorVenda: string
  caracteristicas: string
  cobrancaTipo: string
  servicoNome: string
  clienteId: string
  servico: ServicoType
  servicoId: string
  status: string
}