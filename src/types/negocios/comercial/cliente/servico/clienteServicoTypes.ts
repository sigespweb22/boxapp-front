export type ClienteServicoLayoutType = {
  id: string
}

export type ClienteServicoType = {
  id: string
  nome: string
  valorVenda: string
  caracteristicas: string
  cobrancaTipo: string
  clienteId: string
  servicoId: string
  servico: Servico
  status: string
}

export type ClienteServicoAddType = {
  nome: string
  valorVenda: string
  caracteristicas: string
  cobrancaTipo: string
  clienteId: string | string[] | undefined
  servicoId: string
  servico: Servico
  status: string
}

interface Servico {
  id: string | ''
  nome: string | ''
}