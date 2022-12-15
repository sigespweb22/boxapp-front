export type VendedorContratoLayoutType = {
  id: string
}

export type VendedorContratoType = {
  id: string
  comissaoReais: number | null
  comissaoPercentual: number | null
  clienteContratoId: string
  vendedorId: number | null
  status: string
}