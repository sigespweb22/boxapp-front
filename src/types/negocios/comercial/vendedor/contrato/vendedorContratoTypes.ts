import { ClienteContratoViewModelType } from 'src/types/negocios/comercial/cliente/contrato/clienteContratoTypes'


export type VendedorContratoLayoutType = {
  id: string
}

export type VendedorContratoType = {
  id: string
  comissaoReais: number | null
  comissaoPercentual: number | null
  clienteContratoId: string
  clienteContrato: ClienteContratoViewModelType | null
  vendedorId: string | null
  status: string
}