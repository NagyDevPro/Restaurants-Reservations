import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FetchRestaurantTables } from '../../../api/restaurant/restaurantFetch';



export const fetchRestaurantTablesAsync = createAsyncThunk(
  'restaurantTables/fetchRestaurantTables',
  async (locationId, { rejectWithValue }) => {
    try {
      const response = await FetchRestaurantTables(locationId);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
        message: error.message,
      });
    }
  }
);

const restaurantTablesSlice = createSlice({
  name: 'restaurantTables',
  initialState: {
    tables: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantTablesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRestaurantTablesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tables = action.payload;
      })
      .addCase(fetchRestaurantTablesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default restaurantTablesSlice.reducer;
