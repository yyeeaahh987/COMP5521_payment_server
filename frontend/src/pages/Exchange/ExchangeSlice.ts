import { createSlice, createReducer, createAsyncThunk, isRejected, isPending, isFulfilled, isAnyOf, isAllOf } from '@reduxjs/toolkit';
import * as braintreeApi from '../../api/braintree';
import * as btcApi from '../../api/btc';

const initialState = {
  isLoading: true,
  totalAmount: {
    braintree: 0,
    btc: 0
  },
  exchangeCurrency: {
    fromCurrency: 'braintree',
    toCurrency: 'btc',
    fromValue: 0
  }
}

export const getAllAmounts = createAsyncThunk(
  'exchange/all/get',
  async (payload, ThunkAPI) => {
    ThunkAPI.dispatch(getBtcAmount());
    ThunkAPI.dispatch(getBraintreeAmount());
    return;
  }
);

export const getBraintreeAmount = createAsyncThunk(
  'exchange/braintree/get',
  async () => {
    const apiResponse = await braintreeApi.searchHistory();
    return apiResponse.data.data.totalApproved;
  }
);

export const getBtcAmount = createAsyncThunk(
  'exchange/btc/get',
  async () => {
    const apiResponse = await btcApi.getTotal();
    return apiResponse.data.data.total;
  }
);

export const counterSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    resetStore: () => initialState,
    setCurrency: (state, action) => {
      const input = action.payload;
      switch(input.name) {
        case "fromCurrency":
          state.exchangeCurrency.fromCurrency = input.value;
          break;
        case "toCurrency":
          state.exchangeCurrency.toCurrency = input.value;
          break;
        case "fromValue":
          state.exchangeCurrency.fromValue = input.value < 1 ? 0 : Number(input.value);
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBraintreeAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalAmount.braintree = action.payload;
      })
      .addCase(getBtcAmount.fulfilled, (state, action) => {
        state.totalAmount.btc = action.payload;
      })
      // .addMatcher(isAnyOf(
      //     getBraintreeAmount.fulfilled,
      //     getBtcAmount.fulfilled
      //   ), (state, action) => {
      //   state.isLoading = false;
      // })
      .addMatcher(isPending(
          getBraintreeAmount,
          getBtcAmount
        ), (state, action) => {
        state.isLoading = true;
      })
      .addMatcher(isRejected(
          getBraintreeAmount,
          getBtcAmount
        ), (state, action) => {
        state.isLoading = false;
      })
  }
})

export default counterSlice