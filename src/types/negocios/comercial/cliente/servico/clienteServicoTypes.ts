// ** Types
import { ClienteType } from 'src/types/negocios/comercial/cliente/clienteTypes'
import { ServicoType } from 'src/types/negocios/comercial/servico/servicoTypes'

export type ClienteServicoLayoutType = {
  id: string
}

export type ClienteServicoType = {
  id: string
  valorVenda: number
  caracteristicas: string
  cobrancaTipo: string
  servicoNome: string
  servicoId: string
  status: string
  Cliente: ClienteType
  Servico: ServicoType
}