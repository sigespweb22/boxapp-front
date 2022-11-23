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
import clienteView from 'src/store/negocios/comercial/cliente/view'
import pipeline from 'src/store/negocios/processos/pipeline'
import fornecedor from 'src/store/negocios/parceiros/fornecedor'
import fornecedorServico from 'src/store/negocios/parceiros/fornecedor/servico'
import fornecedorProduto from 'src/store/negocios/parceiros/fornecedor/produto'
import fornecedorView from 'src/store/negocios/parceiros/fornecedor/view'
import chaveApi from 'src/store/sistema/configuracoes/chave-api/index'
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
    clienteView,
    pipeline,
    fornecedor,
    fornecedorServico,
    fornecedorProduto,
    fornecedorView,
    chaveApi,
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