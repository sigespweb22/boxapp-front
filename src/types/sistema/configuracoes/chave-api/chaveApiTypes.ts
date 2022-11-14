// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type ChaveApiLayoutType = {
  id: string | undefined
}

export type ChaveApiType = {
  id: string,
  apiTerceiro: string,
  descricao: string,
  key: string,
  dataValidade: string
  status: string
}