export type FornecedorProdutoLayoutType = {
  id: string
}

export type FornecedorProdutoType = {
  id: string
  nome: string
  codigoProduto: string
  caracteristicas: string
  fornecedorId: string
  status: string
}

export type FornecedorProdutoAddType = {
  nome: string,
  codigoProduto: string,
  caracteristicas: string,
  fornecedorId: string,
  status: string
}