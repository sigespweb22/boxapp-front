export type ClienteContratoLayoutType = {
  id: string
}

export type ClienteContratoType = {
  id: string
  valorContrato: number | null
  periodicidade: string
  clienteId: string
  bomControleContratoId: number | null
  status: string
}

export type ClienteContratoAddType = {
  valorContrato: number | null
  periodicidade: string
  clienteId: string
  bomControleContratoId: number | null
  status: string
}