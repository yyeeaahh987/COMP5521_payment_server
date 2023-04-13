import { createSlice, createAsyncThunk, isRejected, isPending, isFulfilled } from '@reduxjs/toolkit';
import * as braintreeApi from '../../api/braintree';

const initialState = {
  isLoading: true,
  topUpValue: '',
  transactionHistory: {
    rows: [],
    totalCount: 0,
    totalApproved: 0,
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
      totalApproved: apiResponse.data.data.totalApproved,
    };
  }
);

export const counterSlice = createSlice({
  name: 'braintree',
  initialState,
  reducers: {
    resetStore: () => initialState,
    setTopUpValue: (state, action) => {
      state.topUpValue = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(topUp.fulfilled, (state, action) => {
        state.topUpValue = '';
      })
      .addCase(searchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionHistory = action.payload;
      })
      .addMatcher(isPending(
          topUp,
          searchHistory,
        ), (state, action) => {
        state.isLoading = true;
      })
      .addMatcher(isRejected(
          searchHistory,
        ), (state, action) => {
        state.isLoading = false;
      })
  }
})

export default counterSlice