// ** Types
import { ClienteType } from 'src/types/negocios/comercial/cliente/clienteTypes'
import { ServicoType } from 'src/types/negocios/comercial/servico/servicoTypes'

export type ClienteServicoLayoutType = {
  id: string
}

export type ClienteServicoType = {
  id: string
  nome: string
  valorVenda: number
  inscricaoEstadual: string
  caracteristicas: string
  cobrancaTipo: string
  servicoNome: string
  status: string
  Cliente: ClienteType
  Servico: ServicoType
}