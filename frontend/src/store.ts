import { configureStore } from '@reduxjs/toolkit'

import NotificationSnackbarSlice from './components/NotificationSnackbar/NotificationSnackbarSlice'
import BraintreeSlice from './pages/Braintree/BraintreeSlice'

export const store = configureStore({
  reducer: {
    notificationSnackbar: NotificationSnackbarSlice.reducer,
    braintree: BraintreeSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch