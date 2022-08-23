// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import role from 'src/store/apps/role'
import group from 'src/store/apps/group'
import asset from 'src/store/apps/asset'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'

export const store = configureStore({
  reducer: {
    user,
    role,
    group,
    asset,
    chat,
    email,
    invoice,
    calendar
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
