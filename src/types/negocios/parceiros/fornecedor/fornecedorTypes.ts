// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type FornecedorLayoutType = {
  id: string
}

export type FornecedorType = {
  id: string
  nomeFantasia: string
  razaoSocial: string
  inscricaoEstadual: string
  cnpj: string
  telefonePrincipal: string
  emailPrincipal: string
  observacao: string
  codigoMunicipio: number
  rua: string
  numero: string
  complemento: string
  cidade: string
  estado: string
  cep: string
  status: string
  fornecedorServicos: {id: string, nome: string}
  avatarColor?: ThemeColor
}