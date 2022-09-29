// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type PipelineLayoutType = {
  id: string | undefined
}

export type PipelineType = {
  id: string
  nome: string
  avatarColor?: ThemeColor
  assinantes: string[]
}