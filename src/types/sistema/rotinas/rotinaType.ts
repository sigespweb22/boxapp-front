// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type RotinaLayoutType = {
  id: string | undefined
}

export type RotinaType = {
  id: string
  nome: string
  descricao: string
  observacao: string
  chaveSequencial: string
  dataCompetenciaInicio: string | undefined
  dataCompetenciaFim: string | null
  status: string
  dispatcherRoute: string
  avatarColor?: ThemeColor
  dataCriacaoUltimoEvento: string
  statusUltimoEvento: string
  totalItensInsucessoUltimoEvento: number
  totalItensSucessoUltimoEvento: number
  exceptionMessageUltimoEvento: string
}