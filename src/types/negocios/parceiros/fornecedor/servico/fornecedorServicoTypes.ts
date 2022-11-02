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
  status: string
}

export type FornecedorServicoAddType = {
  nome: string
  codigoServico: string
  unidadeMedida: string
  caracteristicas: string
  fornecedorId: string
  status: string
}