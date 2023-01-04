export type RotinaEventHistoryLayoutType = {
    id: string | undefined
  }
  
  export type RotinaEventHistoryType = {
    dataInicio: string
    dataFim: string
    exceptionMensagem: string | null
    id: string
    rotinaId: string
    rotinaViewModel: string | null
    statusProgresso: string
    totalItensInsucessoUltimoEvento: number
    totalItensSucessoUltimoEvento: number
  }