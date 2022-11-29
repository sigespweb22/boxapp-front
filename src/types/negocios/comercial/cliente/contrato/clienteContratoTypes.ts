export type ClienteContratoLayoutType = {
  id: string
}

export type ClienteContratoType = {
  id: string
  valorContrato: number
  periodicidade: string
  clienteId: string
  bomControleContratoId: string
  status: string
}

export type ClienteContratoAddType = {
  id: string
  valorContrato: number
  periodicidade: string
  clienteId: string
  bomControleContratoId: string
  status: string
}