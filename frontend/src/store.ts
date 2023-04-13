import { configureStore } from '@reduxjs/toolkit'

import NotificationSnackbarSlice from './components/NotificationSnackbar/NotificationSnackbarSlice'
import BraintreeSlice from './pages/Braintree/BraintreeSlice'
import ExchangeSlice from './pages/Exchange/ExchangeSlice'

export const store = configureStore({
  reducer: {
    notificationSnackbar: NotificationSnackbarSlice.reducer,
    exchange: ExchangeSlice.reducer,
    braintree: BraintreeSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch