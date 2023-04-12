import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
}

export const counterSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    resetStore: () => initialState,
  },
})

export default counterSlice