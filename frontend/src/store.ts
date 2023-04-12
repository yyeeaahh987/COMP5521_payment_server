import { configureStore } from '@reduxjs/toolkit'

import BraintreeSlice from './pages/Braintree/BraintreeSlice'

export const store = configureStore({
  reducer: {
    braintree: BraintreeSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch