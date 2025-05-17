import axiosInstance from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



// API call to fetch all farmer upgrade plans
export const fetchAllFarmerPlans = createAsyncThunk(

  'farmerPlans/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/farmers/upgrade-plans/transactions'); 
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch plans');
    }
  }

);


const planPointsHistorySlice = createSlice({
  name: 'planPointsData',
  initialState: {
    plans: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFarmerPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFarmerPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchAllFarmerPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default planPointsHistorySlice.reducer;
