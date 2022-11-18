export type ClienteProdutoLayoutType = {
  id: string
}

export type ClienteProdutoType = {
  id: string
  nome: string
  codigoUnico: string
  caracteristicas: string
  descricao: string
  valorCusto: string
  status: string
}

export type ClienteProdutoAddType = {
  id: string
  nome: string
  codigoUnico: string
  caracteristicas: string
  descricao: string
  valorCusto: string
  status: string
}

interface Produto {
  id: string | ''
  nome: string | ''
}