import { ClienteType } from 'src/types/negocios/comercial/cliente/clienteTypes'

export type ClienteContratoLayoutType = {
  id: string
}

export type ClienteContratoType = {
  id: string
  valorContrato: number | null
  periodicidade: string
  clienteId: string
  bomControleContratoId: number | null
  cliente: ClienteType
  status: string
}

export type ClienteContratoAddType = {
  valorContrato: number | null
  periodicidade: string
  clienteId: string
  bomControleContratoId: number | null
  status: string
}