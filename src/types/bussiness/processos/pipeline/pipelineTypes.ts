// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type PipelineLayoutType = {
  id: string | undefined
}

export type PipelineType = {
  id: string
  nome: string
  posicao: string
  avatarColor?: ThemeColor
  pipelineAssinantes: PipelineAssinantesViewModelType[]
}

export type PipelineAssinantesViewModelType = {
  userId: string
  name: string
}