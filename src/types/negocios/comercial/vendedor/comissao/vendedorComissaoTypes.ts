import { ClienteContratoViewModelType } from 'src/types/negocios/comercial/cliente/contrato/clienteContratoTypes'
import { VendedorType } from 'src/types/negocios/comercial/vendedor/vendedorTypes'


export type VendedorComissaoLayoutType = {
  id: string
}

export type VendedorComissaoType = {
  map(arg0: (row: any) => void): import("react").ReactNode
  id: string
  valorComissao: number | null
  clienteContratoId: string
  clienteContratoViewModel: ClienteContratoViewModelType
  vendedorId: string | null
  vendedor: VendedorType
  status: string
}