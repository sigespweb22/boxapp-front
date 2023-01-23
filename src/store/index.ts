// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import usuario from 'src/store/sistema/controle-acesso/usuario'
import role from 'src/store/sistema/controle-acesso/role'
import grupo from 'src/store/sistema/controle-acesso/grupo'
import servico from 'src/store/negocios/comercial/servico'
import cliente from 'src/store/negocios/comercial/cliente'
import produto from 'src/store/negocios/comercial/produto'
import clienteServico from 'src/store/negocios/comercial/cliente/servico'
import clienteProduto from 'src/store/negocios/comercial/cliente/produto'
import clienteContrato from 'src/store/negocios/comercial/cliente/contrato'
import clienteContratoFatura from 'src/store/negocios/comercial/cliente/contrato/fatura'
import clienteView from 'src/store/negocios/comercial/cliente/view'
import pipeline from 'src/store/negocios/processos/pipeline'
import rotinaEventHistory from 'src/store/sistema/rotina/rotinaEventHistory'
import fornecedor from 'src/store/negocios/parceiros/fornecedor'
import fornecedorServico from 'src/store/negocios/parceiros/fornecedor/servico'
import fornecedorProduto from 'src/store/negocios/parceiros/fornecedor/produto'
import fornecedorView from 'src/store/negocios/parceiros/fornecedor/view'
import vendedor from 'src/store/negocios/comercial/vendedor'
import vendedorView from 'src/store/negocios/comercial/vendedor/view'
import vendedorContrato from 'src/store/negocios/comercial/vendedor/contrato'
import vendedorComissao from 'src/store/negocios/comercial/vendedor/comissao'
import chaveApi from 'src/store/sistema/configuracoes/chave-api/index'
import rotina from 'src/store/sistema/rotina/index'
import email from 'src/store/apps/email'
import calendar from 'src/store/apps/calendar'

export const store = configureStore({
  reducer: {
    usuario,
    role,
    grupo,
    servico,
    cliente,
    produto,
    clienteServico,
    clienteProduto,
    clienteContrato,
    clienteContratoFatura,
    clienteView,
    pipeline,
    fornecedor,
    fornecedorServico,
    fornecedorProduto,
    fornecedorView,
    chaveApi,
    vendedor,
    rotinaEventHistory,
    vendedorView,
    vendedorContrato,
    vendedorComissao,
    rotina,
    chat,
    email,
    calendar
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>