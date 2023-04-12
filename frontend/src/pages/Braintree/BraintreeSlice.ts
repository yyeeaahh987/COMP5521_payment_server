import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import * as braintreeApi from '../../api/braintree';

const initialState = {
  isLoading: true,
  transactionHistory: {
    rows: [],
    totalCount: 0
  },
}

export const topUp = createAsyncThunk(
  'braintree/topup',
  async (payload: any, ThunkAPI) => {
    const apiResponse = await braintreeApi.topUp(payload);
    ThunkAPI.dispatch(searchHistory());

    return apiResponse.data;
  }
);

export const searchHistory = createAsyncThunk(
  'braintree/history/search',
  async () => {
    const apiResponse = await braintreeApi.searchHistory();

    return {
      rows: apiResponse.data.data.rows,
      totalCount: apiResponse.data.data.totalCount,
    };
  }
);

export const counterSlice = createSlice({
  name: 'braintree',
  initialState,
  reducers: {
    resetStore: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(topUp.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(searchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionHistory.rows = action.payload.rows;
        state.transactionHistory.totalCount = action.payload.totalCount;
      })
      .addMatcher(isAnyOf(
          topUp.pending,
          searchHistory.pending,
        ), (state, action) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(
          topUp.rejected,
          searchHistory.rejected,
        ), (state, action) => {
        state.isLoading = false;
      })
  }
})

export default counterSlice