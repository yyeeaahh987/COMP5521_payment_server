import { createSlice, isRejected, isPending, isFulfilled } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import * as BraintreeSlice from '../../pages/Braintree/BraintreeSlice';
import * as ExchangeSlice from '../../pages/Exchange/ExchangeSlice';

const initialState = {
  alertId: '',
  severity: '',
  message: '',
};

const notificationOf = (severity: string, message: any) => {
  return {
    alertId: uuidv4(),
    severity: severity,
    message: message,
  }
};

export const NotificationSnackbarSlice = createSlice(
  {
    name: 'notificationSnackbar',
    initialState,
    reducers: {
      resetStore: () => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addMatcher(isPending(
          ExchangeSlice.getBraintreeAmount,
          ExchangeSlice.getBtcAmount,
          BraintreeSlice.topUp,
          BraintreeSlice.searchHistory
        ), (state, action) => {
          return initialState;
        })
        .addMatcher(isFulfilled(
          ExchangeSlice.getBraintreeAmount,
          ExchangeSlice.getBtcAmount,
          BraintreeSlice.topUp,
          BraintreeSlice.searchHistory
        ), (state, action) => {
          return notificationOf("success", action.payload?.message);
        })
        .addMatcher(isRejected(
          ExchangeSlice.getBraintreeAmount,
          ExchangeSlice.getBtcAmount,
          BraintreeSlice.topUp,
          BraintreeSlice.searchHistory
        ), (state, action) => {
          return notificationOf("warning", String(action.error?.message));
        })
    }
  }
);

export default NotificationSnackbarSlice;
