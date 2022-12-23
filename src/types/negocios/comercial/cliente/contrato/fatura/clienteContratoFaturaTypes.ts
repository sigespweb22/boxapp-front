export type ClienteContratoFaturaLayoutType = {
  id: string
}

export type ClienteContratoFaturaType = {
  id: string
  dataVencimento: string 
  dataCompetencia: string
  valor: number
  desconto: number | null
  numeroParcela: number | null
  status: string
}

export type ClienteContratoFaturaAddType = {
  dataVencimento: string 
  dataCompetencia: string
  valor: number
  desconto: number | null
  numeroParcela: number | null
  status: string
}