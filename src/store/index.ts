// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import usuario from 'src/store/sistema/controle-acesso/usuario'
import role from 'src/store/sistema/controle-acesso/role'
import grupo from 'src/store/sistema/controle-acesso/grupo'
import servico from 'src/store/negocios/comercial/servico'
import cliente from 'src/store/negocios/comercial/cliente'
import clienteServico from 'src/store/negocios/comercial/cliente/servico'
import clienteView from 'src/store/negocios/comercial/cliente/view'
import pipeline from 'src/store/negocios/processos/pipeline'
import fornecedor from 'src/store/negocios/parceiros/fornecedor'
import fornecedorServico from 'src/store/negocios/parceiros/fornecedor/servico'
import fornecedorView from 'src/store/negocios/parceiros/fornecedor/view'
import email from 'src/store/apps/email'
import calendar from 'src/store/apps/calendar'

export const store = configureStore({
  reducer: {
    usuario,
    role,
    grupo,
    servico,
    cliente,
    clienteServico,
    clienteView,
    pipeline,
    fornecedor,
    fornecedorServico,
    fornecedorView,
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