export type RotinaEventHistoryLayoutType = {
    id: string | undefined
  }
  
  export type RotinaEventHistoryType = {
    dataInicio: string
    dataFim: string
    exceptionMensagem: string | null
    id: string
    rotinaId: string
    statusProgresso: string
    totalItensInsucesso: number
    totalItensSucesso: number
  }