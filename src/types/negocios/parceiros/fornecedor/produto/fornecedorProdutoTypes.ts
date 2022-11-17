export type FornecedorProdutoLayoutType = {
  id: string
}

export type FornecedorProdutoType = {
  id: string
  nome: string
  codigoUnico: string
  caracteristicas: string
  descricao: string
  valorCusto: string
  fornecedorId: string
  status: string
}

export type FornecedorProdutoAddType = {
  nome: string
  codigoUnico: string
  caracteristicas: string
  descricao: string
  valorCusto: string
  fornecedorId: string
  status: string
}