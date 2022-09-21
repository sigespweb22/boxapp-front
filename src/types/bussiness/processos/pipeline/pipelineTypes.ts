// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type PipelineLayoutType = {
  id: string | undefined
}

export type PipelinesType = {
  id: string
  nome: string
  avatarColor?: ThemeColor
}