// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type ProdutoLayoutType = {
  id: string
}

export type ProdutoType = {
  id: string
  nome: string
  codigoUnico: string
  caracteristicas: string
  descricao: string
  valorCusto: string
  fornecedorProduto: { id: string, nome: string }
  fornecedorProdutoId: string
  status: string
  avatarColor: ThemeColor
}