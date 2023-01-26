// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

interface Property {
  id: string
  nome: string
}

export type RotinaLayoutType = {
  id: string | undefined
}

export type RotinaType = {
  periodicidadeRotina: string
  tempoCronograma: string
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
  horaExecucao: string
  periodicidade: string
  statusUltimoEvento: string
  totalItensInsucessoUltimoEvento: number
  totalItensSucessoUltimoEvento: number
  property: Property
  propertyId: string
  exceptionMessageUltimoEvento: string
}