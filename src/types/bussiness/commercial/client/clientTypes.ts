// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type ClientLayoutType = {
  id: string | undefined
}

export type ClientsType = {
  id: string
  nomeFantasia: string
  razaoSocial: string
  inscricaoEstadual: string
  cnpj: string
  telefonePrincipal: string
  emailPrincipal: string
  observacao: string
  dataFundacao: string
  codigoMunicipio: string
  rua: string
  numero: string
  complemento: string
  cidade: string
  estado: string
  cep: string
  status: string
  avatarColor?: ThemeColor
}