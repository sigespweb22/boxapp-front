export type ClienteProdutoLayoutType = {
  id: string
}

export type ClienteProdutoType = {
  id: string
  nome: string
  caracteristicas: string
  valorVenda: string
  clienteId: string
  produto: Produto
  status: string
}

export type ClienteProdutoAddType = {
  id: string
  nome: string
  caracteristicas: string
  valorVenda: string
  clienteId: string
  produto: Produto
  status: string
}

interface Produto {
  id: string | ''
  nome: string | ''
}