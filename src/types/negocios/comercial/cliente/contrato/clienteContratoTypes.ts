import { ClienteType } from 'src/types/negocios/comercial/cliente/clienteTypes'
import { ClienteContratoFaturaType } from './fatura/clienteContratoFaturaTypes'

export type ClienteContratoLayoutType = {
  id: string
}

export type ClienteContratoViewModelType = {
  id: string
  valorContrato: number | null
  periodicidade: string
  clienteId: string
  bomControleContratoId: number | null
  cliente: ClienteType
  fatura: ClienteContratoFaturaType
  status: string
}

export type ClienteContratoAddType = {
  valorContrato: number | null
  periodicidade: string
  clienteId: string
  bomControleContratoId: number | null
  status: string
}